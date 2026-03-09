// Sail Rig Integration Page — full coordinate control for all rigging objects (world-space editing)
import { Suspense, useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Grid, GizmoHelper, GizmoViewport } from "@react-three/drei";
import * as THREE from "three";

import { LaserRiggingParams, DEFAULT_LASER_RIGGING, Hardpoint, PulleyParams } from "@/lib/parametric/laserRigging";
import { RiggingMesh } from "@/components/engine/RiggingMesh";
import { CoordinateInput } from "@/components/engine/CoordinateInput";
import { TransformGizmo } from "@/components/engine/TransformGizmo";

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ArrowLeft, Sailboat, Eye, Crosshair } from "lucide-react";

type ObjectSelection =
  | { type: "mast" }
  | { type: "boom" }
  | { type: "traveler" }
  | { type: "hardpoint"; index: number }
  | { type: "pulley"; index: number }
  | null;

const Y_AXIS = new THREE.Vector3(0, 1, 0);

function selectionKey(s: ObjectSelection): string {
  if (!s) return "";
  if (s.type === "hardpoint" || s.type === "pulley") return `${s.type}-${s.index}`;
  return s.type;
}

function toWorldFromAttach(
  local: THREE.Vector3,
  attach: Hardpoint["attach"] | PulleyParams["attach"],
  rigging: LaserRiggingParams,
  boomRad: number
) {
  if (attach === "boom") {
    return local.clone().applyAxisAngle(Y_AXIS, boomRad).add(rigging.boom.position.clone());
  }
  if (attach === "mast") {
    return local.clone().add(rigging.mast.position.clone());
  }
  return local.clone();
}

function fromWorldToAttach(
  world: THREE.Vector3,
  attach: Hardpoint["attach"] | PulleyParams["attach"],
  rigging: LaserRiggingParams,
  boomRad: number
) {
  if (attach === "boom") {
    return world.clone().sub(rigging.boom.position.clone()).applyAxisAngle(Y_AXIS, -boomRad);
  }
  if (attach === "mast") {
    return world.clone().sub(rigging.mast.position.clone());
  }
  return world.clone();
}

function S({ label, value, min, max, step, unit, onChange }: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
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

function HardpointMarkers({ rigging, boomRad, visible }: { rigging: LaserRiggingParams; boomRad: number; visible: boolean }) {
  if (!visible) return null;

  return (
    <group>
      {rigging.hardpoints.map((hp) => {
        const pos = toWorldFromAttach(hp.position, hp.attach, rigging, boomRad);
        return (
          <mesh key={hp.id} position={[pos.x, pos.y, pos.z]}>
            <sphereGeometry args={[0.009, 8, 8]} />
            <meshBasicMaterial color="hsl(190, 95%, 55%)" />
          </mesh>
        );
      })}
    </group>
  );
}

function getSelectedWorldPos(rigging: LaserRiggingParams, selected: ObjectSelection, boomRad: number): [number, number, number] | null {
  if (!selected) return null;

  if (selected.type === "mast") {
    const p = rigging.mast.position;
    return [p.x, p.y, p.z];
  }

  if (selected.type === "boom") {
    const p = rigging.boom.position;
    return [p.x, p.y, p.z];
  }

  if (selected.type === "traveler") {
    return [rigging.traveler.x, rigging.traveler.y, rigging.traveler.carZ];
  }

  if (selected.type === "hardpoint") {
    const hp = rigging.hardpoints[selected.index];
    if (!hp) return null;
    const p = toWorldFromAttach(hp.position, hp.attach, rigging, boomRad);
    return [p.x, p.y, p.z];
  }

  const pulley = rigging.pulleys[selected.index];
  if (!pulley) return null;
  const p = toWorldFromAttach(pulley.position, pulley.attach, rigging, boomRad);
  return [p.x, p.y, p.z];
}

function SailRigScene({
  rigging,
  boomAngle,
  windAngle,
  windStrength,
  showWireframe,
  showWindArrows,
  showGrid,
  showHardpoints,
  selectedObj,
  onGizmoDrag,
  onObjectClick,
  cameraTarget,
}: {
  rigging: LaserRiggingParams;
  boomAngle: number;
  windAngle: number;
  windStrength: number;
  showWireframe: boolean;
  showWindArrows: boolean;
  showGrid: boolean;
  showHardpoints: boolean;
  selectedObj: ObjectSelection;
  onGizmoDrag: (x: number, y: number, z: number) => void;
  onObjectClick: (target: { type: string; index?: number }) => void;
  cameraTarget: THREE.Vector3;
}) {
  const boomRad = (boomAngle / 180) * Math.PI;
  const [isDragging, setIsDragging] = useState(false);
  const gizmoPos = getSelectedWorldPos(rigging, selectedObj, boomRad);

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
        <RiggingMesh
          rigging={rigging}
          showWireframe={showWireframe}
          boomAngle={boomRad}
          rudderAngle={0}
          windAngle={windAngle}
          windStrength={windStrength}
          highlightTarget={selectedObj ? selectionKey(selectedObj) : null}
          onObjectClick={onObjectClick}
        />

        <HardpointMarkers rigging={rigging} boomRad={boomRad} visible={showHardpoints} />
        {showWindArrows && <WindArrow windAngle={windAngle} windStrength={windStrength} />}

        <TransformGizmo
          position={gizmoPos ?? [0, 0, 0]}
          onDrag={onGizmoDrag}
          visible={Boolean(gizmoPos)}
          onDraggingChange={setIsDragging}
        />
      </Suspense>

      <OrbitControls
        enabled={!isDragging}
        enableDamping
        dampingFactor={0.05}
        minDistance={0.5}
        maxDistance={30}
        target={cameraTarget}
      />
      <GizmoHelper alignment="bottom-right" margin={[60, 60]}>
        <GizmoViewport axisColors={["#ef4444", "#22c55e", "#3b82f6"]} labelColor="white" />
      </GizmoHelper>
    </>
  );
}

