// Isolated 3D viewport for individual subsystem editing
import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  OrbitControls, Grid, GizmoHelper, GizmoViewport, 
  PerspectiveCamera, OrthographicCamera 
} from "@react-three/drei";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { 
  Maximize2, Grid3X3, RotateCcw, Camera,
  ArrowUp, ArrowRight, ArrowDown
} from "lucide-react";
import { cn } from "@/lib/utils";

type ViewAngle = "perspective" | "top" | "side" | "front" | "back" | "bottom";

interface SubsystemViewportProps {
  children: React.ReactNode;
  title?: string;
  showGrid?: boolean;
  cameraDistance?: number;
  cameraTarget?: [number, number, number];
  backgroundColor?: string;
}

const VIEW_CONFIGS: Record<ViewAngle, { position: [number, number, number]; label: string }> = {
  perspective: { position: [3, 2, 3], label: "3D" },
  top: { position: [0, 5, 0.001], label: "Top" },
  side: { position: [5, 0, 0], label: "Side" },
  front: { position: [0, 0, 5], label: "Front" },
  back: { position: [0, 0, -5], label: "Back" },
  bottom: { position: [0, -5, 0.001], label: "Btm" },
};

function ViewportScene({ 
  children, 
  viewAngle, 
  showGrid, 
  cameraDistance = 5, 
  cameraTarget = [0, 0, 0] 
}: { 
  children: React.ReactNode; 
  viewAngle: ViewAngle; 
  showGrid: boolean;
  cameraDistance: number;
  cameraTarget: [number, number, number];
}) {
  const config = VIEW_CONFIGS[viewAngle];
  const pos = config.position.map(v => v * (cameraDistance / 5)) as [number, number, number];
  const isOrtho = viewAngle !== "perspective";

  return (
    <>
      {isOrtho ? (
        <OrthographicCamera 
          makeDefault 
          position={pos} 
          zoom={150} 
          near={0.01} 
          far={100}
        />
      ) : (
        <PerspectiveCamera makeDefault position={pos} fov={45} near={0.01} far={100} />
      )}

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1} castShadow />
      <directionalLight position={[-3, 4, -3]} intensity={0.3} />
      <hemisphereLight args={["hsl(210, 40%, 80%)", "hsl(30, 20%, 30%)", 0.4]} />

      {showGrid && (
        <Grid
          args={[10, 10]}
          cellSize={0.1}
          cellThickness={0.5}
          cellColor="hsl(215, 20%, 30%)"
          sectionSize={0.5}
          sectionThickness={1}
          sectionColor="hsl(215, 25%, 40%)"
          fadeDistance={10}
          fadeStrength={1}
          infiniteGrid
        />
      )}

      <Suspense fallback={null}>
        {children}
      </Suspense>

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={0.2}
        maxDistance={50}
        target={new THREE.Vector3(...cameraTarget)}
      />

      <GizmoHelper alignment="bottom-right" margin={[60, 60]}>
        <GizmoViewport axisColors={["#ef4444", "#22c55e", "#3b82f6"]} labelColor="white" />
      </GizmoHelper>
    </>
  );
}

export function SubsystemViewport({
  children,
  title,
  showGrid = true,
  cameraDistance = 5,
  cameraTarget = [0, 0, 0],
}: SubsystemViewportProps) {
  const [viewAngle, setViewAngle] = useState<ViewAngle>("perspective");
  const [quadView, setQuadView] = useState(false);

  if (quadView) {
    return (
      <div className="w-full h-full relative">
        {/* Quad view toggle */}
        <div className="absolute top-2 right-2 z-10 flex gap-1">
          <Button size="sm" variant="secondary" className="h-6 px-2 text-[10px]" onClick={() => setQuadView(false)}>
            <Maximize2 className="w-3 h-3 mr-1" /> Single
          </Button>
        </div>
        
        <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-px bg-border">
          {(["perspective", "top", "side", "front"] as ViewAngle[]).map(angle => (
            <div key={angle} className="relative bg-background">
              <div className="absolute top-1 left-1 z-10 text-[9px] font-mono text-muted-foreground bg-background/80 px-1.5 py-0.5 rounded">
                {VIEW_CONFIGS[angle].label}
              </div>
              <Canvas shadows gl={{ antialias: true, preserveDrawingBuffer: true }}>
                <ViewportScene 
                  viewAngle={angle} 
                  showGrid={showGrid} 
                  cameraDistance={cameraDistance}
                  cameraTarget={cameraTarget}
                >
                  {children}
                </ViewportScene>
              </Canvas>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      {/* View controls */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {title && (
          <div className="text-xs font-mono font-bold text-foreground bg-background/80 backdrop-blur px-2 py-1 rounded border border-border">
            {title}
          </div>
        )}
      </div>

      <div className="absolute top-2 right-2 z-10 flex gap-1 flex-wrap justify-end">
        {(Object.keys(VIEW_CONFIGS) as ViewAngle[]).map(angle => (
          <Button
            key={angle}
            size="sm"
            variant={viewAngle === angle ? "default" : "secondary"}
            className="h-6 px-2 text-[10px]"
            onClick={() => setViewAngle(angle)}
          >
            {VIEW_CONFIGS[angle].label}
          </Button>
        ))}
        <Button size="sm" variant="outline" className="h-6 px-2 text-[10px]" onClick={() => setQuadView(true)}>
          <Grid3X3 className="w-3 h-3" />
        </Button>
      </div>

      <Canvas 
        shadows 
        gl={{ antialias: true, preserveDrawingBuffer: true }}
        style={{ background: "hsl(222, 47%, 8%)" }}
      >
        <ViewportScene 
          viewAngle={viewAngle} 
          showGrid={showGrid} 
          cameraDistance={cameraDistance}
          cameraTarget={cameraTarget}
        >
          {children}
        </ViewportScene>
      </Canvas>
    </div>
  );
}
