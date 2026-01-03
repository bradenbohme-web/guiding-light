// High-end ocean simulation with volumetric lighting, caustics, and procedural birds
import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Sky } from "@react-three/drei";

// Shader for realistic water surface
const waterVertexShader = `
  uniform float uTime;
  uniform float uWaveHeight;
  uniform float uWaveFrequency;
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  varying float vWaveHeight;
  
  // Simplex noise for realistic wave patterns
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  void main() {
    vUv = uv;
    
    vec3 pos = position;
    
    // Multiple wave layers for realistic ocean
    float wave1 = snoise(vec2(pos.x * 0.3 + uTime * 0.15, pos.z * 0.3 + uTime * 0.1)) * uWaveHeight;
    float wave2 = snoise(vec2(pos.x * 0.7 - uTime * 0.08, pos.z * 0.5 + uTime * 0.12)) * uWaveHeight * 0.5;
    float wave3 = snoise(vec2(pos.x * 1.5 + uTime * 0.2, pos.z * 1.2 - uTime * 0.15)) * uWaveHeight * 0.25;
    float wave4 = snoise(vec2(pos.x * 3.0 + uTime * 0.3, pos.z * 2.5 + uTime * 0.25)) * uWaveHeight * 0.1;
    
    pos.y += wave1 + wave2 + wave3 + wave4;
    vWaveHeight = pos.y;
    
    // Calculate normal from gradient
    float epsilon = 0.1;
    float heightL = snoise(vec2((position.x - epsilon) * 0.3 + uTime * 0.15, position.z * 0.3 + uTime * 0.1)) * uWaveHeight;
    float heightR = snoise(vec2((position.x + epsilon) * 0.3 + uTime * 0.15, position.z * 0.3 + uTime * 0.1)) * uWaveHeight;
    float heightD = snoise(vec2(position.x * 0.3 + uTime * 0.15, (position.z - epsilon) * 0.3 + uTime * 0.1)) * uWaveHeight;
    float heightU = snoise(vec2(position.x * 0.3 + uTime * 0.15, (position.z + epsilon) * 0.3 + uTime * 0.1)) * uWaveHeight;
    
    vec3 calcNormal = normalize(vec3(heightL - heightR, 2.0 * epsilon, heightD - heightU));
    vNormal = normalMatrix * calcNormal;
    
    vWorldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const waterFragmentShader = `
  uniform vec3 uDeepColor;
  uniform vec3 uShallowColor;
  uniform vec3 uFoamColor;
  uniform float uTime;
  uniform vec3 uSunDirection;
  uniform float uSunIntensity;
  uniform samplerCube uEnvMap;
  
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  varying float vWaveHeight;
  
  void main() {
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    vec3 normal = normalize(vNormal);
    
    // Fresnel effect
    float fresnel = pow(1.0 - max(dot(viewDirection, normal), 0.0), 3.0);
    
    // Water color based on depth simulation
    float depthFactor = smoothstep(-0.3, 0.5, vWaveHeight);
    vec3 waterColor = mix(uDeepColor, uShallowColor, depthFactor);
    
    // Sun specular reflection
    vec3 halfVector = normalize(uSunDirection + viewDirection);
    float specular = pow(max(dot(normal, halfVector), 0.0), 256.0) * uSunIntensity;
    
    // Subsurface scattering approximation
    float sss = pow(max(dot(-viewDirection, uSunDirection), 0.0), 4.0) * 0.15;
    vec3 sssColor = uShallowColor * sss;
    
    // Foam on wave peaks
    float foam = smoothstep(0.15, 0.25, vWaveHeight) * 0.3;
    
    // Environment reflection
    vec3 reflectDir = reflect(-viewDirection, normal);
    
    // Combine all effects
    vec3 color = waterColor;
    color += sssColor;
    color = mix(color, uFoamColor, foam);
    color += vec3(specular) * vec3(1.0, 0.95, 0.8);
    color = mix(color, vec3(0.6, 0.8, 1.0), fresnel * 0.4);
    
    // Caustics pattern (simplified)
    float caustic1 = sin(vWorldPosition.x * 3.0 + uTime * 2.0) * sin(vWorldPosition.z * 3.0 + uTime * 1.5);
    float caustic2 = sin(vWorldPosition.x * 5.0 - uTime * 1.5) * sin(vWorldPosition.z * 4.0 + uTime * 2.0);
    float caustics = (caustic1 + caustic2) * 0.02 + 0.02;
    color += vec3(caustics) * uShallowColor;
    
    gl_FragColor = vec4(color, 0.92);
  }
