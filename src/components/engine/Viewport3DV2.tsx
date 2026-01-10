// Viewport3DV2 - Main 3D viewport for V2 hull system
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  OrbitControls, 
  Grid, 
  GizmoHelper, 
  GizmoViewport,
  PerspectiveCamera,
} from "@react-three/drei";
import { BoatGroupV2 } from "./BoatGroupV2";
import { OceanEnvironment } from "./OceanEnvironment";
import { HullV2Params } from "@/lib/parametric/v2/types";
import { LaserRiggingParams } from "@/lib/parametric/laserRigging";

interface Viewport3DV2Props {
  params: HullV2Params;
  resolution: "low" | "medium" | "high";
  showWireframe: boolean;
  showGrid: boolean;
  showRigging: boolean;
  showOcean: boolean;
  viewMode: "perspective" | "top" | "side" | "front";
  rigging: LaserRiggingParams;
  boomAngle: number;
  rudderAngle: number;
  windAngle: number;
  windStrength: number;
  boatSpeed: number;
  highlightTarget: string | null;
}

// Camera positions for different views
const CAMERA_POSITIONS = {
  perspective: [5, 3, 5] as [number, number, number],
  top: [0, 8, 0] as [number, number, number],
  side: [8, 0, 0] as [number, number, number],
  front: [0, 0, 8] as [number, number, number],
};

export function Viewport3DV2({
  params,
  resolution,
  showWireframe,
  showGrid,
  showRigging,
  showOcean,
  viewMode,
  rigging,
  boomAngle,
  rudderAngle,
  windAngle,
  windStrength,
  boatSpeed,
  highlightTarget,
}: Viewport3DV2Props) {
  const cameraPosition = CAMERA_POSITIONS[viewMode];

  return (
    <Canvas
      shadows
      gl={{ antialias: true, alpha: true }}
      style={{ background: showOcean ? "transparent" : "hsl(222, 47%, 11%)" }}
    >
      <Suspense fallback={null}>
        {/* Camera */}
        <PerspectiveCamera
          makeDefault
          position={cameraPosition}
          fov={50}
          near={0.1}
          far={1000}
        />

        {/* Environment */}
        {showOcean ? (
          <OceanEnvironment enabled={true} />
        ) : (
          <>
            {/* Studio lighting for non-ocean mode */}
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow
              shadow-mapSize={[2048, 2048]}
            />
            <directionalLight position={[-5, 5, -5]} intensity={0.3} />
            <hemisphereLight
              args={["hsl(210, 40%, 70%)", "hsl(30, 30%, 30%)", 0.5]}
            />
          </>
        )}

        {/* Grid */}
        {showGrid && !showOcean && (
          <Grid
            args={[20, 20]}
            cellSize={0.5}
            cellThickness={0.5}
            cellColor="#4a5568"
            sectionSize={2}
            sectionThickness={1}
            sectionColor="#718096"
            fadeDistance={25}
            fadeStrength={1}
            infiniteGrid
          />
        )}

        {/* V2 Boat */}
        <BoatGroupV2
          params={params}
          resolution={resolution}
          showWireframe={showWireframe}
          showRigging={showRigging}
          rigging={rigging}
          boomAngle={boomAngle}
          rudderAngle={rudderAngle}
          windAngle={windAngle}
          windStrength={windStrength}
          boatSpeed={boatSpeed}
          showOcean={showOcean}
          highlightTarget={highlightTarget}
        />

        {/* Controls - full freedom of movement */}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={0.5}
          maxDistance={100}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
          enablePan={true}
          panSpeed={1}
          rotateSpeed={1}
        />

        {/* Gizmo */}
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport
            axisColors={["#ef4444", "#22c55e", "#3b82f6"]}
            labelColor="white"
          />
        </GizmoHelper>
      </Suspense>
    </Canvas>
  );
}
