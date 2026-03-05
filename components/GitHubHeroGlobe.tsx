'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  PointLight,
  ShaderMaterial,
  AdditiveBlending,
  FrontSide,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  TextureLoader,
  QuadraticBezierCurve3,
  TubeGeometry,
  CylinderGeometry,
  Vector3,
  Object3D
} from 'three';

type Props = { className?: string };

interface BubbleLocation {
  lat: number;
  lng: number;
  name: string;
  role: string;
  country: string;
  flag: string;
  initials: string;
  avatarColor: string;
}

interface Bubble {
  id: number;
  location: BubbleLocation;
  marker: Object3D;  // 3D object attached to sphere — rotates with globe
  screenPos: { x: number; y: number };
  opacity: number;
  scale: number;
  birthTime: number;
  lifetime: number;
  visible: boolean;
  active: boolean;
}

// FIXED LOCATIONS — Remote worker cards pinned to the globe surface
const BUBBLE_LOCATIONS: BubbleLocation[] = [
  { lat: 40.7128,  lng: -74.006,   name: 'Marcus T.',    role: 'Software Engineer',    country: 'United States', flag: '🇺🇸', initials: 'MT', avatarColor: '#4F46E5' },
  { lat: 51.5074,  lng: -0.1278,   name: 'Priya S.',     role: 'Digital Marketer',     country: 'United Kingdom', flag: '🇬🇧', initials: 'PS', avatarColor: '#0891B2' },
  { lat: 35.6762,  lng: 139.6503,  name: 'Kenji A.',     role: 'UI/UX Designer',       country: 'Japan',          flag: '🇯🇵', initials: 'KA', avatarColor: '#7C3AED' },
  { lat: -33.8688, lng: 151.2093,  name: 'Sofia R.',     role: 'Customer Success',     country: 'Australia',      flag: '🇦🇺', initials: 'SR', avatarColor: '#059669' },
  { lat: 1.3521,   lng: 103.8198,  name: 'David L.',     role: 'Executive Assistant',  country: 'Singapore',      flag: '🇸🇬', initials: 'DL', avatarColor: '#D97706' },
  { lat: 19.4326,  lng: -99.1332,  name: 'Ana G.',       role: 'Bookkeeper',           country: 'Mexico',         flag: '🇲🇽', initials: 'AG', avatarColor: '#DC2626' },
  { lat: 55.7558,  lng: 37.6173,   name: 'Ivan P.',      role: 'Backend Developer',    country: 'Russia',         flag: '🇷🇺', initials: 'IP', avatarColor: '#2563EB' },
  { lat: -23.5505, lng: -46.6333,  name: 'Carla M.',     role: 'Data Analyst',         country: 'Brazil',         flag: '🇧🇷', initials: 'CM', avatarColor: '#16A34A' },
  { lat: 28.6139,  lng: 77.209,    name: 'Ravi K.',      role: 'Frontend Developer',   country: 'India',          flag: '🇮🇳', initials: 'RK', avatarColor: '#9333EA' },
  { lat: -1.2921,  lng: 36.8219,   name: 'Amina O.',     role: 'Content Strategist',   country: 'Kenya',          flag: '🇰🇪', initials: 'AO', avatarColor: '#B45309' },
  { lat: 48.8566,  lng: 2.3522,    name: 'Julien B.',    role: 'Project Manager',      country: 'France',         flag: '🇫🇷', initials: 'JB', avatarColor: '#0E7490' },
  { lat: -34.6037, lng: -58.3816,  name: 'Diego F.',     role: 'Sales Specialist',     country: 'Argentina',      flag: '🇦🇷', initials: 'DF', avatarColor: '#1D4ED8' },
  { lat: 37.7749,  lng: -122.4194, name: 'Mei W.',       role: 'DevOps Engineer',      country: 'United States',  flag: '🇺🇸', initials: 'MW', avatarColor: '#0F766E' },
  { lat: 52.52,    lng: 13.405,    name: 'Nina H.',      role: 'QA Engineer',          country: 'Germany',        flag: '🇩🇪', initials: 'NH', avatarColor: '#6D28D9' },
  { lat: 25.2048,  lng: 55.2708,   name: 'Omar Y.',      role: 'Operations Manager',   country: 'UAE',            flag: '🇦🇪', initials: 'OY', avatarColor: '#BE185D' },
];

