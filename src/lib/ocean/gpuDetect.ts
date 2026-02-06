// WebGPU detection & capability reporting with WebGL2 fallback
// Used to progressively enable compute features (FFT, SWE, MLS-MPM)

export type GPUBackend = 'webgpu' | 'webgl2' | 'webgl1' | 'none';

export interface GPUCapabilities {
  backend: GPUBackend;
  maxTextureSize: number;
  maxComputeWorkgroupSize: [number, number, number] | null;
  maxStorageBufferSize: number | null;
  floatTextureLinearFiltering: boolean;
  halfFloatTextures: boolean;
  computeShaders: boolean;
  /** Estimated particle budget for MLS-MPM at 60fps */
  estimatedParticleBudget: number;
}

let cachedCapabilities: GPUCapabilities | null = null;

/**
 * Detect the best available GPU backend and its capabilities.
 * Results are cached after first call.
 */
export async function detectGPU(): Promise<GPUCapabilities> {
  if (cachedCapabilities) return cachedCapabilities;

  // Try WebGPU first
  if ('gpu' in navigator) {
    try {
      const adapter = await (navigator as any).gpu.requestAdapter();
      if (adapter) {
        const device = await adapter.requestDevice();
        const limits = device.limits;

        cachedCapabilities = {
          backend: 'webgpu',
          maxTextureSize: limits.maxTextureDimension2D ?? 8192,
          maxComputeWorkgroupSize: [
            limits.maxComputeWorkgroupSizeX ?? 256,
            limits.maxComputeWorkgroupSizeY ?? 256,
            limits.maxComputeWorkgroupSizeZ ?? 64,
          ],
          maxStorageBufferSize: limits.maxStorageBufferBindingSize ?? 128 * 1024 * 1024,
          floatTextureLinearFiltering: true,
          halfFloatTextures: true,
          computeShaders: true,
          estimatedParticleBudget: 300_000,
        };

        device.destroy();
        return cachedCapabilities;
      }
    } catch {
      // WebGPU request failed, fall through to WebGL2
    }
  }

  // WebGL2 fallback
  const canvas = document.createElement('canvas');
  const gl2 = canvas.getContext('webgl2') as WebGL2RenderingContext | null;

  if (gl2) {
    const floatExt = gl2.getExtension('EXT_color_buffer_float');
    const linearExt = gl2.getExtension('OES_texture_float_linear');

    cachedCapabilities = {
      backend: 'webgl2',
      maxTextureSize: gl2.getParameter(gl2.MAX_TEXTURE_SIZE) ?? 4096,
      maxComputeWorkgroupSize: null,
      maxStorageBufferSize: null,
      floatTextureLinearFiltering: !!linearExt,
      halfFloatTextures: !!floatExt,
      computeShaders: false,
      estimatedParticleBudget: 50_000, // JS-side fallback is slower
    };

    canvas.remove();
    return cachedCapabilities;
  }

  // WebGL1 or none
  const gl1 = canvas.getContext('webgl');
  canvas.remove();

  cachedCapabilities = {
    backend: gl1 ? 'webgl1' : 'none',
    maxTextureSize: gl1 ? gl1.getParameter(gl1.MAX_TEXTURE_SIZE) : 0,
    maxComputeWorkgroupSize: null,
    maxStorageBufferSize: null,
    floatTextureLinearFiltering: false,
    halfFloatTextures: false,
    computeShaders: false,
    estimatedParticleBudget: 0,
  };

  return cachedCapabilities;
}

/** Synchronous check — returns cached result or null if not yet detected */
export function getGPUCapabilities(): GPUCapabilities | null {
  return cachedCapabilities;
}

/** Reset cache (useful for testing) */
export function resetGPUCache(): void {
  cachedCapabilities = null;
}
