// Traveler track system with mainsheet blocks and adjustable car position
import { useMemo } from "react";
import * as THREE from "three";

export type TravelerParams = {
  /** Track center position in world coordinates (hull space). */
  x: number;
  y: number;
  /** Half-span of the track in meters (port/stbd). */
  trackHalfSpan: number;
  /** Car position along the track, in meters (negative = starboard, positive = port). */
  carZ: number;
};

interface TravelerSystemProps {
  traveler: TravelerParams;
  showWireframe?: boolean;
  highlight?: boolean;
}

export function TravelerSystem({ traveler, showWireframe = false, highlight = false }: TravelerSystemProps) {
  const trackGeometry = useMemo(() => {
    return new THREE.CylinderGeometry(0.006, 0.006, traveler.trackHalfSpan * 2, 10);
  }, [traveler.trackHalfSpan]);

  const carGeometry = useMemo(() => new THREE.BoxGeometry(0.06, 0.03, 0.05), []);

  const emissive = highlight ? new THREE.Color("hsl(45, 93%, 58%)") : new THREE.Color(0x000000);

  return (
    <group position={[traveler.x, traveler.y, 0]}>
      {/* Track */}
      <mesh geometry={trackGeometry} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial
          color="#2b2b2b"
          roughness={0.35}
          metalness={0.65}
          wireframe={showWireframe}
          emissive={emissive}
          emissiveIntensity={highlight ? 0.8 : 0}
        />
      </mesh>

      {/* Car */}
      <group position={[0, 0, THREE.MathUtils.clamp(traveler.carZ, -traveler.trackHalfSpan, traveler.trackHalfSpan)]}>
        <mesh geometry={carGeometry}>
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.45}
            metalness={0.4}
            wireframe={showWireframe}
            emissive={emissive}
            emissiveIntensity={highlight ? 0.9 : 0}
          />
        </mesh>

        {/* Traveler block */}
        <mesh position={[0.02, -0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.02, 0.004, 8, 16]} />
          <meshStandardMaterial color="#444" roughness={0.3} metalness={0.6} />
        </mesh>
      </group>
    </group>
  );
}
