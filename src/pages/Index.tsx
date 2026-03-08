import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Viewport3D } from "@/components/engine/Viewport3D";
import { Viewport3DV2 } from "@/components/engine/Viewport3DV2";
import { ParameterPanel } from "@/components/engine/ParameterPanel";
import { HullV2SettingsPanel } from "@/components/engine/HullV2SettingsPanel";
import { Toolbar } from "@/components/engine/Toolbar";
import { CurvePanel } from "@/components/engine/CurveViewer";
import { RiggingPanel } from "@/components/engine/RiggingPanel";
import { ReferencePack, ReferencePackState, DEFAULT_REFERENCE_PACK } from "@/components/engine/ReferencePack";
import { InteractiveCurveEditor } from "@/components/engine/InteractiveCurveEditor";
import { HeatmapGradientEditor, GradientStop, DEFAULT_GRADIENT_STOPS } from "@/components/engine/HeatmapGradientEditor";
import { OceanSettingsPanel } from "@/components/engine/ocean/OceanSettingsPanel";
import { HullParams, DEFAULT_HULL_PARAMS } from "@/lib/parametric/types";
import { HullV2Params, DEFAULT_HULL_V2_PARAMS } from "@/lib/parametric/v2/types";
import { LaserRiggingParams, DEFAULT_LASER_RIGGING } from "@/lib/parametric/laserRigging";
import { OceanSettings, DEFAULT_OCEAN_SETTINGS } from "@/lib/ocean/types";
import { HullVersion } from "@/components/engine/BoatGroupV2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cpu, Settings, TrendingUp, Sailboat, Grid2X2, Image, Waves } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HULL_VERSIONS: { id: HullVersion; label: string; description: string }[] = [
  { id: "parametric", label: "Parametric", description: "Catmull-Rom + Bézier sections" },
  { id: "brep", label: "B-Rep", description: "OpenSCAD-derived solid" },
  { id: "legacy", label: "Legacy", description: "V2 mesh generator" },
];

