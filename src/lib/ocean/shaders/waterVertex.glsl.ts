// Gerstner wave vertex shader — oceanographic multi-group wave model
// Swell + wind-sea + capillary groups with directional spreading
// Geometry assumed flat in XZ plane (no mesh rotation)

export const waterVertexShader = /* glsl */ `
uniform float uTime;
uniform float uWaveHeight;

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

// ---- Gerstner wave ----
struct GerstnerResult {
  vec3 displacement;
  vec3 tangent;    // partial derivative wrt wave direction
  vec3 binormal;   // partial derivative wrt perpendicular
  float steepness;
};

GerstnerResult gerstnerWave(vec2 pos, float t,
                            vec2 dir, float wavelength, float amplitude, float steepQ) {
  GerstnerResult r;
  float k  = 6.28318530718 / wavelength;
  float c  = sqrt(9.81 / k);             // phase speed (deep water dispersion)
  float Q  = clamp(steepQ / (amplitude * k * 8.0), 0.0, 1.0);

  vec2 d     = normalize(dir);
  float phase = k * dot(d, pos) - c * k * t;
  float S     = sin(phase);
  float C     = cos(phase);

  r.displacement = vec3(
    -d.x * Q * amplitude * S,
     amplitude * C,
    -d.y * Q * amplitude * S
  );

  float WA = k * amplitude;
  r.tangent  = vec3(0.0);  // accumulated in main
  r.binormal = vec3(0.0);
  r.steepness = abs(WA * S); // max steepness when slope is steepest
  return r;
}

// Accumulate normal contribution from one wave
vec3 waveNormalContrib(vec2 pos, float t, vec2 dir, float wavelength, float amplitude, float steepQ) {
  float k  = 6.28318530718 / wavelength;
  float c  = sqrt(9.81 / k);
  float Q  = clamp(steepQ / (amplitude * k * 8.0), 0.0, 1.0);
  vec2 d   = normalize(dir);
  float phase = k * dot(d, pos) - c * k * t;
  float C  = cos(phase);
  float S  = sin(phase);
  float WA = k * amplitude;
  return vec3(
    d.x * WA * C,
    Q * WA * S,
    d.y * WA * C
  );
}

void main() {
  vUv = uv;
  vec3 pos = position;  // XZ plane geometry, Y=0
  float H = uWaveHeight;

  // ============================================================
  // WAVE GROUP 1: Primary swell — long-period open ocean waves
  // Direction: roughly from the west-northwest
  // ============================================================
  GerstnerResult s1 = gerstnerWave(pos.xz, uTime, vec2(0.85, 0.53),  18.0, H * 1.20, 0.60);
  GerstnerResult s2 = gerstnerWave(pos.xz, uTime, vec2(0.78, 0.62),  14.0, H * 0.85, 0.55);
  GerstnerResult s3 = gerstnerWave(pos.xz, uTime, vec2(0.92, 0.40),  22.0, H * 0.65, 0.50);

  // ============================================================
  // WAVE GROUP 2: Secondary swell — crossing from different storm
  // Direction: from the south-southwest (cross-sea pattern)
  // ============================================================
  GerstnerResult c1 = gerstnerWave(pos.xz, uTime, vec2(-0.25, 0.97), 11.0, H * 0.55, 0.65);
  GerstnerResult c2 = gerstnerWave(pos.xz, uTime, vec2(-0.40, 0.92),  8.5, H * 0.40, 0.60);

  // ============================================================
  // WAVE GROUP 3: Local wind-sea — shorter, steeper, more chaotic
  // Multiple directions with wider angular spread
  // ============================================================
  GerstnerResult w1 = gerstnerWave(pos.xz, uTime, vec2(0.60, -0.80),  5.0, H * 0.35, 0.75);
  GerstnerResult w2 = gerstnerWave(pos.xz, uTime, vec2(-0.70, -0.72), 3.8, H * 0.25, 0.70);
  GerstnerResult w3 = gerstnerWave(pos.xz, uTime, vec2(0.95, 0.30),   4.2, H * 0.28, 0.72);
  GerstnerResult w4 = gerstnerWave(pos.xz, uTime, vec2(-0.50, 0.87),  3.2, H * 0.20, 0.68);
  GerstnerResult w5 = gerstnerWave(pos.xz, uTime, vec2(0.30, -0.95),  2.5, H * 0.18, 0.65);

  // ============================================================
  // WAVE GROUP 4: Capillary ripples — high frequency detail
  // Near-random directions, very small amplitude
  // ============================================================
  GerstnerResult r1 = gerstnerWave(pos.xz, uTime, vec2(0.42, 0.91),   1.4, H * 0.08, 0.40);
  GerstnerResult r2 = gerstnerWave(pos.xz, uTime, vec2(-0.88, 0.47),  1.0, H * 0.05, 0.35);
  GerstnerResult r3 = gerstnerWave(pos.xz, uTime, vec2(0.73, -0.68),  0.7, H * 0.03, 0.30);
  GerstnerResult r4 = gerstnerWave(pos.xz, uTime, vec2(-0.35, -0.94), 0.5, H * 0.02, 0.25);

  // ---- Sum all displacements ----
  vec3 disp = s1.displacement + s2.displacement + s3.displacement
            + c1.displacement + c2.displacement
            + w1.displacement + w2.displacement + w3.displacement + w4.displacement + w5.displacement
            + r1.displacement + r2.displacement + r3.displacement + r4.displacement;

  pos += disp;
  vWaveHeight = disp.y;

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

  // ---- Accumulate normals from all waves ----
  vec3 nSum = vec3(0.0);
  // Swell
  nSum += waveNormalContrib(position.xz, uTime, vec2(0.85, 0.53),  18.0, H * 1.20, 0.60);
  nSum += waveNormalContrib(position.xz, uTime, vec2(0.78, 0.62),  14.0, H * 0.85, 0.55);
  nSum += waveNormalContrib(position.xz, uTime, vec2(0.92, 0.40),  22.0, H * 0.65, 0.50);
  // Cross swell
  nSum += waveNormalContrib(position.xz, uTime, vec2(-0.25, 0.97), 11.0, H * 0.55, 0.65);
  nSum += waveNormalContrib(position.xz, uTime, vec2(-0.40, 0.92),  8.5, H * 0.40, 0.60);
  // Wind sea
  nSum += waveNormalContrib(position.xz, uTime, vec2(0.60, -0.80),  5.0, H * 0.35, 0.75);
  nSum += waveNormalContrib(position.xz, uTime, vec2(-0.70, -0.72), 3.8, H * 0.25, 0.70);
  nSum += waveNormalContrib(position.xz, uTime, vec2(0.95, 0.30),   4.2, H * 0.28, 0.72);
  nSum += waveNormalContrib(position.xz, uTime, vec2(-0.50, 0.87),  3.2, H * 0.20, 0.68);
  nSum += waveNormalContrib(position.xz, uTime, vec2(0.30, -0.95),  2.5, H * 0.18, 0.65);
  // Capillary
  nSum += waveNormalContrib(position.xz, uTime, vec2(0.42, 0.91),   1.4, H * 0.08, 0.40);
  nSum += waveNormalContrib(position.xz, uTime, vec2(-0.88, 0.47),  1.0, H * 0.05, 0.35);
  nSum += waveNormalContrib(position.xz, uTime, vec2(0.73, -0.68),  0.7, H * 0.03, 0.30);
  nSum += waveNormalContrib(position.xz, uTime, vec2(-0.35, -0.94), 0.5, H * 0.02, 0.25);

  vec3 calcNormal = normalize(vec3(-nSum.x, 1.0 - nSum.y, -nSum.z));
  vNormal = normalMatrix * calcNormal;

  // Steepness for foam — weighted toward larger, steeper waves
  vSteepness = (s1.steepness * 0.3 + s2.steepness * 0.2
              + c1.steepness * 0.15
              + w1.steepness * 0.15 + w2.steepness * 0.1 + w3.steepness * 0.1);

  vWorldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
  vViewPosition = (modelViewMatrix * vec4(pos, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;