// Extra green (mint) pillar positions — same geometry as worker-card pillars
// but without a card attached. Spreads visual density to underrepresented regions.
const EXTRA_PILLAR_POSITIONS = [
  { lat: 37.5665,  lng: 126.978  }, // Seoul, South Korea
  { lat: 14.5995,  lng: 120.9842 }, // Manila, Philippines
  { lat:  3.139,   lng: 101.6869 }, // Kuala Lumpur, Malaysia
  { lat: -6.2088,  lng: 106.8456 }, // Jakarta, Indonesia
  { lat:  6.5244,  lng:  3.3792  }, // Lagos, Nigeria
  { lat: 33.5731,  lng:  -7.5898 }, // Casablanca, Morocco
  { lat: -33.9249, lng:  18.4241 }, // Cape Town, South Africa
  { lat: 52.2297,  lng:  21.0122 }, // Warsaw, Poland
  { lat: 59.3293,  lng:  18.0686 }, // Stockholm, Sweden
  { lat: 40.4168,  lng:  -3.7038 }, // Madrid, Spain
  { lat: 41.9028,  lng:  12.4964 }, // Rome, Italy
  { lat: 41.0082,  lng:  28.9784 }, // Istanbul, Turkey
  { lat: 24.6877,  lng:  46.7219 }, // Riyadh, Saudi Arabia
  { lat: 35.6892,  lng:  51.389  }, // Tehran, Iran
  { lat: 24.8607,  lng:  67.0011 }, // Karachi, Pakistan
  { lat:  6.9271,  lng:  79.8612 }, // Colombo, Sri Lanka
  { lat: -12.0464, lng: -77.0428 }, // Lima, Peru
  { lat:  4.711,   lng: -74.0721 }, // Bogotá, Colombia
  { lat: -33.4489, lng: -70.6693 }, // Santiago, Chile
  { lat: 14.0723,  lng: -87.2068 }, // Tegucigalpa, Honduras
  { lat:  9.005,   lng:  38.7636 }, // Addis Ababa, Ethiopia
  { lat: 31.7683,  lng:  35.2137 }, // Jerusalem
  { lat: 47.3769,  lng:   8.5417 }, // Zurich, Switzerland
  { lat: 50.8503,  lng:   4.3517 }, // Brussels, Belgium
];

// Extra positions for decorative pillars (visual density across the globe)
const DECO_POSITIONS = [
  { lat: 60,  lng: 25   }, // Helsinki
  { lat: 46,  lng: 14   }, // Ljubljana
  { lat: 38,  lng: -9   }, // Lisbon
  { lat: 53,  lng: -6   }, // Dublin
  { lat: 14,  lng: 17   }, // N'Djamena
  { lat: -4,  lng: 15   }, // Kinshasa
  { lat: 6,   lng: 1    }, // Accra
  { lat: -26, lng: 28   }, // Johannesburg
  { lat: 15,  lng: 32   }, // Khartoum
  { lat: 33,  lng: 13   }, // Tripoli
  { lat: 39,  lng: 116  }, // Beijing
  { lat: 23,  lng: 120  }, // Taiwan
  { lat: -8,  lng: 115  }, // Bali
  { lat: 14,  lng: 100  }, // Bangkok
  { lat: 33,  lng: 44   }, // Baghdad
  { lat: 24,  lng: 90   }, // Dhaka
  { lat: 43,  lng: 76   }, // Almaty
  { lat: 61,  lng: 105  }, // Siberia
  { lat: -38, lng: 177  }, // New Zealand
  { lat: -25, lng: 130  }, // Australia interior
  { lat: -12, lng: 130  }, // Darwin
  { lat: 45,  lng: -73  }, // Montreal
  { lat: 43,  lng: -79  }, // Toronto
  { lat: 61,  lng: -150 }, // Alaska
  { lat: 21,  lng: -157 }, // Hawaii
  { lat: -54, lng: -68  }, // Tierra del Fuego
  { lat: -15, lng: -48  }, // Brasília
  { lat: 10,  lng: -66  }, // Caracas
  { lat: 4,   lng: -52  }, // Guyana
  { lat: 66,  lng: 27   }, // Northern Finland
  { lat: 55,  lng: 73   }, // Novosibirsk
  { lat: 30,  lng: 31   }, // Cairo
];

