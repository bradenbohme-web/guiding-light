// 3D Laser Rigging — Mast, Boom, Sail, Ropes, Pulleys, Traveler (sail system only)
import { useMemo } from "react";
import * as THREE from "three";
import { LaserRiggingParams, DEFAULT_LASER_RIGGING } from "@/lib/parametric/laserRigging";
import { ClothSail } from "./ClothSail";
import { RopeLines } from "./RopeLines";
import { TravelerSystem } from "./TravelerSystem";

interface RiggingMeshProps {
  rigging: LaserRiggingParams;
  showWireframe?: boolean;
  boomAngle?: number;
  windAngle?: number;
  windStrength?: number;
  highlightTarget?: string | null;
  onObjectClick?: (target: { type: string; index?: number }) => void;
}

function MastMesh({ rigging, showWireframe, highlight, onClick }: { rigging: LaserRiggingParams; showWireframe: boolean; highlight: boolean; onClick?: (e: any) => void }) {
  const geometry = useMemo(() => {
    const { height, baseRadius, tipRadius, bend } = rigging.mast;
    const geo = new THREE.CylinderGeometry(tipRadius, baseRadius, height, 32, 24);
    const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < posAttr.count; i++) {
      const y = posAttr.getY(i);
      const normalizedY = (y + height / 2) / height;
      const bendOffset = bend * Math.sin(normalizedY * Math.PI) * normalizedY;
      posAttr.setX(i, posAttr.getX(i) - bendOffset);
    }
    posAttr.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, [rigging.mast]);

  const emissive = highlight ? new THREE.Color("hsl(45, 93%, 58%)") : new THREE.Color(0x000000);

  return (
    <mesh
      geometry={geometry}
      position={[rigging.mast.position.x, rigging.mast.position.y + rigging.mast.height / 2, rigging.mast.position.z]}
      onClick={(e) => { e.stopPropagation(); onClick?.(e); }}
    >
      <meshStandardMaterial color={rigging.mast.color} roughness={0.3} metalness={0.7} wireframe={showWireframe} emissive={emissive} emissiveIntensity={highlight ? 0.5 : 0} />
    </mesh>
  );
}

function BoomMesh({ rigging, showWireframe, angle = 0, highlight, onClick }: { rigging: LaserRiggingParams; showWireframe: boolean; angle: number; highlight: boolean; onClick?: (e: any) => void }) {
  const geometry = useMemo(() => {
    const { length, radius } = rigging.boom;
    return new THREE.CylinderGeometry(radius * 0.9, radius, length, 16, 1);
  }, [rigging.boom]);

  const emissive = highlight ? new THREE.Color("hsl(45, 93%, 58%)") : new THREE.Color(0x000000);

  return (
    <group position={[rigging.boom.position.x, rigging.boom.position.y, rigging.boom.position.z]} rotation={[0, angle, 0]}>
      <mesh geometry={geometry} position={[-rigging.boom.length / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]} onClick={(e) => { e.stopPropagation(); onClick?.(e); }}>
        <meshStandardMaterial color={rigging.boom.color} roughness={0.3} metalness={0.7} wireframe={showWireframe} emissive={emissive} emissiveIntensity={highlight ? 0.5 : 0} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.025, 12, 8]} />
        <meshStandardMaterial color="#333" roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[-rigging.boom.length, 0, 0]}>
        <sphereGeometry args={[rigging.boom.radius, 12, 8]} />
        <meshStandardMaterial color="#333" roughness={0.4} metalness={0.6} />
      </mesh>
    </group>
  );
}

function PulleyMesh({ pulley, showWireframe, boomAngle, rigging, onClick }: {
  pulley: LaserRiggingParams['pulleys'][0]; showWireframe: boolean; boomAngle: number; rigging: LaserRiggingParams; onClick?: (e: any) => void;
}) {
  const position = useMemo(() => {
    const pos = pulley.position.clone();
    if (pulley.attach === "boom") return pos.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), boomAngle).add(rigging.boom.position.clone());
    if (pulley.attach === "mast") return pos.clone().add(rigging.mast.position.clone());
    return pos;
  }, [pulley, boomAngle, rigging]);

  const sheaveCount = pulley.type === "double" ? 2 : pulley.type === "triple" ? 3 : 1;

  return (
    <group position={position}>
      <mesh onClick={(e) => { e.stopPropagation(); onClick?.(e); }}>
        <boxGeometry args={[0.03, 0.05 * sheaveCount, 0.025]} />
        <meshStandardMaterial color={pulley.color} roughness={0.5} metalness={0.3} wireframe={showWireframe} />
      </mesh>
      {Array.from({ length: sheaveCount }).map((_, i) => (
        <mesh key={i} position={[0, (i - (sheaveCount - 1) / 2) * 0.025, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[pulley.radius * 0.8, pulley.radius * 0.15, 6, 16]} />
          <meshStandardMaterial color="#666" roughness={0.3} metalness={0.5} />
        </mesh>
      ))}
      <mesh position={[0, -0.03 * sheaveCount, 0]}>
        <torusGeometry args={[0.008, 0.003, 6, 12]} />
        <meshStandardMaterial color="#888" roughness={0.3} metalness={0.6} />
      </mesh>
    </group>
  );
}

export function RiggingMesh({
  rigging = DEFAULT_LASER_RIGGING,
  showWireframe = false,
  boomAngle = 0,
  windAngle = 0,
  windStrength = 0.5,
  highlightTarget = null,
  onObjectClick,
}: RiggingMeshProps) {
  return (
    <group>
      <MastMesh rigging={rigging} showWireframe={showWireframe} highlight={highlightTarget === "mast"} onClick={() => onObjectClick?.({ type: "mast" })} />
      <BoomMesh rigging={rigging} showWireframe={showWireframe} angle={boomAngle} highlight={highlightTarget === "boom"} onClick={() => onObjectClick?.({ type: "boom" })} />

      <ClothSail
        rigging={rigging}
        boomAngle={boomAngle}
        windAngle={windAngle}
        windStrength={windStrength}
        showWireframe={showWireframe}
        highlight={highlightTarget === "sail"}
        onClick={() => onObjectClick?.({ type: "sail" })}
      />

      <RopeLines
        rigging={rigging}
        boomAngle={boomAngle}
        showWireframe={showWireframe}
        highlightRopeId={highlightTarget?.startsWith("rope-") ? highlightTarget.replace("rope-", "") : null}
        onRopeClick={(index) => onObjectClick?.({ type: "rope", index })}
      />

      <TravelerSystem
        traveler={rigging.traveler}
        showWireframe={showWireframe}
        highlight={highlightTarget === "traveler"}
        onClick={() => onObjectClick?.({ type: "traveler" })}
      />

      {rigging.pulleys.map((pulley, i) => (
        <PulleyMesh key={pulley.id} pulley={pulley} showWireframe={showWireframe} boomAngle={boomAngle} rigging={rigging}
          onClick={() => onObjectClick?.({ type: "pulley", index: i })} />
      ))}
    </group>
  );
}
