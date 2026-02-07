// MLS-MPM (Moving Least Squares Material Point Method) solver
// CPU implementation with APIC transfers for breach particle physics
// Supports up to 50K particles on CPU, ready for WebGPU compute upgrade

export interface MLSMPMConfig {
  maxParticles: number;
  gridSize: number;     // Cells per axis (32³ default)
  worldSize: number;    // Physical size of simulation domain
  gravity: number;
  flipRatio: number;    // PIC/FLIP blend (0=PIC, 1=FLIP)
}

const DEFAULT_CONFIG: MLSMPMConfig = {
  maxParticles: 50000,
  gridSize: 32,
  worldSize: 10,
  gravity: -9.81,
  flipRatio: 0.95,
};

export class MLSMPMSolver {
  // Particle SoA (Structure of Arrays for cache efficiency)
  readonly posX: Float32Array;
  readonly posY: Float32Array;
  readonly posZ: Float32Array;
  readonly velX: Float32Array;
  readonly velY: Float32Array;
  readonly velZ: Float32Array;
  readonly mass: Float32Array;
  readonly life: Float32Array;   // 0-1, decreases over time
  readonly size: Float32Array;   // Visual size for rendering

  // APIC affine matrix (3x3 per particle, stored flat)
  private C: Float32Array;

  // Grid SoA
  private gMass: Float32Array;
  private gVelX: Float32Array;
  private gVelY: Float32Array;
  private gVelZ: Float32Array;

  private config: MLSMPMConfig;
  private dx: number;      // Grid cell size
  private invDx: number;
  activeCount = 0;

  constructor(config: Partial<MLSMPMConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    const n = this.config.maxParticles;
    const g = this.config.gridSize;

    this.posX = new Float32Array(n);
    this.posY = new Float32Array(n);
    this.posZ = new Float32Array(n);
    this.velX = new Float32Array(n);
    this.velY = new Float32Array(n);
    this.velZ = new Float32Array(n);
    this.mass = new Float32Array(n);
    this.life = new Float32Array(n);
    this.size = new Float32Array(n);
    this.C = new Float32Array(n * 9);

    const gTotal = g * g * g;
    this.gMass = new Float32Array(gTotal);
    this.gVelX = new Float32Array(gTotal);
    this.gVelY = new Float32Array(gTotal);
    this.gVelZ = new Float32Array(gTotal);

    this.dx = this.config.worldSize / g;
    this.invDx = 1 / this.dx;
  }

  /** Spawn particles at position with velocity */
  spawn(
    x: number, y: number, z: number,
    vx: number, vy: number, vz: number,
    count: number,
    spread = 0.3,
    lifetime = 2.0,
    particleMass = 1.0,
    particleSize = 0.05
  ): number {
    const spawned = Math.min(count, this.config.maxParticles - this.activeCount);
    for (let i = 0; i < spawned; i++) {
      const idx = this.activeCount + i;

      // Randomized position within spread
      this.posX[idx] = x + (Math.random() - 0.5) * spread;
      this.posY[idx] = y + (Math.random() - 0.5) * spread * 0.5;
      this.posZ[idx] = z + (Math.random() - 0.5) * spread;

      // Velocity with random variation
      this.velX[idx] = vx + (Math.random() - 0.5) * 2;
      this.velY[idx] = vy + Math.random() * 3; // Upward bias for splashes
      this.velZ[idx] = vz + (Math.random() - 0.5) * 2;

      this.mass[idx] = particleMass;
      this.life[idx] = lifetime * (0.5 + Math.random() * 0.5);
      this.size[idx] = particleSize * (0.5 + Math.random());

      // Zero affine matrix
      const ci = idx * 9;
      for (let j = 0; j < 9; j++) this.C[ci + j] = 0;
    }

    this.activeCount += spawned;
    return spawned;
  }

  /** Main simulation step */
  step(dt: number) {
    if (this.activeCount === 0) return;

    const clampedDt = Math.min(dt, 1 / 30);

    this.clearGrid();
    this.particleToGrid();
    this.gridUpdate(clampedDt);
    this.gridToParticle(clampedDt);
    this.updateLifetimes(clampedDt);
    this.removeDeadParticles();
  }

