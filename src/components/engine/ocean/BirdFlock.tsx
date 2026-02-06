// Procedural bird flock — extracted from OceanEnvironment
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BirdProps {
  startPosition: THREE.Vector3;
  speed: number;
  radius: number;
  offset: number;
}

function Bird({ startPosition, speed, radius, offset }: BirdProps) {
  const groupRef = useRef<THREE.Group>(null);
  const wingLeftRef = useRef<THREE.Mesh>(null);
  const wingRightRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime * speed + offset;

    groupRef.current.position.x = startPosition.x + Math.sin(t * 0.5) * radius;
    groupRef.current.position.z = startPosition.z + Math.cos(t * 0.5) * radius;
    groupRef.current.position.y =
      startPosition.y + Math.sin(t * 2) * 0.5 + Math.sin(t * 0.3) * 2;

    groupRef.current.rotation.y = Math.atan2(
      Math.cos(t * 0.5) * radius * 0.5,
      -Math.sin(t * 0.5) * radius * 0.5
    );

    const wingAngle = Math.sin(t * 8) * 0.4;
    if (wingLeftRef.current) wingLeftRef.current.rotation.z = -wingAngle - 0.2;
    if (wingRightRef.current) wingRightRef.current.rotation.z = wingAngle + 0.2;
  });

  return (
    <group ref={groupRef} position={startPosition}>
      <mesh>
        <capsuleGeometry args={[0.03, 0.08, 4, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.05, 0.01, 0]}>
        <sphereGeometry args={[0.02, 8, 6]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.08, 0.01, 0]} rotation={[0, 0, -0.3]}>
        <coneGeometry args={[0.008, 0.03, 4]} />
        <meshStandardMaterial color="#ff8800" />
      </mesh>
      <mesh ref={wingLeftRef} position={[0, 0, 0.04]}>
        <boxGeometry args={[0.06, 0.005, 0.12]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      <mesh ref={wingRightRef} position={[0, 0, -0.04]}>
        <boxGeometry args={[0.06, 0.005, 0.12]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      <mesh position={[-0.06, 0, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.04, 0.003, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}

export function BirdFlock({ count = 12 }: { count?: number }) {
  const birds = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        startPosition: new THREE.Vector3(
          (Math.random() - 0.5) * 30,
          15 + Math.random() * 10,
          (Math.random() - 0.5) * 30
        ),
        speed: 0.3 + Math.random() * 0.3,
        radius: 15 + Math.random() * 20,
        offset: Math.random() * Math.PI * 2,
      })),
    [count]
  );

  return (
    <group>
      {birds.map((props, i) => (
        <Bird key={i} {...props} />
      ))}
    </group>
  );
}
