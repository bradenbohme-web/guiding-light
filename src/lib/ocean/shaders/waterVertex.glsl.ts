// Gerstner wave vertex shader — multi-octave with horizontal displacement, sharp crests,
// and SWE heightfield overlay for boat-water interaction

export const waterVertexShader = /* glsl */ `
uniform float uTime;
uniform float uWaveHeight;

// SWE heightfield overlay
uniform sampler2D uHeightfield;    // R=height, G=velX, B=velZ, A=foam
uniform float uHeightfieldSize;    // World size of heightfield grid
uniform float uHeightfieldEnabled; // 0 or 1

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vNormal;
varying float vWaveHeight;
varying float vSteepness;
varying vec3 vViewPosition;
varying float vHeightfieldFoam;

// ---- Gerstner wave helpers ----
struct GerstnerResult {
  vec3 displacement;
  vec3 normal;
  float steepness;
};

GerstnerResult gerstnerWave(vec2 pos, float t,
                            vec2 dir, float wavelength, float amplitude, float steepnessScale) {
  GerstnerResult r;
  float k = 6.28318530718 / wavelength;
  float omega = sqrt(9.81 * k);
  float Q = clamp(steepnessScale / (amplitude * k * 6.0), 0.0, 1.0);

  vec2 d = normalize(dir);
  float phase = k * dot(d, pos) - omega * t;
  float S = sin(phase);
  float C = cos(phase);

  r.displacement = vec3(
    -d.x * Q * amplitude * S,
     amplitude * C,
    -d.y * Q * amplitude * S
  );

  float WA = k * amplitude;
  r.normal = vec3(
    d.x * WA * C,
    Q * WA * S,
    d.y * WA * C
  );
  r.steepness = abs(WA * C);
  return r;
}

void main() {
  vUv = uv;

  vec3 pos = position;
  float H = uWaveHeight;

  // ---- 7-octave Gerstner sum ----
  GerstnerResult w1 = gerstnerWave(pos.xz, uTime, vec2(0.8, 0.6),  12.0, H * 1.00, 0.75);
  GerstnerResult w2 = gerstnerWave(pos.xz, uTime, vec2(-0.3, 0.9),  8.0, H * 0.60, 0.70);
  GerstnerResult w3 = gerstnerWave(pos.xz, uTime, vec2(0.5, -0.4),  4.5, H * 0.35, 0.65);
  GerstnerResult w4 = gerstnerWave(pos.xz, uTime, vec2(-0.7, -0.6), 3.0, H * 0.22, 0.55);
  GerstnerResult w5 = gerstnerWave(pos.xz, uTime, vec2(0.9, 0.2),   1.8, H * 0.12, 0.45);
  GerstnerResult w6 = gerstnerWave(pos.xz, uTime, vec2(-0.2, -0.8), 1.1, H * 0.07, 0.35);
  GerstnerResult w7 = gerstnerWave(pos.xz, uTime, vec2(0.4, 0.7),   0.7, H * 0.04, 0.25);

  vec3 disp = w1.displacement + w2.displacement + w3.displacement +
              w4.displacement + w5.displacement + w6.displacement + w7.displacement;

  pos += disp;
  vWaveHeight = disp.y;

  // ---- SWE heightfield overlay ----
  vHeightfieldFoam = 0.0;
  if (uHeightfieldEnabled > 0.5) {
    // Map world XZ to heightfield UV (centered on origin)
    vec3 worldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
    vec2 hfUV = worldPos.xz / uHeightfieldSize + 0.5;

    // Only apply within heightfield bounds
    if (hfUV.x > 0.01 && hfUV.x < 0.99 && hfUV.y > 0.01 && hfUV.y < 0.99) {
      vec4 hfData = texture2D(uHeightfield, hfUV);
      float hfHeight = hfData.r;
      vHeightfieldFoam = hfData.a;

      // Smooth blend at edges to avoid seams
      float edgeFade = smoothstep(0.01, 0.1, hfUV.x) * smoothstep(0.01, 0.1, 1.0 - hfUV.x)
                     * smoothstep(0.01, 0.1, hfUV.y) * smoothstep(0.01, 0.1, 1.0 - hfUV.y);

      pos.y += hfHeight * edgeFade;
      vWaveHeight += hfHeight * edgeFade;
    }
  }

  // Sum normals
  vec3 nSum = w1.normal + w2.normal + w3.normal +
              w4.normal + w5.normal + w6.normal + w7.normal;
  vec3 calcNormal = normalize(vec3(-nSum.x, 1.0 - nSum.y, -nSum.z));

  vNormal = normalMatrix * calcNormal;

  // Steepness for foam
  vSteepness = (w1.steepness + w2.steepness + w3.steepness + w4.steepness) * 0.25;

  vWorldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
  vViewPosition = (modelViewMatrix * vec4(pos, 1.0)).xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;
