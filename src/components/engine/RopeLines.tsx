// Rope/Line visualization with catenary curves
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LaserRiggingParams, PulleyParams, Hardpoint } from "@/lib/parametric/laserRigging";

interface RopeLinesProps {
  rigging: LaserRiggingParams;
  boomAngle: number;
  showWireframe?: boolean;
}

// Catenary curve calculation
function calculateCatenary(
  start: THREE.Vector3,
  end: THREE.Vector3,
  sag: number,
  segments: number = 20
): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const distance = start.distanceTo(end);
  
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const pos = start.clone().lerp(end, t);
    
    // Add catenary sag - parabolic approximation
    const sagAmount = sag * Math.sin(t * Math.PI) * (distance / 2);
    pos.y -= sagAmount;
    
    points.push(pos);
  }
  
  return points;
}

// Get position from hardpoint/pulley ID
function getHardpointPosition(
  id: string,
  hardpoints: Hardpoint[],
  pulleys: PulleyParams[],
  boomAngle: number,
  mastPos: THREE.Vector3,
  gooseneckHeight: number
): THREE.Vector3 | null {
  // Check pulleys first
  const pulley = pulleys.find(p => p.id === id);
  if (pulley) {
    const pos = pulley.position.clone();
    
    // Transform based on attachment
    if (pulley.attach === "boom") {
      // Rotate around mast with boom
      const rotated = new THREE.Vector3(pos.x, pos.y, pos.z);
      rotated.applyAxisAngle(new THREE.Vector3(0, 1, 0), boomAngle);
      rotated.x += mastPos.x;
      rotated.y += gooseneckHeight;
      return rotated;
    } else if (pulley.attach === "mast") {
      return new THREE.Vector3(mastPos.x + pos.x, pos.y, pos.z);
    }
    return pos;
  }
  
  // Check hardpoints
  const hp = hardpoints.find(h => h.id === id);
  if (hp) {
    const pos = hp.position.clone();
    
    if (hp.attach === "boom") {
      const rotated = new THREE.Vector3(pos.x, pos.y, pos.z);
      rotated.applyAxisAngle(new THREE.Vector3(0, 1, 0), boomAngle);
      rotated.x += mastPos.x;
      rotated.y += gooseneckHeight;
      return rotated;
    } else if (hp.attach === "mast") {
      return new THREE.Vector3(mastPos.x + pos.x, pos.y, pos.z);
    }
    return pos;
  }
  
  return null;
}

// Individual rope line component
function RopeLine({
  rope,
  hardpoints,
  pulleys,
  boomAngle,
  mastPos,
  gooseneckHeight
}: {
  rope: LaserRiggingParams['ropes'][0];
  hardpoints: Hardpoint[];
  pulleys: PulleyParams[];
  boomAngle: number;
  mastPos: THREE.Vector3;
  gooseneckHeight: number;
}) {
  const tubeRef = useRef<THREE.Mesh>(null);
  
  const { geometry, curve } = useMemo(() => {
    const allPoints: THREE.Vector3[] = [];
    
    rope.segments.forEach(segment => {
      const startPos = getHardpointPosition(
        segment.startPoint, hardpoints, pulleys, boomAngle, mastPos, gooseneckHeight
      );
      const endPos = getHardpointPosition(
        segment.endPoint, hardpoints, pulleys, boomAngle, mastPos, gooseneckHeight
      );
      
      if (!startPos || !endPos) return;
      
      // Get intermediate pulley positions
      const intermediates: THREE.Vector3[] = [];
      segment.throughPulleys.forEach(pulleyId => {
        const pos = getHardpointPosition(pulleyId, hardpoints, pulleys, boomAngle, mastPos, gooseneckHeight);
        if (pos) intermediates.push(pos);
      });
      
      // Build rope path
      if (intermediates.length === 0) {
        // Direct catenary
        const sag = (1 - rope.tension) * 0.15;
        allPoints.push(...calculateCatenary(startPos, endPos, sag));
      } else {
        // Through pulleys
        let current = startPos;
        intermediates.forEach(pulleyPos => {
          const sag = (1 - rope.tension) * 0.08;
          allPoints.push(...calculateCatenary(current, pulleyPos, sag));
          current = pulleyPos;
        });
        const sag = (1 - rope.tension) * 0.08;
        allPoints.push(...calculateCatenary(current, endPos, sag));
      }
    });
    
    if (allPoints.length < 2) {
      return { geometry: null, curve: null };
    }
    
    const curv = new THREE.CatmullRomCurve3(allPoints);
    const geo = new THREE.TubeGeometry(curv, allPoints.length * 2, rope.diameter / 2, 6, false);
    
    return { geometry: geo, curve: curv };
  }, [rope, hardpoints, pulleys, boomAngle, mastPos, gooseneckHeight]);
  
  if (!geometry) return null;
  
  return (
    <mesh ref={tubeRef} geometry={geometry}>
      <meshStandardMaterial 
        color={rope.color}
        roughness={0.7}
        metalness={0.1}
      />
    </mesh>
  );
}