const Index = () => {
  // Hull version
  const [hullVersion, setHullVersion] = useState<HullVersion>("parametric");
  const useV2Hull = hullVersion !== "legacy";
  
  // V1 Hull params
  const [params, setParams] = useState<HullParams>({ ...DEFAULT_HULL_PARAMS });
  
  // V2 Hull params
  const [paramsV2, setParamsV2] = useState<HullV2Params>({ ...DEFAULT_HULL_V2_PARAMS });
  
  // Shared state
  const [rigging, setRigging] = useState<LaserRiggingParams>({ ...DEFAULT_LASER_RIGGING });
  const [resolution, setResolution] = useState<"low" | "medium" | "high">("medium");
  const [showWireframe, setShowWireframe] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [showRigging, setShowRigging] = useState(true);
  const [showOcean, setShowOcean] = useState(true);
  const [viewMode, setViewMode] = useState<"perspective" | "top" | "side" | "front">("perspective");
  const [boomAngle, setBoomAngle] = useState(0);
  const [rudderAngle, setRudderAngle] = useState(0);
  const [windAngle, setWindAngle] = useState(0);
  const [windStrength, setWindStrength] = useState(0.5);
  const [boatSpeed, setBoatSpeed] = useState(0);
  const [highlightTarget, setHighlightTarget] = useState<string | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [referencePack, setReferencePack] = useState<ReferencePackState>(DEFAULT_REFERENCE_PACK);
  const [gradientStops, setGradientStops] = useState<GradientStop[]>(DEFAULT_GRADIENT_STOPS);
  const [oceanSettings, setOceanSettings] = useState<OceanSettings>({ ...DEFAULT_OCEAN_SETTINGS });

  const handleReset = () => {
    setParams({ ...DEFAULT_HULL_PARAMS });
    setParamsV2({ ...DEFAULT_HULL_V2_PARAMS });
    setRigging({ ...DEFAULT_LASER_RIGGING });
    setBoomAngle(0);
    setRudderAngle(0);
    setWindAngle(0);
    setWindStrength(0.5);
    setBoatSpeed(0);
    setHighlightTarget(null);
    setShowRigging(true);
    setShowOcean(true);
    setReferencePack(DEFAULT_REFERENCE_PACK);
    setGradientStops(DEFAULT_GRADIENT_STOPS);
    setOceanSettings({ ...DEFAULT_OCEAN_SETTINGS });
  };

  const meshStats = useMemo(() => {
    const resMap = { low: { Nu: 32, Nv: 16 }, medium: { Nu: 64, Nv: 32 }, high: { Nu: 128, Nv: 64 } };
    const { Nu, Nv } = resMap[resolution];
    const vertexCount = useV2Hull ? 5 * (Nu + 1) * (Nv + 1) : 2 * (Nu + 1) * (Nv + 1);
    const triangleCount = useV2Hull ? 5 * Nu * Nv * 2 : 2 * Nu * Nv * 2;
    return { vertexCount, triangleCount };
  }, [resolution, useV2Hull]);

  // Get display dimensions based on hull version
  const displayDimensions = useMemo(() => {
    if (useV2Hull) {
      return {
        length: paramsV2.dimensions.length,
        beam: paramsV2.dimensions.beam,
        height: paramsV2.dimensions.heightDeck,
      };
    }
    return {
      length: params.length,
      beam: params.beam,
      height: params.height,
    };
  }, [useV2Hull, params, paramsV2]);

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

        <div className="flex items-center gap-2">
          <Link to="/workshop" className="text-xs font-mono text-primary hover:underline px-3 py-1.5 bg-primary/10 rounded-lg border border-primary/20">
            🔧 Workshop
          </Link>
          <Link to="/hull-lab" className="text-xs font-mono text-primary hover:underline px-3 py-1.5 bg-primary/10 rounded-lg border border-primary/20">
            🧪 Hull Lab
          </Link>
        </div>
        
        {/* Hull Version Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-secondary/50 rounded-lg p-1">
            {HULL_VERSIONS.map((v) => (
              <Button
                key={v.id}
                variant={hullVersion === v.id ? "default" : "ghost"}
                size="sm"
                className="text-xs font-mono h-7 px-2.5"
                onClick={() => setHullVersion(v.id)}
                title={v.description}
              >
                {v.label}
              </Button>
            ))}
          </div>
          <Badge variant="default" className="font-mono text-xs">
            {HULL_VERSIONS.find((v) => v.id === hullVersion)?.description}
          </Badge>
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
        <div className="w-96 border-r border-border bg-card flex flex-col min-h-0">
          <Tabs defaultValue="params" className="flex-1 flex flex-col min-h-0">
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
              <TabsTrigger value="reference" className="gap-1.5 data-[state=active]:bg-secondary text-xs">
                <Image className="w-3.5 h-3.5" />
                Ref
              </TabsTrigger>
              <TabsTrigger value="ocean" className="gap-1.5 data-[state=active]:bg-secondary text-xs">
                <Waves className="w-3.5 h-3.5" />
                Ocean
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="params" className="flex-1 min-h-0 m-0 overflow-y-auto scrollbar-hide">
              {useV2Hull ? (
                <HullV2SettingsPanel 
                  params={paramsV2} 
                  onChange={setParamsV2}
                  onHoverPart={setHighlightTarget}
                />
              ) : (
                <ParameterPanel params={params} onChange={setParams} />
              )}
            </TabsContent>
            
            <TabsContent value="rigging" className="flex-1 min-h-0 m-0 overflow-y-auto scrollbar-hide p-4">
              <RiggingPanel 
                rigging={rigging}
                onChange={setRigging}
                boomAngle={boomAngle}
                onBoomAngleChange={setBoomAngle}
                rudderAngle={rudderAngle}
                onRudderAngleChange={setRudderAngle}
                windAngle={windAngle}
                onWindAngleChange={setWindAngle}
                windStrength={windStrength}
                onWindStrengthChange={setWindStrength}
                boatSpeed={boatSpeed}
                onBoatSpeedChange={setBoatSpeed}
                onHoverTargetChange={setHighlightTarget}
              />
            </TabsContent>
            
            <TabsContent value="curves" className="flex-1 min-h-0 m-0 p-4 overflow-y-auto scrollbar-hide">
              <CurvePanel params={params} />
            </TabsContent>
            
            <TabsContent value="ortho" className="flex-1 min-h-0 m-0 p-4 overflow-y-auto scrollbar-hide">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch checked={showHeatmap} onCheckedChange={setShowHeatmap} />
                    <Label className="text-xs">Heatmap</Label>
                  </div>
                </div>
                
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Interactive Curve Editors
                </h3>
                
                <InteractiveCurveEditor
                  params={params}
                  onParamsChange={setParams}
                  viewType="top"
                  width={360}
                  height={220}
                  showHeatmap={showHeatmap}
                />
                
                <InteractiveCurveEditor
                  params={params}
                  onParamsChange={setParams}
                  viewType="side"
                  width={360}
                  height={180}
                  showHeatmap={showHeatmap}
                />
                
                {showHeatmap && (
                  <div className="pt-2 border-t border-border">
                    <HeatmapGradientEditor
                      stops={gradientStops}
                      onChange={setGradientStops}
                      minDepth={0}
                      maxDepth={params.height}
                    />
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="reference" className="flex-1 min-h-0 m-0 p-4 overflow-y-auto scrollbar-hide">
              <ReferencePack
                state={referencePack}
                onChange={setReferencePack}
              />
            </TabsContent>
            
            <TabsContent value="ocean" className="flex-1 min-h-0 m-0 overflow-y-auto scrollbar-hide">
              <OceanSettingsPanel
                settings={oceanSettings}
                onChange={setOceanSettings}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Viewport */}
        <div className="flex-1 relative h-full">
          {useV2Hull ? (
            <Viewport3DV2
              params={paramsV2}
              resolution={resolution}
              showWireframe={showWireframe}
              showGrid={showGrid}
              viewMode={viewMode}
              showRigging={showRigging}
              showOcean={showOcean}
              rigging={rigging}
              boomAngle={boomAngle}
              rudderAngle={rudderAngle}
              windAngle={windAngle}
              windStrength={windStrength}
              boatSpeed={boatSpeed}
              highlightTarget={highlightTarget}
              oceanSettings={oceanSettings}
              hullVersion={hullVersion}
            />
          ) : (
            <Viewport3D
              params={params}
              resolution={resolution}
              showWireframe={showWireframe}
              showGrid={showGrid}
              viewMode={viewMode}
              showRigging={showRigging}
              showOcean={showOcean}
              rigging={rigging}
              boomAngle={boomAngle}
              rudderAngle={rudderAngle}
              windAngle={windAngle}
              windStrength={windStrength}
              boatSpeed={boatSpeed}
              highlightTarget={highlightTarget}
              oceanSettings={oceanSettings}
            />
          )}
          
          {/* Viewport overlay info */}
          <div className="absolute bottom-4 left-4 text-xs font-mono text-muted-foreground bg-background/80 backdrop-blur px-3 py-2 rounded-lg border border-border">
            <div>
              Length: {displayDimensions.length.toFixed(2)}m | 
              Beam: {displayDimensions.beam.toFixed(2)}m | 
              Height: {displayDimensions.height.toFixed(2)}m
            </div>
            <div className="flex items-center gap-3 mt-1">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <Switch 
                  checked={showRigging} 
                  onCheckedChange={setShowRigging}
                  className="scale-75"
                />
                <span>Rigging</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <Switch 
                  checked={showOcean} 
                  onCheckedChange={setShowOcean}
                  className="scale-75"
                />
                <span>Ocean</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
