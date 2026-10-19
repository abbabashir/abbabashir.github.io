import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect mobile for performance optimization
    const isMobile = window.innerWidth < 768;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.045);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 5.2);

    // Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Sleek Central Tech Monolith / Floating Workstation
    const baseGeo = new THREE.BoxGeometry(2.4, 0.08, 1.6);
    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x0f1118,
      roughness: 0.25,
      metalness: 0.85
    });
    const baseMesh = new THREE.Mesh(baseGeo, darkMat);
    baseMesh.position.y = -0.5;
    mainGroup.add(baseMesh);

    // Screen / Display angled up
    const screenGeo = new THREE.BoxGeometry(2.3, 1.4, 0.05);
    const screenFrame = new THREE.Mesh(screenGeo, darkMat);
    screenFrame.position.set(0, 0.35, -0.75);
    screenFrame.rotation.x = -0.15;
    mainGroup.add(screenFrame);

    // Glowing Code Screen face
    const canvasTexture = document.createElement('canvas');
    canvasTexture.width = 512;
    canvasTexture.height = 320;
    const ctx = canvasTexture.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#05070e';
      ctx.fillRect(0, 0, 512, 320);
      ctx.fillStyle = '#3b82f6';
      ctx.font = 'bold 20px monospace';
      ctx.fillText('> Bashir.initialize()', 30, 45);
      ctx.fillStyle = '#60a5fa';
      ctx.font = '16px monospace';
      ctx.fillText('  const engineer = "Bashir Aliyu";', 30, 85);
      ctx.fillText('  const stack = ["AI/ML", "React", "Spring Boot"];', 30, 115);
      ctx.fillText('  const location = "Abuja, Nigeria";', 30, 145);
      ctx.fillStyle = '#10b981';
      ctx.fillText('  ✓ Neural Inference Pipeline: ACTIVE', 30, 185);
      ctx.fillText('  ✓ Distributed Services: 99.98% HEALTHY', 30, 215);
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('  deployToProduction();', 30, 255);
      ctx.fillStyle = '#a855f7';
      ctx.fillText('// Ready to build scalable systems', 30, 290);
    }
    const screenTexture = new THREE.CanvasTexture(canvasTexture);
    const screenDisplayMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      toneMapped: false
    });
    const displayGeo = new THREE.PlaneGeometry(2.15, 1.25);
    const displayMesh = new THREE.Mesh(displayGeo, screenDisplayMat);
    displayMesh.position.set(0, 0.35, -0.72);
    displayMesh.rotation.x = -0.15;
    mainGroup.add(displayMesh);

    // 2. Holographic Rings rotating around the device
    const ringGeo1 = new THREE.TorusGeometry(1.8, 0.008, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.4
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.5;
    mainGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.1, 0.006, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.25
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 3;
    ring2.rotation.x = Math.PI / 4;
    mainGroup.add(ring2);

    // 3. Floating Geometric Neural Nodes / Cubes
    const cubeGeo = new THREE.BoxGeometry(0.18, 0.18, 0.18);
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: true
    });
    const floatingCubes = [];
    const cubeCoords = [
      [-1.8, 0.8, -0.5],
      [1.7, 1.1, -0.3],
      [-1.5, -0.6, 0.8],
      [1.6, -0.4, 0.7],
      [-0.2, 1.6, -1.0]
    ];

    cubeCoords.forEach((coord, idx) => {
      const cube = new THREE.Mesh(cubeGeo, cubeMat);
      cube.position.set(coord[0], coord[1], coord[2]);
      cube.userData = {
        baseY: coord[1],
        speed: 0.8 + idx * 0.25,
        rotSpeed: 0.01 + idx * 0.005
      };
      mainGroup.add(cube);
      floatingCubes.push(cube);
    });

    // 4. Subtle Ambient Particle Constellation
    const particleCount = isMobile ? 80 : 220;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 8;
      particlePos[i + 1] = (Math.random() - 0.5) * 6;
      particlePos[i + 2] = (Math.random() - 0.5) * 6;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.025,
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.6
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 5. Grid Floor
    const gridHelper = new THREE.GridHelper(14, 28, 0x1e3a8a, 0x0f172a);
    gridHelper.position.y = -1.6;
    scene.add(gridHelper);

    // 6. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 3, 10);
    blueLight.position.set(2, 3, 2);
    scene.add(blueLight);

    const cyanRimLight = new THREE.PointLight(0x38bdf8, 2, 8);
    cyanRimLight.position.set(-3, -1, -2);
    scene.add(cyanRimLight);

    // Mouse Tracking with smooth Lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
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
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      targetRotY = mouseX * 0.35;
      targetRotX = -mouseY * 0.2;
      mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.05;

      // Gentle floating animation
      mainGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.08;

      // Ring rotations
      ring1.rotation.z = elapsedTime * 0.15;
      ring2.rotation.z = -elapsedTime * 0.12;

      // Floating cubes
      floatingCubes.forEach((cube) => {
        cube.position.y = cube.userData.baseY + Math.sin(elapsedTime * cube.userData.speed) * 0.12;
        cube.rotation.x += cube.userData.rotSpeed;
        cube.rotation.y += cube.userData.rotSpeed;
      });

      // Particle subtle swirl
      particleSystem.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      baseGeo.dispose();
      darkMat.dispose();
      screenGeo.dispose();
      displayGeo.dispose();
      screenDisplayMat.dispose();
      screenTexture.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      cubeGeo.dispose();
      cubeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[380px] sm:h-[450px] lg:h-[560px] cursor-grab active:cursor-grabbing select-none"
    />
  );
}
