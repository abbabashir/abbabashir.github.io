import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const TECH_NODES = [
  { name: 'React', color: '#61dafb', role: 'Frontend Architecture' },
  { name: 'Python', color: '#3776ab', role: 'AI & Neural Systems' },
  { name: 'Java', color: '#f89820', role: 'Enterprise Systems' },
  { name: 'Spring Boot', color: '#6db33f', role: 'Microservices & REST' },
  { name: 'Docker', color: '#2496ed', role: 'Container Orchestration' },
  { name: 'Flutter', color: '#02569b', role: 'Cross-Platform Mobile' },
  { name: 'Three.js', color: '#ffffff', role: '3D WebGL & Shaders' },
  { name: 'PostgreSQL', color: '#336791', role: 'Relational Data Stores' },
];

export default function Skills3DCanvas() {
  const mountRef = useRef(null);
  const [activeTech, setActiveTech] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6.2;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const clusterGroup = new THREE.Group();
    scene.add(clusterGroup);

    // Central Wireframe Hologram Core
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    clusterGroup.add(coreMesh);

    // Orbiting Tech Nodes
    const nodeMeshes = [];
    const radius = 2.4;
    const count = TECH_NODES.length;

    TECH_NODES.forEach((tech, i) => {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      const nodeGeo = new THREE.SphereGeometry(0.26, 24, 24);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(tech.color),
        roughness: 0.3,
        metalness: 0.7,
        emissive: new THREE.Color(tech.color),
        emissiveIntensity: 0.25
      });

      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      mesh.position.set(x, y, z);
      mesh.userData = { ...tech, origX: x, origY: y, origZ: z };
      clusterGroup.add(mesh);
      nodeMeshes.push(mesh);

      // Connecting line to center
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, y, z)
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.08
      });
      const line = new THREE.Line(lineGeo, lineMat);
      clusterGroup.add(line);
    });

    // Lights
    const ambLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambLight);

    const pLight = new THREE.PointLight(0x60a5fa, 2.5, 10);
    pLight.position.set(3, 4, 3);
    scene.add(pLight);

    // Raycaster for hover interactions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);

    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    const rotSpeedY = 0.003;

    const onPointerMove = (e) => {
      const rect = mount.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (isDragging) {
        const deltaX = clientX - prevMouseX;
        const deltaY = clientY - prevMouseY;
        clusterGroup.rotation.y += deltaX * 0.006;
        clusterGroup.rotation.x += deltaY * 0.006;
        prevMouseX = clientX;
        prevMouseY = clientY;
      }

      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((clientY - rect.top) / rect.height) * 2 - 1);

      // Update raycaster
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);

      if (intersects.length > 0) {
        const target = intersects[0].object;
        setActiveTech(target.userData);
        setTooltipPos({ x: clientX - rect.left, y: clientY - rect.top });
        mount.style.cursor = 'pointer';
      } else if (!isDragging) {
        setActiveTech(null);
        mount.style.cursor = 'grab';
      }
    };

    const onPointerDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      mount.style.cursor = 'grabbing';
    };

    const onPointerUp = () => {
      isDragging = false;
      mount.style.cursor = 'grab';
    };

    mount.addEventListener('pointermove', onPointerMove);
    mount.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);

    // Resize
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!isDragging) {
        clusterGroup.rotation.y += rotSpeedY;
        clusterGroup.rotation.x = Math.sin(elapsed * 0.3) * 0.15;
      }

      coreMesh.rotation.y = -elapsed * 0.2;
      coreMesh.rotation.x = elapsed * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      mount.removeEventListener('pointermove', onPointerMove);
      mount.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);

      if (renderer?.domElement) {
        renderer.domElement.remove();
      }

      coreGeo.dispose();
      coreMat.dispose();
      nodeMeshes.forEach((mesh) => {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden glass-panel flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full cursor-grab select-none" />

      {/* Interactive Tooltip Overlay */}
      {activeTech && (
        <div
          className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-12 px-3 py-1.5 rounded-lg bg-zinc-950/90 border border-blue-500/40 backdrop-blur-md shadow-xl transition-all duration-75 text-center"
          style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
        >
          <div className="text-xs font-bold text-white flex items-center gap-1.5 justify-center">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ backgroundColor: activeTech.color }}
            />
            {activeTech.name}
          </div>
          <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
            {activeTech.role}
          </div>
        </div>
      )}

      {/* Guide Pill */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-zinc-900/80 border border-white/5 backdrop-blur-sm pointer-events-none text-[10px] font-mono text-zinc-400 flex items-center gap-1.5">
        Interactive 3D Constellation • Drag to rotate • Hover node to inspect
      </div>
    </div>
  );
}