`;

// Underwater caustics shader
const causticsVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const causticsFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;
  
  float caustic(vec2 uv, float time) {
    vec2 p = mod(uv * 6.28318530718, 6.28318530718) - 250.0;
    float t = time * 0.5;
    vec2 i = vec2(p);
    float c = 1.0;
    float inten = 0.005;
    for (int n = 0; n < 5; n++) {
      float t2 = t * (1.0 - (3.5 / float(n + 1)));
      i = p + vec2(cos(t2 - i.x) + sin(t2 + i.y), sin(t2 - i.y) + cos(t2 + i.x));
      c += 1.0 / length(vec2(p.x / (sin(i.x + t) / inten), p.y / (cos(i.y + t) / inten)));
    }
    c /= 5.0;
    c = 1.17 - pow(c, 1.4);
    return pow(abs(c), 8.0);
  }
  
  void main() {
    float c = caustic(vUv, uTime);
    vec3 color = uColor * c * 2.0;
    gl_FragColor = vec4(color, c * 0.5);
  }
`;

// Ocean mesh component
function OceanSurface({ size = 200 }: { size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uWaveHeight: { value: 0.25 },
    uWaveFrequency: { value: 1.0 },
    uDeepColor: { value: new THREE.Color("#002244") },
    uShallowColor: { value: new THREE.Color("#006688") },
    uFoamColor: { value: new THREE.Color("#ffffff") },
    uSunDirection: { value: new THREE.Vector3(0.5, 0.7, 0.5).normalize() },
    uSunIntensity: { value: 1.5 },
  }), []);
  
  useFrame((state) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.elapsedTime;
    }
  });
  
  return (
    <mesh 
      ref={meshRef} 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -0.35, 0]}
      receiveShadow
    >
      <planeGeometry args={[size, size, 256, 256]} />
      <shaderMaterial
        vertexShader={waterVertexShader}
        fragmentShader={waterFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Underwater caustics projection
function UnderwaterCaustics() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#4488aa") },
  }), []);
  
  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
  });
  
  return (
    <mesh 
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -5, 0]}
    >
      <planeGeometry args={[100, 100, 1, 1]} />
      <shaderMaterial
        vertexShader={causticsVertexShader}
        fragmentShader={causticsFragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// Procedural bird animation
interface BirdProps {
  startPosition: THREE.Vector3;
  speed: number;
  radius: number;
  offset: number;
}

function Bird({ startPosition, speed, radius, offset }: BirdProps) {
  const groupRef = useRef<THREE.Group>(null);
  const wingLeftRef = useRef<THREE.Mesh>(null);
  const wingRightRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const t = state.clock.elapsedTime * speed + offset;
    
    // Circular flight path with variation
    groupRef.current.position.x = startPosition.x + Math.sin(t * 0.5) * radius;
    groupRef.current.position.z = startPosition.z + Math.cos(t * 0.5) * radius;
    groupRef.current.position.y = startPosition.y + Math.sin(t * 2) * 0.5 + Math.sin(t * 0.3) * 2;
    
    // Face direction of travel
    groupRef.current.rotation.y = Math.atan2(
      Math.cos(t * 0.5) * radius * 0.5,
      -Math.sin(t * 0.5) * radius * 0.5
    );
    
    // Wing flapping
    const wingAngle = Math.sin(t * 8) * 0.4;
    if (wingLeftRef.current) wingLeftRef.current.rotation.z = -wingAngle - 0.2;
    if (wingRightRef.current) wingRightRef.current.rotation.z = wingAngle + 0.2;
  });
  
  return (
    <group ref={groupRef} position={startPosition}>
      {/* Body */}
      <mesh>
        <capsuleGeometry args={[0.03, 0.08, 4, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Head */}
      <mesh position={[0.05, 0.01, 0]}>
        <sphereGeometry args={[0.02, 8, 6]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Beak */}
      <mesh position={[0.08, 0.01, 0]} rotation={[0, 0, -0.3]}>
        <coneGeometry args={[0.008, 0.03, 4]} />
        <meshStandardMaterial color="#ff8800" />
      </mesh>
      
      {/* Left wing */}
      <mesh ref={wingLeftRef} position={[0, 0, 0.04]}>
        <boxGeometry args={[0.06, 0.005, 0.12]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      
      {/* Right wing */}
      <mesh ref={wingRightRef} position={[0, 0, -0.04]}>
        <boxGeometry args={[0.06, 0.005, 0.12]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      
      {/* Tail */}
      <mesh position={[-0.06, 0, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.04, 0.003, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}

// Flock of birds
function BirdFlock({ count = 12 }: { count?: number }) {
  const birds = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      startPosition: new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        15 + Math.random() * 10,
        (Math.random() - 0.5) * 30
      ),
      speed: 0.3 + Math.random() * 0.3,
      radius: 15 + Math.random() * 20,
      offset: Math.random() * Math.PI * 2,
    }));
  }, [count]);
  
  return (
    <group>
      {birds.map((props, i) => (
        <Bird key={i} {...props} />
      ))}
    </group>
  );
}

