// Workshop page - multi-panel workspace for perfecting individual sailboat subsystems
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { SubsystemNav, SubsystemId } from "@/components/workshop/SubsystemNav";
import { HullEditor } from "@/components/workshop/editors/HullEditor";
import { SailEditor } from "@/components/workshop/editors/SailEditor";
import { MastBoomEditor } from "@/components/workshop/editors/MastBoomEditor";
import { RudderTillerEditor } from "@/components/workshop/editors/RudderTillerEditor";
import { PulleyEditor } from "@/components/workshop/editors/PulleyEditor";
import { CenterboardEditor } from "@/components/workshop/editors/CenterboardEditor";
import { TravelerEditor } from "@/components/workshop/editors/TravelerEditor";
import { RopeEditor } from "@/components/workshop/editors/RopeEditor";
import { CockpitTransomEditor } from "@/components/workshop/editors/CockpitTransomEditor";
import { OceanEditor } from "@/components/workshop/editors/OceanEditor";
import { AssemblyEditor } from "@/components/workshop/editors/AssemblyEditor";
import { HullV2Params, DEFAULT_HULL_V2_PARAMS } from "@/lib/parametric/v2/types";
import { HullParams, DEFAULT_HULL_PARAMS } from "@/lib/parametric/types";
import { LaserRiggingParams, DEFAULT_LASER_RIGGING } from "@/lib/parametric/laserRigging";
import { OceanSettings, DEFAULT_OCEAN_SETTINGS } from "@/lib/ocean/types";
import { DEFAULT_TRANSOM_PARAMS, DEFAULT_COCKPIT_PARAMS, TransomParams, CockpitParams } from "@/components/engine/TransomCockpit";
import { supabase } from "@/integrations/supabase/client";
import { Cpu, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Workshop = () => {
  const [activeSubsystem, setActiveSubsystem] = useState<SubsystemId>("hull");
  const [hullParams, setHullParams] = useState<HullV2Params>({ ...DEFAULT_HULL_V2_PARAMS });
  const [hullV1Params, setHullV1Params] = useState<HullParams>({ ...DEFAULT_HULL_PARAMS });
  const [rigging, setRigging] = useState<LaserRiggingParams>({ ...DEFAULT_LASER_RIGGING });
  const [oceanSettings, setOceanSettings] = useState<OceanSettings>({ ...DEFAULT_OCEAN_SETTINGS });
  const [transomParams, setTransomParams] = useState<TransomParams>({ ...DEFAULT_TRANSOM_PARAMS });
  const [cockpitParams, setCockpitParams] = useState<CockpitParams>({ ...DEFAULT_COCKPIT_PARAMS });
  const [boomAngle, setBoomAngle] = useState(0);
  const [rudderAngle, setRudderAngle] = useState(0);
  const [showWireframe, setShowWireframe] = useState(false);
  const [resolution, setResolution] = useState<"low" | "medium" | "high">("medium");
  const [hasUnsaved, setHasUnsaved] = useState(false);

  // Mark dirty on any change
  const wrapChange = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v);
    setHasUnsaved(true);
  };

  const handleSave = useCallback(async () => {
    try {
      const config = {
        hullParams,
        hullV1Params,
        rigging: {
          ...rigging,
          // Serialize THREE.Vector3 objects to plain objects
          mast: { ...rigging.mast, position: { x: rigging.mast.position.x, y: rigging.mast.position.y, z: rigging.mast.position.z } },
          boom: { ...rigging.boom, position: { x: rigging.boom.position.x, y: rigging.boom.position.y, z: rigging.boom.position.z } },
          centerboard: { ...rigging.centerboard, position: { x: rigging.centerboard.position.x, y: rigging.centerboard.position.y, z: rigging.centerboard.position.z } },
          rudder: {
            ...rigging.rudder,
            blade: { ...rigging.rudder.blade, position: { x: rigging.rudder.blade.position.x, y: rigging.rudder.blade.position.y, z: rigging.rudder.blade.position.z } },
            tiller: { ...rigging.rudder.tiller, offset: { x: rigging.rudder.tiller.offset.x, y: rigging.rudder.tiller.offset.y, z: rigging.rudder.tiller.offset.z } },
          },
        },
        oceanSettings,
        transomParams,
        cockpitParams,
        boomAngle,
        rudderAngle,
      };

      const { error } = await supabase.from("boat_configs").insert([{
        name: `Config ${new Date().toLocaleString()}`,
        subsystem: "full",
        config: config as any,
      }]);

      if (error) throw error;
      setHasUnsaved(false);
      toast.success("Configuration saved");
    } catch (e: any) {
      toast.error("Save failed: " + (e.message || "Unknown error"));
    }
  }, [hullParams, hullV1Params, rigging, oceanSettings, transomParams, cockpitParams, boomAngle, rudderAngle]);

  const handleLoad = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("boat_configs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) throw error;
      if (!data || data.length === 0) {
        toast.info("No saved configs found");
        return;
      }

      const config = data[0].config as any;
      if (config.hullParams) setHullParams(config.hullParams);
      if (config.oceanSettings) setOceanSettings(config.oceanSettings);
      if (config.transomParams) setTransomParams(config.transomParams);
      if (config.cockpitParams) setCockpitParams(config.cockpitParams);
      if (config.boomAngle !== undefined) setBoomAngle(config.boomAngle);
      if (config.rudderAngle !== undefined) setRudderAngle(config.rudderAngle);
      setHasUnsaved(false);
      toast.success(`Loaded: ${data[0].name}`);
    } catch (e: any) {
      toast.error("Load failed: " + (e.message || "Unknown error"));
    }
  }, []);

  const handleReset = useCallback(() => {
    setHullParams({ ...DEFAULT_HULL_V2_PARAMS });
    setHullV1Params({ ...DEFAULT_HULL_PARAMS });
    setRigging({ ...DEFAULT_LASER_RIGGING });
    setOceanSettings({ ...DEFAULT_OCEAN_SETTINGS });
    setTransomParams({ ...DEFAULT_TRANSOM_PARAMS });
    setCockpitParams({ ...DEFAULT_COCKPIT_PARAMS });
    setBoomAngle(0);
    setRudderAngle(0);
    setHasUnsaved(false);
    toast.info("Reset to defaults");
  }, []);

  const renderEditor = () => {
    switch (activeSubsystem) {
      case "hull":
        return <HullEditor params={hullParams} onChange={wrapChange(setHullParams)} showWireframe={showWireframe} resolution={resolution} />;
      case "sail":
        return <SailEditor rigging={rigging} onChange={wrapChange(setRigging)} />;
      case "mast-boom":
        return <MastBoomEditor rigging={rigging} onChange={wrapChange(setRigging)} boomAngle={boomAngle} onBoomAngleChange={setBoomAngle} />;
      case "rudder-tiller":
        return <RudderTillerEditor rigging={rigging} onChange={wrapChange(setRigging)} rudderAngle={rudderAngle} onRudderAngleChange={setRudderAngle} />;
      case "pulleys":
        return <PulleyEditor rigging={rigging} onChange={wrapChange(setRigging)} />;
      case "centerboard":
        return <CenterboardEditor rigging={rigging} onChange={wrapChange(setRigging)} />;
      case "traveler":
        return <TravelerEditor rigging={rigging} onChange={wrapChange(setRigging)} />;
      case "ropes":
        return <RopeEditor rigging={rigging} onChange={wrapChange(setRigging)} boomAngle={boomAngle} onBoomAngleChange={setBoomAngle} />;
      case "cockpit-transom":
        return <CockpitTransomEditor hullParams={hullV1Params} transomParams={transomParams} cockpitParams={cockpitParams} onTransomChange={wrapChange(setTransomParams)} onCockpitChange={wrapChange(setCockpitParams)} />;
      case "ocean":
        return <OceanEditor settings={oceanSettings} onChange={wrapChange(setOceanSettings)} />;
      case "assembly":
        return <AssemblyEditor hullParams={hullParams} rigging={rigging} oceanSettings={oceanSettings} boomAngle={boomAngle} rudderAngle={rudderAngle} onBoomAngleChange={setBoomAngle} onRudderAngleChange={setRudderAngle} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="sm" className="h-7 px-2">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span className="text-xs">Main</span>
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-bold font-mono">UPAE Workshop</h1>
              <p className="text-[10px] text-muted-foreground">Subsystem Editor</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/sail-rig">
            <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
              ⛵ Sail Rig
            </Button>
          </Link>
          <Link to="/hull-lab">
            <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
              🧪 Hull Lab
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <SubsystemNav
          active={activeSubsystem}
          onSelect={setActiveSubsystem}
          onSave={handleSave}
          onLoad={handleLoad}
          onReset={handleReset}
          hasUnsaved={hasUnsaved}
        />
        <div className="flex-1 overflow-hidden">
          {renderEditor()}
        </div>
      </div>
    </div>
  );
};

export default Workshop;
