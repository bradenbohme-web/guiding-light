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
  windowStiffness: number; // Extra stiffness from the vinyl window panel region
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
  const windowGeometryRef = useRef<THREE.BufferGeometry | null>(null);
  const battenMeshRefs = useRef<THREE.Mesh[]>([]);
  const pointsRef = useRef<ClothPoint[]>([]);

  const { luffLength, footLength, clothSegmentsWidth, clothSegmentsHeight } = rigging.sail;
  const segW = clothSegmentsWidth;
  const segH = clothSegmentsHeight;

  // Initialize cloth particles and constraints
  const { points, constraints, indices, battenPointIndices, windowPointIndices, windowMeshData } = useMemo(() => {
    const pts: ClothPoint[] = [];
    const constrs: ClothConstraint[] = [];
    const inds: number[] = [];
    const battenPtIndices: number[][] = []; // For each batten, store point indices along it
    const windowPtIndices: number[] = []; // Points that make up the window area

    // Batten positions (v = vertical position on sail, u=1 is leech)
    const battenPositions = rigging.sail.battens.positions;
    const battenLengths = rigging.sail.battens.lengths;

    // Snap each batten to exactly one cloth row to prevent cross-row zigzag constraints
    const battenRows = rigging.sail.battens.enabled
      ? battenPositions.map((battenV, bi) => {
          const row = THREE.MathUtils.clamp(Math.round(battenV * segH), 0, segH);
          const rowV = row / segH;
          const widthAtRow = footLength * (1 - rowV * 0.95);
          const battenLen = Math.max(0, battenLengths[bi] || 0.5);
          const battenUStart = Math.max(0, 1 - battenLen / Math.max(widthAtRow, 1e-6));

          return { row, battenUStart };
        })
      : [];
    
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
        // Battens are on the LEECH edge (u close to 1), pinned to one row each
        let battenStiffness = 0;
        if (rigging.sail.battens.enabled) {
          for (let bi = 0; bi < battenRows.length; bi++) {
            const { row, battenUStart } = battenRows[bi];
            // Per-batten stiffness: use stiffnesses[] if available, fallback to global
            const perBattenStiff = rigging.sail.battens.stiffnesses?.[bi] ?? rigging.sail.battens.stiffness;

            // Single-row membership prevents zigzagging across adjacent rows
            if (j === row && u >= battenUStart) {
              battenStiffness = Math.max(battenStiffness, perBattenStiff * 2);

              // Track batten points in row order for stable constraints
              if (!battenPtIndices[bi]) battenPtIndices[bi] = [];
              battenPtIndices[bi].push(j * (segW + 1) + i);
            }
          }
        }

        // Window stiffness + tracking
        let windowStiffness = 0;
        if (
          rigging.sail.window.enabled &&
          Math.abs(u - windowU) < windowHalfW &&
          Math.abs(v - windowV) < windowHalfH
        ) {
          windowPtIndices.push(j * (segW + 1) + i);
          // Vinyl panel behaves like a stiffer laminate area
          windowStiffness = 0.9;
        }

        pts.push({
          position: new THREE.Vector3(x, y, z),
          prevPosition: new THREE.Vector3(x, y, z),
          acceleration: new THREE.Vector3(0, 0, 0),
          fixed: isFixed,
          mass: 0.1,
          u,
          v,
          battenStiffness,
          windowStiffness,
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
          // Higher stiffness along battens / window
          const stiffBoost = Math.max(
            pts[p1].battenStiffness,
            pts[p2].battenStiffness,
            pts[p1].windowStiffness,
            pts[p2].windowStiffness
          );
          constrs.push({
            p1,
            p2,
            restLength: pts[p1].position.distanceTo(pts[p2].position),
            stiffness: 0.95 + stiffBoost * 0.04,
          });
        }

        // Structural vertical
        if (j < segH) {
          const p1 = idx;
          const p2 = getIdx(i, j + 1, segW);
          const stiffBoost = Math.max(
            pts[p1].windowStiffness,
            pts[p2].windowStiffness
          );
          constrs.push({
            p1,
            p2,
            restLength: pts[p1].position.distanceTo(pts[p2].position),
            stiffness: 0.95 + stiffBoost * 0.03,
          });
        }

        // Shear diagonals
        if (i < segW && j < segH) {
          const p1 = idx;
          const p2 = getIdx(i + 1, j + 1, segW);
          constrs.push({
            p1,
            p2,
            restLength: pts[p1].position.distanceTo(pts[p2].position),
            stiffness: 0.8,
          });
        }
        if (i > 0 && j < segH) {
          const p1 = idx;
          const p2 = getIdx(i - 1, j + 1, segW);
          constrs.push({
            p1,
            p2,
            restLength: pts[p1].position.distanceTo(pts[p2].position),
            stiffness: 0.8,
          });
        }

        // Bending resistance (2-step constraints). This is what stops cloth
        // from folding too sharply and is crucial for "batten rigidity".
        if (i < segW - 1) {
          const p1 = idx;
          const p2 = getIdx(i + 2, j, segW);
          const stiffBoost = Math.max(
            pts[p1].battenStiffness,
            pts[p2].battenStiffness,
            pts[p1].windowStiffness,
            pts[p2].windowStiffness
          );
          constrs.push({
            p1,
            p2,
            restLength: pts[p1].position.distanceTo(pts[p2].position),
            stiffness: 0.18 + stiffBoost * 0.25,
          });
        }
        if (j < segH - 1) {
          const p1 = idx;
          const p2 = getIdx(i, j + 2, segW);
          const stiffBoost = Math.max(
            pts[p1].windowStiffness,
            pts[p2].windowStiffness
          );
          constrs.push({
            p1,
            p2,
            restLength: pts[p1].position.distanceTo(pts[p2].position),
            stiffness: 0.18 + stiffBoost * 0.25,
          });
        }
      }
    }

    // Explicit batten constraints (strong rib lines)
    // These are additional to the grid constraints and greatly reduce bending
    // right where battens are attached.
    if (rigging.sail.battens.enabled) {
      battenPtIndices.forEach((battenPts, bi) => {
        if (!battenPts || battenPts.length < 3) return;

        // Per-batten stiffness with fallback
        const rawStiff = rigging.sail.battens.stiffnesses?.[bi] ?? rigging.sail.battens.stiffness ?? 0.8;
        const k = 0.45 + rawStiff * 0.3;

        for (let ii = 0; ii < battenPts.length - 1; ii++) {
          const p1 = battenPts[ii];
          const p2 = battenPts[ii + 1];
          constrs.push({
            p1,
            p2,
            restLength: pts[p1].position.distanceTo(pts[p2].position),
            stiffness: k,
          });
        }

        // Extra bending resistance along the batten (skip-one)
        for (let ii = 0; ii < battenPts.length - 2; ii++) {
          const p1 = battenPts[ii];
          const p2 = battenPts[ii + 2];
          constrs.push({
            p1,
            p2,
            restLength: pts[p1].position.distanceTo(pts[p2].position),
            stiffness: Math.min(0.95, k + 0.15),
          });
        }
      });
    }

    // Apply tension modifiers from rigging
    const cunninghamMod = 1 + rigging.cunninghamTension * 0.3;
    const outhaulMod = 1 + rigging.outhaulTension * 0.3;

    constrs.forEach((c) => {
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

    // Build a window patch mesh that reuses the *same* simulated cloth points
    // (so it always matches curvature, no "floating" plane).
    const windowMeshData = (() => {
      if (!rigging.sail.window.enabled || windowPtIndices.length < 4) {
        return null as null | { vertexGlobal: number[]; indices: number[] };
      }

      const windowSet = new Set(windowPtIndices);
      const triGlobal: number[] = [];

      // Collect triangles fully inside the window region
      for (let j = 0; j < segH; j++) {
        for (let i = 0; i < segW; i++) {
          const a = getIdx(i, j, segW);
          const b = getIdx(i + 1, j, segW);
          const c = getIdx(i, j + 1, segW);
          const d = getIdx(i + 1, j + 1, segW);

          if (windowSet.has(a) && windowSet.has(b) && windowSet.has(c) && windowSet.has(d)) {
            triGlobal.push(a, b, c);
            triGlobal.push(b, d, c);
          }
        }
      }

      if (triGlobal.length === 0) return null;

      // Remap global indices -> local window-geometry indices
      const map = new Map<number, number>();
      const vertexGlobal: number[] = [];
      const indices: number[] = [];

      for (const g of triGlobal) {
        let local = map.get(g);
        if (local === undefined) {
          local = vertexGlobal.length;
          map.set(g, local);
          vertexGlobal.push(g);
        }
        indices.push(local);
      }

      return { vertexGlobal, indices };
    })();

    pointsRef.current = pts;

    return {
      points: pts,
      constraints: constrs,
      indices: inds,
      battenPointIndices: battenPtIndices,
      windowPointIndices: windowPtIndices,
      windowMeshData,
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
      uvs[i *  2] = p.u;
      uvs[i * 2 + 1] = p.v;
    });

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geo.setIndex(indices);

    geometryRef.current = geo;
    return geo;
  }, [points, indices]);

  // Window patch geometry (subset of the cloth mesh) so it always matches
  // the sail's exact curvature + angle.
  const windowGeometry = useMemo(() => {
    if (!windowMeshData) {
      windowGeometryRef.current = null;
      return null;
    }

    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(windowMeshData.vertexGlobal.length * 3);
    const uvs = new Float32Array(windowMeshData.vertexGlobal.length * 2);

    windowMeshData.vertexGlobal.forEach((gIdx, i) => {
      const p = points[gIdx];
      positions[i * 3] = p.position.x;
      positions[i * 3 + 1] = p.position.y;
      positions[i * 3 + 2] = p.position.z + 0.002; // tiny offset to avoid z-fighting
      uvs[i * 2] = p.u;
      uvs[i * 2 + 1] = p.v;
    });

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geo.setIndex(windowMeshData.indices);
    geo.computeVertexNormals();

    windowGeometryRef.current = geo;
    return geo;
  }, [points, windowMeshData]);

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
        if (dist < 1e-6) return;
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

    // Update window patch geometry (if enabled)
    if (windowGeometryRef.current && windowMeshData) {
      const winPos = windowGeometryRef.current.getAttribute('position') as THREE.BufferAttribute;
      windowMeshData.vertexGlobal.forEach((gIdx, i) => {
        const p = pts[gIdx];
        winPos.setXYZ(i, p.position.x, p.position.y, p.position.z + 0.002);
      });
      winPos.needsUpdate = true;
      windowGeometryRef.current.computeVertexNormals();
    }

    // Update batten tube meshes from single-row cloth points
    if (rigging.sail.battens.enabled && battenPointIndices) {
      battenPointIndices.forEach((rowPts, bi) => {
        const mesh = battenMeshRefs.current[bi];
        if (!mesh || !rowPts || rowPts.length < 2) return;

        // Build a curve from the cloth points in this single row
        const curvePoints: THREE.Vector3[] = [];
        for (let ii = 0; ii < rowPts.length; ii++) {
          const p = pts[rowPts[ii]];
          curvePoints.push(p.position.clone().add(new THREE.Vector3(0, 0, 0.003)));
        }

        const curve = new THREE.CatmullRomCurve3(curvePoints, false);
        const tubeGeo = new THREE.TubeGeometry(curve, Math.max(4, curvePoints.length * 2), 0.006, 4, false);

        mesh.geometry.dispose();
        mesh.geometry = tubeGeo;
      });
    }
  });

  const gooseneckY = rigging.boom.gooseneckHeight;
  const emissive = highlight ? new THREE.Color("hsl(45, 93%, 58%)") : new THREE.Color(0x000000);


  const WindowMesh = () => {
    if (!rigging.sail.window.enabled || !windowGeometry) return null;

    return (
      <mesh geometry={windowGeometry}>
        <meshStandardMaterial
          color={rigging.sail.window.color}
          transparent
          opacity={0.35}
          roughness={0.05}
          metalness={0.1}
          side={THREE.DoubleSide}
          depthWrite={false}
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


      {/* Sail window (vinyl) - follows cloth simulation */}
      {rigging.sail.window.enabled && <WindowMesh />}

      {/* Visible batten tubes - each follows a single snapped cloth row */}
      {rigging.sail.battens.enabled && battenPointIndices.map((rowPts, bi) => {
        if (!rowPts || rowPts.length < 2) return null;
        return (
          <mesh
            key={`batten-${bi}`}
            ref={(el) => { if (el) battenMeshRefs.current[bi] = el; }}
          >
            <tubeGeometry args={[
              new THREE.CatmullRomCurve3([new THREE.Vector3(0,0,0), new THREE.Vector3(0.01,0,0)]),
              2, 0.006, 4, false
            ]} />
            <meshStandardMaterial
              color="#2a2a2a"
              roughness={0.6}
              metalness={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
}