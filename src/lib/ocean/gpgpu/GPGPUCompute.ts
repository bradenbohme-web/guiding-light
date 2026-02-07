// GPGPU ping-pong render target utility for WebGL2 texture-based computation
// Used by SWE solver and breach analysis systems

import * as THREE from "three";

export class GPGPUCompute {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private mesh: THREE.Mesh;
  private targets: [THREE.WebGLRenderTarget, THREE.WebGLRenderTarget];
  private currentIdx = 0;

  readonly resolution: number;

  constructor(resolution: number, renderer: THREE.WebGLRenderer, channels: 'rgba' | 'rg' = 'rgba') {
    this.resolution = resolution;
    this.renderer = renderer;

    // Fullscreen quad for fragment shader passes
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.scene = new THREE.Scene();
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
    this.scene.add(this.mesh);

    const format = channels === 'rg' ? THREE.RGFormat : THREE.RGBAFormat;
    const rtOpts: THREE.WebGLRenderTargetOptions = {
      type: THREE.FloatType,
      format,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      depthBuffer: false,
      stencilBuffer: false,
    };

    this.targets = [
      new THREE.WebGLRenderTarget(resolution, resolution, rtOpts),
      new THREE.WebGLRenderTarget(resolution, resolution, rtOpts),
    ];
  }

  /** Current result texture (read from this) */
  get currentTexture(): THREE.Texture {
    return this.targets[this.currentIdx].texture;
  }

  /** Previous frame texture */
  get previousTexture(): THREE.Texture {
    return this.targets[1 - this.currentIdx].texture;
  }

  /** Run a compute pass: reads from current, writes to next, then swaps */
  compute(material: THREE.ShaderMaterial) {
    // Material should sample from currentTexture
    this.mesh.material = material;

    const writeTarget = this.targets[1 - this.currentIdx];
    const prevRT = this.renderer.getRenderTarget();

    this.renderer.setRenderTarget(writeTarget);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setRenderTarget(prevRT);

    // Swap
    this.currentIdx = 1 - this.currentIdx;
  }

  /** Initialize both targets with data */
  initWithData(data: Float32Array) {
    const tex = new THREE.DataTexture(
      new Float32Array(data.buffer.slice(0)) as unknown as BufferSource,
      this.resolution,
      this.resolution,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    tex.needsUpdate = true;

    // Copy to both targets using a simple passthrough
    const mat = new THREE.ShaderMaterial({
      vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `uniform sampler2D uInput; varying vec2 vUv; void main() { gl_FragColor = texture2D(uInput, vUv); }`,
      uniforms: { uInput: { value: tex } },
    });

    this.mesh.material = mat;
    const prevRT = this.renderer.getRenderTarget();

    for (const target of this.targets) {
      this.renderer.setRenderTarget(target);
      this.renderer.render(this.scene, this.camera);
    }

    this.renderer.setRenderTarget(prevRT);
    mat.dispose();
    tex.dispose();
  }

  dispose() {
    this.targets[0].dispose();
    this.targets[1].dispose();
    (this.mesh.geometry as THREE.BufferGeometry).dispose();
  }
}
