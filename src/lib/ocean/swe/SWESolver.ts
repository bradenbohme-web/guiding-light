// Shallow Water Equations solver using GPGPU ping-pong textures
// Manages heightfield state: R=height, G=velX, B=velZ, A=foam

import * as THREE from "three";
import { GPGPUCompute } from "../gpgpu/GPGPUCompute";
import {
  sweAdvectionShader,
  sweObjectCouplingShader,
  sweBreachFeedbackShader,
  swePassthroughVertex,
} from "./sweShaders";

export interface SWEConfig {
  resolution: number;
  worldSize: number;
  gravity: number;
  damping: number;
  couplingStrength: number;
}

const DEFAULT_SWE_CONFIG: SWEConfig = {
  resolution: 256,
  worldSize: 100,
  gravity: 9.81,
  damping: 0.03,
  couplingStrength: 5.0,
};

export class SWESolver {
  private gpgpu: GPGPUCompute;
  private advectionMat: THREE.ShaderMaterial;
  private couplingMat: THREE.ShaderMaterial;
  private feedbackMat: THREE.ShaderMaterial;
  private config: SWEConfig;
  private initialized = false;

  constructor(renderer: THREE.WebGLRenderer, config: Partial<SWEConfig> = {}) {
    this.config = { ...DEFAULT_SWE_CONFIG, ...config };
    const { resolution, worldSize, gravity, damping, couplingStrength } = this.config;
    const dx = worldSize / resolution;

    this.gpgpu = new GPGPUCompute(resolution, renderer);

    const uniforms = {
      uPrevState: { value: null as THREE.Texture | null },
      uDt: { value: 1 / 60 },
      uDx: { value: dx },
      uResolution: { value: new THREE.Vector2(resolution, resolution) },
      uGravity: { value: gravity },
      uDamping: { value: damping },
    };

    this.advectionMat = new THREE.ShaderMaterial({
      vertexShader: swePassthroughVertex,
      fragmentShader: sweAdvectionShader,
      uniforms: { ...uniforms },
    });

    this.couplingMat = new THREE.ShaderMaterial({
      vertexShader: swePassthroughVertex,
      fragmentShader: sweObjectCouplingShader,
      uniforms: {
        uPrevState: { value: null },
        uObjectMask: { value: null },
        uDt: { value: 1 / 60 },
        uCouplingStrength: { value: couplingStrength },
        uResolution: { value: new THREE.Vector2(resolution, resolution) },
      },
    });

    this.feedbackMat = new THREE.ShaderMaterial({
      vertexShader: swePassthroughVertex,
      fragmentShader: sweBreachFeedbackShader,
      uniforms: {
        uPrevState: { value: null },
        uBFT: { value: null },
        uDt: { value: 1 / 60 },
        uResolution: { value: new THREE.Vector2(resolution, resolution) },
      },
    });

    // Initialize with flat water (all zeros)
    const data = new Float32Array(resolution * resolution * 4);
    this.gpgpu.initWithData(data);
    this.initialized = true;
  }

  get heightfieldTexture(): THREE.Texture {
    return this.gpgpu.currentTexture;
  }

  get resolution(): number {
    return this.config.resolution;
  }

  get worldSize(): number {
    return this.config.worldSize;
  }

  step(dt: number, objectMask?: THREE.Texture, bft?: THREE.Texture) {
    if (!this.initialized) return;
    const clampedDt = Math.min(dt, 1 / 30);

    // 1. SWE advection + pressure
    this.advectionMat.uniforms.uPrevState.value = this.gpgpu.currentTexture;
    this.advectionMat.uniforms.uDt.value = clampedDt;
    this.gpgpu.compute(this.advectionMat);

    // 2. Object coupling
    if (objectMask) {
      this.couplingMat.uniforms.uPrevState.value = this.gpgpu.currentTexture;
      this.couplingMat.uniforms.uObjectMask.value = objectMask;
      this.couplingMat.uniforms.uDt.value = clampedDt;
      this.gpgpu.compute(this.couplingMat);
    }

    // 3. Breach feedback (two-way coupling)
    if (bft) {
      this.feedbackMat.uniforms.uPrevState.value = this.gpgpu.currentTexture;
      this.feedbackMat.uniforms.uBFT.value = bft;
      this.feedbackMat.uniforms.uDt.value = clampedDt;
      this.gpgpu.compute(this.feedbackMat);
    }
  }

  dispose() {
    this.gpgpu.dispose();
    this.advectionMat.dispose();
    this.couplingMat.dispose();
    this.feedbackMat.dispose();
  }
}
