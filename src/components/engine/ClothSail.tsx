// Cloth-simulated Sail with wind and tension response
// Battens are on the LEECH (outer free edge), not the luff
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LaserRiggingParams } from "@/lib/parametric/laserRigging";

interface ClothSailProps {
  rigging: LaserRiggingParams;
  boomAngle: number;
  windAngle: number;
  windStrength: number;
  showWireframe?: boolean;
  highlight?: boolean;
}

interface ClothPoint {
  position: THREE.Vector3;
  prevPosition: THREE.Vector3;
  acceleration: THREE.Vector3;
  fixed: boolean;
  mass: number;
  u: number;
  v: number;
}

interface ClothConstraint {
  p1: number;
  p2: number;
  restLength: number;
  stiffness: number;
}

// Cloth simulation for realistic sail deformation
export function ClothSail({
  rigging,
  boomAngle,
  windAngle,
  windStrength,
  showWireframe = false,
  highlight = false
}: ClothSailProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);

  const { luffLength, footLength, clothSegmentsWidth, clothSegmentsHeight } = rigging.sail;
  const segW = clothSegmentsWidth;
  const segH = clothSegmentsHeight;

  // Initialize cloth particles and constraints
  const { points, constraints, indices } = useMemo(() => {
    const pts: ClothPoint[] = [];
    const constrs: ClothConstraint[] = [];
    const inds: number[] = [];

    // Create grid of points for sail
    for (let j = 0; j <= segH; j++) {
      for (let i = 0; i <= segW; i++) {
        const u = i / segW; // 0 to 1 along foot (0=luff, 1=leech)
        const v = j / segH; // 0 to 1 along luff (0=foot, 1=head)

        // Sail shape: triangular with head narrower than foot
        const widthAtHeight = footLength * (1 - v * 0.95);
        const x = -u * widthAtHeight;
        const y = v * luffLength;
        const z = 0;

        // Points along luff (u=0) are fixed to mast
        // Points along foot (v=0) are fixed to boom
        const isLuff = i === 0;
        const isFoot = j === 0;
        const isFixed = isLuff || isFoot;

        pts.push({
          position: new THREE.Vector3(x, y, z),
          prevPosition: new THREE.Vector3(x, y, z),
          acceleration: new THREE.Vector3(0, 0, 0),
          fixed: isFixed,
          mass: 0.1,
          u,
          v
        });
      }
    }

    // Create constraints (structural, shear)
    const getIdx = (i: number, j: number) => j * (segW + 1) + i;

    for (let j = 0; j <= segH; j++) {
      for (let i = 0; i <= segW; i++) {
        const idx = getIdx(i, j);

        // Structural horizontal
        if (i < segW) {
          const p1 = idx;
          const p2 = getIdx(i + 1, j);
          constrs.push({
            p1, p2,
            restLength: pts[p1].position.distanceTo(pts[p2].position),
            stiffness: 0.95
          });
        }

        // Structural vertical
        if (j < segH) {
          const p1 = idx;
          const p2 = getIdx(i, j + 1);
          constrs.push({
            p1, p2,
            restLength: pts[p1].position.distanceTo(pts[p2].position),
            stiffness: 0.95
          });
        }

        // Shear diagonals
        if (i < segW && j < segH) {
          const p1 = idx;
          const p2 = getIdx(i + 1, j + 1);
          constrs.push({
            p1, p2,
            restLength: pts[p1].position.distanceTo(pts[p2].position),
            stiffness: 0.8
          });
        }
        if (i > 0 && j < segH) {
          const p1 = idx;
          const p2 = getIdx(i - 1, j + 1);
          constrs.push({
            p1, p2,
            restLength: pts[p1].position.distanceTo(pts[p2].position),
            stiffness: 0.8
          });
        }
      }
    }

    // Apply tension modifiers from rigging
    const cunninghamMod = 1 + rigging.cunninghamTension * 0.3;
    const outhaulMod = 1 + rigging.outhaulTension * 0.3;

    constrs.forEach(c => {
      const p1 = pts[c.p1];
      const p2 = pts[c.p2];

      // Near luff - cunningham
      if (p1.u < 0.15 || p2.u < 0.15) {
        c.stiffness *= cunninghamMod;
      }

      // Near foot - outhaul
      if (p1.v < 0.1 || p2.v < 0.1) {
        c.stiffness *= outhaulMod;
      }
    });

    // Generate triangle indices
    for (let j = 0; j < segH; j++) {
      for (let i = 0; i < segW; i++) {
        const a = getIdx(i, j);
        const b = getIdx(i + 1, j);
        const c = getIdx(i, j + 1);
        const d = getIdx(i + 1, j + 1);

        inds.push(a, b, c);
        inds.push(b, d, c);
      }
    }

    return { points: pts, constraints: constrs, indices: inds };
  }, [luffLength, footLength, segW, segH, rigging.cunninghamTension, rigging.outhaulTension]);

  // Create geometry
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();

    const positions = new Float32Array(points.length * 3);
    const normals = new Float32Array(points.length * 3);
    const uvs = new Float32Array(points.length * 2);

    points.forEach((p, i) => {
      positions[i * 3] = p.position.x;
      positions[i * 3 + 1] = p.position.y;
      positions[i * 3 + 2] = p.position.z;
      normals[i * 3 + 2] = 1;
      uvs[i * 2] = p.u;
      uvs[i * 2 + 1] = p.v;
    });

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geo.setIndex(indices);

    geometryRef.current = geo;
    return geo;
  }, [points, indices]);

  // Physics simulation
  useFrame((_, delta) => {
    if (!geometryRef.current) return;

    const dt = Math.min(delta, 0.016);
    const gravity = new THREE.Vector3(0, -0.5, 0);
    const damping = 0.97;

    // Wind force
    const apparentWindAngle = windAngle - boomAngle;
    const windDir = new THREE.Vector3(
      Math.sin(apparentWindAngle),
      0,
      Math.cos(apparentWindAngle)
    ).multiplyScalar(windStrength * 2);

    // Apply forces to points
    points.forEach((p) => {
      if (p.fixed) return;

      p.acceleration.set(0, 0, 0);
      p.acceleration.add(gravity);

      const windForce = windDir.clone();
      const turbulence = (Math.sin(Date.now() * 0.003 + p.position.y * 2) * 0.15 + 1);
      windForce.multiplyScalar(turbulence / p.mass);
      p.acceleration.add(windForce);

      // Vang effect - pulls leech down when tensioned
      if (p.u > 0.7) {
        const vangPull = new THREE.Vector3(0, -rigging.vangTension * 0.5, 0);
        p.acceleration.add(vangPull);
      }
    });

    // Verlet integration
    points.forEach((p) => {
      if (p.fixed) return;

      const newPos = p.position.clone()
        .multiplyScalar(2)
        .sub(p.prevPosition)
        .add(p.acceleration.clone().multiplyScalar(dt * dt));

      p.prevPosition.copy(p.position);
      p.position.copy(newPos);

      const vel = p.position.clone().sub(p.prevPosition);
      vel.multiplyScalar(damping);
      p.prevPosition.copy(p.position.clone().sub(vel));
    });

    // Satisfy constraints
    const iterations = 5;
    for (let iter = 0; iter < iterations; iter++) {
      constraints.forEach((c) => {
        const p1 = points[c.p1];
        const p2 = points[c.p2];

        const diff = p2.position.clone().sub(p1.position);
        const dist = diff.length();
        const correction = diff.multiplyScalar((dist - c.restLength) / dist * c.stiffness * 0.5);

        if (!p1.fixed) p1.position.add(correction);
        if (!p2.fixed) p2.position.sub(correction);
      });
    }

    // Update geometry
    const posAttr = geometryRef.current.getAttribute('position') as THREE.BufferAttribute;
    points.forEach((p, i) => {
      posAttr.setXYZ(i, p.position.x, p.position.y, p.position.z);
    });
    posAttr.needsUpdate = true;
    geometryRef.current.computeVertexNormals();
  });

  const gooseneckY = rigging.boom.gooseneckHeight;
  const emissive = highlight ? new THREE.Color("hsl(45, 93%, 58%)") : new THREE.Color(0x000000);

  // Calculate batten positions on the LEECH (u ≈ 1, outer edge)
  const battens = useMemo(() => {
    if (!rigging.sail.battens.enabled) return [];
    return rigging.sail.battens.positions.map((vPos, i) => {
      const widthAtHeight = footLength * (1 - vPos * 0.95);
      const battenLength = Math.min(rigging.sail.battens.lengths[i] || 0.5, widthAtHeight * 0.6);
      // Position from leech inward (leech is at x = -widthAtHeight)
      const leechX = -widthAtHeight;
      const battenCenterX = leechX + battenLength / 2;
      const y = vPos * luffLength;
      return { x: battenCenterX, y, length: battenLength };
    });
  }, [rigging.sail.battens, luffLength, footLength]);

  // Window position using UV coordinates
  const windowPos = useMemo(() => {
    const { u, v } = rigging.sail.window.position;
    const widthAtHeight = footLength * (1 - v * 0.95);
    const x = -u * widthAtHeight;
    const y = v * luffLength;
    return { x, y };
  }, [rigging.sail.window.position, luffLength, footLength]);

  return (
    <group
      position={[rigging.mast.position.x, gooseneckY, 0]}
      rotation={[0, boomAngle, 0]}
    >
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color={rigging.sail.color}
          roughness={0.85}
          metalness={0}
          transparent
          opacity={rigging.sail.opacity}
          side={THREE.DoubleSide}
          wireframe={showWireframe}
          emissive={emissive}
          emissiveIntensity={highlight ? 0.3 : 0}
        />
      </mesh>

      {/* Battens on the LEECH (free outer edge) */}
      {battens.map((b, i) => (
        <mesh
          key={i}
          position={[b.x, b.y, 0.01]}
        >
          <boxGeometry args={[b.length, 0.018, 0.004]} />
          <meshStandardMaterial color="#444444" roughness={0.5} />
        </mesh>
      ))}

      {/* Sail window (vinyl) */}
      {rigging.sail.window.enabled && (
        <mesh
          position={[windowPos.x, windowPos.y, 0.02]}
        >
          <planeGeometry args={[rigging.sail.window.size.width, rigging.sail.window.size.height]} />
          <meshStandardMaterial
            color="#99ccff"
            transparent
            opacity={0.35}
            roughness={0.05}
            metalness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}
