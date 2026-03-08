// Sail Rig Integration Page — tests mast, boom, sail, ropes, pulleys, traveler as one connected system
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Grid, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

import { LaserRiggingParams, DEFAULT_LASER_RIGGING } from "@/lib/parametric/laserRigging";
import { ClothSail } from "@/components/engine/ClothSail";
import { RopeLines } from "@/components/engine/RopeLines";
import { TravelerSystem } from "@/components/engine/TravelerSystem";
import { RiggingMesh } from "@/components/engine/RiggingMesh";

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ArrowLeft, Sailboat, Eye, EyeOff, Crosshair } from "lucide-react";

// Reusable slider
function S({ label, value, min, max, step, unit, onChange }: {
  label: string; value: number; min: number; max: number; step: number; unit?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        <span className="text-xs font-mono text-primary">{value.toFixed(step < 0.1 ? 2 : 1)}{unit || ""}</span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={([v]) => onChange(v)} />
    </div>
  );
}

// Connection debug markers at hardpoints
function HardpointMarkers({ rigging, boomAngle, visible }: { rigging: LaserRiggingParams; boomAngle: number; visible: boolean }) {
  if (!visible) return null;

  const markers = rigging.hardpoints.map((hp) => {
    let pos = hp.position.clone();

    if (hp.attach === "boom") {
      pos.applyAxisAngle(new THREE.Vector3(0, 1, 0), boomAngle);
      pos.x += rigging.mast.position.x;
      pos.y += rigging.boom.gooseneckHeight;
    } else if (hp.attach === "mast") {
      pos = new THREE.Vector3(rigging.mast.position.x + pos.x, pos.y, pos.z);
    }

    const color = hp.attach === "hull" ? "#ef4444" : hp.attach === "boom" ? "#f59e0b" : hp.attach === "mast" ? "#22c55e" : "#8b5cf6";

    return (
      <group key={hp.id} position={pos}>
        <mesh>
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
        {/* Direction indicator */}
        <mesh position={[0, 0.02, 0]}>
          <coneGeometry args={[0.006, 0.015, 6]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
    );
  });

  return <group>{markers}</group>;
}

// Force vector arrows for wind visualization
function WindArrow({ windAngle, windStrength }: { windAngle: number; windStrength: number }) {
  const dir = new THREE.Vector3(Math.sin(windAngle), 0, Math.cos(windAngle));
  const len = 1 + windStrength * 2;
  const start = dir.clone().multiplyScalar(-3);
  
  return (
    <group position={[start.x, 3, start.z]}>
      <arrowHelper args={[dir, new THREE.Vector3(0, 0, 0), len, 0x3b82f6, 0.2, 0.1]} />
      <arrowHelper args={[dir, new THREE.Vector3(0, 0.5, 0.3), len * 0.8, 0x60a5fa, 0.15, 0.08]} />
      <arrowHelper args={[dir, new THREE.Vector3(0, -0.5, -0.3), len * 0.8, 0x60a5fa, 0.15, 0.08]} />
    </group>
  );
}

// 3D Scene — renders only the sail rig (no hull, no rudder, no centerboard)
function SailRigScene({
  rigging, boomAngle, windAngle, windStrength,
  showWireframe, showHardpoints, showWindArrows, showGrid
}: {
  rigging: LaserRiggingParams;
  boomAngle: number;
  windAngle: number;
  windStrength: number;
  showWireframe: boolean;
  showHardpoints: boolean;
  showWindArrows: boolean;
  showGrid: boolean;
}) {
  const boomRad = (boomAngle / 180) * Math.PI;

  return (
    <>
      <PerspectiveCamera makeDefault position={[4, 4, 4]} fov={45} near={0.01} far={100} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 8, 5]} intensity={1.1} castShadow />
      <directionalLight position={[-3, 4, -3]} intensity={0.3} />
      <hemisphereLight args={["hsl(210, 40%, 80%)", "hsl(30, 20%, 30%)", 0.35]} />

      {showGrid && (
        <Grid
          args={[10, 10]}
          cellSize={0.25}
          cellThickness={0.5}
          cellColor="hsl(215, 20%, 25%)"
          sectionSize={1}
          sectionThickness={1}
          sectionColor="hsl(215, 25%, 35%)"
          fadeDistance={12}
          fadeStrength={1}
          infiniteGrid
        />
      )}

      <Suspense fallback={null}>
        {/* Full rigging (mast, boom, sail, ropes, pulleys, traveler, etc.) */}
        <RiggingMesh
          rigging={rigging}
          showWireframe={showWireframe}
          boomAngle={boomRad}
          rudderAngle={0}
          windAngle={windAngle}
          windStrength={windStrength}
          highlightTarget={null}
        />

        {/* Connection debug markers */}
        <HardpointMarkers rigging={rigging} boomAngle={boomRad} visible={showHardpoints} />

        {/* Wind direction visualization */}
        {showWindArrows && <WindArrow windAngle={windAngle} windStrength={windStrength} />}
      </Suspense>

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={0.5}
        maxDistance={30}
        target={new THREE.Vector3(0, 2.5, 0)}
      />
      <GizmoHelper alignment="bottom-right" margin={[60, 60]}>
        <GizmoViewport axisColors={["#ef4444", "#22c55e", "#3b82f6"]} labelColor="white" />
      </GizmoHelper>
    </>
  );
}

