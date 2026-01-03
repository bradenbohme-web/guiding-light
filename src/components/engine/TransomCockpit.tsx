// Transom (stern) and Cockpit system for Laser sailboat
import { useMemo } from "react";
import * as THREE from "three";
import { HullParams } from "@/lib/parametric/types";
import { evalBeamCurve, evalDeckCurve } from "@/lib/parametric/curves";

interface TransomCockpitProps {
  params: HullParams;
  showWireframe?: boolean;
}

// Extended params for transom/cockpit
export interface TransomParams {
  transomAngle: number;        // Rake angle: 0-15 degrees
  transomRadius: number;       // Corner rounding: 0-0.1m
  drainHoleDiameter: number;   // Self-bailer: ~0.025m
  drainHolePosition: number;   // Height from bottom: 0-1
  rudderMountSpacing: number;  // Distance between gudgeons: ~0.15m
  rudderMountOffset: number;   // Distance from centerline: 0
}

export interface CockpitParams {
  length: number;              // Cockpit length: ~1.8m
  width: number;               // Cockpit width at widest: ~0.7m
  depth: number;               // Depth from deck: ~0.15m
  seatHeight: number;          // Side tank height: ~0.12m
  seatWidth: number;           // Side tank width: ~0.18m
  floorCamber: number;         // Floor curve: 0-0.02m
  drainPosition: number;       // Along length: 0.8 (aft)
  centerboardTrunkWidth: number;  // ~0.04m
  centerboardTrunkLength: number; // ~0.3m
  mastPartnerSize: number;     // Mast hole diameter: ~0.08m
}

export const DEFAULT_TRANSOM_PARAMS: TransomParams = {
  transomAngle: 8,
  transomRadius: 0.03,
  drainHoleDiameter: 0.025,
  drainHolePosition: 0.1,
  rudderMountSpacing: 0.15,
  rudderMountOffset: 0,
};

export const DEFAULT_COCKPIT_PARAMS: CockpitParams = {
  length: 1.8,
  width: 0.7,
  depth: 0.15,
  seatHeight: 0.12,
  seatWidth: 0.18,
  floorCamber: 0.01,
  drainPosition: 0.8,
  centerboardTrunkWidth: 0.04,
  centerboardTrunkLength: 0.3,
  mastPartnerSize: 0.08,
};

