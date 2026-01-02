import { useState, useMemo } from "react";
import { Viewport3D } from "@/components/engine/Viewport3D";
import { ParameterPanel } from "@/components/engine/ParameterPanel";
import { Toolbar } from "@/components/engine/Toolbar";
import { CurvePanel } from "@/components/engine/CurveViewer";
import { OrthoPanel } from "@/components/engine/OrthoView";
import { RiggingPanel } from "@/components/engine/RiggingPanel";
import { HullParams, DEFAULT_HULL_PARAMS } from "@/lib/parametric/types";
import { LaserRiggingParams, DEFAULT_LASER_RIGGING } from "@/lib/parametric/laserRigging";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cpu, Settings, TrendingUp, Sailboat, Grid2X2, Eye } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [params, setParams] = useState<HullParams>({ ...DEFAULT_HULL_PARAMS });
  const [rigging, setRigging] = useState<LaserRiggingParams>({ ...DEFAULT_LASER_RIGGING });
  const [resolution, setResolution] = useState<"low" | "medium" | "high">("medium");
  const [showWireframe, setShowWireframe] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [viewMode, setViewMode] = useState<"perspective" | "top" | "side" | "front">("perspective");
  const [boomAngle, setBoomAngle] = useState(0);
  const [rudderAngle, setRudderAngle] = useState(0);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showCurveHandles, setShowCurveHandles] = useState(false);

  const handleReset = () => {
    setParams({ ...DEFAULT_HULL_PARAMS });
    setRigging({ ...DEFAULT_LASER_RIGGING });
    setBoomAngle(0);
    setRudderAngle(0);
  };

  const meshStats = useMemo(() => {
    const resMap = { low: { Nu: 32, Nv: 16 }, medium: { Nu: 64, Nv: 32 }, high: { Nu: 128, Nv: 64 } };
    const { Nu, Nv } = resMap[resolution];
    const vertexCount = 2 * (Nu + 1) * (Nv + 1);
    const triangleCount = 2 * Nu * Nv * 2;
    return { vertexCount, triangleCount };
  }, [resolution]);

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Cpu className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold font-mono">UPAE</h1>
            <p className="text-xs text-muted-foreground">Universal Parametric Asset Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <span className="px-2 py-1 bg-accent/20 text-accent rounded">Laser Hull v1</span>
        </div>
      </header>

      {/* Toolbar */}
      <Toolbar
        resolution={resolution}
        setResolution={setResolution}
        showWireframe={showWireframe}
        setShowWireframe={setShowWireframe}
        showGrid={showGrid}
        setShowGrid={setShowGrid}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onReset={handleReset}
        vertexCount={meshStats.vertexCount}
        triangleCount={meshStats.triangleCount}
      />

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Parameters */}
        <div className="w-96 border-r border-border bg-card flex flex-col">
          <Tabs defaultValue="params" className="flex-1 flex flex-col">
            <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent px-2">
              <TabsTrigger value="params" className="gap-1.5 data-[state=active]:bg-secondary text-xs">
                <Settings className="w-3.5 h-3.5" />
                Hull
              </TabsTrigger>
              <TabsTrigger value="rigging" className="gap-1.5 data-[state=active]:bg-secondary text-xs">
                <Sailboat className="w-3.5 h-3.5" />
                Rigging
              </TabsTrigger>
              <TabsTrigger value="curves" className="gap-1.5 data-[state=active]:bg-secondary text-xs">
                <TrendingUp className="w-3.5 h-3.5" />
                Curves
              </TabsTrigger>
              <TabsTrigger value="ortho" className="gap-1.5 data-[state=active]:bg-secondary text-xs">
                <Grid2X2 className="w-3.5 h-3.5" />
                2D
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="params" className="flex-1 m-0 overflow-y-auto scrollbar-hide">
              <ParameterPanel params={params} onChange={setParams} />
            </TabsContent>
            
            <TabsContent value="rigging" className="flex-1 m-0 overflow-y-auto scrollbar-hide p-4">
              <RiggingPanel 
                rigging={rigging}
                onChange={setRigging}
                boomAngle={boomAngle}
                onBoomAngleChange={setBoomAngle}
                rudderAngle={rudderAngle}
                onRudderAngleChange={setRudderAngle}
              />
            </TabsContent>
            
            <TabsContent value="curves" className="flex-1 m-0 p-4 overflow-y-auto scrollbar-hide">
              <CurvePanel params={params} />
            </TabsContent>
            
            <TabsContent value="ortho" className="flex-1 m-0 p-4 overflow-y-auto scrollbar-hide">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch checked={showHeatmap} onCheckedChange={setShowHeatmap} />
                    <Label className="text-xs">Heatmap</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={showCurveHandles} onCheckedChange={setShowCurveHandles} />
                    <Label className="text-xs">Handles</Label>
                  </div>
                </div>
                <OrthoPanel 
                  params={params} 
                  showHeatmap={showHeatmap}
                  showCurveHandles={showCurveHandles}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Viewport */}
        <div className="flex-1 relative h-full">
          <Viewport3D
            params={params}
            resolution={resolution}
            showWireframe={showWireframe}
            showGrid={showGrid}
            viewMode={viewMode}
          />
          
          {/* Viewport overlay info */}
          <div className="absolute bottom-4 left-4 text-xs font-mono text-muted-foreground bg-background/80 backdrop-blur px-3 py-2 rounded-lg border border-border">
            <div>Length: {params.length.toFixed(2)}m</div>
            <div>Beam: {params.beam.toFixed(2)}m</div>
            <div>Height: {params.height.toFixed(2)}m</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
