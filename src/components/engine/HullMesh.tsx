import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { HullParams } from "@/lib/parametric/types";
import { generateHullMesh, generateDeckMesh } from "@/lib/parametric/meshGenerator";

interface HullMeshProps {
  params: HullParams;
  resolution: "low" | "medium" | "high";
  showWireframe: boolean;
}

const resolutionMap = {
  low: { Nu: 32, Nv: 16 },
  medium: { Nu: 64, Nv: 32 },
  high: { Nu: 128, Nv: 64 },
};

export function HullMesh({ params, resolution, showWireframe }: HullMeshProps) {
  const hullRef = useRef<THREE.Mesh>(null);
  const deckRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);
  
  const { Nu, Nv } = resolutionMap[resolution];
  
  // Generate hull geometry
  const { hullGeometry, deckGeometry } = useMemo(() => {
    const hull = generateHullMesh(params, Nu, Nv);
    const deck = generateDeckMesh(params, Nu, Math.floor(Nv / 2));
    return {
      hullGeometry: hull.geometry,
      deckGeometry: deck.geometry,
    };
  }, [params, Nu, Nv]);
  
  // Wireframe geometry
  const wireframeGeometry = useMemo(() => {
    if (!showWireframe) return null;
    return new THREE.WireframeGeometry(hullGeometry);
  }, [hullGeometry, showWireframe]);
  
  // Cleanup geometries
  useEffect(() => {
    return () => {
      hullGeometry.dispose();
      deckGeometry.dispose();
    };
  }, [hullGeometry, deckGeometry]);
  
  return (
    <group>
      {/* Hull surface */}
      <mesh ref={hullRef} geometry={hullGeometry}>
        <meshStandardMaterial
          color="hsl(199 89% 48%)"
          metalness={0.3}
          roughness={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Deck surface */}
      <mesh ref={deckRef} geometry={deckGeometry}>
        <meshStandardMaterial
          color="hsl(0 0% 88%)"
          metalness={0.1}
          roughness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Wireframe overlay */}
      {showWireframe && wireframeGeometry && (
        <lineSegments ref={wireframeRef} geometry={wireframeGeometry}>
          <lineBasicMaterial color="#ffffff" opacity={0.3} transparent />
        </lineSegments>
      )}
    </group>
  );
}