// Volumetric light rays (god rays approximation)
function VolumetricLightRays() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uIntensity: { value: 0.15 },
  }), []);
  
  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
  });
  
  const rayVertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  
  const rayFragmentShader = `
    uniform float uTime;
    uniform float uIntensity;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      float ray = sin(vUv.x * 30.0 + uTime * 0.5) * 0.5 + 0.5;
      ray *= sin(vUv.x * 17.0 - uTime * 0.3) * 0.5 + 0.5;
      ray *= pow(1.0 - vUv.y, 2.0);
      ray *= smoothstep(0.0, 0.3, vUv.x) * smoothstep(1.0, 0.7, vUv.x);
      
      vec3 color = vec3(1.0, 0.95, 0.8) * ray * uIntensity;
      float alpha = ray * 0.2;
      
      gl_FragColor = vec4(color, alpha);
    }
  `;
  
  return (
    <mesh 
      ref={meshRef}
      position={[20, 15, -10]}
      rotation={[0.3, -0.5, 0.1]}
    >
      <planeGeometry args={[40, 30]} />
      <shaderMaterial
        vertexShader={rayVertexShader}
        fragmentShader={rayFragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Deep underwater gradient
function UnderwaterDepth() {
  return (
    <mesh position={[0, -30, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[500, 500]} />
      <meshBasicMaterial 
        color="#001122"
        transparent
        opacity={0.95}
      />
    </mesh>
  );
}

// Main ocean environment component
interface OceanEnvironmentProps {
  enabled?: boolean;
  sunPosition?: [number, number, number];
}

export function OceanEnvironment({ 
  enabled = true,
  sunPosition = [100, 50, 50]
}: OceanEnvironmentProps) {
  if (!enabled) return null;
  
  return (
    <group>
      {/* Sky with sun */}
      <Sky 
        distance={450000}
        sunPosition={sunPosition}
        inclination={0.6}
        azimuth={0.25}
        rayleigh={0.5}
      />
      
      {/* Directional sunlight */}
      <directionalLight
        position={sunPosition}
        intensity={2.5}
        color="#fff5e0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={100}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      
      {/* Ambient from sky */}
      <ambientLight intensity={0.6} color="#88aacc" />
      
      {/* Hemisphere light for natural feel */}
      <hemisphereLight 
        args={["#87ceeb", "#006644", 0.6]} 
      />
      
      {/* Ocean surface */}
      <OceanSurface size={300} />
      
      {/* Underwater elements */}
      <UnderwaterCaustics />
      <UnderwaterDepth />
      
      {/* Atmospheric effects */}
      <VolumetricLightRays />
      
      {/* Birds */}
      <BirdFlock count={15} />
      
      {/* Fog for depth - pushed back more */}
      <fog attach="fog" args={["#b0d4e8", 50, 250]} />
    </group>
  );
}
