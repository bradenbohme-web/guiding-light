import { useMemo } from "react";
import * as THREE from "three";
import { LaserRiggingParams, PulleyParams, Hardpoint, RopeParams } from "@/lib/parametric/laserRigging";

interface RopeLinesProps {
  rigging: LaserRiggingParams;
  boomAngle: number;
  showWireframe?: boolean;
  highlight?: boolean;
}

const Y_AXIS = new THREE.Vector3(0, 1, 0);

function calculateCatenary(start: THREE.Vector3, end: THREE.Vector3, sag: number, segments: number = 14): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const distance = start.distanceTo(end);

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const pos = start.clone().lerp(end, t);
    const sagAmount = sag * Math.sin(t * Math.PI) * Math.max(0.25, distance);
    pos.y -= sagAmount;
    points.push(pos);
  }

  return points;
}

function toWorldPosition(local: THREE.Vector3, attach: PulleyParams["attach"] | Hardpoint["attach"], rigging: LaserRiggingParams, boomAngle: number) {
  if (attach === "boom") {
    const rotated = local.clone().applyAxisAngle(Y_AXIS, boomAngle);
    return rotated.add(rigging.boom.position.clone());
  }

  if (attach === "mast") {
    return local.clone().add(rigging.mast.position.clone());
  }

  return local.clone();
}

function resolvePointById(id: string, rigging: LaserRiggingParams, boomAngle: number): THREE.Vector3 | null {
  if (id === "mainsheet_traveler") {
    return new THREE.Vector3(rigging.traveler.x, rigging.traveler.y - 0.01, rigging.traveler.carZ);
  }

  const pulley = rigging.pulleys.find((p) => p.id === id);
  if (pulley) return toWorldPosition(pulley.position, pulley.attach, rigging, boomAngle);

  const hardpoint = rigging.hardpoints.find((h) => h.id === id);
  if (hardpoint) return toWorldPosition(hardpoint.position, hardpoint.attach, rigging, boomAngle);

  return null;
}

function buildRopeGeometry(rope: RopeParams, rigging: LaserRiggingParams, boomAngle: number) {
  const allPoints: THREE.Vector3[] = [];
  const sag = (1 - rope.tension) * (0.025 + rope.elasticity * 0.4);

  for (const segment of rope.segments) {
    const ordered = [segment.startPoint, ...segment.throughPulleys, segment.endPoint]
      .filter(Boolean)
      .filter((id, index, arr) => index === 0 || id !== arr[index - 1]);

    if (ordered.length < 2) continue;

    for (let i = 0; i < ordered.length - 1; i++) {
      const start = resolvePointById(ordered[i], rigging, boomAngle);
      const end = resolvePointById(ordered[i + 1], rigging, boomAngle);
      if (!start || !end) continue;

      const legPoints = calculateCatenary(start, end, sag, 12);
      if (allPoints.length > 0 && legPoints.length > 0) {
        legPoints.shift();
      }
      allPoints.push(...legPoints);
    }
  }

  if (allPoints.length < 2) return null;

  const curve = new THREE.CatmullRomCurve3(allPoints, false, "centripetal");
  const radius = Math.max(0.0018, rope.diameter * 0.45);
  return new THREE.TubeGeometry(curve, Math.max(16, allPoints.length * 2), radius, 8, false);
}

function RopeMesh({ rope, rigging, boomAngle, showWireframe, highlight }: {
  rope: RopeParams;
  rigging: LaserRiggingParams;
  boomAngle: number;
  showWireframe: boolean;
  highlight: boolean;
}) {
  const geometry = useMemo(() => buildRopeGeometry(rope, rigging, boomAngle), [rope, rigging, boomAngle]);
  const emissive = highlight ? new THREE.Color("hsl(45, 93%, 58%)") : new THREE.Color(0x000000);

  if (!geometry) return null;

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color={rope.color}
        roughness={0.68}
        metalness={0.08}
        wireframe={showWireframe}
        emissive={emissive}
        emissiveIntensity={highlight ? 0.5 : 0}
      />
    </mesh>
  );
}

export function RopeLines({ rigging, boomAngle, showWireframe = false, highlight = false }: RopeLinesProps) {
  return (
    <group>
      {rigging.ropes.map((rope) => (
        <RopeMesh
          key={rope.id}
          rope={rope}
          rigging={rigging}
          boomAngle={boomAngle}
          showWireframe={showWireframe}
          highlight={highlight}
        />
      ))}
    </group>
  );
}
