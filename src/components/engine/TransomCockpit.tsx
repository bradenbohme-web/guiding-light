// Transom (stern) and Cockpit system for Laser sailboat
// Connects smoothly to hull with proper flat transom shape
import { useMemo } from "react";
import * as THREE from "three";
import { HullParams } from "@/lib/parametric/types";
import { evalBeamCurve, evalDeckCurve, evalKeelCurve } from "@/lib/parametric/curves";

interface TransomCockpitProps {
  params: HullParams;
  showWireframe?: boolean;
  highlight?: string | null;
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

// Transom (stern flat plate) - properly connects to hull
function TransomMesh({ 
  params, 
  transomParams = DEFAULT_TRANSOM_PARAMS,
  showWireframe,
  highlight 
}: { 
  params: HullParams; 
  transomParams?: TransomParams;
  showWireframe: boolean;
  highlight: boolean;
}) {
  const geometry = useMemo(() => {
    const { length, height } = params;
    
    // Get actual hull dimensions at stern (u=0)
    const sternU = 0.0; // Stern is at u=0
    const sternBeam = evalBeamCurve(sternU, params);
    const deckY = evalDeckCurve(sternU, params);
    const keelY = evalKeelCurve(sternU, params);
    
    // Create transom shape that matches hull cross-section at stern
    const shape = new THREE.Shape();
    const halfBeam = sternBeam * 0.98; // Slightly inset
    const transomHeight = (deckY - keelY) * (params.transomHeight || 0.85);
    const bottomY = keelY + 0.02; // Slightly above keel
    const cornerRadius = transomParams.transomRadius;
    
    // Start at bottom center
    shape.moveTo(0, bottomY);
    
    // Bottom curve to right - matches hull bottom shape
    const steps = 8;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const z = t * halfBeam;
      // Hull bottom curve (simplified V-hull)
      const rise = Math.pow(t, 1.5) * 0.15 * height;
      shape.lineTo(z, bottomY + rise);
    }
    
    // Right side up with corner rounding
    const topY = bottomY + transomHeight;
    shape.lineTo(halfBeam, topY - cornerRadius);
    shape.quadraticCurveTo(halfBeam, topY, halfBeam - cornerRadius, topY);
    
    // Top edge
    shape.lineTo(cornerRadius - halfBeam, topY);
    shape.quadraticCurveTo(-halfBeam, topY, -halfBeam, topY - cornerRadius);
    
    // Left side down
    for (let i = steps; i >= 1; i--) {
      const t = i / steps;
      const z = -t * halfBeam;
      const rise = Math.pow(t, 1.5) * 0.15 * height;
      shape.lineTo(z, bottomY + rise);
    }
    
    // Close at bottom center
    shape.lineTo(0, bottomY);
    
    // Drain hole cutout
    const drainHole = new THREE.Path();
    const drainRadius = transomParams.drainHoleDiameter / 2;
    const drainY = bottomY + transomParams.drainHolePosition * transomHeight * 0.3;
    drainHole.absarc(0, drainY, drainRadius, 0, Math.PI * 2, false);
    shape.holes.push(drainHole);
    
    const extrudeSettings = {
      steps: 1,
      depth: 0.012,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.004,
      bevelSegments: 2
    };
    
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    // Rotate so it faces aft (back of boat)
    geo.rotateY(Math.PI / 2);
    return geo;
  }, [params, transomParams]);

  const rakeAngleRad = (transomParams.transomAngle / 180) * Math.PI;
  const sternX = -params.length / 2; // Stern is at negative X (back of boat)
  
  const emissiveColor = highlight ? new THREE.Color("hsl(45, 93%, 58%)") : new THREE.Color(0x000000);
  
  return (
    <group 
      position={[sternX, 0, 0]}
      rotation={[0, 0, -rakeAngleRad]}
    >
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="hsl(199, 89%, 48%)"
          metalness={0.3}
          roughness={0.6}
          side={THREE.DoubleSide}
          wireframe={showWireframe}
          emissive={emissiveColor}
          emissiveIntensity={highlight ? 0.4 : 0}
        />
      </mesh>
    </group>
  );
}