  // Quadratic B-spline kernel
  private bspline(x: number): number {
    const ax = Math.abs(x);
    if (ax < 0.5) return 0.75 - ax * ax;
    if (ax < 1.5) {
      const t = 1.5 - ax;
      return 0.5 * t * t;
    }
    return 0;
  }

  private clearGrid() {
    this.gMass.fill(0);
    this.gVelX.fill(0);
    this.gVelY.fill(0);
    this.gVelZ.fill(0);
  }

  private gridIdx(ix: number, iy: number, iz: number): number {
    const g = this.config.gridSize;
    return iz * g * g + iy * g + ix;
  }

  private particleToGrid() {
    const g = this.config.gridSize;
    const invDx = this.invDx;
    const dx = this.dx;

    for (let p = 0; p < this.activeCount; p++) {
      // Particle position in grid space
      const gpx = this.posX[p] * invDx;
      const gpy = this.posY[p] * invDx;
      const gpz = this.posZ[p] * invDx;

      // Base cell
      const baseX = Math.floor(gpx - 0.5);
      const baseY = Math.floor(gpy - 0.5);
      const baseZ = Math.floor(gpz - 0.5);

      const mp = this.mass[p];
      const ci = p * 9;

      // 3x3x3 neighborhood
      for (let di = 0; di < 3; di++) {
        for (let dj = 0; dj < 3; dj++) {
          for (let dk = 0; dk < 3; dk++) {
            const ix = baseX + di;
            const iy = baseY + dj;
            const iz = baseZ + dk;

            if (ix < 0 || ix >= g || iy < 0 || iy >= g || iz < 0 || iz >= g) continue;

            // Distance in grid units
            const dxp = gpx - ix;
            const dyp = gpy - iy;
            const dzp = gpz - iz;

            const w = this.bspline(dxp) * this.bspline(dyp) * this.bspline(dzp);
            if (w < 1e-10) continue;

            const idx = this.gridIdx(ix, iy, iz);

            // APIC momentum: v_p + C_p * (x_i - x_p)
            const offX = (ix - gpx) * dx;
            const offY = (iy - gpy) * dx;
            const offZ = (iz - gpz) * dx;

            const apicVx = this.velX[p] + this.C[ci + 0] * offX + this.C[ci + 1] * offY + this.C[ci + 2] * offZ;
            const apicVy = this.velY[p] + this.C[ci + 3] * offX + this.C[ci + 4] * offY + this.C[ci + 5] * offZ;
            const apicVz = this.velZ[p] + this.C[ci + 6] * offX + this.C[ci + 7] * offY + this.C[ci + 8] * offZ;

            this.gMass[idx] += w * mp;
            this.gVelX[idx] += w * mp * apicVx;
            this.gVelY[idx] += w * mp * apicVy;
            this.gVelZ[idx] += w * mp * apicVz;
          }
        }
      }
    }
  }

  private gridUpdate(dt: number) {
    const g = this.config.gridSize;
    const gravity = this.config.gravity;

    for (let idx = 0; idx < this.gMass.length; idx++) {
      if (this.gMass[idx] < 1e-10) continue;

      // Normalize momentum → velocity
      const invM = 1 / this.gMass[idx];
      this.gVelX[idx] *= invM;
      this.gVelY[idx] *= invM;
      this.gVelZ[idx] *= invM;

      // Gravity
      this.gVelY[idx] += gravity * dt;

      // Boundary conditions (reflect at domain edges)
      const iz = Math.floor(idx / (g * g));
      const iy = Math.floor((idx - iz * g * g) / g);
      const ix = idx - iz * g * g - iy * g;

      const margin = 2;
      if (ix < margin || ix >= g - margin) this.gVelX[idx] = 0;
      if (iz < margin || iz >= g - margin) this.gVelZ[idx] = 0;

      // Floor collision (ground / water surface)
      if (iy < margin) {
        this.gVelY[idx] = Math.max(this.gVelY[idx], 0);
      }
      if (iy >= g - margin) {
        this.gVelY[idx] = Math.min(this.gVelY[idx], 0);
      }
    }
  }

