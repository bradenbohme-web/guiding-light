// PBR water fragment shader
// Schlick fresnel · Beer's law absorption · improved SSS · steepness-based foam

export const waterFragmentShader = /* glsl */ `
uniform float uTime;
uniform vec3 uSunDirection;
uniform float uSunIntensity;
uniform vec3 uSunColor;

// Water colors
uniform vec3 uDeepColor;       // deep absorption color
uniform vec3 uShallowColor;    // shallow / scattering color
uniform vec3 uFoamColor;

// Absorption coefficients (Beer's law)
uniform vec3 uAbsorption;      // per-channel absorption rates
uniform float uAbsorptionDepth; // reference depth scale

// SSS
uniform float uSSSIntensity;
uniform float uSSSPower;
uniform vec3 uSSSColor;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vNormal;
varying float vWaveHeight;
varying float vSteepness;
varying vec3 vViewPosition;

// ---- Schlick Fresnel ----
float fresnelSchlick(float cosTheta, float f0) {
  return f0 + (1.0 - f0) * pow(clamp(1.0 - cosTheta, 0.0, 1.0), 5.0);
}

// ---- Beer's law absorption ----
vec3 beerAbsorption(float depth, vec3 absorptionCoeff) {
  return exp(-absorptionCoeff * max(depth, 0.0));
}

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(cameraPosition - vWorldPosition);
  vec3 L = normalize(uSunDirection);

  float NdotV = max(dot(N, V), 0.001);
  float NdotL = max(dot(N, L), 0.0);

  // ---- Fresnel ----
  float f0 = 0.02;  // water IOR ~1.333
  float fresnel = fresnelSchlick(NdotV, f0);

  // ---- Beer's law water color ----
  // Simulate depth: higher wave = shallower, lower = deeper
  float simulatedDepth = (1.0 - smoothstep(-0.5, 0.8, vWaveHeight)) * uAbsorptionDepth;
  vec3 absorption = beerAbsorption(simulatedDepth, uAbsorption);
  vec3 waterColor = mix(uDeepColor, uShallowColor, absorption);

  // ---- Subsurface scattering ----
  // Light passing through wave crests
  vec3 H_sss = normalize(L + N * 0.6);
  float sss = pow(clamp(dot(V, -H_sss), 0.0, 1.0), uSSSPower) * uSSSIntensity;
  // SSS stronger on thin wave crests (high wave height)
  sss *= smoothstep(0.0, 0.4, vWaveHeight);
  vec3 sssContribution = uSSSColor * sss;

  // ---- Sun specular (GGX-like) ----
  vec3 H = normalize(L + V);
  float NdotH = max(dot(N, H), 0.0);
  // Dual-lobe specular: tight sun disk + broader glint
  float specTight = pow(NdotH, 512.0) * uSunIntensity * 2.0;
  float specBroad = pow(NdotH, 64.0) * uSunIntensity * 0.3;
  vec3 specular = uSunColor * (specTight + specBroad);

  // ---- Sky reflection ----
  vec3 R = reflect(-V, N);
  // Approximate sky gradient reflection
  float skyGradient = smoothstep(-0.1, 0.5, R.y);
  vec3 skyColor = mix(vec3(0.5, 0.65, 0.8), vec3(0.3, 0.5, 0.9), skyGradient);
  vec3 reflection = skyColor;

  // ---- Physics-based foam from wave steepness ----
  // Foam appears where waves are steep (approaching breaking)
  float foamThreshold = 0.35;
  float foamSoft = smoothstep(foamThreshold - 0.1, foamThreshold + 0.15, vSteepness);
  // Also foam on wave crests
  float crestFoam = smoothstep(0.2, 0.4, vWaveHeight) * 0.2;
  float totalFoam = clamp(foamSoft + crestFoam, 0.0, 1.0);

  // Foam has rough look — reduce specular, increase diffuse
  float foamRoughness = totalFoam * 0.8;

  // ---- Caustics (simplified) ----
  float c1 = sin(vWorldPosition.x * 3.0 + uTime * 2.0) * sin(vWorldPosition.z * 3.0 + uTime * 1.5);
  float c2 = sin(vWorldPosition.x * 5.0 - uTime * 1.5) * sin(vWorldPosition.z * 4.0 + uTime * 2.0);
  float caustics = max(c1 + c2, 0.0) * 0.03;

  // ---- Compose ----
  vec3 color = waterColor;
  color += sssContribution;
  color += caustics * uShallowColor;

  // Fresnel blend: reflection vs water body
  color = mix(color, reflection, fresnel * (1.0 - foamRoughness));

  // Add specular on top (reduced by foam)
  color += specular * (1.0 - foamRoughness * 0.7);

  // Foam overlay
  color = mix(color, uFoamColor, totalFoam * 0.7);

  // Slight HDR tone mapping (Reinhard)
  color = color / (color + vec3(1.0));

  // Gamma (Three.js linearizes, but for safety)
  // color = pow(color, vec3(1.0 / 2.2));

  gl_FragColor = vec4(color, mix(0.92, 1.0, totalFoam));
}
`;
