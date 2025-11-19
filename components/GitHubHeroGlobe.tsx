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
  BackSide,
  FrontSide,
  SphereGeometry,
  MeshLambertMaterial,
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
  quote: string;
  emoji: string;
}

interface Bubble {
  id: number;
  location: BubbleLocation;
  marker: Object3D;  // 3D object attached to sphere
  screenPos: { x: number; y: number };
  opacity: number;
  scale: number;
  birthTime: number;
  lifetime: number;
  visible: boolean;
  active: boolean;
}

// FIXED LOCATIONS - Like pins on the globe
const BUBBLE_LOCATIONS: BubbleLocation[] = [
  { lat: 40.7128, lng: -74.006, quote: '"Hire without borders"', emoji: '🌍' },
  { lat: 51.5074, lng: -0.1278, quote: '"Scale with certainty"', emoji: '📈' },
  { lat: 35.6762, lng: 139.6503, quote: '"Elite remote execution"', emoji: '⚡' },
  { lat: -33.8688, lng: 151.2093, quote: '"Proven LATAM power"', emoji: '🚀' },
  { lat: 1.3521, lng: 103.8198, quote: '"Build elite teams"', emoji: '👥' },
  { lat: 19.4326, lng: -99.1332, quote: '"Faster hiring cycles"', emoji: '⏱️' },
  { lat: 55.7558, lng: 37.6173, quote: '"Secure data workflows"', emoji: '🔒' },
  { lat: -23.5505, lng: -46.6333, quote: '"Transparent predictable pricing"', emoji: '💰' },
  { lat: 28.6139, lng: 77.209, quote: '"Ready to scale"', emoji: '🌟' },
  { lat: -1.2921, lng: 36.8219, quote: '"Focus on growth"', emoji: '📊' },
  { lat: 48.8566, lng: 2.3522, quote: '"Global talent pool"', emoji: '🌐' },
  { lat: -34.6037, lng: -58.3816, quote: '"Seamless collaboration"', emoji: '🤝' },
  { lat: 37.7749, lng: -122.4194, quote: '"Expert vetting process"', emoji: '✓' },
  { lat: 52.52, lng: 13.405, quote: '"Time zone coverage"', emoji: '🕐' },
  { lat: 25.2048, lng: 55.2708, quote: '"Compliance made easy"', emoji: '📋' }
];