  private gridToParticle(dt: number) {
    const g = this.config.gridSize;
    const invDx = this.invDx;
    const dx = this.dx;
    const invDx2 = 4 / (dx * dx); // APIC correction factor

    for (let p = 0; p < this.activeCount; p++) {
      const gpx = this.posX[p] * invDx;
      const gpy = this.posY[p] * invDx;
      const gpz = this.posZ[p] * invDx;

      const baseX = Math.floor(gpx - 0.5);
      const baseY = Math.floor(gpy - 0.5);
      const baseZ = Math.floor(gpz - 0.5);

      let newVx = 0, newVy = 0, newVz = 0;
      const ci = p * 9;
      // Reset C matrix
      for (let j = 0; j < 9; j++) this.C[ci + j] = 0;

      for (let di = 0; di < 3; di++) {
        for (let dj = 0; dj < 3; dj++) {
          for (let dk = 0; dk < 3; dk++) {
            const ix = baseX + di;
            const iy = baseY + dj;
            const iz = baseZ + dk;

            if (ix < 0 || ix >= g || iy < 0 || iy >= g || iz < 0 || iz >= g) continue;

            const dxp = gpx - ix;
            const dyp = gpy - iy;
            const dzp = gpz - iz;

            const w = this.bspline(dxp) * this.bspline(dyp) * this.bspline(dzp);
            if (w < 1e-10) continue;

            const idx = this.gridIdx(ix, iy, iz);
            const gvx = this.gVelX[idx];
            const gvy = this.gVelY[idx];
            const gvz = this.gVelZ[idx];

            newVx += w * gvx;
            newVy += w * gvy;
            newVz += w * gvz;

            // APIC: C = Σ w_i * v_i ⊗ (x_i - x_p) * 4/dx²
            const offX = (ix - gpx) * dx;
            const offY = (iy - gpy) * dx;
            const offZ = (iz - gpz) * dx;

            this.C[ci + 0] += w * gvx * offX * invDx2;
            this.C[ci + 1] += w * gvx * offY * invDx2;
            this.C[ci + 2] += w * gvx * offZ * invDx2;
            this.C[ci + 3] += w * gvy * offX * invDx2;
            this.C[ci + 4] += w * gvy * offY * invDx2;
            this.C[ci + 5] += w * gvy * offZ * invDx2;
            this.C[ci + 6] += w * gvz * offX * invDx2;
            this.C[ci + 7] += w * gvz * offY * invDx2;
            this.C[ci + 8] += w * gvz * offZ * invDx2;
          }
        }
      }

      this.velX[p] = newVx;
      this.velY[p] = newVy;
      this.velZ[p] = newVz;

      // Advect position
      this.posX[p] += dt * newVx;
      this.posY[p] += dt * newVy;
      this.posZ[p] += dt * newVz;

      // Air drag for particles above water surface
      if (this.posY[p] > 0) {
        this.velX[p] *= 0.99;
        this.velZ[p] *= 0.99;
      }
    }
  }

  private updateLifetimes(dt: number) {
    for (let i = 0; i < this.activeCount; i++) {
      this.life[i] -= dt;
    }
  }

  private removeDeadParticles() {
    let writeIdx = 0;
    for (let readIdx = 0; readIdx < this.activeCount; readIdx++) {
      if (this.life[readIdx] > 0 && this.posY[readIdx] > -5) {
        if (writeIdx !== readIdx) {
          this.posX[writeIdx] = this.posX[readIdx];
          this.posY[writeIdx] = this.posY[readIdx];
          this.posZ[writeIdx] = this.posZ[readIdx];
          this.velX[writeIdx] = this.velX[readIdx];
          this.velY[writeIdx] = this.velY[readIdx];
          this.velZ[writeIdx] = this.velZ[readIdx];
          this.mass[writeIdx] = this.mass[readIdx];
          this.life[writeIdx] = this.life[readIdx];
          this.size[writeIdx] = this.size[readIdx];

          const ci_w = writeIdx * 9;
          const ci_r = readIdx * 9;
          for (let j = 0; j < 9; j++) this.C[ci_w + j] = this.C[ci_r + j];
        }
        writeIdx++;
      }
    }
    this.activeCount = writeIdx;
  }
}
