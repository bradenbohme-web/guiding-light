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
import { OceanSettings, DEFAULT_OCEAN_SETTINGS } from "@/lib/ocean/types";

interface OceanEnvironmentProps {
  enabled?: boolean;
  boatPosition?: THREE.Vector3;
  boatVelocity?: THREE.Vector2;
  boatSpeed?: number;
  qualityOverride?: QualityTier;
  oceanSettings?: OceanSettings;
}

export function OceanEnvironment({
  enabled = true,
  boatPosition,
  boatVelocity,
  boatSpeed = 0,
  qualityOverride,
  oceanSettings = DEFAULT_OCEAN_SETTINGS,
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

  const bowPosition = useMemo(() => {
    if (!boatPosition) return undefined;
    return new THREE.Vector3(boatPosition.x + 2.1, 0.1, boatPosition.z);
  }, [boatPosition]);

  // Compute sun position from settings
  const sunEl = oceanSettings.atmosphere.sun.elevation * Math.PI / 180;
  const sunAz = oceanSettings.atmosphere.sun.azimuth * Math.PI / 180;
  const sunDist = 100;
  const sunPosition: [number, number, number] = [
    sunDist * Math.cos(sunEl) * Math.sin(sunAz),
    sunDist * Math.sin(sunEl),
    sunDist * Math.cos(sunEl) * Math.cos(sunAz),
  ];

  if (!enabled) return null;

  const { atmosphere } = oceanSettings;

  return (
    <group>
      {/* Sky */}
      <Sky
        distance={450000}
        sunPosition={sunPosition}
        inclination={0.6}
        azimuth={0.25}
        rayleigh={atmosphere.sky.rayleigh}
        turbidity={atmosphere.sky.turbidity}
        mieCoefficient={atmosphere.sky.mieCoefficient}
        mieDirectionalG={atmosphere.sky.mieDirectionalG}
      />

      {/* Lighting */}
      <directionalLight
        position={sunPosition}
        intensity={atmosphere.sun.intensity}
        color={atmosphere.sun.color}
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

      {/* L1-L2: Ocean surface */}
      <OceanSurface
        settings={oceanSettings}
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
      {oceanSettings.underwater.causticsEnabled && <UnderwaterCaustics />}
      {oceanSettings.underwater.depthFogEnabled && <UnderwaterDepth />}

      {/* Atmosphere */}
      {atmosphere.godRays && <VolumetricLightRays />}

      {/* Birds */}
      <BirdFlock count={15} />

      {/* Fog */}
      {atmosphere.fog.enabled && (
        <fog attach="fog" args={[atmosphere.fog.color, atmosphere.fog.near, atmosphere.fog.far]} />
      )}
    </group>
  );
}
