// Splash/spray particle effects for the boat
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Particle = {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
};

interface BoatSprayProps {
  /** World-space emitter position (typically near bow at the waterline). */
  emitter: THREE.Vector3;
  /** Approx boat speed in m/s. Controls emission rate. */
  speed: number;
  /** Water surface height at the emitter, used to keep spray originating near waterline. */
  waterY: number;
  enabled?: boolean;
}

export function BoatSpray({ emitter, speed, waterY, enabled = true }: BoatSprayProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { particles, positions, alphas, geometry } = useMemo(() => {
    const max = 180;
    const parts: Particle[] = Array.from({ length: max }, () => ({
      position: new THREE.Vector3(0, -9999, 0),
      velocity: new THREE.Vector3(),
      life: 0,
      maxLife: 1,
    }));

    const pos = new Float32Array(max * 3);
    const alpha = new Float32Array(max);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aAlpha", new THREE.BufferAttribute(alpha, 1));

    return { particles: parts, positions: pos, alphas: alpha, geometry: geo };
  }, []);

  const spawn = (p: Particle) => {
    p.life = 0;
    p.maxLife = 0.7 + Math.random() * 0.6;

    // Spray direction: mostly upward + outwards (port/stbd) + a bit aft.
    const side = (Math.random() < 0.5 ? -1 : 1) * (0.15 + Math.random() * 0.55);
    const up = 0.9 + Math.random() * 0.9;
    const aft = -0.3 - Math.random() * 0.5;

    p.position.copy(emitter);
    p.position.y = waterY + 0.02;

    const base = Math.max(0, speed - 0.8);
    p.velocity.set(aft * base, up * base, side * base);
    p.velocity.multiplyScalar(0.9 + Math.random() * 0.5);
  };

  useFrame((_, delta) => {
    if (!enabled || !pointsRef.current) return;

    const dt = Math.min(delta, 0.033);
    const g = -5.0;

    // Emit rate ramps with speed.
    const rate = THREE.MathUtils.clamp((speed - 0.8) * 25, 0, 60);
    const toEmit = Math.floor(rate * dt + Math.random() * 0.5);

    for (let i = 0, emitted = 0; i < particles.length && emitted < toEmit; i++) {
      const p = particles[i];
      if (p.life >= p.maxLife) {
        spawn(p);
        emitted++;
      }
    }

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (p.life >= p.maxLife) {
        alphas[i] = 0;
        positions[i * 3 + 1] = -9999;
        continue;
      }

      p.life += dt;
      p.velocity.y += g * dt;
      p.position.addScaledVector(p.velocity, dt);

      // Fade out
      const t = p.life / p.maxLife;
      alphas[i] = 1 - t;

      positions[i * 3] = p.position.x;
      positions[i * 3 + 1] = p.position.y;
      positions[i * 3 + 2] = p.position.z;
    }

    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const aAttr = geometry.getAttribute("aAlpha") as THREE.BufferAttribute;
    posAttr.needsUpdate = true;
    aAttr.needsUpdate = true;
  });

  // Custom shader so each point can have its own alpha.
  const material = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uColor: { value: new THREE.Color("hsl(0, 0%, 98%)") },
        uSize: { value: 6.0 },
      },
      vertexShader: `
        attribute float aAlpha;
        varying float vAlpha;
        uniform float uSize;
        void main(){
          vAlpha = aAlpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = uSize * (1.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        uniform vec3 uColor;
        void main(){
          // soft circular sprite
          vec2 p = gl_PointCoord.xy * 2.0 - 1.0;
          float d = dot(p,p);
          float soft = smoothstep(1.0, 0.0, d);
          float a = vAlpha * soft;
          gl_FragColor = vec4(uColor, a);
        }
      `,
    });
    return mat;
  }, []);

  return (
    <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />
  );
}