// Rudder mounting hardware (gudgeons/pintles)
function RudderMounts({ 
  params,
  transomParams = DEFAULT_TRANSOM_PARAMS,
  highlight 
}: { 
  params: HullParams;
  transomParams?: TransomParams;
  highlight: boolean;
}) {
  const mounts = useMemo(() => {
    const { rudderMountSpacing } = transomParams;
    const keelY = evalKeelCurve(0, params);
    return [
      { y: keelY + 0.15, label: "upper" },
      { y: keelY + 0.15 - rudderMountSpacing, label: "lower" },
    ];
  }, [params, transomParams]);
  
  const sternX = -params.length / 2;
  const emissiveColor = highlight ? new THREE.Color("hsl(45, 93%, 58%)") : new THREE.Color(0x000000);
  
  return (
    <group position={[sternX - 0.01, 0, 0]}>
      {mounts.map((mount) => (
        <group key={mount.label} position={[0, mount.y, 0]}>
          {/* Gudgeon (female fitting on transom) */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.012, 0.012, 0.025, 12]} />
            <meshStandardMaterial 
              color="#333" 
              roughness={0.4} 
              metalness={0.7}
              emissive={emissiveColor}
              emissiveIntensity={highlight ? 0.3 : 0}
            />
          </mesh>
          {/* Mounting plate */}
          <mesh position={[0.015, 0, 0]}>
            <boxGeometry args={[0.008, 0.04, 0.03]} />
            <meshStandardMaterial 
              color="#444" 
              roughness={0.4} 
              metalness={0.6}
              emissive={emissiveColor}
              emissiveIntensity={highlight ? 0.3 : 0}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Drain/bailer fitting
function DrainFitting({ 
  params,
  transomParams = DEFAULT_TRANSOM_PARAMS,
  highlight 
}: { 
  params: HullParams;
  transomParams?: TransomParams;
  highlight: boolean;
}) {
  const radius = transomParams.drainHoleDiameter / 2;
  const sternX = -params.length / 2;
  const keelY = evalKeelCurve(0, params);
  const emissiveColor = highlight ? new THREE.Color("hsl(45, 93%, 58%)") : new THREE.Color(0x000000);
  
  return (
    <group 
      position={[
        sternX - 0.015, 
        keelY + 0.05 + transomParams.drainHolePosition * 0.1,
        0
      ]}
    >
      {/* Drain fitting outer ring */}
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[radius * 1.2, 0.004, 8, 16]} />
        <meshStandardMaterial 
          color="#666" 
          roughness={0.3} 
          metalness={0.7}
          emissive={emissiveColor}
          emissiveIntensity={highlight ? 0.3 : 0}
        />
      </mesh>
      {/* Flapper/plug */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-0.005, 0, 0]}>
        <circleGeometry args={[radius * 0.9, 12]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          roughness={0.8} 
          side={THREE.DoubleSide}
          emissive={emissiveColor}
          emissiveIntensity={highlight ? 0.3 : 0}
        />
      </mesh>
    </group>
  );
}

// Cockpit floor and structure
function CockpitMesh({ 
  params,
  cockpitParams = DEFAULT_COCKPIT_PARAMS,
  showWireframe,
  highlight 
}: { 
  params: HullParams;
  cockpitParams?: CockpitParams;
  showWireframe: boolean;
  highlight: boolean;
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
      // Slope toward drain at stern
      const drainSlope = 0.008 * (x / (length / 2));
      posAttr.setZ(i, camber + drainSlope);
    }
    posAttr.needsUpdate = true;
    geo.computeVertexNormals();
    
    return geo;
  }, [cockpitParams]);

  // Side tanks (seats)
  const seatGeometry = useMemo(() => {
    const { length, seatHeight, seatWidth } = cockpitParams;
    return new THREE.BoxGeometry(length * 0.85, seatHeight, seatWidth);
  }, [cockpitParams]);

  // Centerboard trunk
  const trunkGeometry = useMemo(() => {
    const { centerboardTrunkLength, centerboardTrunkWidth, depth } = cockpitParams;
    return new THREE.BoxGeometry(centerboardTrunkLength, depth + 0.12, centerboardTrunkWidth);
  }, [cockpitParams]);

  const deckY = evalDeckCurve(0.5, params);
  const cockpitY = deckY - cockpitParams.depth;
  const cockpitX = 0; // Centered
  
  const emissiveColor = highlight ? new THREE.Color("hsl(45, 93%, 58%)") : new THREE.Color(0x000000);
  
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
          emissive={emissiveColor}
          emissiveIntensity={highlight ? 0.3 : 0}
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
          emissive={emissiveColor}
          emissiveIntensity={highlight ? 0.3 : 0}
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
          emissive={emissiveColor}
          emissiveIntensity={highlight ? 0.3 : 0}
        />
      </mesh>
      
      {/* Centerboard trunk */}
      <mesh
        geometry={trunkGeometry}
        position={[0.2, (cockpitParams.depth + 0.12) / 2 - 0.02, 0]}
      >
        <meshStandardMaterial
          color="#f0f0f0"
          roughness={0.7}
          metalness={0.1}
          wireframe={showWireframe}
          emissive={emissiveColor}
          emissiveIntensity={highlight ? 0.3 : 0}
        />
      </mesh>
      
      {/* Mast partner (mast hole reinforcement) - forward in cockpit */}
      <mesh 
        position={[cockpitParams.length * 0.4, 0.02, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[cockpitParams.mastPartnerSize / 2, cockpitParams.mastPartnerSize / 2 + 0.02, 16]} />
        <meshStandardMaterial 
          color="#aaa" 
          roughness={0.5} 
          metalness={0.3} 
          side={THREE.DoubleSide}
          emissive={emissiveColor}
          emissiveIntensity={highlight ? 0.3 : 0}
        />
      </mesh>
      
      {/* Drain grate in cockpit - toward stern */}
      <group position={[-cockpitParams.length * 0.35, 0.005, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.03, 12]} />
          <meshStandardMaterial 
            color="#555" 
            roughness={0.6} 
            metalness={0.4}
            emissive={emissiveColor}
            emissiveIntensity={highlight ? 0.3 : 0}
          />
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
  showWireframe,
  highlight 
}: { 
  params: HullParams;
  showWireframe: boolean;
  highlight: boolean;
}) {
  const hatchGeometry = useMemo(() => {
    return new THREE.CylinderGeometry(0.08, 0.08, 0.02, 16);
  }, []);
  
  const deckY = evalDeckCurve(0.75, params); // Forward position
  const bowX = params.length * 0.35; // Forward of center
  const emissiveColor = highlight ? new THREE.Color("hsl(45, 93%, 58%)") : new THREE.Color(0x000000);
  
  return (
    <group position={[bowX, deckY + 0.01, 0]}>
      {/* Inspection hatch */}
      <mesh geometry={hatchGeometry}>
        <meshStandardMaterial
          color="#333"
          roughness={0.5}
          metalness={0.4}
          wireframe={showWireframe}
          emissive={emissiveColor}
          emissiveIntensity={highlight ? 0.3 : 0}
        />
      </mesh>
      {/* Hatch ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[0.06, 0.085, 16]} />
        <meshStandardMaterial 
          color="#222" 
          roughness={0.4} 
          metalness={0.5} 
          side={THREE.DoubleSide}
          emissive={emissiveColor}
          emissiveIntensity={highlight ? 0.3 : 0}
        />
      </mesh>
    </group>
  );
}

// Toe strap mounts
function ToeStrapMounts({ params, highlight }: { params: HullParams; highlight: boolean }) {
  const mounts = [
    { x: 0.4, z: 0.25 },
    { x: 0.4, z: -0.25 },
    { x: -0.4, z: 0.2 },
    { x: -0.4, z: -0.2 },
  ];
  
  const deckY = evalDeckCurve(0.5, params);
  const emissiveColor = highlight ? new THREE.Color("hsl(45, 93%, 58%)") : new THREE.Color(0x000000);
  
  return (
    <group position={[0, deckY - 0.12, 0]}>
      {mounts.map((mount, i) => (
        <mesh key={i} position={[mount.x, 0, mount.z]}>
          <cylinderGeometry args={[0.008, 0.012, 0.02, 8]} />
          <meshStandardMaterial 
            color="#444" 
            roughness={0.4} 
            metalness={0.6}
            emissive={emissiveColor}
            emissiveIntensity={highlight ? 0.3 : 0}
          />
        </mesh>
      ))}
    </group>
  );
}

// Main export combining all transom/cockpit elements
export function TransomCockpit({ 
  params, 
  showWireframe = false,
  highlight = null 
}: TransomCockpitProps) {
  const highlightTransom = highlight === 'transom';
  const highlightCockpit = highlight === 'cockpit';
  const highlightRudderMounts = highlight === 'rudder' || highlight === 'rudderMounts';
  const highlightDrain = highlight === 'drain';
  const highlightHatch = highlight === 'hatch';
  const highlightToeStraps = highlight === 'toeStraps';
  
  return (
    <group>
      <TransomMesh params={params} showWireframe={showWireframe} highlight={highlightTransom} />
      <RudderMounts params={params} highlight={highlightRudderMounts} />
      <DrainFitting params={params} highlight={highlightDrain} />
      <CockpitMesh params={params} showWireframe={showWireframe} highlight={highlightCockpit} />
      <ForwardDeck params={params} showWireframe={showWireframe} highlight={highlightHatch} />
      <ToeStrapMounts params={params} highlight={highlightToeStraps} />
    </group>
  );
}