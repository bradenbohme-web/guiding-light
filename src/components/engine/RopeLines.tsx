// Rope/Line visualization with catenary curves
import { useMemo } from "react";
import * as THREE from "three";
import { LaserRiggingParams, PulleyParams, Hardpoint } from "@/lib/parametric/laserRigging";

interface RopeLinesProps {
  rigging: LaserRiggingParams;
  boomAngle: number;
  showWireframe?: boolean;
  highlight?: boolean;
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

    if (pulley.attach === "boom") {
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

// Mainsheet rope with multiple purchase
function MainsheetRope({
  rigging,
  boomAngle,
  highlight
}: {
  rigging: LaserRiggingParams;
  boomAngle: number;
  highlight: boolean;
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

    // Traveler block (uses traveler car Z position)
    const travelerBlock = new THREE.Vector3(rigging.traveler.x, rigging.traveler.y, rigging.traveler.carZ);

    // Sailor's hand position
    const handPos = new THREE.Vector3(-0.5, 0.35, 0.3);

    const sag = (1 - rigging.mainsheetTension) * 0.06;

    points.push(...calculateCatenary(boomBlock, travelerBlock, sag, 12));
    const boomBlock2 = boomBlock.clone().add(new THREE.Vector3(0.05, 0, 0));
    points.push(...calculateCatenary(travelerBlock, boomBlock2, sag * 0.8, 12));
    points.push(...calculateCatenary(boomBlock2, handPos, sag * 1.2, 12));

    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, points.length, 0.004, 6, false);
  }, [rigging, boomAngle]);

  const emissive = highlight ? new THREE.Color("hsl(45, 93%, 58%)") : new THREE.Color(0x000000);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#ffffff" roughness={0.65} metalness={0.1} emissive={emissive} emissiveIntensity={highlight ? 0.5 : 0} />
    </mesh>
  );
}

// Vang rope — Laser vang uses a 6:1 cascade (3:1 upper x 2:1 lower)
// Upper: rope from boom block → mast base block → boom block (3:1)
// Lower: fine-tune 2:1 with cleat
function VangRope({
  rigging,
  boomAngle,
  highlight
}: {
  rigging: LaserRiggingParams;
  boomAngle: number;
  highlight: boolean;
}) {
  const geometry = useMemo(() => {
    const gooseneckY = rigging.boom.gooseneckHeight;
    const mastX = rigging.mast.position.x;
    const sag = (1 - rigging.vangTension) * 0.06;

    // Boom block (upper) — attached ~0.5m aft of gooseneck
    const boomBlockLocal = new THREE.Vector3(-0.5, -0.03, 0);
    boomBlockLocal.applyAxisAngle(new THREE.Vector3(0, 1, 0), boomAngle);
    const boomBlock = new THREE.Vector3(mastX + boomBlockLocal.x, gooseneckY + boomBlockLocal.y, boomBlockLocal.z);

    // Mast base bracket (lower)
    const mastBase = new THREE.Vector3(mastX + 0.02, 0.20, 0);

    // 6:1 cascade routing: boom → base → boom → base → boom → base → cleat
    const points: THREE.Vector3[] = [];
    const offset = 0.012; // Slight offset for each pass to avoid overlap

    // Pass 1: boom block down to mast base
    points.push(...calculateCatenary(boomBlock, mastBase, sag, 8));
    // Pass 2: back up to boom (slightly offset)
    const bb2 = boomBlock.clone().add(new THREE.Vector3(0, 0, offset));
    points.push(...calculateCatenary(mastBase, bb2, sag * 0.8, 8));
    // Pass 3: back down to base (offset other way)
    const mb2 = mastBase.clone().add(new THREE.Vector3(0, 0, -offset));
    points.push(...calculateCatenary(bb2, mb2, sag * 0.6, 8));
    // Tail to cleat
    const cleat = new THREE.Vector3(mastX + 0.06, 0.15, 0.03);
    points.push(...calculateCatenary(mb2, cleat, sag * 0.4, 6));

    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, points.length, 0.003, 6, false);
  }, [rigging, boomAngle]);

  const emissive = highlight ? new THREE.Color("hsl(45, 93%, 58%)") : new THREE.Color(0x000000);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#2563eb" roughness={0.7} metalness={0.1} emissive={emissive} emissiveIntensity={highlight ? 0.5 : 0} />
    </mesh>
  );
}

