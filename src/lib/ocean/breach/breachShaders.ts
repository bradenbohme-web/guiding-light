// Breach Analysis Texture (BAT) and particle rendering shaders

export const batPassthroughVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// BAT: Computes breach indicators from heightfield
// Output: R=steepness, G=curvature, B=verticalVelocity, A=energy
export const batComputeShader = /* glsl */ `
uniform sampler2D uHeightfield;     // R=h, G=vx, B=vz, A=foam
uniform sampler2D uPrevHeightfield; // Previous frame for velocity
uniform float uDt;
uniform float uDx;
uniform vec2 uResolution;

varying vec2 vUv;

void main() {
  vec2 texel = 1.0 / uResolution;

  vec4 state = texture2D(uHeightfield, vUv);
  vec4 prev  = texture2D(uPrevHeightfield, vUv);
  float h = state.r;

  // Gradient (steepness)
  float hL = texture2D(uHeightfield, vUv - vec2(texel.x, 0.0)).r;
  float hR = texture2D(uHeightfield, vUv + vec2(texel.x, 0.0)).r;
  float hB = texture2D(uHeightfield, vUv - vec2(0.0, texel.y)).r;
  float hT = texture2D(uHeightfield, vUv + vec2(0.0, texel.y)).r;

  float dhdx = (hR - hL) / (2.0 * uDx);
  float dhdz = (hT - hB) / (2.0 * uDx);
  float steepness = length(vec2(dhdx, dhdz));

  // Curvature (Laplacian)
  float curvature = (hL + hR + hB + hT - 4.0 * h) / (uDx * uDx);

  // Vertical velocity (time derivative)
  float verticalVel = (h - prev.r) / max(uDt, 0.001);

  // Local energy density: 0.5 * (v² + g*h²)
  float speed2 = state.g * state.g + state.b * state.b;
  float energy = 0.5 * (speed2 + 9.81 * h * h);

  gl_FragColor = vec4(steepness, curvature, verticalVel, energy);
}
`;

// Breach trigger evaluation: decides which cells should spawn particles
// Output: R=shouldSpawn (0/1), G=spawnStrength, B=flowDirX, A=flowDirZ
export const breachTriggerShader = /* glsl */ `
uniform sampler2D uBAT;          // Breach analysis texture
uniform float uSteepnessThreshold;
uniform float uCurvatureThreshold;
uniform float uVelocityThreshold;
uniform float uEnergyThreshold;

varying vec2 vUv;

void main() {
  vec4 bat = texture2D(uBAT, vUv);
  float steepness   = bat.r;
  float curvature   = bat.g;
  float verticalVel = bat.b;
  float energy      = bat.a;

  // Crest breaking: steep + concave + rising
  bool crestBreak = steepness > uSteepnessThreshold &&
                    curvature > uCurvatureThreshold &&
                    verticalVel > uVelocityThreshold;

  // Impact: high energy + downward velocity
  bool impact = energy > uEnergyThreshold &&
                verticalVel < -uVelocityThreshold;

  float shouldSpawn = (crestBreak || impact) ? 1.0 : 0.0;

  // Spawn strength based on how far above thresholds
  float strength = 0.0;
  if (crestBreak) {
    strength = (steepness - uSteepnessThreshold) * 2.0 +
               max(verticalVel, 0.0) * 0.5;
  }
  if (impact) {
    strength = max(strength, energy * 0.5);
  }
  strength = clamp(strength, 0.0, 1.0);

  // Flow direction from BAT velocity components
  // (approximate from heightfield gradient direction)
  gl_FragColor = vec4(shouldSpawn, strength, 0.0, 0.0);
}
`;

// Particle point sprite vertex shader
export const particleVertexShader = /* glsl */ `
attribute float aLife;
attribute float aSize;

varying float vLife;
varying float vDepth;

void main() {
  vLife = aLife;

  vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
  vDepth = -mvPos.z;

  gl_Position = projectionMatrix * mvPos;

  // Size attenuation
  float sizeScale = 300.0 / -mvPos.z;
  gl_PointSize = aSize * sizeScale;
  gl_PointSize = clamp(gl_PointSize, 1.0, 64.0);
}
`;

// Particle point sprite fragment shader
export const particleFragmentShader = /* glsl */ `
uniform vec3 uColor;
uniform float uOpacity;

varying float vLife;
varying float vDepth;

void main() {
  // Soft circle
  vec2 center = gl_PointCoord - 0.5;
  float dist = length(center);
  if (dist > 0.5) discard;

  float alpha = smoothstep(0.5, 0.2, dist);
  alpha *= vLife; // Fade with lifetime
  alpha *= uOpacity;

  // Depth fog
  float fog = exp(-vDepth * 0.01);
  vec3 color = mix(vec3(0.7, 0.85, 0.95), uColor, fog);

  gl_FragColor = vec4(color, alpha);
}
`;
