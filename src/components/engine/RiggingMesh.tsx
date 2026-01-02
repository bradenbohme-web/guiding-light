// 3D Laser Rigging Components - Mast, Boom, Sail, Rudder, Centerboard
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { LaserRiggingParams, DEFAULT_LASER_RIGGING } from "@/lib/parametric/laserRigging";

interface RiggingMeshProps {
  rigging: LaserRiggingParams;
  showWireframe?: boolean;
  boomAngle?: number;
  rudderAngle?: number;
}

// Mast Component
function MastMesh({ rigging, showWireframe }: { rigging: LaserRiggingParams; showWireframe: boolean }) {
  const geometry = useMemo(() => {
    const { height, baseRadius, tipRadius } = rigging.mast;
    return new THREE.CylinderGeometry(tipRadius, baseRadius, height, 16, 1);
  }, [rigging.mast]);

  return (
    <mesh 
      geometry={geometry}
      position={[rigging.mast.position.x, rigging.mast.height / 2 + 0.1, rigging.mast.position.z]}
    >
      <meshStandardMaterial 
        color={rigging.mast.color}
        roughness={0.35}
        metalness={0.6}
        wireframe={showWireframe}
      />
    </mesh>
  );
}

// Boom Component
function BoomMesh({ 
  rigging, 
  showWireframe, 
  angle = 0 
}: { 
  rigging: LaserRiggingParams; 
  showWireframe: boolean;
  angle: number;
}) {
  const geometry = useMemo(() => {
    const { length, radius } = rigging.boom;
    return new THREE.CylinderGeometry(radius, radius, length, 12, 1);
  }, [rigging.boom]);

  // Boom rotates around the gooseneck
  const gooseneckY = rigging.boom.gooseneckHeight;
  
  return (
    <group 
      position={[rigging.mast.position.x, gooseneckY, 0]}
      rotation={[0, angle, 0]}
    >
      <mesh 
        geometry={geometry}
        position={[-rigging.boom.length / 2, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <meshStandardMaterial 
          color={rigging.boom.color}
          roughness={0.35}
          metalness={0.6}
          wireframe={showWireframe}
        />
      </mesh>
    </group>
  );
}

// Simple sail shape (flat approximation - full cloth sim would be separate)
function SailMesh({ 
  rigging, 
  showWireframe, 
  boomAngle = 0 
}: { 
  rigging: LaserRiggingParams; 
  showWireframe: boolean;
  boomAngle: number;
}) {
  const geometry = useMemo(() => {
    const { luffLength, footLength, headWidth } = rigging.sail;
    
    // Create triangular sail shape
    const shape = new THREE.Shape();
    shape.moveTo(0, 0); // Tack (bottom front)
    shape.lineTo(-footLength, 0); // Clew (bottom back)
    shape.lineTo(-headWidth / 2, luffLength); // Head (top)
    shape.lineTo(0, 0); // Close
    
    const geometry = new THREE.ShapeGeometry(shape, 12);
    return geometry;
  }, [rigging.sail]);

  const gooseneckY = rigging.boom.gooseneckHeight;

  return (
    <group 
      position={[rigging.mast.position.x, gooseneckY, 0]}
      rotation={[0, boomAngle, 0]}
    >
      <mesh 
        geometry={geometry}
        rotation={[Math.PI / 2, 0, Math.PI]}
        position={[0, 0, 0.01]}
      >
        <meshStandardMaterial 
          color={rigging.sail.color}
          roughness={0.9}
          metalness={0}
          transparent
          opacity={rigging.sail.opacity}
          side={THREE.DoubleSide}
          wireframe={showWireframe}
        />
      </mesh>
      
      {/* Battens */}
      {rigging.sail.battens.enabled && rigging.sail.battens.positions.map((pos, i) => {
        const y = pos * rigging.sail.luffLength;
        const battenLength = rigging.sail.battens.lengths[i] || 0.5;
        return (
          <mesh 
            key={i}
            position={[-battenLength / 2, y, 0.02]}
            rotation={[0, 0, 0]}
          >
            <boxGeometry args={[battenLength, 0.015, 0.003]} />
            <meshStandardMaterial color="#333" roughness={0.5} />
          </mesh>
        );
      })}
      
      {/* Sail window (vinyl) */}
      {rigging.sail.window.enabled && (
        <mesh
          position={[
            -rigging.sail.footLength * rigging.sail.window.position.u,
            rigging.sail.luffLength * rigging.sail.window.position.v,
            0.015
          ]}
        >
          <planeGeometry args={[rigging.sail.window.size.width, rigging.sail.window.size.height]} />
          <meshStandardMaterial 
            color="#88bbff"
            transparent
            opacity={0.4}
            roughness={0.1}
            metalness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

// Centerboard (NACA foil approximation)
function CenterboardMesh({ 
  rigging, 
  showWireframe 
}: { 
  rigging: LaserRiggingParams; 
  showWireframe: boolean;
}) {
  const geometry = useMemo(() => {
    const { chord, span, thickness, tipChordScale } = rigging.centerboard;
    
    // Create foil shape using lathe/extrusion
    const shape = new THREE.Shape();
    const hw = chord / 2;
    const th = thickness / 2;
    
    // Simple foil cross-section (NACA approximation)
    shape.moveTo(hw, 0);
    shape.quadraticCurveTo(0, th * 2, -hw, 0);
    shape.quadraticCurveTo(0, -th * 2, hw, 0);
    
    const extrudeSettings = {
      steps: 1,
      depth: span,
      bevelEnabled: false
    };
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [rigging.centerboard]);

  const deployedOffset = -rigging.centerboard.span * rigging.centerboard.deployment;

  return (
    <mesh 
      geometry={geometry}
      position={[rigging.centerboard.position.x, deployedOffset, 0]}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <meshStandardMaterial 
        color={rigging.centerboard.color}
        roughness={0.65}
        metalness={0.12}
        wireframe={showWireframe}
      />
    </mesh>
  );
}

// Rudder System
function RudderMesh({ 
  rigging, 
  showWireframe, 
  angle = 0 
}: { 
  rigging: LaserRiggingParams; 
  showWireframe: boolean;
  angle: number;
}) {
  const bladeGeometry = useMemo(() => {
    const { chord, span, thickness } = rigging.rudder.blade;
    return new THREE.BoxGeometry(chord, span, thickness);
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

  return (
    <group 
      position={[rigging.rudder.blade.position.x, rigging.rudder.blade.position.y, 0]}
      rotation={[0, rudderAngleRad, 0]}
    >
      {/* Rudder blade */}
      <mesh 
        geometry={bladeGeometry}
        position={[0, -rigging.rudder.blade.span / 2, 0]}
      >
        <meshStandardMaterial 
          color={rigging.rudder.blade.color}
          roughness={0.65}
          metalness={0.12}
          wireframe={showWireframe}
        />
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
          metalness={0.1}
          wireframe={showWireframe}
        />
      </mesh>
      
      {/* Tiller extension */}
      <group 
        position={[
          rigging.rudder.tiller.offset.x + rigging.rudder.tiller.length,
          rigging.rudder.tiller.offset.y,
          0
        ]}
        rotation={[0, (rigging.rudder.extension.hingeAngle / 180) * Math.PI, 0]}
      >
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
      </group>
    </group>
  );
}

// Pulley/Block visualization
function PulleyMesh({ 
  pulley, 
  showWireframe 
}: { 
  pulley: LaserRiggingParams['pulleys'][0]; 
  showWireframe: boolean;
}) {
  return (
    <mesh position={[pulley.position.x, pulley.position.y, pulley.position.z]}>
      <cylinderGeometry args={[pulley.radius, pulley.radius, 0.02, 12]} />
      <meshStandardMaterial 
        color={pulley.color}
        roughness={0.6}
        metalness={0.25}
        wireframe={showWireframe}
      />
    </mesh>
  );
}

// Main Rigging Assembly
export function RiggingMesh({ 
  rigging = DEFAULT_LASER_RIGGING, 
  showWireframe = false,
  boomAngle = 0,
  rudderAngle = 0
}: RiggingMeshProps) {
  return (
    <group>
      <MastMesh rigging={rigging} showWireframe={showWireframe} />
      <BoomMesh rigging={rigging} showWireframe={showWireframe} angle={boomAngle} />
      <SailMesh rigging={rigging} showWireframe={showWireframe} boomAngle={boomAngle} />
      <CenterboardMesh rigging={rigging} showWireframe={showWireframe} />
      <RudderMesh rigging={rigging} showWireframe={showWireframe} angle={rudderAngle} />
      
      {/* Pulleys */}
      {rigging.pulleys.map((pulley) => (
        <PulleyMesh key={pulley.id} pulley={pulley} showWireframe={showWireframe} />
      ))}
    </group>
  );
}
