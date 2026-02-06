// Gerstner-wave ocean mesh with PBR water shader
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { waterVertexShader } from "@/lib/ocean/shaders/waterVertex.glsl";
import { waterFragmentShader } from "@/lib/ocean/shaders/waterFragment.glsl";

interface OceanSurfaceProps {
  size?: number;
  sunDirection?: THREE.Vector3;
}

export function OceanSurface({ size = 200, sunDirection }: OceanSurfaceProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWaveHeight: { value: 0.3 },

      // PBR colors
      uDeepColor: { value: new THREE.Color("#001a33") },
      uShallowColor: { value: new THREE.Color("#0077aa") },
      uFoamColor: { value: new THREE.Color("#e8e8e0") },

      // Sun
      uSunDirection: {
        value: sunDirection
          ? sunDirection.clone().normalize()
          : new THREE.Vector3(0.5, 0.7, 0.5).normalize(),
      },
      uSunIntensity: { value: 1.8 },
      uSunColor: { value: new THREE.Color("#fff5e0") },

      // Beer's law absorption
      uAbsorption: { value: new THREE.Vector3(0.4, 0.04, 0.02) }, // red absorbed most
      uAbsorptionDepth: { value: 3.0 },

      // SSS
      uSSSIntensity: { value: 0.35 },
      uSSSPower: { value: 3.0 },
      uSSSColor: { value: new THREE.Color("#1ab890") },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.35, 0]}
      receiveShadow
    >
      <planeGeometry args={[size, size, 256, 256]} />
      <shaderMaterial
        vertexShader={waterVertexShader}
        fragmentShader={waterFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
