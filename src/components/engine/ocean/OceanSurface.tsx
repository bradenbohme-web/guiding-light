// Gerstner-wave ocean mesh with PBR water shader + heightfield overlay
// Driven by OceanSettings uniforms
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { waterVertexShader } from "@/lib/ocean/shaders/waterVertex.glsl";
import { waterFragmentShader } from "@/lib/ocean/shaders/waterFragment.glsl";
import { OceanSettings, DEFAULT_OCEAN_SETTINGS } from "@/lib/ocean/types";

interface OceanSurfaceProps {
  settings?: OceanSettings;
  sunDirection?: THREE.Vector3;
  heightfieldTexture?: THREE.Texture | null;
  heightfieldWorldSize?: number;
}

export function OceanSurface({
  settings = DEFAULT_OCEAN_SETTINGS,
  sunDirection,
  heightfieldTexture,
  heightfieldWorldSize = 100,
}: OceanSurfaceProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTimeScale: { value: 1.0 },
      uGlobalWaveHeight: { value: 0.3 },

      // Primary swell
      uSwell1Enabled: { value: 1.0 },
      uSwell1Dir: { value: 315.0 },
      uSwell1Wavelength: { value: 18.0 },
      uSwell1Amplitude: { value: 0.35 },
      uSwell1Steepness: { value: 0.6 },

      // Secondary swell
      uSwell2Enabled: { value: 1.0 },
      uSwell2Dir: { value: 200.0 },
      uSwell2Wavelength: { value: 11.0 },
      uSwell2Amplitude: { value: 0.18 },
      uSwell2Steepness: { value: 0.65 },

      // Wind sea
      uWindSeaEnabled: { value: 1.0 },
      uWindSeaDir: { value: 270.0 },
      uWindSeaSpeed: { value: 7.0 },
      uWindSeaSpread: { value: 30.0 },
      uWindSeaChoppiness: { value: 0.7 },

      // Capillary
      uCapillaryEnabled: { value: 1.0 },
      uCapillaryIntensity: { value: 0.5 },
      uCapillaryScale: { value: 1.0 },

      // FFT detail
      uFFTEnabled: { value: 1.0 },
      uFFTWindSpeed: { value: 7.0 },
      uFFTWindDir: { value: 270.0 },
      uFFTAmplitude: { value: 0.0004 },
      uFFTChoppiness: { value: 1.2 },
      uFFTBlend: { value: 0.3 },

      // PBR material
      uDeepColor: { value: new THREE.Color("#001a33") },
      uShallowColor: { value: new THREE.Color("#0077aa") },
      uFoamColor: { value: new THREE.Color("#e8e8e0") },

      // Sun
      uSunDirection: {
        value: sunDirection
          ? sunDirection.clone().normalize()
          : new THREE.Vector3(0.5, 0.7, 0.5).normalize(),
      },
      uSunIntensity: { value: 2.5 },
      uSunColor: { value: new THREE.Color("#fff5e0") },

      // Beer's law
      uAbsorption: { value: new THREE.Vector3(0.4, 0.04, 0.02) },
      uAbsorptionDepth: { value: 3.0 },

      // SSS
      uSSSEnabled: { value: 1.0 },
      uSSSIntensity: { value: 0.35 },
      uSSSPower: { value: 3.0 },
      uSSSColor: { value: new THREE.Color("#1ab890") },

      // Foam
      uFoamEnabled: { value: 1.0 },
      uFoamThreshold: { value: 0.35 },
      uFoamCoverage: { value: 0.4 },
      uWhitecapIntensity: { value: 0.6 },

      // Heightfield
      uHeightfield: { value: null as THREE.Texture | null },
      uHeightfieldSize: { value: heightfieldWorldSize },
      uHeightfieldEnabled: { value: 0.0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((state) => {
    const u = uniforms;
    u.uTime.value = state.clock.elapsedTime;

    // Sync settings
    u.uTimeScale.value = settings.timeScale;
    u.uGlobalWaveHeight.value = settings.globalWaveHeight;

    // Swell 1
    u.uSwell1Enabled.value = settings.primarySwell.enabled ? 1 : 0;
    u.uSwell1Dir.value = settings.primarySwell.direction;
    u.uSwell1Wavelength.value = settings.primarySwell.wavelength;
    u.uSwell1Amplitude.value = settings.primarySwell.amplitude;
    u.uSwell1Steepness.value = settings.primarySwell.steepness;

    // Swell 2
    u.uSwell2Enabled.value = settings.secondarySwell.enabled ? 1 : 0;
    u.uSwell2Dir.value = settings.secondarySwell.direction;
    u.uSwell2Wavelength.value = settings.secondarySwell.wavelength;
    u.uSwell2Amplitude.value = settings.secondarySwell.amplitude;
    u.uSwell2Steepness.value = settings.secondarySwell.steepness;

    // Wind sea
    u.uWindSeaEnabled.value = settings.windSea.enabled ? 1 : 0;
    u.uWindSeaDir.value = settings.windSea.direction;
    u.uWindSeaSpeed.value = settings.windSea.speed;
    u.uWindSeaSpread.value = settings.windSea.spreadAngle;
    u.uWindSeaChoppiness.value = settings.windSea.choppiness;

    // Capillary
    u.uCapillaryEnabled.value = settings.capillary.enabled ? 1 : 0;
    u.uCapillaryIntensity.value = settings.capillary.intensity;
    u.uCapillaryScale.value = settings.capillary.scale;

    // FFT
    u.uFFTEnabled.value = settings.fft.enabled ? 1 : 0;
    u.uFFTWindSpeed.value = settings.fft.windSpeed;
    u.uFFTWindDir.value = settings.fft.windDirection;
    u.uFFTAmplitude.value = settings.fft.amplitude;
    u.uFFTChoppiness.value = settings.fft.choppiness;
    u.uFFTBlend.value = settings.fft.detailBlend;

    // Material
    u.uDeepColor.value.set(settings.material.deepColor);
    u.uShallowColor.value.set(settings.material.shallowColor);
    u.uFoamColor.value.set(settings.foam.color);
    u.uAbsorption.value.set(
      settings.material.absorptionR,
      settings.material.absorptionG,
      settings.material.absorptionB
    );
    u.uAbsorptionDepth.value = settings.material.absorptionDepth;

    // SSS
    u.uSSSEnabled.value = settings.sss.enabled ? 1 : 0;
    u.uSSSIntensity.value = settings.sss.intensity;
    u.uSSSPower.value = settings.sss.power;
    u.uSSSColor.value.set(settings.sss.color);

    // Sun
    u.uSunIntensity.value = settings.atmosphere.sun.intensity;
    u.uSunColor.value.set(settings.atmosphere.sun.color);
    const sunEl = settings.atmosphere.sun.elevation * Math.PI / 180;
    const sunAz = settings.atmosphere.sun.azimuth * Math.PI / 180;
    u.uSunDirection.value.set(
      Math.cos(sunEl) * Math.sin(sunAz),
      Math.sin(sunEl),
      Math.cos(sunEl) * Math.cos(sunAz)
    ).normalize();

    // Foam
    u.uFoamEnabled.value = settings.foam.enabled ? 1 : 0;
    u.uFoamThreshold.value = settings.foam.threshold;
    u.uFoamCoverage.value = settings.foam.coverage;
    u.uWhitecapIntensity.value = settings.foam.whitecapIntensity;

    // Heightfield
    u.uHeightfield.value = heightfieldTexture ?? null;
    u.uHeightfieldEnabled.value = heightfieldTexture ? 1.0 : 0.0;
    u.uHeightfieldSize.value = heightfieldWorldSize;
  });

  const size = settings.performance.oceanSize;
  const segs = settings.performance.meshResolution;

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(size, size, segs, segs);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, [size, segs]);

  return (
    <mesh
      ref={meshRef}
      position={[0, -0.35, 0]}
      geometry={geometry}
      receiveShadow
    >
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
