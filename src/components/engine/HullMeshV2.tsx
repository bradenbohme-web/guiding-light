// HullMeshV2 - Renders unified hull mesh (no separate bow cap)
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { HullV2Params } from "@/lib/parametric/v2/types";
import { generateCompleteHullV2 } from "@/lib/parametric/v2/meshGenerator";

interface HullMeshV2Props {
  params: HullV2Params;
  resolution: "low" | "medium" | "high";
  showWireframe: boolean;
  highlightTarget: string | null;
}

// Material colors
const HULL_COLOR = "hsl(199, 89%, 48%)";
const DECK_COLOR = "hsl(0, 0%, 92%)";
const LIP_COLOR = "hsl(199, 85%, 42%)";
const TRANSOM_COLOR = "hsl(199, 89%, 48%)";

const HIGHLIGHT_COLOR = new THREE.Color("hsl(45, 93%, 58%)");
const NO_EMISSIVE = new THREE.Color(0x000000);

export function HullMeshV2({ 
  params, 
  resolution, 
  showWireframe,
  highlightTarget 
}: HullMeshV2Props) {
  const bottomHullRef = useRef<THREE.Mesh>(null);
  const deckSheetRef = useRef<THREE.Mesh>(null);
  const lipElbowRef = useRef<THREE.Mesh>(null);
  const transomRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);

  // Generate all hull geometries
  const hullParts = useMemo(() => {
    return generateCompleteHullV2(params, resolution);
  }, [params, resolution]);

  // Wireframe geometry
  const wireframeGeometry = useMemo(() => {
    if (!showWireframe) return null;
    return new THREE.WireframeGeometry(hullParts.bottomHull.geometry);
  }, [hullParts.bottomHull.geometry, showWireframe]);

  // Cleanup geometries on unmount
  useEffect(() => {
    return () => {
      hullParts.bottomHull.geometry.dispose();
      hullParts.deckSheet.geometry.dispose();
      hullParts.lipElbow.geometry.dispose();
      hullParts.transom.geometry.dispose();
    };
  }, [hullParts]);

  // Helper to determine if a part is highlighted
  const isHighlighted = (partId: string) => highlightTarget === partId;

  // Get emissive settings for a part
  const getEmissive = (partId: string) => ({
    emissive: isHighlighted(partId) ? HIGHLIGHT_COLOR : NO_EMISSIVE,
    emissiveIntensity: isHighlighted(partId) ? 0.4 : 0,
  });

  return (
    <group>
      {/* Bottom Hull - unified surface including bow convergence */}
      <mesh ref={bottomHullRef} geometry={hullParts.bottomHull.geometry}>
        <meshStandardMaterial
          color={HULL_COLOR}
          metalness={0.25}
          roughness={0.55}
          side={THREE.DoubleSide}
          {...getEmissive("bottom_hull")}
        />
      </mesh>

      {/* Deck Sheet */}
      <mesh ref={deckSheetRef} geometry={hullParts.deckSheet.geometry}>
        <meshStandardMaterial
          color={DECK_COLOR}
          metalness={0.1}
          roughness={0.75}
          side={THREE.DoubleSide}
          {...getEmissive("deck_sheet")}
        />
      </mesh>

      {/* Lip/Elbow */}
      <mesh ref={lipElbowRef} geometry={hullParts.lipElbow.geometry}>
        <meshStandardMaterial
          color={LIP_COLOR}
          metalness={0.3}
          roughness={0.5}
          side={THREE.DoubleSide}
          {...getEmissive("lip_elbow")}
        />
      </mesh>

      {/* Transom */}
      <mesh ref={transomRef} geometry={hullParts.transom.geometry}>
        <meshStandardMaterial
          color={TRANSOM_COLOR}
          metalness={0.25}
          roughness={0.55}
          side={THREE.DoubleSide}
          {...getEmissive("transom_face")}
        />
      </mesh>

      {/* Wireframe overlay */}
      {showWireframe && wireframeGeometry && (
        <lineSegments ref={wireframeRef} geometry={wireframeGeometry}>
          <lineBasicMaterial color="#ffffff" opacity={0.25} transparent />
        </lineSegments>
      )}
    </group>
  );
}