export default function GitHubHeroGlobe({ className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const bubblesRef = useRef<Bubble[]>([]);
  const bubbleIdCounter = useRef(0);
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const sphereRef = useRef<Mesh | null>(null);
  const activeIndices = useRef<Set<number>>(new Set());

  useEffect(() => {
    const container = containerRef.current!;
    if (!container) return;

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

    const light1 = new PointLight(0x5a54ff, 0.95);
    light1.position.set(-150, 150, -50);

    const light2 = new PointLight(0x4158f6, 0.95);
    light2.position.set(-400, 200, 150);

    const light3 = new PointLight(0x803bff, 0.7);
    light3.position.set(100, 250, -100);

    scene.add(light1, light2, light3);

    // BRIGHTER ATMOSPHERE GLOW
    const atmosphereGeometry = new SphereGeometry(2, 64, 64);
    const atmosphereMaterial = new ShaderMaterial({
      uniforms: {},
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize( normalMatrix * normal );
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow( 0.99 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 5.2 );
          gl_FragColor = vec4( .28, .48, 1.0, 1.0 ) * intensity * 1.6;
        }
      `,
      side: BackSide,
      blending: AdditiveBlending,
      transparent: true
    });
    const atm = new Mesh(atmosphereGeometry, atmosphereMaterial);
    atm.scale.set(1.05, 1.05, 1.05);
    atm.position.set(-0.1, 0.1, 0);
    scene.add(atm);

    const sphereGeometry = new SphereGeometry(2, 64, 64);
    const sphereMaterial = new MeshLambertMaterial({
      color: 0x1a1245,  // Darker purple
      emissive: 0x2a1a5e,  // Purple glow
      emissiveIntensity: 0.3
    });
    const sphere = new Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = false;
    sphere.receiveShadow = false;
    sphere.rotation.z = (23.5 * Math.PI) / 180;
    scene.add(sphere);
    sphereRef.current = sphere;

    const daySideMat = new ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color('#5B7CFF') },
        uLight: { value: new Vector3(-0.6, 0.97, 0.3).normalize() },
        uGain:  { value: 1.65 },
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
      color: 0xB8A7E5,
      transparent: true,
      opacity: 1
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

    const cylinderGeometry = new CylinderGeometry(0.01, 0.01, 4.25, 32);
    const cylinderMaterial = new MeshBasicMaterial({
      color: 0x00ddff,
      transparent: true,
      opacity: 0.5
    });

    // MORE SPIRES added to the globe
    const spire = (x: number, z: number) => {
      const m = new Mesh(cylinderGeometry, cylinderMaterial);
      m.rotation.x = x;
      m.rotation.z = z;
      sphere.add(m);
    };
    spire(0.75, 0.0);
    spire(0.74, -0.05);
    spire(0.72, -0.07);
    spire(-1.0, 2.0);
    spire(0.8, 0.5);
    spire(1.05, 0.0);
    spire(2.0, 3.0);
    spire(0.8, 2.5);
    // Additional spires
    spire(0.5, 1.5);
    spire(-0.8, 0.3);
    spire(1.2, -0.5);
    spire(-0.5, -1.8);
    spire(0.9, 1.2);
    spire(-1.1, 1.0);
    spire(0.3, -0.9);

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

    // Convert lat/lng to local 3D position
    const latLngToLocal = (lat: number, lng: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      return new Vector3(x, y, z);
    };

    // Initialize all bubble locations with 3D markers attached to sphere
    const initializeBubbles = () => {
      return BUBBLE_LOCATIONS.map((location, index) => {
        // Create invisible 3D marker object
        const marker = new Object3D();
        const localPos = latLngToLocal(location.lat, location.lng, 2.2);
        marker.position.copy(localPos);
        
        // CRITICAL: Add marker as child of sphere so it rotates WITH the globe
        sphere.add(marker);

        return {
          id: index,
          location,
          marker,  // Store the 3D marker reference
          screenPos: { x: 0, y: 0 },
          opacity: 0,
          scale: 0,
          birthTime: 0,
          lifetime: 5000,
          visible: false,
          active: false
        };
      });
    };

    bubblesRef.current = initializeBubbles();

    const activateBubble = (index: number) => {
      if (activeIndices.current.has(index)) return;
      if (activeIndices.current.size >= 3) return;
      
      activeIndices.current.add(index);
      bubblesRef.current[index].active = true;
      bubblesRef.current[index].birthTime = Date.now();
      
      setTimeout(() => {
        activeIndices.current.delete(index);
        bubblesRef.current[index].active = false;
      }, bubblesRef.current[index].lifetime);
    };

    const bubbleInterval = setInterval(() => {
      const inactiveBubbles = bubblesRef.current
        .map((b, i) => ({ bubble: b, index: i }))
        .filter(({ bubble }) => !bubble.active);
      
      if (inactiveBubbles.length > 0) {
        const randomBubble = inactiveBubbles[Math.floor(Math.random() * inactiveBubbles.length)];
        activateBubble(randomBubble.index);
      }
    }, 4500);

    const onResize = () => setSize();
    window.addEventListener('resize', onResize);
    setSize();

    const animate = () => {
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
          return { ...bubble, opacity: 0, scale: 0 };
        }

        // Get world position from the 3D marker (which is a child of sphere)
        // This automatically includes all sphere transformations!
        const worldPos = new Vector3();
        bubble.marker.getWorldPosition(worldPos);
        
        // Project world position to screen coordinates
        const screenVec = worldPos.clone();
        screenVec.project(camera);
        
        const canvasWidth = renderer.domElement.width;
        const canvasHeight = renderer.domElement.height;
        
        const x = (screenVec.x * 0.5 + 0.5) * canvasWidth;
        const y = (-(screenVec.y) * 0.5 + 0.5) * canvasHeight;
        
        const age = now - bubble.birthTime;
        const fadeInDuration = 400;
        const fadeOutDuration = 400;
        
        let opacity = 1;
        let scale = 1;
        
        if (age < fadeInDuration) {
          const t = age / fadeInDuration;
          opacity = t;
          scale = 0.5 + t * 0.5;
        } else if (age > bubble.lifetime - fadeOutDuration) {
          const t = (bubble.lifetime - age) / fadeOutDuration;
          opacity = t;
          scale = 0.5 + t * 0.5;
        }
        
        // Check if bubble is on the visible side of the globe
        const visible = screenVec.z < 1;
        
        if (!visible) {
          opacity = 0;
        }
        
        return {
          ...bubble,
          screenPos: { x, y },
          opacity,
          scale,
          visible
        };
      });

      bubblesRef.current = updatedBubbles;
      setBubbles([...updatedBubbles]);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      clearInterval(bubbleInterval);
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

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      {bubbles.filter(b => b.active).map(bubble => (
        <div
          key={bubble.id}
          className="absolute pointer-events-none"
          style={{
            left: `${bubble.screenPos.x}px`,
            top: `${bubble.screenPos.y}px`,
            transform: `translate(-50%, -120%) scale(${bubble.scale})`,
            opacity: bubble.opacity,
            transition: 'opacity 0.3s, transform 0.3s',
          }}
        >
          <div className="relative bg-[#007AFF] text-white px-3 py-2 rounded-2xl shadow-xl text-xs font-medium whitespace-nowrap">
            {bubble.location.emoji} {bubble.location.quote}
            <div 
              className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#007AFF]"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
