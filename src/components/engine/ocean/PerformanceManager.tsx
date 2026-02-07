// PerformanceManager — Adaptive quality controller for ocean simulation
// Tracks frame times and adjusts LOD tier, particle budgets, grid resolution

import { useRef, useCallback, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { getGPUCapabilities } from "@/lib/ocean/gpuDetect";

export type QualityTier = "ultra" | "high" | "medium" | "low";

export interface LODConfig {
  gridResolution: number;
  maxParticles: number;
  breachEnabled: boolean;
  causticsEnabled: boolean;
  foamResolution: number;
}

const LOD_TIERS: Record<QualityTier, LODConfig> = {
  ultra: {
    gridResolution: 512,
    maxParticles: 300000,
    breachEnabled: true,
    causticsEnabled: true,
    foamResolution: 1024,
  },
  high: {
    gridResolution: 256,
    maxParticles: 100000,
    breachEnabled: true,
    causticsEnabled: true,
    foamResolution: 512,
  },
  medium: {
    gridResolution: 128,
    maxParticles: 40000,
    breachEnabled: true,
    causticsEnabled: false,
    foamResolution: 256,
  },
  low: {
    gridResolution: 64,
    maxParticles: 0,
    breachEnabled: false,
    causticsEnabled: false,
    foamResolution: 0,
  },
};

interface PerformanceManagerProps {
  targetFPS?: number;
  onQualityChange?: (tier: QualityTier, config: LODConfig) => void;
  initialTier?: QualityTier;
}

export function PerformanceManager({
  targetFPS = 60,
  onQualityChange,
  initialTier,
}: PerformanceManagerProps) {
  const frameTimes = useRef<number[]>([]);
  const currentTierRef = useRef<QualityTier>(initialTier ?? "high");
  const stabilityCounter = useRef(0);
  const [, setForceUpdate] = useState(0);

  // Auto-detect initial tier from GPU capabilities
  useEffect(() => {
    if (initialTier) return;

    const caps = getGPUCapabilities();
    if (!caps) return;

    let tier: QualityTier;
    if (caps.backend === "webgpu" && caps.estimatedParticleBudget >= 200000) {
      tier = "ultra";
    } else if (caps.backend === "webgpu" || caps.estimatedParticleBudget >= 50000) {
      tier = "high";
    } else if (caps.backend === "webgl2") {
      tier = "medium";
    } else {
      tier = "low";
    }

    currentTierRef.current = tier;
    onQualityChange?.(tier, LOD_TIERS[tier]);
    setForceUpdate((v) => v + 1);
  }, [initialTier, onQualityChange]);

  const adjustQuality = useCallback(
    (avgFrameTime: number) => {
      const targetFrameTime = 1000 / targetFPS;
      const tiers: QualityTier[] = ["ultra", "high", "medium", "low"];
      const currentIdx = tiers.indexOf(currentTierRef.current);

      if (avgFrameTime > targetFrameTime * 1.3) {
        // Too slow: reduce quality
        stabilityCounter.current++;
        if (stabilityCounter.current >= 10 && currentIdx < tiers.length - 1) {
          const newTier = tiers[currentIdx + 1];
          currentTierRef.current = newTier;
          onQualityChange?.(newTier, LOD_TIERS[newTier]);
          stabilityCounter.current = 0;
        }
      } else if (avgFrameTime < targetFrameTime * 0.7) {
        // Headroom: increase quality
        stabilityCounter.current++;
        if (stabilityCounter.current >= 30 && currentIdx > 0) {
          const newTier = tiers[currentIdx - 1];
          currentTierRef.current = newTier;
          onQualityChange?.(newTier, LOD_TIERS[newTier]);
          stabilityCounter.current = 0;
        }
      } else {
        stabilityCounter.current = 0;
      }
    },
    [targetFPS, onQualityChange]
  );

  useFrame((_, delta) => {
    const frameTimeMs = delta * 1000;
    frameTimes.current.push(frameTimeMs);

    // Keep last 60 samples
    if (frameTimes.current.length > 60) {
      frameTimes.current.shift();
    }

    // Evaluate every 30 frames
    if (frameTimes.current.length >= 30 && frameTimes.current.length % 30 === 0) {
      const avg =
        frameTimes.current.reduce((a, b) => a + b, 0) / frameTimes.current.length;
      adjustQuality(avg);
    }
  });

  return null; // Pure logic component
}

export { LOD_TIERS };
