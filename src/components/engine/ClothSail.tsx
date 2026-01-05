// Cloth-simulated Sail with wind and tension response
// Battens are on the LEECH (outer free edge), not the luff
// Window and battens follow the cloth simulation
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
  battenStiffness: number; // Extra stiffness from battens
}

interface ClothConstraint {
  p1: number;
  p2: number;
  restLength: number;
  stiffness: number;
}

// Helper to get point index from grid coordinates
const getIdx = (i: number, j: number, segW: number) => j * (segW + 1) + i;

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
  const pointsRef = useRef<ClothPoint[]>([]);

  const { luffLength, footLength, clothSegmentsWidth, clothSegmentsHeight } = rigging.sail;
  const segW = clothSegmentsWidth;
  const segH = clothSegmentsHeight;

  // Initialize cloth particles and constraints
  const { points, constraints, indices, battenPointIndices, windowPointIndices } = useMemo(() => {
    const pts: ClothPoint[] = [];
    const constrs: ClothConstraint[] = [];
    const inds: number[] = [];
    const battenPtIndices: number[][] = []; // For each batten, store point indices along it
    const windowPtIndices: number[] = []; // Points that make up the window area

    // Batten positions (v = vertical position on sail, u=1 is leech)
    const battenPositions = rigging.sail.battens.positions;
    const battenLengths = rigging.sail.battens.lengths;
    
    // Window UV position
    const windowU = rigging.sail.window.position.u;
    const windowV = rigging.sail.window.position.v;
    const windowHalfW = rigging.sail.window.size.width / footLength / 2;
    const windowHalfH = rigging.sail.window.size.height / luffLength / 2;

    // Create grid of points for sail
    for (let j = 0; j <= segH; j++) {
      for (let i = 0; i <= segW; i++) {
        const u = i / segW; // 0 to 1 along foot (0=luff/mast, 1=leech)
        const v = j / segH; // 0 to 1 along luff (0=foot/boom, 1=head)

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

        // Calculate batten stiffness for this point
        // Battens are on the LEECH edge (u close to 1)
        let battenStiffness = 0;
        if (rigging.sail.battens.enabled) {
          for (let bi = 0; bi < battenPositions.length; bi++) {
            const battenV = battenPositions[bi];
            const battenLen = battenLengths[bi] || 0.5;
            const battenUStart = 1 - (battenLen / widthAtHeight); // Where batten starts from leech
            
            // Check if this point is on or near this batten
            if (Math.abs(v - battenV) < 0.05) { // Within batten row
              if (u >= battenUStart) { // Within batten extent
                battenStiffness = rigging.sail.battens.stiffness * 2;
                
                // Track batten points
                if (!battenPtIndices[bi]) battenPtIndices[bi] = [];
                battenPtIndices[bi].push(j * (segW + 1) + i);
              }
            }
          }
        }
        
        // Check if point is in window area
        if (Math.abs(u - windowU) < windowHalfW && Math.abs(v - windowV) < windowHalfH) {
          windowPtIndices.push(j * (segW + 1) + i);
        }

        pts.push({
          position: new THREE.Vector3(x, y, z),
          prevPosition: new THREE.Vector3(x, y, z),
          acceleration: new THREE.Vector3(0, 0, 0),
          fixed: isFixed,
          mass: 0.1,
          u,
          v,
          battenStiffness
        });
      }
    }

    // Create constraints (structural, shear)
    for (let j = 0; j <= segH; j++) {
      for (let i = 0; i <= segW; i++) {
        const idx = getIdx(i, j, segW);

        // Structural horizontal
        if (i < segW) {
          const p1 = idx;
          const p2 = getIdx(i + 1, j, segW);
          // Higher stiffness along battens
          const battenBoost = Math.max(pts[p1].battenStiffness, pts[p2].battenStiffness);
          constrs.push({
            p1, p2,
            restLength: pts[p1].position.distanceTo(pts[p2].position),
            stiffness: 0.95 + battenBoost * 0.04
          });
        }

        // Structural vertical
        if (j < segH) {
          const p1 = idx;
          const p2 = getIdx(i, j + 1, segW);
          constrs.push({
            p1, p2,
            restLength: pts[p1].position.distanceTo(pts[p2].position),
            stiffness: 0.95
          });
        }

        // Shear diagonals
        if (i < segW && j < segH) {
          const p1 = idx;
          const p2 = getIdx(i + 1, j + 1, segW);
          constrs.push({
            p1, p2,
            restLength: pts[p1].position.distanceTo(pts[p2].position),
            stiffness: 0.8
          });
        }
        if (i > 0 && j < segH) {
          const p1 = idx;
          const p2 = getIdx(i - 1, j + 1, segW);
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
        const a = getIdx(i, j, segW);
        const b = getIdx(i + 1, j, segW);
        const c = getIdx(i, j + 1, segW);
        const d = getIdx(i + 1, j + 1, segW);

        inds.push(a, b, c);
        inds.push(b, d, c);
      }
    }

    pointsRef.current = pts;
    
    return { 
      points: pts, 
      constraints: constrs, 
      indices: inds,
      battenPointIndices: battenPtIndices,
      windowPointIndices: windowPtIndices
    };
  }, [luffLength, footLength, segW, segH, rigging.cunninghamTension, rigging.outhaulTension, rigging.sail.battens, rigging.sail.window]);

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
    if (!geometryRef.current || pointsRef.current.length === 0) return;

    const pts = pointsRef.current;
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
    pts.forEach((p) => {
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
      
      // Batten stiffness reduces movement
      if (p.battenStiffness > 0) {
        p.acceleration.multiplyScalar(1 / (1 + p.battenStiffness * 0.5));
      }
    });

    // Verlet integration
    pts.forEach((p) => {
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
        const p1 = pts[c.p1];
        const p2 = pts[c.p2];

        const diff = p2.position.clone().sub(p1.position);
        const dist = diff.length();
        const correction = diff.multiplyScalar((dist - c.restLength) / dist * c.stiffness * 0.5);

        if (!p1.fixed) p1.position.add(correction);
        if (!p2.fixed) p2.position.sub(correction);
      });
    }

    // Update geometry
    const posAttr = geometryRef.current.getAttribute('position') as THREE.BufferAttribute;
    pts.forEach((p, i) => {
      posAttr.setXYZ(i, p.position.x, p.position.y, p.position.z);
    });
    posAttr.needsUpdate = true;
    geometryRef.current.computeVertexNormals();
  });

  const gooseneckY = rigging.boom.gooseneckHeight;
  const emissive = highlight ? new THREE.Color("hsl(45, 93%, 58%)") : new THREE.Color(0x000000);

  // Calculate batten positions from actual cloth points
  const battenMeshes = useMemo(() => {
    if (!rigging.sail.battens.enabled) return [];
    
    return rigging.sail.battens.positions.map((vPos, bi) => {
      const widthAtHeight = footLength * (1 - vPos * 0.95);
      const battenLength = Math.min(rigging.sail.battens.lengths[bi] || 0.5, widthAtHeight * 0.6);
      const leechX = -widthAtHeight;
      const battenCenterX = leechX + battenLength / 2;
      const y = vPos * luffLength;
      return { 
        x: battenCenterX, 
        y, 
        length: battenLength,
        pointIndices: battenPointIndices[bi] || []
      };
    });
  }, [rigging.sail.battens, luffLength, footLength, battenPointIndices]);

  // Window position calculated from average of window points
  const windowPos = useMemo(() => {
    const { u, v } = rigging.sail.window.position;
    const widthAtHeight = footLength * (1 - v * 0.95);
    const x = -u * widthAtHeight;
    const y = v * luffLength;
    return { x, y, pointIndices: windowPointIndices };
  }, [rigging.sail.window.position, luffLength, footLength, windowPointIndices]);

  // Dynamic batten and window positions that follow the cloth
  const BattenMesh = ({ batten, index }: { batten: typeof battenMeshes[0], index: number }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    
    useFrame(() => {
      if (!meshRef.current || batten.pointIndices.length === 0 || pointsRef.current.length === 0) return;
      
      // Get average position of batten points
      let avgX = 0, avgY = 0, avgZ = 0;
      let count = 0;
      batten.pointIndices.forEach(idx => {
        if (pointsRef.current[idx]) {
          avgX += pointsRef.current[idx].position.x;
          avgY += pointsRef.current[idx].position.y;
          avgZ += pointsRef.current[idx].position.z;
          count++;
        }
      });
      
      if (count > 0) {
        meshRef.current.position.set(avgX / count, avgY / count, avgZ / count + 0.01);
      }
    });
    
    return (
      <mesh ref={meshRef} position={[batten.x, batten.y, 0.01]}>
        <boxGeometry args={[batten.length, 0.018, 0.004]} />
        <meshStandardMaterial color="#444444" roughness={0.5} />
      </mesh>
    );
  };
  
  const WindowMesh = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    
    useFrame(() => {
      if (!meshRef.current || windowPos.pointIndices.length === 0 || pointsRef.current.length === 0) return;
      
      // Get average position of window points
      let avgX = 0, avgY = 0, avgZ = 0;
      let count = 0;
      windowPos.pointIndices.forEach(idx => {
        if (pointsRef.current[idx]) {
          avgX += pointsRef.current[idx].position.x;
          avgY += pointsRef.current[idx].position.y;
          avgZ += pointsRef.current[idx].position.z;
          count++;
        }
      });
      
      if (count > 0) {
        meshRef.current.position.set(avgX / count, avgY / count, avgZ / count + 0.02);
      }
    });
    
    return (
      <mesh ref={meshRef} position={[windowPos.x, windowPos.y, 0.02]}>
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
    );
  };

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

      {/* Battens on the LEECH - follow cloth simulation */}
      {battenMeshes.map((b, i) => (
        <BattenMesh key={i} batten={b} index={i} />
      ))}

      {/* Sail window (vinyl) - follows cloth simulation */}
      {rigging.sail.window.enabled && <WindowMesh />}
    </group>
  );
}