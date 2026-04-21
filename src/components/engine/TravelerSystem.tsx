// Traveler system — Laser uses a ROPE HORSE across the transom
import { useMemo } from "react";
import * as THREE from "three";

export type TravelerParams = {
  x: number;
  y: number;
  trackHalfSpan: number;
  carZ: number;
};

interface TravelerSystemProps {
  traveler: TravelerParams;
  showWireframe?: boolean;
  highlight?: boolean;
  onClick?: () => void;
}

export function TravelerSystem({ traveler, showWireframe = false, highlight = false, onClick }: TravelerSystemProps) {
  const ropeGeometry = useMemo(() => {
    const halfSpan = traveler.trackHalfSpan;
    const points: THREE.Vector3[] = [];
    const segments = 24;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const z = -halfSpan + t * 2 * halfSpan;
      const sagAmount = 0.008 * Math.sin(t * Math.PI);
      points.push(new THREE.Vector3(0, -sagAmount, z));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, segments, 0.004, 8, false);
  }, [traveler.trackHalfSpan]);

  // Invisible thick hitbox for easier rope clicking
  const hitGeometry = useMemo(() => {
    const halfSpan = traveler.trackHalfSpan;
    const points = [new THREE.Vector3(0, 0, -halfSpan), new THREE.Vector3(0, 0, halfSpan)];
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 4, 0.025, 6, false);
  }, [traveler.trackHalfSpan]);

  const emissive = highlight ? new THREE.Color("hsl(45, 93%, 58%)") : new THREE.Color(0x000000);

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    onClick?.();
  };

  return (
    <group position={[traveler.x, traveler.y, 0]}>
      {/* Invisible hit area for the whole traveler track */}
      <mesh geometry={hitGeometry} onPointerDown={handlePointerDown}>
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <mesh geometry={ropeGeometry} onPointerDown={handlePointerDown}>
        <meshStandardMaterial color="#e8e0d0" roughness={0.75} metalness={0.05} wireframe={showWireframe} emissive={emissive} emissiveIntensity={highlight ? 0.6 : 0} />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh key={side} position={[0, 0, side * traveler.trackHalfSpan]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.01, 0.003, 6, 12]} />
          <meshStandardMaterial color="#555" roughness={0.3} metalness={0.7} />
        </mesh>
      ))}
      <group position={[0, -0.01, traveler.carZ]} onPointerDown={handlePointerDown}>
        {/* Larger invisible car hitbox */}
        <mesh>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
        <mesh>
          <boxGeometry args={[0.04, 0.035, 0.03]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.35} wireframe={showWireframe} emissive={emissive} emissiveIntensity={highlight ? 0.9 : 0} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.015, 0.003, 6, 16]} />
          <meshStandardMaterial color="#666" roughness={0.3} metalness={0.5} />
        </mesh>
        <mesh position={[0, -0.025, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.008, 0.002, 6, 12]} />
          <meshStandardMaterial color="#888" roughness={0.3} metalness={0.6} />
        </mesh>
      </group>
    </group>
  );
}