// Mainsheet rope with multiple purchase
function MainsheetRope({
  rigging,
  boomAngle
}: {
  rigging: LaserRiggingParams;
  boomAngle: number;
}) {
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const gooseneckY = rigging.boom.gooseneckHeight;
    const mastX = rigging.mast.position.x;
    
    // Boom block position (rotated with boom)
    const boomBlockLocal = new THREE.Vector3(-1.8, -0.03, 0);
    boomBlockLocal.applyAxisAngle(new THREE.Vector3(0, 1, 0), boomAngle);
    const boomBlock = new THREE.Vector3(
      mastX + boomBlockLocal.x,
      gooseneckY + boomBlockLocal.y,
      boomBlockLocal.z
    );
    
    // Traveler block (on hull)
    const travelerBlock = new THREE.Vector3(-0.33, 0.12, 0);
    
    // Sailor's hand position (approximate)
    const handPos = new THREE.Vector3(-0.5, 0.35, 0.3);
    
    // Create 4:1 purchase pattern
    const sag = (1 - rigging.mainsheetTension) * 0.06;
    
    // Part 1: Boom to traveler
    points.push(...calculateCatenary(boomBlock, travelerBlock, sag, 12));
    // Part 2: Back up to boom
    const boomBlock2 = boomBlock.clone().add(new THREE.Vector3(0.05, 0, 0));
    points.push(...calculateCatenary(travelerBlock, boomBlock2, sag * 0.8, 12));
    // Part 3: To hand
    points.push(...calculateCatenary(boomBlock2, handPos, sag * 1.2, 12));
    
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, points.length, 0.004, 6, false);
  }, [rigging, boomAngle]);
  
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#ffffff" roughness={0.65} metalness={0.1} />
    </mesh>
  );
}

// Vang rope
function VangRope({
  rigging,
  boomAngle
}: {
  rigging: LaserRiggingParams;
  boomAngle: number;
}) {
  const geometry = useMemo(() => {
    const gooseneckY = rigging.boom.gooseneckHeight;
    const mastX = rigging.mast.position.x;
    
    // Boom vang attachment (rotated with boom)
    const vangBoomLocal = new THREE.Vector3(-0.5, -0.03, 0);
    vangBoomLocal.applyAxisAngle(new THREE.Vector3(0, 1, 0), boomAngle);
    const vangBoom = new THREE.Vector3(
      mastX + vangBoomLocal.x,
      gooseneckY + vangBoomLocal.y,
      vangBoomLocal.z
    );
    
    // Vang base on hull
    const vangBase = new THREE.Vector3(0.04, 0.08, 0);
    
    const sag = (1 - rigging.vangTension) * 0.1;
    const points = calculateCatenary(vangBoom, vangBase, sag, 16);
    
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 24, 0.003, 6, false);
  }, [rigging, boomAngle]);
  
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#2563eb" roughness={0.7} metalness={0.1} />
    </mesh>
  );
}