export default function GitHubHeroGlobe({ className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [cardScale, setCardScale] = useState(1);
  const isReadyRef = useRef(false);
  const bubblesRef = useRef<Bubble[]>([]);
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const sphereRef = useRef<Mesh | null>(null);
  const activeIndices = useRef<Set<number>>(new Set());

  useEffect(() => {
    const container = containerRef.current!;
    if (!container) return;

    let mounted = true;

    const scene = new Scene();

    const renderer = new WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.margin = 'auto';
    renderer.domElement.style.maxWidth = 'none';
    renderer.domElement.style.maxHeight = 'none';

    scene.background = null;
    container.appendChild(renderer.domElement);

    const setSize = () => {
      const s = Math.min(container.clientWidth || 1, container.clientHeight || 1);
      renderer.setSize(s, s, false);
      if (cameraRef.current) {
        cameraRef.current.aspect = 1;
        cameraRef.current.updateProjectionMatrix();
      }
    };

    // Front/side lights — deep blue tones
    const light1 = new PointLight(0x3B4FFF, 0.9);
    light1.position.set(-150, 150, -50);
    light1.castShadow = false;

    const light2 = new PointLight(0x2244FF, 0.9);
    light2.position.set(-400, 200, 150);
    light2.castShadow = false;

    const light3 = new PointLight(0x7B3BFF, 0.6);
    light3.position.set(100, 250, -100);
    light3.castShadow = false;

    // Purple/magenta back light — creates the space-glow effect behind the planet
    const light4 = new PointLight(0xCC40FF, 0.5);
    light4.position.set(300, -100, -200);
    light4.castShadow = false;

    scene.add(light1, light2, light3, light4);

    const sphereGeometry = new SphereGeometry(2, 64, 64);
    // ── SILHOUETTE-FADE ShaderMaterial ───────────────────────────────────────
    // MeshLambertMaterial was OPAQUE: WebGL antialiasing at the silhouette created
    // semi-transparent dark pixels that composited over the bright green hero
    // background → a visible dark ring ("shadow"). Fix: custom shader that drives
    // the sphere's OWN alpha to 0 at the silhouette so the edge is transparent.
    // smoothstep(0.0, 0.28, cosA) — cosA=0 at silhouette → alpha=0 (transparent).
    //                             — cosA≥0.28 inward     → alpha=1 (fully opaque).
    const sphereMaterial = new ShaderMaterial({
      uniforms: {
        uColor:     { value: new THREE.Color(0x061828) },
        uEmissive:  { value: new THREE.Color(0x183848) },
        uEmissiveI: { value: 0.45 },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3  uColor;
        uniform vec3  uEmissive;
        uniform float uEmissiveI;
        varying vec3  vNormal;
        void main() {
          float cosA  = abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)));
          float alpha = smoothstep(0.0, 0.28, cosA);
          vec3  color = uColor + uEmissive * uEmissiveI;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      depthWrite:  true,
      depthTest:   true,
      side:        FrontSide,
    });
    const sphere = new Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = false;
    sphere.receiveShadow = false;
    sphere.rotation.z = (23.5 * Math.PI) / 180;
    scene.add(sphere);
    sphereRef.current = sphere;

    const daySideMat = new ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color('#1A9AB5') },   // teal-blue lit side — shifts globe from blue to teal-cyan
        uLight: { value: new Vector3(-0.6, 0.97, 0.3).normalize() },
        uGain:  { value: 1.4 },
        uSoft:  { value: 1.2 }
      },
      vertexShader: `
        varying vec3 vN;
        void main() {
          vN = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform vec3 uLight;
        uniform float uGain;
        uniform float uSoft;
        varying vec3 vN;
        void main() {
          float ndl = max(dot(normalize(vN), normalize(uLight)), 0.0);
          float k = pow(ndl, uSoft);
          gl_FragColor = vec4(uColor * k * uGain, k);
        }
      `,
      blending: AdditiveBlending,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      side: FrontSide
    });
    const daySideMesh = new Mesh(new SphereGeometry(2.006, 64, 64), daySideMat);
    sphere.add(daySideMesh);

    const loader = new TextureLoader();
    const dotMap = loader.load('/textures/globe-dots.png', (tex) => {
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    });

    const overlayMaterial = new MeshBasicMaterial({
      map: dotMap,
      color: 0x6CD4DC,    // Teal-cyan — visibly shifts the globe dots from blue to teal, matching brand #57C5CF
      transparent: true,
      opacity: 0.85
    });

    const overlaySphereGeometry = new SphereGeometry(2.003, 64, 64);
    const overlaySphere = new Mesh(overlaySphereGeometry, overlayMaterial);
    overlaySphere.castShadow = false;
    overlaySphere.receiveShadow = false;
    sphere.add(overlaySphere);

    const numPoints = 100;
    const start = new Vector3(0, 1.5, 1.3);
    const middle = new Vector3(0.6, 0.6, 3.2);
    const end = new Vector3(1.5, -1, 0.8);
    const curveQuad = new QuadraticBezierCurve3(start, middle, end);

    const tubeMaterial = new MeshBasicMaterial({ color: 0xd965fa });

    const makeTube = (rot: { x?: number; y?: number; z?: number } = {}) => {
      const geom = new TubeGeometry(curveQuad, numPoints, 0.01, 20, false);
      geom.setDrawRange(0, 10000);
      const mesh = new Mesh(geom, tubeMaterial);
      mesh.rotation.set(rot.x ?? 0, rot.y ?? 0, rot.z ?? 0);
      sphere.add(mesh);
      return { geom, mesh };
    };

    const t1 = makeTube();
    const t2 = makeTube({ y: 0.75, z: 0.75, x: -0.1 });
    const t3 = makeTube({ y: 2.1,  z: 0.5,  x: 0.2 });
    const t4 = makeTube({ y: 2.3,  z: 0.8,  x: 0.2 });
    const t5 = makeTube({ y: 2.9,  z: 1.1,  x: 2   });
    const t6 = makeTube({ y: 7.1,  z: 1,    x: 4.4 });
    const t7 = makeTube({ y: 2.1,  z: 3,    x: 4.4 });
    const t8 = makeTube({ y: 2.5,  z: 1,    x: 1.1 });
    const t9 = makeTube({ y: 1.2,  z: 2.3,  x: 3.1 });
    const t10 = makeTube({ y: 3.8,  z: 0.3,  x: 1.8 });

    const tubes = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10];

    // Convert lat/lng to local 3D position on sphere surface
    const latLngToLocal = (lat: number, lng: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      return new Vector3(x, y, z);
    };

    // ── SURFACE PILLARS ──────────────────────────────────────────────────────
    // Each pillar's BASE sits exactly on the globe surface, tip points outward.
    // Orientation is handled by quaternion — no manual rotation math needed.
    // All pillars are sphere.add() children — they rotate with the globe.

    const workerPillarHeight = 0.40;
    const workerHalfH = workerPillarHeight / 2;

    // Mint pillars at card locations — slightly tapered, more prominent
    const workerPillarGeo = new CylinderGeometry(0.008, 0.015, workerPillarHeight, 8);
    const workerPillarMat = new MeshBasicMaterial({
      color: 0x4FFFB0,   // mint — matches brand CTA color
      transparent: true,
      opacity: 0.90
    });

    // City-light dots at deco positions — small teal spheres sitting flush on the surface
    const dotGeo = new SphereGeometry(0.018, 6, 6);
    const dotMat = new MeshBasicMaterial({
      color: 0x57C5CF,   // teal — brand accent
      transparent: true,
      opacity: 0.60
    });

    const addPillar = (
      lat: number,
      lng: number,
      geo: CylinderGeometry,
      mat: MeshBasicMaterial,
      halfH: number
    ) => {
      const surfacePos = latLngToLocal(lat, lng, 2.0);
      const normal = surfacePos.clone().normalize();

      const pillar = new Mesh(geo, mat);
      // Place pillar center at halfH above surface so base is exactly on sphere
      pillar.position.copy(surfacePos).addScaledVector(normal, halfH);
      // Rotate cylinder's Y-axis to align with the outward surface normal
      pillar.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), normal);
      sphere.add(pillar);  // rotates with the globe
    };

    // Worker-card pillars — one per card location (mint, taller)
    BUBBLE_LOCATIONS.forEach(loc => addPillar(loc.lat, loc.lng, workerPillarGeo, workerPillarMat, workerHalfH));

    // Extra green pillars — same mint color, spread across underrepresented regions
    EXTRA_PILLAR_POSITIONS.forEach(p => addPillar(p.lat, p.lng, workerPillarGeo, workerPillarMat, workerHalfH));

    // City-light dots — tiny teal spheres at deco positions, just above the surface
    DECO_POSITIONS.forEach(p => {
      const surfacePos = latLngToLocal(p.lat, p.lng, 2.003);
      const dot = new Mesh(dotGeo, dotMat);
      dot.position.copy(surfacePos);
      sphere.add(dot);
    });

    const camera = new PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 6;
    cameraRef.current = camera;

    // BOTH AUTO-ROTATE AND DRAG
    let isDragging = false;
    let prevX = 0;
    let autoRotateEnabled = true;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      autoRotateEnabled = false;
      prevX = e.clientX;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      sphere.rotation.y += dx * 0.025;
      prevX = e.clientX;
    };
    const onPointerUp = () => {
      isDragging = false;
      setTimeout(() => {
        autoRotateEnabled = true;
      }, 2000);
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('pointerleave', onPointerUp);

    let renderCount = 0;
    let currentGrowing = 0;

    const growTube = (index: number, count: number) => {
      const c = Math.ceil(count / 3) * 3;
      tubes[index].geom.setDrawRange(0, c);
      if (index > 2) {
        tubes[index - 3].geom.setDrawRange(c, 10000);
      } else {
        tubes[(tubes.length - 3) + index].geom.setDrawRange(c, 10000);
      }
    };

    // ── WORKER CARD MARKERS ──────────────────────────────────────────────────
    // Each marker is an invisible Object3D at the BASE of the matching pillar.
    // The React HTML card is drawn at the marker's projected screen position,
    // floating upward from the pillar base via CSS translate(-50%, -115%).
    const initializeBubbles = () => {
      return BUBBLE_LOCATIONS.map((location, index) => {
        const marker = new Object3D();
        // Radius 2.0 = globe surface = base of the pillar
        const localPos = latLngToLocal(location.lat, location.lng, 2.0);
        marker.position.copy(localPos);
        sphere.add(marker);  // attached to sphere — rotates with globe

        return {
          id: index,
          location,
          marker,
          screenPos: { x: 0, y: 0 },
          opacity: 0,
          scale: 1,
          birthTime: 0,
          lifetime: 6000,
          visible: false,
          active: false
        };
      });
    };

    bubblesRef.current = initializeBubbles();

    const activateBubble = (index: number) => {
      if (activeIndices.current.has(index)) return;
      if (activeIndices.current.size >= 3) return;

      // Safety guard — the interval already pre-filters by z > 1.5, but this
      // acts as a secondary check in case activateBubble is ever called directly.
      const testPos = new Vector3();
      bubblesRef.current[index].marker.getWorldPosition(testPos);
      if (testPos.z < 1.5) return;

      activeIndices.current.add(index);
      bubblesRef.current[index].active = true;
      bubblesRef.current[index].birthTime = Date.now();

      setTimeout(() => {
        if (!mounted) return;
        activeIndices.current.delete(index);
        bubblesRef.current[index].active = false;
      }, bubblesRef.current[index].lifetime);
    };

    const bubbleInterval = setInterval(() => {
      if (activeIndices.current.size >= 3) return;

      // Only activate bubbles whose marker is WELL into the camera-facing hemisphere.
      // z > 1.5 means the marker is within ~41° of the globe's front pole.
      // At this angle the pillar is tall and clearly visible, and the card has
      // several seconds of screen time before the globe can rotate it away.
      // Using worldPos.z avoids the NDC-z pitfall (all sphere points have NDC z ≈ 0.97).
      const candidates = bubblesRef.current
        .map((b, i) => {
          if (b.active) return null;
          const pos = new Vector3();
          b.marker.getWorldPosition(pos);
          return pos.z > 1.5 ? i : null;
        })
        .filter((i): i is number => i !== null);

      if (candidates.length > 0) {
        const pick = candidates[Math.floor(Math.random() * candidates.length)];
        activateBubble(pick);
      }
    }, 4500);

    const onResize = () => setSize();
    window.addEventListener('resize', onResize);

    // ResizeObserver catches container size changes that don't trigger window resize
    // (e.g. initial layout, sidebar collapse, flex reflow).
    const ro = new ResizeObserver(() => setSize());
    ro.observe(container);

    setSize();

    let animFrameId = 0;

    const animate = () => {
      if (!isReadyRef.current) {
        isReadyRef.current = true;
        setIsReady(true);
      }

      if (renderCount < 10000) {
        renderCount += 150;
        growTube(currentGrowing, renderCount);
      } else {
        renderCount = 0;
        currentGrowing = (currentGrowing >= tubes.length - 1) ? 0 : currentGrowing + 1;
      }

      if (!isDragging && autoRotateEnabled) {
        sphere.rotation.y += 0.002;
      }

      const now = Date.now();
      const updatedBubbles = bubblesRef.current.map(bubble => {
        if (!bubble.active) {
          return { ...bubble, opacity: 0, scale: 1 };
        }

        // marker is a child of sphere — getWorldPosition() automatically includes sphere rotation
        const worldPos = new Vector3();
        bubble.marker.getWorldPosition(worldPos);

        const screenVec = worldPos.clone();
        screenVec.project(camera);

        // Use CSS layout size (not pixel-buffer size) so card positions are always
        // in CSS pixels regardless of devicePixelRatio / setPixelRatio.
        const csW = Math.max(container.clientWidth, 1);
        const csH = Math.max(container.clientHeight, 1);

        const x = (screenVec.x * 0.5 + 0.5) * csW;
        const y = (-(screenVec.y) * 0.5 + 0.5) * csH;

        const age = now - bubble.birthTime;
        const fadeInDuration = 400;
        const fadeOutDuration = 400;

        let opacity = 1;

        if (age < fadeInDuration) {
          opacity = age / fadeInDuration;
        } else if (age > bubble.lifetime - fadeOutDuration) {
          opacity = (bubble.lifetime - age) / fadeOutDuration;
        }

        // Back-face culling: camera at z=6, sphere radius 2.
        // Silhouette plane: worldPos.z = R²/camZ = 4/6 ≈ 0.667.
        // Hard cut below z=0.7 (fully behind silhouette).
        // Soft fade from z=0.7 → z=1.0 prevents a jarring pop as the pillar
        // drifts toward the globe's edge (where it would look detached anyway).
        let visible = true;
        if (worldPos.z <= 0.7) {
          opacity = 0;
          visible = false;
        } else if (worldPos.z < 1.0) {
          opacity *= (worldPos.z - 0.7) / 0.3;
        }

        return {
          ...bubble,
          screenPos: { x, y },
          opacity,
          scale: 1,
          visible
        };
      });

      bubblesRef.current = updatedBubbles;
      setBubbles([...updatedBubbles]);

      renderer.render(scene, camera);
      animFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      mounted = false;
      cancelAnimationFrame(animFrameId);
      clearInterval(bubbleInterval);
      ro.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerleave', onPointerUp);

      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Cards shrink as the viewport narrows, staying proportional to the visible globe.
  // Reference: 1440px viewport → 1.0 (full size). Floor: 0.45 (45% on tiny screens).
  useEffect(() => {
    const updateScale = () =>
      setCardScale(Math.min(1, Math.max(0.45, window.innerWidth / 1440)));
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      {/* Loading placeholder — visible only until the first WebGL frame fires */}
      {!isReady && (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div
            className="rounded-full animate-pulse"
            style={{
              width: '70%',
              height: '70%',
              background:
                'radial-gradient(circle, rgba(87,197,207,0.15) 0%, rgba(87,197,207,0.06) 50%, transparent 70%)',
            }}
          />
        </div>
      )}

      {bubbles.filter(b => b.active && b.opacity > 0).map(bubble => (
        <div
          key={bubble.id}
          className="absolute pointer-events-none"
          style={{
            left: `${bubble.screenPos.x}px`,
            top: `${bubble.screenPos.y}px`,
            opacity: bubble.opacity,
          }}
        >
          {/* ── WORKER CARD — floats up from the base of the pillar ──────── */}
          <div
            className="absolute"
            style={{ transform: 'translate(-50%, -115%)' }}
          >
            {/*
              Scale wrapper — anchored at bottom-center (the pillar contact point).
              When the globe container is smaller than 1100px, cards shrink from
              their base upward so they stay visually connected to the pillar.
            */}
            <div style={{ transform: `scale(${cardScale})`, transformOrigin: 'center bottom' }}>
              <div
                className="relative flex flex-col items-center text-center rounded-2xl shadow-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(87, 197, 207, 0.35)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  padding: '10px 10px',
                  width: 108,
                  boxSizing: 'border-box',
                }}
              >
                {/* Avatar with verified badge overlay */}
                <div className="relative mb-2">
                  <div
                    className="flex items-center justify-center rounded-full text-white font-bold"
                    style={{
                      width: 36,
                      height: 36,
                      fontSize: 12,
                      background: bubble.location.avatarColor,
                      letterSpacing: 0.5,
                    }}
                  >
                    {bubble.location.initials}
                  </div>
                  <span
                    className="absolute -bottom-0.5 -right-0.5 flex items-center justify-center rounded-full"
                    style={{
                      width: 14,
                      height: 14,
                      background: '#4FFFB0',
                      fontSize: 8,
                      color: '#0A1628',
                      fontWeight: 800,
                      border: '1.5px solid rgba(255, 255, 255, 0.9)',
                    }}
                  >
                    ✓
                  </span>
                </div>

                {/* Name */}
                <span
                  className="font-semibold text-[#0F1926] leading-tight"
                  style={{ fontSize: 11 }}
                >
                  {bubble.location.name}
                </span>

                {/* Role */}
                <span
                  style={{ fontSize: 9.5, color: '#374151', marginTop: 2, lineHeight: 1.2 }}
                >
                  {bubble.location.role}
                </span>

                {/* Country */}
                <span
                  style={{ fontSize: 9, color: 'rgba(15,25,38,0.55)', marginTop: 2 }}
                >
                  {bubble.location.flag} {bubble.location.country}
                </span>

                {/* Downward caret — points toward the pillar base */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full"
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderTop: '6px solid rgba(255, 255, 255, 0.95)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