// Transom (stern flat plate)
function TransomMesh({ 
  params, 
  transomParams = DEFAULT_TRANSOM_PARAMS,
  showWireframe 
}: { 
  params: HullParams; 
  transomParams?: TransomParams;
  showWireframe: boolean;
}) {
  const geometry = useMemo(() => {
    const { length, height } = params;
    const sternU = 1.0;
    const beam = evalBeamCurve(sternU, params);
    const deckY = evalDeckCurve(sternU, params);
    
    // Create transom shape
    const shape = new THREE.Shape();
    const halfBeam = beam * 0.95;
    const transomHeight = height * 0.7;
    
    // Start at bottom center
    shape.moveTo(0, -transomHeight * 0.3);
    
    // Bottom curve
    shape.bezierCurveTo(
      halfBeam * 0.3, -transomHeight * 0.3,
      halfBeam * 0.8, -transomHeight * 0.2,
      halfBeam, 0
    );
    
    // Right side up to deck
    shape.lineTo(halfBeam, deckY * 0.8);
    
    // Top curve (deck edge)
    shape.bezierCurveTo(
      halfBeam * 0.7, deckY,
      halfBeam * 0.3, deckY,
      0, deckY
    );
    
    // Left side (mirror)
    shape.bezierCurveTo(
      -halfBeam * 0.3, deckY,
      -halfBeam * 0.7, deckY,
      -halfBeam, deckY * 0.8
    );
    
    shape.lineTo(-halfBeam, 0);
    
    // Bottom left curve
    shape.bezierCurveTo(
      -halfBeam * 0.8, -transomHeight * 0.2,
      -halfBeam * 0.3, -transomHeight * 0.3,
      0, -transomHeight * 0.3
    );
    
    // Drain hole cutout
    const drainHole = new THREE.Path();
    const drainRadius = transomParams.drainHoleDiameter / 2;
    const drainY = -transomHeight * 0.2 + transomParams.drainHolePosition * transomHeight * 0.3;
    drainHole.absarc(0, drainY, drainRadius, 0, Math.PI * 2, false);
    shape.holes.push(drainHole);
    
    const extrudeSettings = {
      steps: 1,
      depth: 0.015,
      bevelEnabled: true,
      bevelThickness: 0.005,
      bevelSize: 0.005,
      bevelSegments: 2
    };
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [params, transomParams]);

  const rakeAngleRad = (transomParams.transomAngle / 180) * Math.PI;
  
  return (
    <group 
      position={[(params.length / 2) - 0.01, 0, 0]}
      rotation={[0, Math.PI / 2, rakeAngleRad]}
    >
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="#1e88e5"
          metalness={0.3}
          roughness={0.6}
          side={THREE.DoubleSide}
          wireframe={showWireframe}
        />
      </mesh>
    </group>
  );
}

// Rudder mounting hardware (gudgeons/pintles)
function RudderMounts({ 
  params,
  transomParams = DEFAULT_TRANSOM_PARAMS 
}: { 
  params: HullParams;
  transomParams?: TransomParams;
}) {
  const mounts = useMemo(() => {
    const { rudderMountSpacing } = transomParams;
    return [
      { y: 0.05, label: "upper" },
      { y: 0.05 - rudderMountSpacing, label: "lower" },
    ];
  }, [transomParams]);
  
  return (
    <group position={[(params.length / 2), 0, 0]}>
      {mounts.map((mount, i) => (
        <group key={mount.label} position={[0, mount.y, 0]}>
          {/* Gudgeon (female fitting on transom) */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.012, 0.012, 0.025, 12]} />
            <meshStandardMaterial color="#333" roughness={0.4} metalness={0.7} />
          </mesh>
          {/* Mounting plate */}
          <mesh position={[-0.015, 0, 0]}>
            <boxGeometry args={[0.008, 0.04, 0.03]} />
            <meshStandardMaterial color="#444" roughness={0.4} metalness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Drain/bailer fitting
function DrainFitting({ 
  params,
  transomParams = DEFAULT_TRANSOM_PARAMS 
}: { 
  params: HullParams;
  transomParams?: TransomParams;
}) {
  const radius = transomParams.drainHoleDiameter / 2;
  
  return (
    <group 
      position={[
        params.length / 2 + 0.01, 
        -0.08 + transomParams.drainHolePosition * 0.1,
        0
      ]}
    >
      {/* Drain fitting outer ring */}
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[radius * 1.2, 0.004, 8, 16]} />
        <meshStandardMaterial color="#666" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Flapper/plug */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[0.005, 0, 0]}>
        <circleGeometry args={[radius * 0.9, 12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// Cockpit floor and structure
function CockpitMesh({ 
  params,
  cockpitParams = DEFAULT_COCKPIT_PARAMS,
  showWireframe 
}: { 
  params: HullParams;
  cockpitParams?: CockpitParams;
  showWireframe: boolean;
}) {
  // Cockpit floor geometry
  const floorGeometry = useMemo(() => {
    const { length, width, floorCamber } = cockpitParams;
    const geo = new THREE.PlaneGeometry(length, width, 16, 8);
    
    // Apply camber (slight curve for water drainage)
    const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const camber = floorCamber * (1 - (y / (width / 2)) ** 2);
      // Slope toward drain
      const drainSlope = 0.01 * (x / (length / 2));
      posAttr.setZ(i, camber + drainSlope);
    }
    posAttr.needsUpdate = true;
    geo.computeVertexNormals();
    
    return geo;
  }, [cockpitParams]);

  // Side tanks (seats)
  const seatGeometry = useMemo(() => {
    const { length, seatHeight, seatWidth } = cockpitParams;
    return new THREE.BoxGeometry(length * 0.9, seatHeight, seatWidth);
  }, [cockpitParams]);

  // Centerboard trunk
  const trunkGeometry = useMemo(() => {
    const { centerboardTrunkLength, centerboardTrunkWidth, depth } = cockpitParams;
    return new THREE.BoxGeometry(centerboardTrunkLength, depth + 0.1, centerboardTrunkWidth);
  }, [cockpitParams]);

  const cockpitY = evalDeckCurve(0.5, params) - cockpitParams.depth;
  const cockpitX = 0.1; // Slightly forward of center
  
  return (
    <group position={[cockpitX, cockpitY, 0]}>
      {/* Floor */}
      <mesh 
        geometry={floorGeometry}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          color="#d0d0d0"
          roughness={0.9}
          metalness={0.05}
          wireframe={showWireframe}
        />
      </mesh>
      
      {/* Port seat/tank */}
      <mesh 
        geometry={seatGeometry}
        position={[0, cockpitParams.seatHeight / 2, (cockpitParams.width / 2) + (cockpitParams.seatWidth / 2)]}
      >
        <meshStandardMaterial
          color="#e8e8e8"
          roughness={0.8}
          metalness={0.1}
          wireframe={showWireframe}
        />
      </mesh>
      
      {/* Starboard seat/tank */}
      <mesh 
        geometry={seatGeometry}
        position={[0, cockpitParams.seatHeight / 2, -((cockpitParams.width / 2) + (cockpitParams.seatWidth / 2))]}
      >
        <meshStandardMaterial
          color="#e8e8e8"
          roughness={0.8}
          metalness={0.1}
          wireframe={showWireframe}
        />
      </mesh>
      
      {/* Centerboard trunk */}
      <mesh
        geometry={trunkGeometry}
        position={[-0.3, (cockpitParams.depth + 0.1) / 2 - 0.02, 0]}
      >
        <meshStandardMaterial
          color="#f0f0f0"
          roughness={0.7}
          metalness={0.1}
          wireframe={showWireframe}
        />
      </mesh>
      
      {/* Mast partner (mast hole reinforcement) */}
      <mesh 
        position={[cockpitParams.length * 0.35, 0.02, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[cockpitParams.mastPartnerSize / 2, cockpitParams.mastPartnerSize / 2 + 0.02, 16]} />
        <meshStandardMaterial color="#aaa" roughness={0.5} metalness={0.3} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Drain grate in cockpit */}
      <group position={[-cockpitParams.length * cockpitParams.drainPosition / 2, 0.005, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.03, 12]} />
          <meshStandardMaterial color="#555" roughness={0.6} metalness={0.4} />
        </mesh>
        {/* Grate slots */}
        {[0, 1, 2, 3, 4].map(i => (
          <mesh 
            key={i}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0.001, (i - 2) * 0.012]}
          >
            <boxGeometry args={[0.04, 0.003, 0.003]} />
            <meshStandardMaterial color="#333" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Forward deck with inspection hatch
function ForwardDeck({ 
  params,
  showWireframe 
}: { 
  params: HullParams;
  showWireframe: boolean;
}) {
  const hatchGeometry = useMemo(() => {
    return new THREE.CylinderGeometry(0.08, 0.08, 0.02, 16);
  }, []);
  
  const deckY = evalDeckCurve(0.15, params);
  
  return (
    <group position={[-params.length * 0.35, deckY + 0.01, 0]}>
      {/* Inspection hatch */}
      <mesh geometry={hatchGeometry}>
        <meshStandardMaterial
          color="#333"
          roughness={0.5}
          metalness={0.4}
          wireframe={showWireframe}
        />
      </mesh>
      {/* Hatch ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[0.06, 0.085, 16]} />
        <meshStandardMaterial color="#222" roughness={0.4} metalness={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// Toe straps mounts
function ToeStrapMounts({ params }: { params: HullParams }) {
  const mounts = [
    { x: -0.4, z: 0.25 },
    { x: -0.4, z: -0.25 },
    { x: 0.3, z: 0.2 },
    { x: 0.3, z: -0.2 },
  ];
  
  const deckY = evalDeckCurve(0.5, params);
  
  return (
    <group position={[0, deckY - 0.12, 0]}>
      {mounts.map((mount, i) => (
        <mesh key={i} position={[mount.x, 0, mount.z]}>
          <cylinderGeometry args={[0.008, 0.012, 0.02, 8]} />
          <meshStandardMaterial color="#444" roughness={0.4} metalness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

// Main export combining all transom/cockpit elements
export function TransomCockpit({ 
  params, 
  showWireframe = false 
}: TransomCockpitProps) {
  return (
    <group>
      <TransomMesh params={params} showWireframe={showWireframe} />
      <RudderMounts params={params} />
      <DrainFitting params={params} />
      <CockpitMesh params={params} showWireframe={showWireframe} />
      <ForwardDeck params={params} showWireframe={showWireframe} />
      <ToeStrapMounts params={params} />
    </group>
  );
}