// Cunningham rope
function CunninghamRope({
  rigging,
  boomAngle
}: {
  rigging: LaserRiggingParams;
  boomAngle: number;
}) {
  const geometry = useMemo(() => {
    const mastX = rigging.mast.position.x;
    const gooseneckY = rigging.boom.gooseneckHeight;
    
    // Cunningham grommet on sail (at tack, slightly up)
    const sailAttach = new THREE.Vector3(mastX + 0.02, gooseneckY + 0.15, 0);
    
    // Cunningham cleat on deck
    const cleat = new THREE.Vector3(0.08, 0.1, 0);
    
    const sag = (1 - rigging.cunninghamTension) * 0.08;
    const points = calculateCatenary(sailAttach, cleat, sag, 12);
    
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 18, 0.0025, 6, false);
  }, [rigging, boomAngle]);
  
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#dc2626" roughness={0.7} metalness={0.1} />
    </mesh>
  );
}

// Outhaul rope
function OuthaulRope({
  rigging,
  boomAngle
}: {
  rigging: LaserRiggingParams;
  boomAngle: number;
}) {
  const geometry = useMemo(() => {
    const gooseneckY = rigging.boom.gooseneckHeight;
    const mastX = rigging.mast.position.x;
    
    // Clew position (rotated with boom)
    const clewLocal = new THREE.Vector3(-rigging.boom.length + 0.1, 0, 0);
    clewLocal.applyAxisAngle(new THREE.Vector3(0, 1, 0), boomAngle);
    const clew = new THREE.Vector3(
      mastX + clewLocal.x,
      gooseneckY + clewLocal.y,
      clewLocal.z
    );
    
    // Outhaul cleat on boom (rotated with boom)
    const cleatLocal = new THREE.Vector3(-rigging.boom.length + 0.5, 0.02, 0);
    cleatLocal.applyAxisAngle(new THREE.Vector3(0, 1, 0), boomAngle);
    const cleat = new THREE.Vector3(
      mastX + cleatLocal.x,
      gooseneckY + cleatLocal.y,
      cleatLocal.z
    );
    
    const sag = (1 - rigging.outhaulTension) * 0.04;
    const points = calculateCatenary(clew, cleat, sag, 10);
    
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 15, 0.0025, 6, false);
  }, [rigging, boomAngle]);
  
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#16a34a" roughness={0.7} metalness={0.1} />
    </mesh>
  );
}

// Halyard (mast head to sail head)
function HalyardRope({
  rigging,
  boomAngle
}: {
  rigging: LaserRiggingParams;
  boomAngle: number;
}) {
  const geometry = useMemo(() => {
    const mastX = rigging.mast.position.x;
    
    // Masthead
    const masthead = new THREE.Vector3(mastX, rigging.mast.height + 0.1, 0);
    
    // Sail head (top of sail)
    const gooseneckY = rigging.boom.gooseneckHeight;
    const sailHead = new THREE.Vector3(mastX + 0.05, gooseneckY + rigging.sail.luffLength, 0);
    
    const points = [masthead, sailHead];
    
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 8, 0.003, 6, false);
  }, [rigging, boomAngle]);
  
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#666666" roughness={0.6} metalness={0.15} />
    </mesh>
  );
}

// Main export
export function RopeLines({
  rigging,
  boomAngle,
  showWireframe = false
}: RopeLinesProps) {
  const mastPos = rigging.mast.position;
  const gooseneckHeight = rigging.boom.gooseneckHeight;
  
  return (
    <group>
      <MainsheetRope rigging={rigging} boomAngle={boomAngle} />
      <VangRope rigging={rigging} boomAngle={boomAngle} />
      <CunninghamRope rigging={rigging} boomAngle={boomAngle} />
      <OuthaulRope rigging={rigging} boomAngle={boomAngle} />
      <HalyardRope rigging={rigging} boomAngle={boomAngle} />
    </group>
  );
}
