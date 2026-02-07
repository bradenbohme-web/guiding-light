// BreachingLayer — R3F component for MLS-MPM particle physics and rendering
// Manages particle spawning from BAT, steps solver, renders as point sprites

import { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { MLSMPMSolver, MLSMPMConfig } from "@/lib/ocean/breach/MLSMPMSolver";
import { BreachAnalysis, BreachConfig } from "@/lib/ocean/breach/BreachAnalysis";
import {
  particleVertexShader,
  particleFragmentShader,
} from "@/lib/ocean/breach/breachShaders";

interface BreachingLayerProps {
  enabled?: boolean;
  heightfieldTexture?: THREE.Texture;
  onBreachFeedback?: (bft: THREE.DataTexture) => void;
  maxParticles?: number;
  gridSize?: number;
  breachConfig?: Partial<BreachConfig>;
  /** World position to test-spawn particles (e.g., boat bow) */
  spawnTestPosition?: THREE.Vector3;
  spawnTestEnabled?: boolean;
  boatSpeed?: number;
}

export function BreachingLayer({
  enabled = true,
  heightfieldTexture,
  onBreachFeedback,
  maxParticles = 50000,
  gridSize = 32,
  breachConfig,
  spawnTestPosition,
  spawnTestEnabled = false,
  boatSpeed = 0,
}: BreachingLayerProps) {
  const { gl } = useThree();
  const solverRef = useRef<MLSMPMSolver | null>(null);
  const breachRef = useRef<BreachAnalysis | null>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const spawnCooldown = useRef(0);

  // Initialize solvers
  useEffect(() => {
    if (!enabled) return;

    const solver = new MLSMPMSolver({
      maxParticles,
      gridSize,
      worldSize: 10,
      gravity: -9.81,
    });
    solverRef.current = solver;

    const breach = new BreachAnalysis(gl, breachConfig);
    breachRef.current = breach;

    return () => {
      solverRef.current = null;
      breach.dispose();
      breachRef.current = null;
    };
  }, [enabled, gl, maxParticles, gridSize, breachConfig]);

  // Geometry with pre-allocated buffers
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(maxParticles * 3);
    const lifes = new Float32Array(maxParticles);
    const sizes = new Float32Array(maxParticles);

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aLife", new THREE.BufferAttribute(lifes, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setDrawRange(0, 0);

    return geo;
  }, [maxParticles]);

  // Material
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: particleVertexShader,
        fragmentShader: particleFragmentShader,
        uniforms: {
          uColor: { value: new THREE.Color("#c8e8f0") },
          uOpacity: { value: 0.7 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  // Step simulation and update geometry each frame
  useFrame((_, delta) => {
    const solver = solverRef.current;
    const breach = breachRef.current;
    if (!solver || !enabled) return;

    // Update breach analysis from heightfield
    if (breach && heightfieldTexture) {
      breach.update(heightfieldTexture, delta);
      onBreachFeedback?.(breach.breachFeedbackTexture);
    }

    // Test spawning from boat position
    spawnCooldown.current -= delta;
    if (
      spawnTestEnabled &&
      spawnTestPosition &&
      boatSpeed > 2 &&
      spawnCooldown.current <= 0
    ) {
      const count = Math.floor(boatSpeed * 10);
      solver.spawn(
        spawnTestPosition.x,
        spawnTestPosition.y,
        spawnTestPosition.z,
        0, boatSpeed * 0.5, 0, // upward splash velocity
        count,
        0.3,   // spread
        1.5,   // lifetime
        0.5,   // mass
        0.04   // size
      );
      spawnCooldown.current = 0.05; // 20 spawns/sec max
    }

    // Step MLS-MPM
    solver.step(delta);

    // Deposit particle impacts into BFT
    if (breach) {
      for (let i = 0; i < solver.activeCount; i++) {
        // Only deposit when particle hits water surface
        if (solver.posY[i] < 0.1 && solver.velY[i] < -1) {
          breach.depositImpact(
            solver.posX[i],
            solver.posZ[i],
            solver.velX[i],
            solver.velY[i],
            solver.velZ[i],
            solver.mass[i]
          );
        }
      }
    }

    // Update geometry buffers
    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const lifeAttr = geometry.getAttribute("aLife") as THREE.BufferAttribute;
    const sizeAttr = geometry.getAttribute("aSize") as THREE.BufferAttribute;

    const pos = posAttr.array as Float32Array;
    const lifes = lifeAttr.array as Float32Array;
    const sizes = sizeAttr.array as Float32Array;

    for (let i = 0; i < solver.activeCount; i++) {
      pos[i * 3] = solver.posX[i];
      pos[i * 3 + 1] = solver.posY[i];
      pos[i * 3 + 2] = solver.posZ[i];
      lifes[i] = Math.max(0, solver.life[i]);
      sizes[i] = solver.size[i];
    }

    posAttr.needsUpdate = true;
    lifeAttr.needsUpdate = true;
    sizeAttr.needsUpdate = true;
    geometry.setDrawRange(0, solver.activeCount);
  });

  if (!enabled) return null;

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
