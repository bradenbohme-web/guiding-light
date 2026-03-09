// 3D Laser Rigging Components - Mast, Boom, Centerboard, Rudder, Pulleys, Traveler
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
  rudderAngle?: number;
  windAngle?: number;
  windStrength?: number;
  highlightTarget?: string | null;
  onObjectClick?: (target: { type: string; index?: number }) => void;
}

// Mast Component with tapered cylinder and pre-bend
function MastMesh({ rigging, showWireframe, highlight, onClick }: { rigging: LaserRiggingParams; showWireframe: boolean; highlight: boolean; onClick?: (e: any) => void }) {
  const geometry = useMemo(() => {
    const { height, baseRadius, tipRadius, bend } = rigging.mast;
    const segments = 32;
    const heightSegments = 24;

    const geo = new THREE.CylinderGeometry(tipRadius, baseRadius, height, segments, heightSegments);

    // Apply pre-bend
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
      position={[
        rigging.mast.position.x,
        rigging.mast.position.y + rigging.mast.height / 2,
        rigging.mast.position.z,
      ]}
      onClick={(e) => { e.stopPropagation(); onClick?.(e); }}
    >
      <meshStandardMaterial
        color={rigging.mast.color}
        roughness={0.3}
        metalness={0.7}
        wireframe={showWireframe}
        emissive={emissive}
        emissiveIntensity={highlight ? 0.5 : 0}
      />
    </mesh>
  );
}

// Boom Component
function BoomMesh({
  rigging,
  showWireframe,
  angle = 0,
  highlight,
  onClick
}: {
  rigging: LaserRiggingParams;
  showWireframe: boolean;
  angle: number;
  highlight: boolean;
  onClick?: (e: any) => void;
}) {
  const geometry = useMemo(() => {
    const { length, radius } = rigging.boom;
    return new THREE.CylinderGeometry(radius * 0.9, radius, length, 16, 1);
  }, [rigging.boom]);

  const gooseneckY = rigging.boom.gooseneckHeight;
  const emissive = highlight ? new THREE.Color("hsl(45, 93%, 58%)") : new THREE.Color(0x000000);

  return (
    <group
      position={[rigging.boom.position.x, rigging.boom.position.y, rigging.boom.position.z]}
      rotation={[0, angle, 0]}
    >
      <mesh
        geometry={geometry}
        position={[-rigging.boom.length / 2, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        onClick={(e) => { e.stopPropagation(); onClick?.(e); }}
      >
        <meshStandardMaterial
          color={rigging.boom.color}
          roughness={0.3}
          metalness={0.7}
          wireframe={showWireframe}
          emissive={emissive}
          emissiveIntensity={highlight ? 0.5 : 0}
        />
      </mesh>

      {/* Gooseneck fitting */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.025, 12, 8]} />
        <meshStandardMaterial color="#333" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Boom end cap */}
      <mesh position={[-rigging.boom.length, 0, 0]}>
        <sphereGeometry args={[rigging.boom.radius, 12, 8]} />
        <meshStandardMaterial color="#333" roughness={0.4} metalness={0.6} />
      </mesh>
    </group>
  );
}

// Centerboard (NACA foil approximation)
function CenterboardMesh({
  rigging,
  showWireframe,
  highlight
}: {
  rigging: LaserRiggingParams;
  showWireframe: boolean;
  highlight: boolean;
}) {
  const geometry = useMemo(() => {
    const { chord, span, thickness } = rigging.centerboard;

    // Create NACA-like foil cross-section
    const shape = new THREE.Shape();
    const steps = 20;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = chord * (1 - t) - chord / 2;
      const y = thickness * 5 * (0.2969 * Math.sqrt(t) - 0.1260 * t - 0.3516 * t * t + 0.2843 * t * t * t - 0.1015 * t * t * t * t);
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    for (let i = steps; i >= 0; i--) {
      const t = i / steps;
      const x = chord * (1 - t) - chord / 2;
      const y = -thickness * 5 * (0.2969 * Math.sqrt(t) - 0.1260 * t - 0.3516 * t * t + 0.2843 * t * t * t - 0.1015 * t * t * t * t);
      shape.lineTo(x, y);
    }

    const extrudeSettings = {
      steps: 1,
      depth: span,
      bevelEnabled: false
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [rigging.centerboard]);

  const deployedOffset = -rigging.centerboard.span * rigging.centerboard.deployment;
  const emissive = highlight ? new THREE.Color("hsl(45, 93%, 58%)") : new THREE.Color(0x000000);

  return (
    <group position={[rigging.centerboard.position.x, deployedOffset - 0.05, 0]}>
      <mesh
        geometry={geometry}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          color={rigging.centerboard.color}
          roughness={0.6}
          metalness={0.15}
          wireframe={showWireframe}
          emissive={emissive}
          emissiveIntensity={highlight ? 0.4 : 0}
        />
      </mesh>

      {/* Centerboard handle */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.15, 0.02, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
    </group>
  );
}

// Rudder System with blade, tiller, and extension
function RudderMesh({
  rigging,
  showWireframe,
  angle = 0,
  highlight
}: {
  rigging: LaserRiggingParams;
  showWireframe: boolean;
  angle: number;
  highlight: boolean;
}) {
  const bladeGeometry = useMemo(() => {
    const { chord, span, thickness } = rigging.rudder.blade;

    const shape = new THREE.Shape();
    const steps = 16;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = chord * (1 - t) - chord / 2;
      const y = thickness * 4 * (0.2969 * Math.sqrt(t) - 0.1260 * t - 0.3516 * t * t + 0.2843 * t * t * t - 0.1015 * t * t * t * t);
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    for (let i = steps; i >= 0; i--) {
      const t = i / steps;
      const x = chord * (1 - t) - chord / 2;
      const y = -thickness * 4 * (0.2969 * Math.sqrt(t) - 0.1260 * t - 0.3516 * t * t + 0.2843 * t * t * t - 0.1015 * t * t * t * t);
      shape.lineTo(x, y);
    }

    const extrudeSettings = { steps: 1, depth: span, bevelEnabled: false };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [rigging.rudder.blade]);

  const tillerGeometry = useMemo(() => {
    const { length, width, thickness } = rigging.rudder.tiller;
    return new THREE.BoxGeometry(length, thickness, width);
  }, [rigging.rudder.tiller]);

  const extensionGeometry = useMemo(() => {
    const { length, radius } = rigging.rudder.extension;
    return new THREE.CylinderGeometry(radius, radius, length, 8);
  }, [rigging.rudder.extension]);

  const rudderAngleRad = (angle / 180) * Math.PI;
  const emissive = highlight ? new THREE.Color("hsl(45, 93%, 58%)") : new THREE.Color(0x000000);

  return (
    <group
      position={[rigging.rudder.blade.position.x, rigging.rudder.blade.position.y, 0]}
      rotation={[0, rudderAngleRad, 0]}
    >
      {/* Rudder blade */}
      <mesh
        geometry={bladeGeometry}
        position={[0, -rigging.rudder.blade.span / 2, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          color={rigging.rudder.blade.color}
          roughness={0.6}
          metalness={0.15}
          wireframe={showWireframe}
          emissive={emissive}
          emissiveIntensity={highlight ? 0.4 : 0}
        />
      </mesh>

      {/* Rudder head/cheeks */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.08, 0.1, 0.04]} />
        <meshStandardMaterial color="#333" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Tiller */}
      <mesh
        geometry={tillerGeometry}
        position={[
          rigging.rudder.tiller.offset.x + rigging.rudder.tiller.length / 2,
          rigging.rudder.tiller.offset.y,
          0
        ]}
      >
        <meshStandardMaterial
          color={rigging.rudder.tiller.color}
          roughness={0.7}
          metalness={0.05}
          wireframe={showWireframe}
        />
      </mesh>

      {/* Tiller extension hinge */}
      <group
        position={[
          rigging.rudder.tiller.offset.x + rigging.rudder.tiller.length,
          rigging.rudder.tiller.offset.y,
          0
        ]}
      >
        {/* Hinge */}
        <mesh>
          <cylinderGeometry args={[0.015, 0.015, 0.03, 8]} />
          <meshStandardMaterial color="#333" roughness={0.4} metalness={0.5} />
        </mesh>

        {/* Extension */}
        <group rotation={[0, (rigging.rudder.extension.hingeAngle / 180) * Math.PI, 0]}>
          <mesh
            geometry={extensionGeometry}
            position={[rigging.rudder.extension.length / 2, 0, 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <meshStandardMaterial
              color={rigging.rudder.extension.color}
              roughness={0.5}
              metalness={0.2}
              wireframe={showWireframe}
            />
          </mesh>

          {/* Extension grip */}
          <mesh position={[rigging.rudder.extension.length, 0, 0]}>
            <sphereGeometry args={[0.018, 8, 6]} />
            <meshStandardMaterial color="#555" roughness={0.8} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// Pulley/Block visualization with sheave
function PulleyMesh({
  pulley,
  showWireframe,
  boomAngle,
  rigging
}: {
  pulley: LaserRiggingParams['pulleys'][0];
  showWireframe: boolean;
  boomAngle: number;
  rigging: LaserRiggingParams;
}) {
  // Transform position based on attachment
  const position = useMemo(() => {
    const pos = pulley.position.clone();

    if (pulley.attach === "boom") {
      const rotated = pos.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), boomAngle);
      return rotated.add(rigging.boom.position.clone());
    }

    if (pulley.attach === "mast") {
      return pos.clone().add(rigging.mast.position.clone());
    }

    return pos;
  }, [pulley, boomAngle, rigging]);

  const sheaveCount = pulley.type === "double" ? 2 : pulley.type === "triple" ? 3 : 1;

  return (
    <group position={position}>
      {/* Block housing */}
      <mesh onClick={(e) => { e.stopPropagation(); onClick?.(e); }}>
        <boxGeometry args={[0.03, 0.05 * sheaveCount, 0.025]} />
        <meshStandardMaterial
          color={pulley.color}
          roughness={0.5}
          metalness={0.3}
          wireframe={showWireframe}
        />
      </mesh>

      {/* Sheaves */}
      {Array.from({ length: sheaveCount }).map((_, i) => (
        <mesh
          key={i}
          position={[0, (i - (sheaveCount - 1) / 2) * 0.025, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[pulley.radius * 0.8, pulley.radius * 0.15, 6, 16]} />
          <meshStandardMaterial color="#666" roughness={0.3} metalness={0.5} />
        </mesh>
      ))}

      {/* Becket/shackle */}
      <mesh position={[0, -0.03 * sheaveCount, 0]}>
        <torusGeometry args={[0.008, 0.003, 6, 12]} />
        <meshStandardMaterial color="#888" roughness={0.3} metalness={0.6} />
      </mesh>
    </group>
  );
}

// Hiking strap
function HikingStrap() {
  const geometry = useMemo(() => {
    const start = new THREE.Vector3(0.3, 0.08, 0);
    const mid = new THREE.Vector3(-0.25, 0.12, 0);
    const end = new THREE.Vector3(-0.8, 0.08, 0);

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return new THREE.TubeGeometry(curve, 20, 0.015, 8, false);
  }, []);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#222" roughness={0.85} metalness={0} />
    </mesh>
  );
}

// Main Rigging Assembly
export function RiggingMesh({
  rigging = DEFAULT_LASER_RIGGING,
  showWireframe = false,
  boomAngle = 0,
  rudderAngle = 0,
  windAngle = 0,
  windStrength = 0.5,
  highlightTarget = null,
  onObjectClick
}: RiggingMeshProps) {
  return (
    <group>
      <MastMesh
        rigging={rigging}
        showWireframe={showWireframe}
        highlight={highlightTarget === "mast"}
        onClick={() => onObjectClick?.({ type: "mast" })}
      />
      <BoomMesh
        rigging={rigging}
        showWireframe={showWireframe}
        angle={boomAngle}
        highlight={highlightTarget === "boom"}
        onClick={() => onObjectClick?.({ type: "boom" })}
      />

      <ClothSail
        rigging={rigging}
        boomAngle={boomAngle}
        windAngle={windAngle}
        windStrength={windStrength}
        showWireframe={showWireframe}
        highlight={highlightTarget === "sail"}
      />

      <RopeLines
        rigging={rigging}
        boomAngle={boomAngle}
        showWireframe={showWireframe}
        highlight={highlightTarget === "ropes"}
      />

      <TravelerSystem
        traveler={rigging.traveler}
        showWireframe={showWireframe}
        highlight={highlightTarget === "traveler"}
      />

      <CenterboardMesh rigging={rigging} showWireframe={showWireframe} highlight={highlightTarget === "centerboard"} />
      <RudderMesh rigging={rigging} showWireframe={showWireframe} angle={rudderAngle} highlight={highlightTarget === "rudder"} />
      <HikingStrap />

      {rigging.pulleys.map((pulley, i) => (
        <PulleyMesh
          key={pulley.id}
          pulley={pulley}
          showWireframe={showWireframe}
          boomAngle={boomAngle}
          rigging={rigging}
          onClick={() => onObjectClick?.({ type: "pulley", index: i })}
        />
      ))}
    </group>
  );
}