// Cunningham rope
function CunninghamRope({
  rigging,
  boomAngle,
  highlight
}: {
  rigging: LaserRiggingParams;
  boomAngle: number;
  highlight: boolean;
}) {
  const geometry = useMemo(() => {
    const mastX = rigging.mast.position.x;
    const gooseneckY = rigging.boom.gooseneckHeight;

    const sailAttach = new THREE.Vector3(mastX + 0.02, gooseneckY + 0.15, 0);
    const cleat = new THREE.Vector3(0.08, 0.1, 0);

    const sag = (1 - rigging.cunninghamTension) * 0.08;
    const points = calculateCatenary(sailAttach, cleat, sag, 12);

    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 18, 0.0025, 6, false);
  }, [rigging, boomAngle]);

  const emissive = highlight ? new THREE.Color("hsl(45, 93%, 58%)") : new THREE.Color(0x000000);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#dc2626" roughness={0.7} metalness={0.1} emissive={emissive} emissiveIntensity={highlight ? 0.5 : 0} />
    </mesh>
  );
}

// Outhaul rope
function OuthaulRope({
  rigging,
  boomAngle,
  highlight
}: {
  rigging: LaserRiggingParams;
  boomAngle: number;
  highlight: boolean;
}) {
  const geometry = useMemo(() => {
    const gooseneckY = rigging.boom.gooseneckHeight;
    const mastX = rigging.mast.position.x;

    const clewLocal = new THREE.Vector3(-rigging.boom.length + 0.1, 0, 0);
    clewLocal.applyAxisAngle(new THREE.Vector3(0, 1, 0), boomAngle);
    const clew = new THREE.Vector3(
      mastX + clewLocal.x,
      gooseneckY + clewLocal.y,
      clewLocal.z
    );

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

  const emissive = highlight ? new THREE.Color("hsl(45, 93%, 58%)") : new THREE.Color(0x000000);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#16a34a" roughness={0.7} metalness={0.1} emissive={emissive} emissiveIntensity={highlight ? 0.5 : 0} />
    </mesh>
  );
}

// Clew Tie-Down rope (secures clew to boom end)
function ClewTieDown({
  rigging,
  boomAngle,
  highlight
}: {
  rigging: LaserRiggingParams;
  boomAngle: number;
  highlight: boolean;
}) {
  const geometry = useMemo(() => {
    const gooseneckY = rigging.boom.gooseneckHeight;
    const mastX = rigging.mast.position.x;

    // Clew position (sail corner at boom end)
    const clewLocal = new THREE.Vector3(-rigging.boom.length + 0.05, 0.04, 0);
    clewLocal.applyAxisAngle(new THREE.Vector3(0, 1, 0), boomAngle);
    const clew = new THREE.Vector3(mastX + clewLocal.x, gooseneckY + clewLocal.y, clewLocal.z);

    // Boom end attachment
    const boomEndLocal = new THREE.Vector3(-rigging.boom.length, 0, 0);
    boomEndLocal.applyAxisAngle(new THREE.Vector3(0, 1, 0), boomAngle);
    const boomEnd = new THREE.Vector3(mastX + boomEndLocal.x, gooseneckY + boomEndLocal.y, boomEndLocal.z);

    const points = calculateCatenary(clew, boomEnd, 0.01, 8);
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 12, 0.002, 6, false);
  }, [rigging, boomAngle]);

  const emissive = highlight ? new THREE.Color("hsl(45, 93%, 58%)") : new THREE.Color(0x000000);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#888888" roughness={0.7} metalness={0.1} emissive={emissive} emissiveIntensity={highlight ? 0.5 : 0} />
    </mesh>
  );
}

// Main export
export function RopeLines({
  rigging,
  boomAngle,
  showWireframe = false,
  highlight = false
}: RopeLinesProps) {
  return (
    <group>
      <MainsheetRope rigging={rigging} boomAngle={boomAngle} highlight={highlight} />
      <VangRope rigging={rigging} boomAngle={boomAngle} highlight={highlight} />
      <CunninghamRope rigging={rigging} boomAngle={boomAngle} highlight={highlight} />
      <OuthaulRope rigging={rigging} boomAngle={boomAngle} highlight={highlight} />
      <ClewTieDown rigging={rigging} boomAngle={boomAngle} highlight={highlight} />
      {/* No halyard — Laser uses a sleeve sail that slides over the mast */}
    </group>
  );
}
