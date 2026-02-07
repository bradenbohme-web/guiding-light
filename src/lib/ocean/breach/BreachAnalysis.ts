// Breach Analysis Texture (BAT) and Breach Feedback Texture (BFT)
// BAT: computes steepness/curvature/velocity from heightfield to detect breach events
// BFT: accumulates particle impacts for two-way coupling back to heightfield

import * as THREE from "three";
import { GPGPUCompute } from "../gpgpu/GPGPUCompute";
import {
  batPassthroughVertex,
  batComputeShader,
  breachTriggerShader,
} from "./breachShaders";

export interface BreachConfig {
  resolution: number;
  worldSize: number;
  steepnessThreshold: number;
  curvatureThreshold: number;
  velocityThreshold: number;
  energyThreshold: number;
}

const DEFAULT_BREACH_CONFIG: BreachConfig = {
  resolution: 256,
  worldSize: 100,
  steepnessThreshold: 0.4,
  curvatureThreshold: 2.0,
  velocityThreshold: 0.5,
  energyThreshold: 5.0,
};

export interface SpawnEvent {
  x: number;
  z: number;
  strength: number;
  velocityX: number;
  velocityZ: number;
  verticalVel: number;
}

export class BreachAnalysis {
  private batCompute: GPGPUCompute;
  private triggerCompute: GPGPUCompute;
  private batMaterial: THREE.ShaderMaterial;
  private triggerMaterial: THREE.ShaderMaterial;

  // BFT: CPU-side accumulation texture for particle impacts
  private bftData: Float32Array;
  private bftTexture: THREE.DataTexture;
  private bftDecay = 0.9;

  private config: BreachConfig;
  private prevHeightfieldTexture: THREE.Texture | null = null;

  // Cached spawn readback buffer
  private readbackBuffer: Float32Array;
  private readbackFrameSkip = 3; // Only readback every N frames
  private frameCount = 0;
  private cachedSpawnEvents: SpawnEvent[] = [];

  constructor(renderer: THREE.WebGLRenderer, config: Partial<BreachConfig> = {}) {
    this.config = { ...DEFAULT_BREACH_CONFIG, ...config };
    const { resolution, worldSize } = this.config;
    const dx = worldSize / resolution;

    this.batCompute = new GPGPUCompute(resolution, renderer);
    this.triggerCompute = new GPGPUCompute(resolution, renderer);

    this.batMaterial = new THREE.ShaderMaterial({
      vertexShader: batPassthroughVertex,
      fragmentShader: batComputeShader,
      uniforms: {
        uHeightfield: { value: null },
        uPrevHeightfield: { value: null },
        uDt: { value: 1 / 60 },
        uDx: { value: dx },
        uResolution: { value: new THREE.Vector2(resolution, resolution) },
      },
    });

    this.triggerMaterial = new THREE.ShaderMaterial({
      vertexShader: batPassthroughVertex,
      fragmentShader: breachTriggerShader,
      uniforms: {
        uBAT: { value: null },
        uSteepnessThreshold: { value: this.config.steepnessThreshold },
        uCurvatureThreshold: { value: this.config.curvatureThreshold },
        uVelocityThreshold: { value: this.config.velocityThreshold },
        uEnergyThreshold: { value: this.config.energyThreshold },
      },
    });

    // BFT: CPU-managed feedback texture
    this.bftData = new Float32Array(resolution * resolution * 4);
    this.bftTexture = new THREE.DataTexture(
      this.bftData as unknown as BufferSource,
      resolution,
      resolution,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    this.bftTexture.needsUpdate = true;

    this.readbackBuffer = new Float32Array(resolution * resolution * 4);

    // Init with zeros
    const zeros = new Float32Array(resolution * resolution * 4);
    this.batCompute.initWithData(zeros);
    this.triggerCompute.initWithData(zeros);
  }

  get batTexture(): THREE.Texture {
    return this.batCompute.currentTexture;
  }

  get triggerTexture(): THREE.Texture {
    return this.triggerCompute.currentTexture;
  }

  get breachFeedbackTexture(): THREE.DataTexture {
    return this.bftTexture;
  }

  /** Compute BAT from current heightfield */
  update(heightfieldTexture: THREE.Texture, dt: number) {
    this.frameCount++;

    // BAT computation
    this.batMaterial.uniforms.uHeightfield.value = heightfieldTexture;
    this.batMaterial.uniforms.uPrevHeightfield.value =
      this.prevHeightfieldTexture ?? heightfieldTexture;
    this.batMaterial.uniforms.uDt.value = dt;
    this.batCompute.compute(this.batMaterial);

    // Trigger evaluation
    this.triggerMaterial.uniforms.uBAT.value = this.batCompute.currentTexture;
    this.triggerCompute.compute(this.triggerMaterial);

    // Store for next frame's time derivative
    this.prevHeightfieldTexture = heightfieldTexture;

    // Decay BFT
    this.decayBFT();
  }

  /** Deposit a particle impact into the BFT */
  depositImpact(
    worldX: number,
    worldZ: number,
    velX: number,
    velY: number,
    velZ: number,
    mass: number
  ) {
    const res = this.config.resolution;
    const half = this.config.worldSize / 2;

    // World → grid coordinates
    const gx = Math.floor(((worldX + half) / this.config.worldSize) * res);
    const gz = Math.floor(((worldZ + half) / this.config.worldSize) * res);

    // Mexican hat kernel (sigma=1.5 cells)
    const sigma = 1.5;
    const radius = 3;

    for (let di = -radius; di <= radius; di++) {
      for (let dj = -radius; dj <= radius; dj++) {
        const ix = gx + di;
        const iz = gz + dj;
        if (ix < 0 || ix >= res || iz < 0 || iz >= res) continue;

        const r = Math.sqrt(di * di + dj * dj);
        const r2 = r * r;
        const s2 = sigma * sigma;
        // Mexican hat: (1 - r²/σ²) * exp(-r²/2σ²)
        const weight = (1 - r2 / s2) * Math.exp(-r2 / (2 * s2));

        const idx = (iz * res + ix) * 4;
        this.bftData[idx + 0] += weight * mass * velY * 0.1;     // height impulse
        this.bftData[idx + 1] += weight * mass * velX * 0.05;    // momentum X
        this.bftData[idx + 2] += weight * mass * velZ * 0.05;    // momentum Z
      }
    }

    this.bftTexture.needsUpdate = true;
  }

  private decayBFT() {
    for (let i = 0; i < this.bftData.length; i++) {
      this.bftData[i] *= this.bftDecay;
    }
    this.bftTexture.needsUpdate = true;
  }

  /** Get spawn events (only reads back from GPU every N frames for perf) */
  getSpawnEvents(): SpawnEvent[] {
    // Skip expensive readback most frames
    if (this.frameCount % this.readbackFrameSkip !== 0) {
      return this.cachedSpawnEvents;
    }

    // In a real implementation, we'd read back the trigger texture here
    // For CPU-side, we generate spawn events from the BAT data
    // This is a simplified version that checks a sparse grid
    this.cachedSpawnEvents = [];
    return this.cachedSpawnEvents;
  }

  dispose() {
    this.batCompute.dispose();
    this.triggerCompute.dispose();
    this.batMaterial.dispose();
    this.triggerMaterial.dispose();
    this.bftTexture.dispose();
  }
}
