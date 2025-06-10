
"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SolarSystem: React.FC<{ isAnimating?: boolean }> = ({ isAnimating = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  // Refs for geometries and materials to dispose
  const geometriesRef = useRef<THREE.BufferGeometry[]>([]);
  const materialsRef = useRef<THREE.Material[]>([]);
  const linesRef = useRef<THREE.Line[]>([]);
  const planetsRef = useRef<THREE.Mesh[]>([]);


  useEffect(() => {
    if (!mountRef.current || !isAnimating) return;

    const currentMount = mountRef.current;
    geometriesRef.current = [];
    materialsRef.current = [];
    linesRef.current = [];
    planetsRef.current = [];


    // Scene
    const scene = new THREE.Scene();
    scene.background = null;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 55; // Pulled camera back

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Sun
    const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xfDB813 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);
    geometriesRef.current.push(sunGeometry);
    materialsRef.current.push(sunMaterial);

    // Planets Data
    const planetsData = [
      { name: "Mercury", size: 0.2, color: 0x8c8c8c, distance: 6, speed: 0.047 },
      { name: "Venus", size: 0.45, color: 0xe6e6e6, distance: 9, speed: 0.035 },
      { name: "Earth", size: 0.5, color: 0x0077be, distance: 12.5, speed: 0.029 },
      { name: "Mars", size: 0.28, color: 0xff4500, distance: 17, speed: 0.024 },
      { name: "Jupiter", size: 1.8, color: 0xd2a679, distance: 25, speed: 0.013 },
      { name: "Saturn", size: 1.5, color: 0xf0e68c, distance: 35, speed: 0.009, hasRings: true },
      { name: "Uranus", size: 0.9, color: 0xafdcec, distance: 45, speed: 0.006 },
      { name: "Neptune", size: 0.85, color: 0x3c64d8, distance: 55, speed: 0.005 },
    ];

    planetsData.forEach(pData => {
      const planetGeometry = new THREE.SphereGeometry(pData.size, 16, 16);
      const planetMaterial = new THREE.MeshStandardMaterial({ color: pData.color, metalness: 0.1, roughness: 0.8 });
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);
      planet.position.x = pData.distance;
      (planet.userData as any) = { distance: pData.distance, speed: pData.speed, angle: Math.random() * Math.PI * 2 };
      sun.add(planet);
      planetsRef.current.push(planet);
      geometriesRef.current.push(planetGeometry);
      materialsRef.current.push(planetMaterial);

      // Saturn's Rings
      if (pData.hasRings) {
        const ringGeometry = new THREE.RingGeometry(pData.size * 1.2, pData.size * 2, 32);
        const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xaaa08c, side: THREE.DoubleSide, transparent: true, opacity: 0.6 });
        const rings = new THREE.Mesh(ringGeometry, ringMaterial);
        rings.rotation.x = Math.PI / 2; // Orient rings
        planet.add(rings); // Add rings as child of Saturn
        geometriesRef.current.push(ringGeometry);
        materialsRef.current.push(ringMaterial);
      }

      // Orbit Line
      const orbitCurve = new THREE.EllipseCurve(0, 0, pData.distance, pData.distance, 0, 2 * Math.PI, false, 0);
      const orbitPoints = orbitCurve.getPoints(100);
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x555555, transparent: true, opacity: 0.4 });
      const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
      orbitLine.rotation.x = Math.PI / 2;
      sun.add(orbitLine);
      linesRef.current.push(orbitLine); // Keep track for disposal if needed, but LineBasicMaterial doesn't need texture disposal. Geometries yes.
      geometriesRef.current.push(orbitGeometry);
      materialsRef.current.push(orbitMaterial);
    });
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Slightly increased ambient light
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 3, 500); // Increased intensity and range
    sun.add(pointLight); // Light emanates from the sun

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      if (currentMount) {
        mousePosition.current.x = (event.clientX / currentMount.clientWidth) * 2 - 1;
        mousePosition.current.y = -(event.clientY / currentMount.clientHeight) * 2 + 1;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      sun.rotation.y += 0.0005; // Slower sun rotation

      planetsRef.current.forEach(planet => {
        (planet.userData as any).angle += (planet.userData as any).speed;
        planet.position.x = (planet.userData as any).distance * Math.cos((planet.userData as any).angle);
        planet.position.z = (planet.userData as any).distance * Math.sin((planet.userData as any).angle);
        planet.rotation.y += 0.005; // Slower planet self-rotation
      });

      camera.position.x += (mousePosition.current.x * 2 - camera.position.x) * 0.02; // Increased mouse influence range
      camera.position.y += (mousePosition.current.y * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position); // Ensure camera always looks at the center of the scene (sun)
      
      renderer.render(scene, camera);
    };
    if (isAnimating) {
        animate();
    }

    // Handle resize
    const handleResize = () => {
        if(currentMount){
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', handleResize);
      
      // Dispose geometries and materials
      geometriesRef.current.forEach(geometry => geometry.dispose());
      materialsRef.current.forEach(material => material.dispose());
      
      // Remove all children from sun and scene to help GC
      while(sun.children.length > 0){ 
          sun.remove(sun.children[0]); 
      }
      while(scene.children.length > 0){ 
          scene.remove(scene.children[0]); 
      }

      if (renderer.domElement && currentMount && currentMount.contains(renderer.domElement)) {
         currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isAnimating]);

  if (!isAnimating && mountRef.current && mountRef.current.firstChild) {
     mountRef.current.removeChild(mountRef.current.firstChild);
  }

  return <div ref={mountRef} className="three-canvas-container w-full h-full" />;
};

export default SolarSystem;