const SailRig = () => {
  const [rigging, setRigging] = useState<LaserRiggingParams>(() => ({ ...DEFAULT_LASER_RIGGING }));
  const [boomAngle, setBoomAngle] = useState(0);
  const [windAngle, setWindAngle] = useState(0.3);
  const [windStrength, setWindStrength] = useState(0.5);
  const [showWireframe, setShowWireframe] = useState(false);
  const [showWindArrows, setShowWindArrows] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [showHardpoints, setShowHardpoints] = useState(true);
  const [selectedObj, setSelectedObj] = useState<ObjectSelection>(null);

  const boomRad = useMemo(() => (boomAngle / 180) * Math.PI, [boomAngle]);
  const cameraTarget = useMemo(() => new THREE.Vector3(0, 2.5, 0), []);
  const activeKey = selectionKey(selectedObj);

  const [sections, setSections] = useState({
    wind: true,
    tensions: true,
    objects: true,
    display: false,
  });

  const toggle = (s: keyof typeof sections) => setSections((p) => ({ ...p, [s]: !p[s] }));

  const handleReset = useCallback(() => {
    setRigging({ ...DEFAULT_LASER_RIGGING });
    setBoomAngle(0);
    setWindAngle(0.3);
    setWindStrength(0.5);
    setSelectedObj(null);
  }, []);

  const updateMastPos = useCallback((x: number, y: number, z: number) => {
    setRigging((r) => ({ ...r, mast: { ...r.mast, position: new THREE.Vector3(x, y, z) } }));
  }, []);

  const updateBoomPos = useCallback((x: number, y: number, z: number) => {
    setRigging((r) => ({ ...r, boom: { ...r.boom, position: new THREE.Vector3(x, y, z) } }));
  }, []);

  const updateTravelerPos = useCallback((x: number, y: number, z: number) => {
    setRigging((r) => ({
      ...r,
      traveler: { ...r.traveler, x, y, carZ: z },
      pulleys: r.pulleys.map((p) =>
        p.id === "mainsheet_traveler" ? { ...p, position: new THREE.Vector3(x, y, z) } : p
      ),
    }));
  }, []);

  const updateHardpointWorld = useCallback((index: number, x: number, y: number, z: number) => {
    setRigging((r) => {
      const hardpoints = [...r.hardpoints];
      const current = hardpoints[index];
      if (!current) return r;

      const local = fromWorldToAttach(new THREE.Vector3(x, y, z), current.attach, r, boomRad);
      hardpoints[index] = { ...current, position: local };
      return { ...r, hardpoints };
    });
  }, [boomRad]);

  const updatePulleyWorld = useCallback((index: number, x: number, y: number, z: number) => {
    setRigging((r) => {
      const pulleys = [...r.pulleys];
      const current = pulleys[index];
      if (!current) return r;

      const local = fromWorldToAttach(new THREE.Vector3(x, y, z), current.attach, r, boomRad);
      pulleys[index] = { ...current, position: local };
      return { ...r, pulleys };
    });
  }, [boomRad]);

  const onGizmoDrag = useCallback((x: number, y: number, z: number) => {
    if (!selectedObj) return;

    if (selectedObj.type === "mast") return updateMastPos(x, y, z);
    if (selectedObj.type === "boom") return updateBoomPos(x, y, z);
    if (selectedObj.type === "traveler") return updateTravelerPos(x, y, z);
    if (selectedObj.type === "hardpoint") return updateHardpointWorld(selectedObj.index, x, y, z);
    if (selectedObj.type === "pulley") return updatePulleyWorld(selectedObj.index, x, y, z);
  }, [selectedObj, updateMastPos, updateBoomPos, updateTravelerPos, updateHardpointWorld, updatePulleyWorld]);

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
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
              <p className="text-[10px] text-muted-foreground">World coordinates: type XYZ or drag gizmo</p>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="h-7 px-2 text-xs" onClick={handleReset}>
          Reset
        </Button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-80 border-r border-border overflow-y-auto scrollbar-hide bg-card p-3 space-y-2 flex-shrink-0">
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
                <Switch checked={showWindArrows} onCheckedChange={setShowWindArrows} className="scale-75" />
                <Label className="text-xs">Wind Arrows</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={showGrid} onCheckedChange={setShowGrid} className="scale-75" />
                <Label className="text-xs">Ground Grid</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={showHardpoints} onCheckedChange={setShowHardpoints} className="scale-75" />
                <Label className="text-xs">Hardpoint Markers</Label>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          <Collapsible open={sections.wind}>
            <CollapsibleTrigger onClick={() => toggle("wind")} className="flex items-center justify-between w-full py-1.5 text-xs font-semibold">
              <span>🌊 Wind & Boom</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${sections.wind ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-2">
              <S label="Wind Angle" value={windAngle} min={-Math.PI} max={Math.PI} step={0.05} unit=" rad" onChange={setWindAngle} />
              <S label="Wind Strength" value={windStrength} min={0} max={1} step={0.01} onChange={setWindStrength} />
              <S label="Boom Angle" value={boomAngle} min={-90} max={90} step={1} unit="°" onChange={setBoomAngle} />
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={sections.tensions}>
            <CollapsibleTrigger onClick={() => toggle("tensions")} className="flex items-center justify-between w-full py-1.5 text-xs font-semibold">
              <span>⚙️ Tensions</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${sections.tensions ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-2">
              <S label="Mainsheet" value={rigging.mainsheetTension} min={0} max={1} step={0.01} onChange={(v) => setRigging((r) => ({ ...r, mainsheetTension: v }))} />
              <S label="Vang" value={rigging.vangTension} min={0} max={1} step={0.01} onChange={(v) => setRigging((r) => ({ ...r, vangTension: v }))} />
              <S label="Cunningham" value={rigging.cunninghamTension} min={0} max={1} step={0.01} onChange={(v) => setRigging((r) => ({ ...r, cunninghamTension: v }))} />
              <S label="Outhaul" value={rigging.outhaulTension} min={0} max={1} step={0.01} onChange={(v) => setRigging((r) => ({ ...r, outhaulTension: v }))} />
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          <Collapsible open={sections.objects}>
            <CollapsibleTrigger onClick={() => toggle("objects")} className="flex items-center justify-between w-full py-1.5 text-xs font-semibold">
              <span className="flex items-center gap-1.5"><Crosshair className="w-3 h-3" /> Objects (World XYZ)</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${sections.objects ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1.5 pt-2">
              <CoordinateInput
                label="🏗️ Mast"
                x={rigging.mast.position.x}
                y={rigging.mast.position.y}
                z={rigging.mast.position.z}
                onChange={updateMastPos}
                selected={activeKey === "mast"}
                onSelect={() => setSelectedObj(activeKey === "mast" ? null : { type: "mast" })}
              />

              <CoordinateInput
                label="🏗️ Boom"
                x={rigging.boom.position.x}
                y={rigging.boom.position.y}
                z={rigging.boom.position.z}
                onChange={updateBoomPos}
                selected={activeKey === "boom"}
                onSelect={() => setSelectedObj(activeKey === "boom" ? null : { type: "boom" })}
              />

              <CoordinateInput
                label="🪢 Traveler (X, Y, Car Z)"
                x={rigging.traveler.x}
                y={rigging.traveler.y}
                z={rigging.traveler.carZ}
                onChange={updateTravelerPos}
                selected={activeKey === "traveler"}
                onSelect={() => setSelectedObj(activeKey === "traveler" ? null : { type: "traveler" })}
              />

              <div className="pl-2 pb-1">
                <div className="flex items-center gap-2">
                  <Label className="text-[9px] text-muted-foreground">Track Half-Span</Label>
                  <input
                    type="number"
                    step={0.01}
                    value={rigging.traveler.trackHalfSpan}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      if (!Number.isNaN(v)) setRigging((r) => ({ ...r, traveler: { ...r.traveler, trackHalfSpan: v } }));
                    }}
                    className="w-20 h-5 px-1 text-[10px] font-mono bg-background border border-border rounded text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <Separator className="my-1" />

              <Label className="text-[9px] text-muted-foreground uppercase tracking-wide block pt-1">Pulleys / Blocks</Label>
              {rigging.pulleys.map((pulley, i) => {
                const world = toWorldFromAttach(pulley.position, pulley.attach, rigging, boomRad);
                const key = `pulley-${i}`;

                return (
                  <div key={pulley.id} className="space-y-1">
                    <CoordinateInput
                      label={`🔩 ${pulley.id} (${pulley.attach})`}
                      x={world.x}
                      y={world.y}
                      z={world.z}
                      onChange={(x, y, z) => updatePulleyWorld(i, x, y, z)}
                      selected={activeKey === key}
                      onSelect={() => setSelectedObj(activeKey === key ? null : { type: "pulley", index: i })}
                    />
                    <div className="pl-2 flex items-center gap-2">
                      <Label className="text-[9px] text-muted-foreground">Attach</Label>
                      <select
                        value={pulley.attach}
                        onChange={(e) => {
                          const attach = e.target.value as PulleyParams["attach"];
                          setRigging((r) => {
                            const pulleys = [...r.pulleys];
                            pulleys[i] = { ...pulleys[i], attach };
                            return { ...r, pulleys };
                          });
                        }}
                        className="h-6 px-1 text-[10px] bg-background border border-border rounded text-foreground"
                      >
                        <option value="hull">Hull</option>
                        <option value="boom">Boom</option>
                        <option value="mast">Mast</option>
                      </select>
                    </div>
                  </div>
                );
              })}

              <Separator className="my-1" />

              <Label className="text-[9px] text-muted-foreground uppercase tracking-wide block pt-1">Hardpoints</Label>
              {rigging.hardpoints.map((hp, i) => {
                const world = toWorldFromAttach(hp.position, hp.attach, rigging, boomRad);
                const key = `hardpoint-${i}`;

                return (
                  <CoordinateInput
                    key={hp.id}
                    label={`📍 ${hp.label || hp.id} (${hp.attach})`}
                    x={world.x}
                    y={world.y}
                    z={world.z}
                    onChange={(x, y, z) => updateHardpointWorld(i, x, y, z)}
                    selected={activeKey === key}
                    onSelect={() => setSelectedObj(activeKey === key ? null : { type: "hardpoint", index: i })}
                  />
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div className="flex-1">
          <Canvas shadows gl={{ antialias: true, preserveDrawingBuffer: true }} style={{ background: "hsl(222, 47%, 8%)" }}>
            <SailRigScene
              rigging={rigging}
              boomAngle={boomAngle}
              windAngle={windAngle}
              windStrength={windStrength}
              showWireframe={showWireframe}
              showWindArrows={showWindArrows}
              showGrid={showGrid}
              showHardpoints={showHardpoints}
              selectedObj={selectedObj}
              onGizmoDrag={onGizmoDrag}
              onObjectClick={handleSceneClick}
              cameraTarget={cameraTarget}
            />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default SailRig;
