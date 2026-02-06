// OceanEnvironment — thin orchestrator importing focused modules
import { Sky } from "@react-three/drei";
import { OceanSurface } from "./ocean/OceanSurface";
import { BirdFlock } from "./ocean/BirdFlock";
import {
  UnderwaterCaustics,
  UnderwaterDepth,
  VolumetricLightRays,
} from "./ocean/AtmosphericEffects";

interface OceanEnvironmentProps {
  enabled?: boolean;
  sunPosition?: [number, number, number];
}

export function OceanEnvironment({
  enabled = true,
  sunPosition = [100, 50, 50],
}: OceanEnvironmentProps) {
  if (!enabled) return null;

  return (
    <group>
      {/* Sky */}
      <Sky
        distance={450000}
        sunPosition={sunPosition}
        inclination={0.6}
        azimuth={0.25}
        rayleigh={0.5}
      />

      {/* Sunlight */}
      <directionalLight
        position={sunPosition}
        intensity={2.5}
        color="#fff5e0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={100}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <ambientLight intensity={0.6} color="#88aacc" />
      <hemisphereLight args={["#87ceeb", "#006644", 0.6]} />

      {/* Gerstner ocean surface with PBR shader */}
      <OceanSurface size={300} />

      {/* Underwater */}
      <UnderwaterCaustics />
      <UnderwaterDepth />

      {/* Atmosphere */}
      <VolumetricLightRays />

      {/* Birds */}
      <BirdFlock count={15} />

      {/* Fog */}
      <fog attach="fog" args={["#b0d4e8", 50, 250]} />
    </group>
  );
}
