// OceanEnvironment — orchestrator for all ocean simulation layers
// L1-L2: Gerstner surface, L3: SWE heightfield, L4-L5: MLS-MPM breach

import { useState, useCallback, useMemo } from "react";
import { Sky } from "@react-three/drei";
import * as THREE from "three";
import { OceanSurface } from "./ocean/OceanSurface";
import { BirdFlock } from "./ocean/BirdFlock";
import {
  UnderwaterCaustics,
  UnderwaterDepth,
  VolumetricLightRays,
} from "./ocean/AtmosphericEffects";
import { HeightfieldLayer } from "./ocean/HeightfieldLayer";
import { BreachingLayer } from "./ocean/BreachingLayer";
import {
  PerformanceManager,
  QualityTier,
  LODConfig,
  LOD_TIERS,
} from "./ocean/PerformanceManager";

interface OceanEnvironmentProps {
  enabled?: boolean;
  sunPosition?: [number, number, number];
  boatPosition?: THREE.Vector3;
  boatVelocity?: THREE.Vector2;
  boatSpeed?: number;
  qualityOverride?: QualityTier;
}

export function OceanEnvironment({
  enabled = true,
  sunPosition = [100, 50, 50],
  boatPosition,
  boatVelocity,
  boatSpeed = 0,
  qualityOverride,
}: OceanEnvironmentProps) {
  const [heightfieldTex, setHeightfieldTex] = useState<THREE.Texture | null>(null);
  const [heightfieldWorldSize, setHeightfieldWorldSize] = useState(100);
  const [lodConfig, setLodConfig] = useState<LODConfig>(
    LOD_TIERS[qualityOverride ?? "high"]
  );

  const handleHeightfield = useCallback(
    (texture: THREE.Texture, worldSize: number) => {
      setHeightfieldTex(texture);
      setHeightfieldWorldSize(worldSize);
    },
    []
  );

  const handleQualityChange = useCallback(
    (_tier: QualityTier, config: LODConfig) => {
      setLodConfig(config);
    },
    []
  );

  // Bow position for breach particle spawning
  const bowPosition = useMemo(() => {
    if (!boatPosition) return undefined;
    return new THREE.Vector3(
      boatPosition.x + 2.1, // Bow offset
      0.1,
      boatPosition.z
    );
  }, [boatPosition]);

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

      {/* Lighting */}
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

      {/* L1-L2: Gerstner ocean surface with PBR shader + heightfield overlay */}
      <OceanSurface
        size={300}
        heightfieldTexture={heightfieldTex}
        heightfieldWorldSize={heightfieldWorldSize}
      />

      {/* L3: SWE heightfield solver */}
      <HeightfieldLayer
        enabled={lodConfig.gridResolution > 0}
        boatPosition={boatPosition}
        boatVelocity={boatVelocity}
        config={{ resolution: lodConfig.gridResolution }}
        onHeightfield={handleHeightfield}
      />

      {/* L4-L5: MLS-MPM breach particles */}
      <BreachingLayer
        enabled={lodConfig.breachEnabled}
        heightfieldTexture={heightfieldTex ?? undefined}
        maxParticles={lodConfig.maxParticles}
        spawnTestPosition={bowPosition}
        spawnTestEnabled={boatSpeed > 2}
        boatSpeed={boatSpeed}
      />

      {/* Adaptive quality manager */}
      <PerformanceManager
        initialTier={qualityOverride}
        onQualityChange={handleQualityChange}
      />

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
