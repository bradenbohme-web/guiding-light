// Volumetric light rays, underwater caustics, and depth plane — extracted from OceanEnvironment
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ---- Underwater Caustics ----
const causticsVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const causticsFrag = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;

  float caustic(vec2 uv, float time) {
    vec2 p = mod(uv * 6.28318530718, 6.28318530718) - 250.0;
    float t = time * 0.5;
    vec2 i = vec2(p);
    float c = 1.0;
    float inten = 0.005;
    for (int n = 0; n < 5; n++) {
      float t2 = t * (1.0 - (3.5 / float(n + 1)));
      i = p + vec2(cos(t2 - i.x) + sin(t2 + i.y), sin(t2 - i.y) + cos(t2 + i.x));
      c += 1.0 / length(vec2(p.x / (sin(i.x + t) / inten), p.y / (cos(i.y + t) / inten)));
    }
    c /= 5.0;
    c = 1.17 - pow(c, 1.4);
    return pow(abs(c), 8.0);
  }

  void main() {
    float c = caustic(vUv, uTime);
    vec3 color = uColor * c * 2.0;
    gl_FragColor = vec4(color, c * 0.5);
  }
`;

export function UnderwaterCaustics() {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#4488aa") },
    }),
    []
  );

  useFrame((s) => {
    uniforms.uTime.value = s.clock.elapsedTime;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <planeGeometry args={[100, 100, 1, 1]} />
      <shaderMaterial
        vertexShader={causticsVert}
        fragmentShader={causticsFrag}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// ---- Volumetric Light Rays ----
const rayVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const rayFrag = /* glsl */ `
  uniform float uTime;
  uniform float uIntensity;
  varying vec2 vUv;

  void main() {
    float ray = sin(vUv.x * 30.0 + uTime * 0.5) * 0.5 + 0.5;
    ray *= sin(vUv.x * 17.0 - uTime * 0.3) * 0.5 + 0.5;
    ray *= pow(1.0 - vUv.y, 2.0);
    ray *= smoothstep(0.0, 0.3, vUv.x) * smoothstep(1.0, 0.7, vUv.x);
    vec3 color = vec3(1.0, 0.95, 0.8) * ray * uIntensity;
    gl_FragColor = vec4(color, ray * 0.2);
  }
`;

export function VolumetricLightRays() {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: 0.15 },
    }),
    []
  );

  useFrame((s) => {
    uniforms.uTime.value = s.clock.elapsedTime;
  });

  return (
    <mesh position={[20, 15, -10]} rotation={[0.3, -0.5, 0.1]}>
      <planeGeometry args={[40, 30]} />
      <shaderMaterial
        vertexShader={rayVert}
        fragmentShader={rayFrag}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ---- Underwater depth plane ----
export function UnderwaterDepth() {
  return (
    <mesh position={[0, -30, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[500, 500]} />
      <meshBasicMaterial color="#001122" transparent opacity={0.95} />
    </mesh>
  );
}
