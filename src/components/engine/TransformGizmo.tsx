import { useRef, useEffect } from "react";
import { TransformControls } from "@react-three/drei";
import * as THREE from "three";

interface TransformGizmoProps {
  position: [number, number, number];
  onDrag: (x: number, y: number, z: number) => void;
  visible: boolean;
}

export function TransformGizmo({ position, onDrag, visible }: TransformGizmoProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const controlsRef = useRef<any>(null);

  // Sync position from props
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.position.set(...position);
    }
  }, [position]);

  if (!visible) return null;

  return (
    <>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshBasicMaterial color="#facc15" transparent opacity={0.7} depthTest={false} />
      </mesh>
      <TransformControls
        ref={controlsRef}
        object={meshRef.current ?? undefined}
        mode="translate"
        size={0.6}
        onObjectChange={() => {
          if (meshRef.current) {
            const p = meshRef.current.position;
            onDrag(
              Math.round(p.x * 1000) / 1000,
              Math.round(p.y * 1000) / 1000,
              Math.round(p.z * 1000) / 1000
            );
          }
        }}
      />
    </>
  );
}
