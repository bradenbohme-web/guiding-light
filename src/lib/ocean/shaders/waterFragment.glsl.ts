// PBR water fragment shader with configurable foam, SSS, and material properties

export const waterFragmentShader = /* glsl */ `
uniform float uTime;
uniform vec3 uSunDirection;
uniform float uSunIntensity;
uniform vec3 uSunColor;

// Water colors
uniform vec3 uDeepColor;
uniform vec3 uShallowColor;
uniform vec3 uFoamColor;

// Absorption (Beer's law)
uniform vec3 uAbsorption;
uniform float uAbsorptionDepth;

// SSS
uniform float uSSSEnabled;
uniform float uSSSIntensity;
uniform float uSSSPower;
uniform vec3 uSSSColor;

// Foam
uniform float uFoamEnabled;
uniform float uFoamThreshold;
uniform float uFoamCoverage;
uniform float uWhitecapIntensity;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vNormal;
varying float vWaveHeight;
varying float vSteepness;
varying vec3 vViewPosition;
varying float vHeightfieldFoam;

float fresnelSchlick(float cosTheta, float f0) {
  return f0 + (1.0 - f0) * pow(clamp(1.0 - cosTheta, 0.0, 1.0), 5.0);
}

vec3 beerAbsorption(float depth, vec3 absorptionCoeff) {
  return exp(-absorptionCoeff * max(depth, 0.0));
}

// Procedural foam texture
float foamNoise(vec2 p, float t) {
  vec2 p1 = p * 8.0 + vec2(t * 0.3, t * 0.2);
  vec2 p2 = p * 12.0 - vec2(t * 0.4, t * 0.15);
  float n1 = fract(sin(dot(floor(p1), vec2(127.1, 311.7))) * 43758.5453);
  float n2 = fract(sin(dot(floor(p2), vec2(269.5, 183.3))) * 43758.5453);
  return (n1 + n2) * 0.5;
}

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(cameraPosition - vWorldPosition);
  vec3 L = normalize(uSunDirection);

  float NdotV = max(dot(N, V), 0.001);
  float NdotL = max(dot(N, L), 0.0);

  // Fresnel
  float f0 = 0.02;
  float fresnel = fresnelSchlick(NdotV, f0);

  // Beer's law
  float simulatedDepth = (1.0 - smoothstep(-0.5, 0.8, vWaveHeight)) * uAbsorptionDepth;
  vec3 absorption = beerAbsorption(simulatedDepth, uAbsorption);
  vec3 waterColor = mix(uDeepColor, uShallowColor, absorption);

  // SSS
  vec3 sssContribution = vec3(0.0);
  if (uSSSEnabled > 0.5) {
    vec3 H_sss = normalize(L + N * 0.6);
    float sss = pow(clamp(dot(V, -H_sss), 0.0, 1.0), uSSSPower) * uSSSIntensity;
    sss *= smoothstep(0.0, 0.4, vWaveHeight);
    sssContribution = uSSSColor * sss;
  }

  // Specular (GGX-like)
  vec3 H = normalize(L + V);
  float NdotH = max(dot(N, H), 0.0);
  float specTight = pow(NdotH, 512.0) * uSunIntensity * 2.0;
  float specBroad = pow(NdotH, 64.0) * uSunIntensity * 0.3;
  vec3 specular = uSunColor * (specTight + specBroad);

  // Sky reflection
  vec3 R = reflect(-V, N);
  float skyGradient = smoothstep(-0.1, 0.5, R.y);
  vec3 skyColor = mix(vec3(0.5, 0.65, 0.8), vec3(0.3, 0.5, 0.9), skyGradient);
  vec3 reflection = skyColor;

  // Foam
  float totalFoam = 0.0;
  if (uFoamEnabled > 0.5) {
    float foamSoft = smoothstep(uFoamThreshold - 0.1, uFoamThreshold + 0.15, vSteepness);
    float crestFoam = smoothstep(0.15, 0.35, vWaveHeight) * 0.3;
    float sweFoam = vHeightfieldFoam;
    
    // Whitecap noise pattern
    float fNoise = foamNoise(vWorldPosition.xz * 0.1, uTime);
    float whitecap = foamSoft * fNoise * uWhitecapIntensity;
    
    totalFoam = clamp((foamSoft + crestFoam + sweFoam + whitecap) * uFoamCoverage * 2.0, 0.0, 1.0);
  }

  float foamRoughness = totalFoam * 0.8;

  // Caustics
  float c1 = sin(vWorldPosition.x * 3.0 + uTime * 2.0) * sin(vWorldPosition.z * 3.0 + uTime * 1.5);
  float c2 = sin(vWorldPosition.x * 5.0 - uTime * 1.5) * sin(vWorldPosition.z * 4.0 + uTime * 2.0);
  float caustics = max(c1 + c2, 0.0) * 0.03;

  // Compose
  vec3 color = waterColor;
  color += sssContribution;
  color += caustics * uShallowColor;
  color = mix(color, reflection, fresnel * (1.0 - foamRoughness));
  color += specular * (1.0 - foamRoughness * 0.7);
  color = mix(color, uFoamColor, totalFoam * 0.7);

  // Reinhard
  color = color / (color + vec3(1.0));

  gl_FragColor = vec4(color, mix(0.92, 1.0, totalFoam));
}
`;
