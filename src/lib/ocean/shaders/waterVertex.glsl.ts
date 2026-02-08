// Gerstner wave vertex shader — driven by uniform parameters from OceanSettings
// Supports primary swell, cross-swell, wind-sea, capillary, and FFT noise detail

export const waterVertexShader = /* glsl */ `
uniform float uTime;
uniform float uTimeScale;
uniform float uGlobalWaveHeight;

// Primary swell (3 sub-waves)
uniform float uSwell1Enabled;
uniform float uSwell1Dir;
uniform float uSwell1Wavelength;
uniform float uSwell1Amplitude;
uniform float uSwell1Steepness;

// Secondary swell (2 sub-waves)
uniform float uSwell2Enabled;
uniform float uSwell2Dir;
uniform float uSwell2Wavelength;
uniform float uSwell2Amplitude;
uniform float uSwell2Steepness;

// Wind sea
uniform float uWindSeaEnabled;
uniform float uWindSeaDir;
uniform float uWindSeaSpeed;
uniform float uWindSeaSpread;
uniform float uWindSeaChoppiness;

// Capillary
uniform float uCapillaryEnabled;
uniform float uCapillaryIntensity;
uniform float uCapillaryScale;

// FFT detail noise
uniform float uFFTEnabled;
uniform float uFFTWindSpeed;
uniform float uFFTWindDir;
uniform float uFFTAmplitude;
uniform float uFFTChoppiness;
uniform float uFFTBlend;

// SWE heightfield overlay
uniform sampler2D uHeightfield;
uniform float uHeightfieldSize;
uniform float uHeightfieldEnabled;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vNormal;
varying float vWaveHeight;
varying float vSteepness;
varying vec3 vViewPosition;
varying float vHeightfieldFoam;

// ---- Helpers ----
#define PI 3.14159265359
#define TAU 6.28318530718

vec2 dirFromDeg(float deg) {
  float r = deg * PI / 180.0;
  return vec2(sin(r), cos(r));
}

struct GResult {
  vec3 disp;
  vec3 nContrib;
  float steep;
};

GResult gerstner(vec2 pos, float t, vec2 dir, float wl, float amp, float Q) {
  GResult r;
  float k = TAU / wl;
  float c = sqrt(9.81 / k);
  float q = clamp(Q / (amp * k * 8.0), 0.0, 1.0);
  vec2 d = normalize(dir);
  float phase = k * dot(d, pos) - c * k * t;
  float S = sin(phase);
  float C = cos(phase);
  r.disp = vec3(-d.x * q * amp * S, amp * C, -d.y * q * amp * S);
  float WA = k * amp;
  r.nContrib = vec3(d.x * WA * C, q * WA * S, d.y * WA * C);
  r.steep = abs(WA * S);
  return r;
}

// Simple pseudo-noise for FFT-like spectral detail
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p, float t) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 6; i++) {
    v += a * noise(p + t * 0.3 * float(i + 1) * 0.1);
    p = rot * p * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

void main() {
  vUv = uv;
  vec3 pos = position;
  float t = uTime * uTimeScale;
  float H = uGlobalWaveHeight;

  vec3 totalDisp = vec3(0.0);
  vec3 totalNorm = vec3(0.0);
  float totalSteep = 0.0;

  // ============ Primary Swell (3 sub-waves with slight spread) ============
  if (uSwell1Enabled > 0.5) {
    vec2 d0 = dirFromDeg(uSwell1Dir);
    vec2 d1 = dirFromDeg(uSwell1Dir + 8.0);
    vec2 d2 = dirFromDeg(uSwell1Dir - 12.0);

    GResult s0 = gerstner(pos.xz, t, d0, uSwell1Wavelength, uSwell1Amplitude * H, uSwell1Steepness);
    GResult s1 = gerstner(pos.xz, t, d1, uSwell1Wavelength * 0.78, uSwell1Amplitude * H * 0.7, uSwell1Steepness * 0.9);
    GResult s2 = gerstner(pos.xz, t, d2, uSwell1Wavelength * 1.22, uSwell1Amplitude * H * 0.5, uSwell1Steepness * 0.85);

    totalDisp += s0.disp + s1.disp + s2.disp;
    totalNorm += s0.nContrib + s1.nContrib + s2.nContrib;
    totalSteep += (s0.steep + s1.steep) * 0.5;
  }

  // ============ Secondary Swell (cross-sea, 2 sub-waves) ============
  if (uSwell2Enabled > 0.5) {
    vec2 d0 = dirFromDeg(uSwell2Dir);
    vec2 d1 = dirFromDeg(uSwell2Dir + 15.0);

    GResult c0 = gerstner(pos.xz, t, d0, uSwell2Wavelength, uSwell2Amplitude * H, uSwell2Steepness);
    GResult c1 = gerstner(pos.xz, t, d1, uSwell2Wavelength * 0.77, uSwell2Amplitude * H * 0.65, uSwell2Steepness * 0.9);

    totalDisp += c0.disp + c1.disp;
    totalNorm += c0.nContrib + c1.nContrib;
    totalSteep += c0.steep * 0.3;
  }

  // ============ Wind Sea (5 sub-waves with directional spread) ============
  if (uWindSeaEnabled > 0.5) {
    float windWL = max(1.5, uWindSeaSpeed * 0.7);
    float windAmp = uWindSeaSpeed * 0.02 * H;
    float spreadRad = uWindSeaSpread * PI / 180.0;

    for (int i = 0; i < 5; i++) {
      float fi = float(i);
      float angleOffset = (fi - 2.0) * spreadRad * 0.5;
      vec2 d = dirFromDeg(uWindSeaDir + angleOffset * 180.0 / PI);
      float wl = windWL * (1.0 - fi * 0.15);
      float amp = windAmp * (1.0 - fi * 0.18);
      float Q = uWindSeaChoppiness * (0.8 - fi * 0.1);

      GResult w = gerstner(pos.xz, t, d, wl, amp, Q);
      totalDisp += w.disp;
      totalNorm += w.nContrib;
      totalSteep += w.steep * 0.15;
    }
  }

  // ============ Capillary Ripples (4 high-freq waves) ============
  if (uCapillaryEnabled > 0.5) {
    float capAmp = uCapillaryIntensity * H * 0.08;
    float capBase = 1.4 * uCapillaryScale;
    
    GResult r0 = gerstner(pos.xz, t, vec2(0.42, 0.91),  capBase,       capAmp,       0.4);
    GResult r1 = gerstner(pos.xz, t, vec2(-0.88, 0.47), capBase * 0.7, capAmp * 0.6, 0.35);
    GResult r2 = gerstner(pos.xz, t, vec2(0.73, -0.68), capBase * 0.5, capAmp * 0.4, 0.3);
    GResult r3 = gerstner(pos.xz, t, vec2(-0.35, -0.94),capBase * 0.35,capAmp * 0.25,0.25);

    totalDisp += r0.disp + r1.disp + r2.disp + r3.disp;
    totalNorm += r0.nContrib + r1.nContrib + r2.nContrib + r3.nContrib;
  }

  // ============ FFT Spectral Detail (procedural FBM approximation) ============
  if (uFFTEnabled > 0.5) {
    vec2 fftDir = dirFromDeg(uFFTWindDir);
    float fftScale = 0.3 / max(uFFTAmplitude, 0.0001);
    vec2 fftUV = pos.xz * fftScale;
    
    // Directional bias
    fftUV += fftDir * t * uFFTWindSpeed * 0.05;
    
    float detail = fbm(fftUV, t) - 0.5;
    float detailX = fbm(fftUV + vec2(0.1, 0.0), t) - 0.5;
    float detailZ = fbm(fftUV + vec2(0.0, 0.1), t) - 0.5;
    
    float fftAmp = uFFTAmplitude * 500.0 * H * uFFTBlend;
    totalDisp.y += detail * fftAmp;
    totalDisp.x += (detailX - detail) * fftAmp * uFFTChoppiness * 0.3;
    totalDisp.z += (detailZ - detail) * fftAmp * uFFTChoppiness * 0.3;
    
    // Normal contribution from FFT
    float dx = (detailX - detail) * fftAmp * 10.0;
    float dz = (detailZ - detail) * fftAmp * 10.0;
    totalNorm += vec3(dx, 0.0, dz);
  }

  pos += totalDisp;
  vWaveHeight = totalDisp.y;

  // ---- SWE heightfield overlay ----
  vHeightfieldFoam = 0.0;
  if (uHeightfieldEnabled > 0.5) {
    vec3 worldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
    vec2 hfUV = worldPos.xz / uHeightfieldSize + 0.5;
    if (hfUV.x > 0.01 && hfUV.x < 0.99 && hfUV.y > 0.01 && hfUV.y < 0.99) {
      vec4 hfData = texture2D(uHeightfield, hfUV);
      float hfHeight = hfData.r;
      vHeightfieldFoam = hfData.a;
      float edgeFade = smoothstep(0.01, 0.1, hfUV.x) * smoothstep(0.01, 0.1, 1.0 - hfUV.x)
                     * smoothstep(0.01, 0.1, hfUV.y) * smoothstep(0.01, 0.1, 1.0 - hfUV.y);
      pos.y += hfHeight * edgeFade;
      vWaveHeight += hfHeight * edgeFade;
    }
  }

  vec3 calcNormal = normalize(vec3(-totalNorm.x, 1.0 - totalNorm.y, -totalNorm.z));
  vNormal = normalMatrix * calcNormal;
  vSteepness = totalSteep;

  vWorldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
  vViewPosition = (modelViewMatrix * vec4(pos, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;
