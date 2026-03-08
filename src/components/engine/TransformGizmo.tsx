import { useEffect, useRef } from "react";
import { TransformControls } from "@react-three/drei";
import * as THREE from "three";

interface TransformGizmoProps {
  position: [number, number, number];
  onDrag: (x: number, y: number, z: number) => void;
  visible: boolean;
  onDraggingChange?: (dragging: boolean) => void;
}

export function TransformGizmo({ position, onDrag, visible, onDraggingChange }: TransformGizmoProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;
    meshRef.current.position.set(position[0], position[1], position[2]);
  }, [position]);

  if (!visible) return null;

  return (
    <TransformControls
      mode="translate"
      size={0.7}
      onObjectChange={() => {
        if (!meshRef.current) return;
        const p = meshRef.current.position;
        onDrag(
          Math.round(p.x * 1000) / 1000,
          Math.round(p.y * 1000) / 1000,
          Math.round(p.z * 1000) / 1000
        );
      }}
      onMouseDown={() => onDraggingChange?.(true)}
      onMouseUp={() => onDraggingChange?.(false)}
    >
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.03, 10, 10]} />
        <meshBasicMaterial color="hsl(46, 96%, 53%)" transparent opacity={0.75} depthTest={false} />
      </mesh>
    </TransformControls>
  );
}