const SailRig = () => {
  const [rigging, setRigging] = useState<LaserRiggingParams>({ ...DEFAULT_LASER_RIGGING });
  const [boomAngle, setBoomAngle] = useState(0);
  const [windAngle, setWindAngle] = useState(0.3);
  const [windStrength, setWindStrength] = useState(0.5);
  const [showWireframe, setShowWireframe] = useState(false);
  const [showHardpoints, setShowHardpoints] = useState(false);
  const [showWindArrows, setShowWindArrows] = useState(true);
  const [showGrid, setShowGrid] = useState(true);

  const [sections, setSections] = useState({
    wind: true,
    tensions: true,
    mastBoom: false,
    sail: false,
    battens: false,
    traveler: false,
    ropes: false,
    display: true,
  });

  const toggle = (s: keyof typeof sections) => setSections(p => ({ ...p, [s]: !p[s] }));

  const updateMast = (key: string, value: number) => {
    setRigging(r => ({ ...r, mast: { ...r.mast, [key]: value } }));
  };
  const updateBoom = (key: string, value: number) => {
    setRigging(r => ({ ...r, boom: { ...r.boom, [key]: value } }));
  };
  const updateSail = (key: string, value: number | boolean) => {
    setRigging(r => ({ ...r, sail: { ...r.sail, [key]: value } }));
  };
  const updateBattens = (key: string, value: number | boolean) => {
    setRigging(r => ({ ...r, sail: { ...r.sail, battens: { ...r.sail.battens, [key]: value } } }));
  };
  const updateTraveler = (key: string, value: number) => {
    setRigging(r => ({ ...r, traveler: { ...r.traveler, [key]: value } }));
  };

  const handleReset = useCallback(() => {
    setRigging({ ...DEFAULT_LASER_RIGGING });
    setBoomAngle(0);
    setWindAngle(0.3);
    setWindStrength(0.5);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <Link to="/workshop">
            <Button variant="ghost" size="sm" className="h-7 px-2">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span className="text-xs">Workshop</span>
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
              <Sailboat className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-bold font-mono">Sail Rig Integration</h1>
              <p className="text-[10px] text-muted-foreground">Mast • Boom • Sail • Ropes • Rope Horse • No Halyard (Sleeve Sail)</p>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="h-7 px-2 text-xs" onClick={handleReset}>
          Reset
        </Button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Side Panel */}
        <div className="w-80 border-r border-border overflow-y-auto scrollbar-hide bg-card p-4 space-y-3 flex-shrink-0">

          {/* === DISPLAY === */}
          <Collapsible open={sections.display}>
            <CollapsibleTrigger onClick={() => toggle("display")} className="flex items-center justify-between w-full py-1.5 text-xs font-semibold">
              <span className="flex items-center gap-1.5"><Eye className="w-3 h-3" /> Display</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${sections.display ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
              <div className="flex items-center gap-2">
                <Switch checked={showWireframe} onCheckedChange={setShowWireframe} className="scale-75" />
                <Label className="text-xs">Wireframe</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={showHardpoints} onCheckedChange={setShowHardpoints} className="scale-75" />
                <Label className="text-xs">Hardpoint Markers</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={showWindArrows} onCheckedChange={setShowWindArrows} className="scale-75" />
                <Label className="text-xs">Wind Arrows</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={showGrid} onCheckedChange={setShowGrid} className="scale-75" />
                <Label className="text-xs">Ground Grid</Label>
              </div>
              {showHardpoints && (
                <div className="flex gap-2 flex-wrap mt-1">
                  {[
                    { label: "Hull", color: "bg-red-500" },
                    { label: "Boom", color: "bg-amber-500" },
                    { label: "Mast", color: "bg-green-500" },
                    { label: "Rudder", color: "bg-violet-500" },
                  ].map(l => (
                    <div key={l.label} className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${l.color}`} />
                      <span className="text-[9px] text-muted-foreground">{l.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* === WIND & ENVIRONMENT === */}
          <Collapsible open={sections.wind}>
            <CollapsibleTrigger onClick={() => toggle("wind")} className="flex items-center justify-between w-full py-1.5 text-xs font-semibold">
              <span>🌊 Wind & Environment</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${sections.wind ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-2">
              <S label="Wind Angle" value={windAngle} min={-Math.PI} max={Math.PI} step={0.05} unit=" rad" onChange={setWindAngle} />
              <S label="Wind Strength" value={windStrength} min={0} max={1} step={0.01} onChange={setWindStrength} />
              <div className="p-2 bg-primary/5 rounded border border-primary/20">
                <S label="Boom Angle" value={boomAngle} min={-90} max={90} step={1} unit="°" onChange={setBoomAngle} />
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* === TENSION CONTROLS === */}
          <Collapsible open={sections.tensions}>
            <CollapsibleTrigger onClick={() => toggle("tensions")} className="flex items-center justify-between w-full py-1.5 text-xs font-semibold">
              <span>⚙️ Tensions</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${sections.tensions ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-1.5 rounded bg-white" />
                <span className="text-[10px]">Mainsheet</span>
              </div>
              <S label="Mainsheet" value={rigging.mainsheetTension} min={0} max={1} step={0.01} onChange={v => setRigging(r => ({ ...r, mainsheetTension: v }))} />

              <div className="flex items-center gap-2 mb-1 mt-2">
                <div className="w-3 h-1.5 rounded" style={{ backgroundColor: "#2563eb" }} />
                <span className="text-[10px]">Vang</span>
              </div>
              <S label="Vang" value={rigging.vangTension} min={0} max={1} step={0.01} onChange={v => setRigging(r => ({ ...r, vangTension: v }))} />

              <div className="flex items-center gap-2 mb-1 mt-2">
                <div className="w-3 h-1.5 rounded" style={{ backgroundColor: "#dc2626" }} />
                <span className="text-[10px]">Cunningham</span>
              </div>
              <S label="Cunningham" value={rigging.cunninghamTension} min={0} max={1} step={0.01} onChange={v => setRigging(r => ({ ...r, cunninghamTension: v }))} />

              <div className="flex items-center gap-2 mb-1 mt-2">
                <div className="w-3 h-1.5 rounded" style={{ backgroundColor: "#16a34a" }} />
                <span className="text-[10px]">Outhaul</span>
              </div>
              <S label="Outhaul" value={rigging.outhaulTension} min={0} max={1} step={0.01} onChange={v => setRigging(r => ({ ...r, outhaulTension: v }))} />
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* === MAST & BOOM === */}
          <Collapsible open={sections.mastBoom}>
            <CollapsibleTrigger onClick={() => toggle("mastBoom")} className="flex items-center justify-between w-full py-1.5 text-xs font-semibold">
              <span>🏗️ Mast & Boom</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${sections.mastBoom ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-2">
              <Label className="text-[10px] text-muted-foreground uppercase tracking-wide">Mast</Label>
              <S label="Height" value={rigging.mast.height} min={4} max={9} step={0.1} unit="m" onChange={v => updateMast("height", v)} />
              <S label="Base Radius" value={rigging.mast.baseRadius} min={0.01} max={0.05} step={0.001} unit="m" onChange={v => updateMast("baseRadius", v)} />
              <S label="Tip Radius" value={rigging.mast.tipRadius} min={0.005} max={0.03} step={0.001} unit="m" onChange={v => updateMast("tipRadius", v)} />
              <S label="Pre-bend" value={rigging.mast.bend} min={0} max={0.15} step={0.005} unit="m" onChange={v => updateMast("bend", v)} />
              <Separator />
              <Label className="text-[10px] text-muted-foreground uppercase tracking-wide">Boom</Label>
              <S label="Length" value={rigging.boom.length} min={1.5} max={4} step={0.05} unit="m" onChange={v => updateBoom("length", v)} />
              <S label="Gooseneck Ht" value={rigging.boom.gooseneckHeight} min={0.5} max={1.5} step={0.01} unit="m" onChange={v => updateBoom("gooseneckHeight", v)} />
              <S label="Outhaul Pos" value={rigging.boom.outhaul} min={0} max={1} step={0.01} onChange={v => updateBoom("outhaul", v)} />
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* === SAIL === */}
          <Collapsible open={sections.sail}>
            <CollapsibleTrigger onClick={() => toggle("sail")} className="flex items-center justify-between w-full py-1.5 text-xs font-semibold">
              <span>⛵ Sail Shape</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${sections.sail ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-2">
              <S label="Luff Length" value={rigging.sail.luffLength} min={3} max={8} step={0.1} unit="m" onChange={v => updateSail("luffLength", v)} />
              <S label="Foot Length" value={rigging.sail.footLength} min={1} max={4} step={0.1} unit="m" onChange={v => updateSail("footLength", v)} />
              <S label="Head Width" value={rigging.sail.headWidth} min={0} max={1} step={0.01} unit="m" onChange={v => updateSail("headWidth", v)} />
              <S label="Leech Curve" value={rigging.sail.leechCurve} min={0} max={0.2} step={0.005} onChange={v => updateSail("leechCurve", v)} />
              <S label="Opacity" value={rigging.sail.opacity} min={0.3} max={1} step={0.01} onChange={v => updateSail("opacity", v)} />
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* === BATTENS === */}
          <Collapsible open={sections.battens}>
            <CollapsibleTrigger onClick={() => toggle("battens")} className="flex items-center justify-between w-full py-1.5 text-xs font-semibold">
              <span>📏 Battens</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${sections.battens ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <Switch checked={rigging.sail.battens.enabled} onCheckedChange={v => updateBattens("enabled", v)} className="scale-75" />
                <Label className="text-xs">Enable Battens</Label>
              </div>
              {rigging.sail.battens.enabled && (
                <>
                  <S label="Global Stiffness" value={rigging.sail.battens.stiffness} min={0} max={1} step={0.01} onChange={v => updateBattens("stiffness", v)} />
                  {rigging.sail.battens.positions.map((pos, i) => (
                    <div key={i} className="space-y-2 pl-2 border-l-2 border-primary/20">
                      <Label className="text-[10px] font-semibold text-muted-foreground">Batten {i + 1}</Label>
                      <S label="Position" value={pos} min={0.1} max={0.95} step={0.01}
                        onChange={v => {
                          const newPos = [...rigging.sail.battens.positions]; newPos[i] = v;
                          setRigging(r => ({ ...r, sail: { ...r.sail, battens: { ...r.sail.battens, positions: newPos } } }));
                        }}
                      />
                      <S label="Length" value={rigging.sail.battens.lengths[i] ?? 0.5} min={0.1} max={1.5} step={0.01} unit="m"
                        onChange={v => {
                          const nl = [...rigging.sail.battens.lengths]; nl[i] = v;
                          setRigging(r => ({ ...r, sail: { ...r.sail, battens: { ...r.sail.battens, lengths: nl } } }));
                        }}
                      />
                      <S label="Stiffness" value={rigging.sail.battens.stiffnesses?.[i] ?? rigging.sail.battens.stiffness} min={0} max={1} step={0.01}
                        onChange={v => {
                          const ns = [...(rigging.sail.battens.stiffnesses || rigging.sail.battens.positions.map(() => rigging.sail.battens.stiffness))];
                          ns[i] = v;
                          setRigging(r => ({ ...r, sail: { ...r.sail, battens: { ...r.sail.battens, stiffnesses: ns } } }));
                        }}
                      />
                    </div>
                  ))}
                </>
              )}
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* === TRAVELER === */}
          <Collapsible open={sections.traveler}>
            <CollapsibleTrigger onClick={() => toggle("traveler")} className="flex items-center justify-between w-full py-1.5 text-xs font-semibold">
              <span>🔩 Traveler</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${sections.traveler ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-2">
              <S label="Car Position" value={rigging.traveler.carZ} min={-rigging.traveler.trackHalfSpan} max={rigging.traveler.trackHalfSpan} step={0.01} unit="m" onChange={v => updateTraveler("carZ", v)} />
              <S label="Track Half-Span" value={rigging.traveler.trackHalfSpan} min={0.1} max={0.6} step={0.01} unit="m" onChange={v => updateTraveler("trackHalfSpan", v)} />
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* === ROPE DETAILS === */}
          <Collapsible open={sections.ropes}>
            <CollapsibleTrigger onClick={() => toggle("ropes")} className="flex items-center justify-between w-full py-1.5 text-xs font-semibold">
              <span>🪢 Rope Details</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${sections.ropes ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
              {rigging.ropes.map((rope) => (
                <div key={rope.id} className="p-2 bg-secondary/30 rounded">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-1 rounded" style={{ backgroundColor: rope.color }} />
                      <span className="text-xs font-medium">{rope.name}</span>
                    </div>
                    <Badge variant="outline" className="text-[9px] h-4">{rope.diameter * 1000}mm</Badge>
                  </div>
                  <div className="text-[9px] text-muted-foreground mt-0.5">
                    Tension: {rope.tension.toFixed(2)} • Elasticity: {rope.elasticity.toFixed(3)}
                  </div>
                </div>
              ))}
              <div className="text-[9px] text-muted-foreground mt-1">
                {rigging.hardpoints.length} hardpoints • {rigging.pulleys.length} blocks
              </div>
            </CollapsibleContent>
          </Collapsible>

        </div>

        {/* 3D Viewport */}
        <div className="flex-1">
          <Canvas
            shadows
            gl={{ antialias: true, preserveDrawingBuffer: true }}
            style={{ background: "hsl(222, 47%, 8%)" }}
          >
            <SailRigScene
              rigging={rigging}
              boomAngle={boomAngle}
              windAngle={windAngle}
              windStrength={windStrength}
              showWireframe={showWireframe}
              showHardpoints={showHardpoints}
              showWindArrows={showWindArrows}
              showGrid={showGrid}
            />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default SailRig;
