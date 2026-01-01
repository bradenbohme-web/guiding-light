import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Environment, GizmoHelper, GizmoViewport, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import { HullMesh } from "./HullMesh";
import { HullParams } from "@/lib/parametric/types";

interface Viewport3DProps {
  params: HullParams;
  resolution: "low" | "medium" | "high";
  showWireframe: boolean;
  showGrid: boolean;
  viewMode: "perspective" | "top" | "side" | "front";
}

export function Viewport3D({ 
  params, 
  resolution, 
  showWireframe, 
  showGrid,
  viewMode 
}: Viewport3DProps) {
  const getCameraConfig = () => {
    switch (viewMode) {
      case "top":
        return { position: [0, 5, 0] as [number, number, number], fov: 50 };
      case "side":
        return { position: [0, 0.5, 5] as [number, number, number], fov: 50 };
      case "front":
        return { position: [5, 0.5, 0] as [number, number, number], fov: 50 };
      default:
        return { position: [3, 2, 3] as [number, number, number], fov: 50 };
    }
  };

  const camera = getCameraConfig();

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '500px' }} className="bg-[#0a0f1a] rounded-lg overflow-hidden border border-border">
      <Canvas shadows style={{ width: '100%', height: '100%' }}>
        <PerspectiveCamera makeDefault position={camera.position} fov={camera.fov} />
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <directionalLight position={[-5, 3, -5]} intensity={0.3} />
          
          {/* Environment */}
          <Environment preset="studio" />
          
          {/* Grid */}
          {showGrid && (
            <Grid
              args={[10, 10]}
              cellSize={0.5}
              cellThickness={0.5}
              cellColor="#334155"
              sectionSize={1}
              sectionThickness={1}
              sectionColor="#475569"
              fadeDistance={15}
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
          
          {/* Controls */}
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={1}
            maxDistance={20}
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
