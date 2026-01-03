import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Environment, GizmoHelper, GizmoViewport, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import { HullMesh } from "./HullMesh";
import { RiggingMesh } from "./RiggingMesh";
import { HullParams } from "@/lib/parametric/types";
import { LaserRiggingParams, DEFAULT_LASER_RIGGING } from "@/lib/parametric/laserRigging";

interface Viewport3DProps {
  params: HullParams;
  resolution: "low" | "medium" | "high";
  showWireframe: boolean;
  showGrid: boolean;
  viewMode: "perspective" | "top" | "side" | "front";
  showRigging?: boolean;
  rigging?: LaserRiggingParams;
  boomAngle?: number;
  rudderAngle?: number;
  windAngle?: number;
  windStrength?: number;
}

export function Viewport3D({ 
  params, 
  resolution, 
  showWireframe, 
  showGrid,
  viewMode,
  showRigging = true,
  rigging = DEFAULT_LASER_RIGGING,
  boomAngle = 0,
  rudderAngle = 0,
  windAngle = 0,
  windStrength = 0.5
}: Viewport3DProps) {
  const getCameraConfig = () => {
    switch (viewMode) {
      case "top":
        return { position: [0, 8, 0] as [number, number, number], fov: 50 };
      case "side":
        return { position: [0, 1.5, 8] as [number, number, number], fov: 50 };
      case "front":
        return { position: [8, 1.5, 0] as [number, number, number], fov: 50 };
      default:
        return { position: [5, 3, 5] as [number, number, number], fov: 50 };
    }
  };

  const camera = getCameraConfig();
  const boomAngleRad = (boomAngle / 180) * Math.PI;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '500px' }} className="bg-[#0a0f1a] rounded-lg overflow-hidden border border-border">
      <Canvas shadows style={{ width: '100%', height: '100%' }}>
        <PerspectiveCamera makeDefault position={camera.position} fov={camera.fov} />
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
          <directionalLight position={[-5, 3, -5]} intensity={0.4} />
          <pointLight position={[0, 5, 0]} intensity={0.3} />
          
          {/* Environment */}
          <Environment preset="studio" />
          
          {/* Grid */}
          {showGrid && (
            <Grid
              args={[20, 20]}
              cellSize={0.5}
              cellThickness={0.5}
              cellColor="#334155"
              sectionSize={1}
              sectionThickness={1}
              sectionColor="#475569"
              fadeDistance={20}
              fadeStrength={1}
              infiniteGrid
            />
          )}
          
          {/* Hull Model */}
          <HullMesh
            params={params}
            resolution={resolution}
            showWireframe={showWireframe}
          />
          
          {/* Rigging - Mast, Boom, Sail, Centerboard, Rudder */}
          {showRigging && (
            <RiggingMesh
              rigging={rigging}
              showWireframe={showWireframe}
              boomAngle={boomAngleRad}
              rudderAngle={rudderAngle}
              windAngle={windAngle}
              windStrength={windStrength}
            />
          )}
          
          {/* Controls */}
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={1}
            maxDistance={25}
          />
          
          {/* Gizmo */}
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport labelColor="white" axisHeadScale={1} />
          </GizmoHelper>
        </Suspense>
      </Canvas>
    </div>
  );
}
