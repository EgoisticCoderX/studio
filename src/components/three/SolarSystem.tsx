"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SolarSystem: React.FC<{ isAnimating?: boolean }> = ({ isAnimating = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current || !isAnimating) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 20;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Sun
    const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xfDB813, wireframe: false });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Planets
    const planetsData = [
      { name: "Mercury", size: 0.5, color: 0x8c8c8c, distance: 6, speed: 0.02 },
      { name: "Venus", size: 0.8, color: 0xffa500, distance: 9, speed: 0.015 },
      { name: "Earth", size: 1, color: 0x0077be, distance: 13, speed: 0.01 },
      { name: "Mars", size: 0.7, color: 0xff4500, distance: 17, speed: 0.008 },
    ];

    const planets: THREE.Mesh[] = [];
    planetsData.forEach(pData => {
      const planetGeometry = new THREE.SphereGeometry(pData.size, 16, 16);
      const planetMaterial = new THREE.MeshStandardMaterial({ color: pData.color, metalness:0.2, roughness: 0.8 });
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);
      planet.position.x = pData.distance;
      // Store speed and distance for animation
      (planet.userData as any) = { distance: pData.distance, speed: pData.speed, angle: Math.random() * Math.PI * 2 };
      sun.add(planet); // Add planet as child of sun to make orbits simpler
      planets.push(planet);
    });
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1.5, 300);
    sun.add(pointLight); // Light emanates from the sun

    // Animation
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      sun.rotation.y += 0.001;

      planets.forEach(planet => {
        (planet.userData as any).angle += (planet.userData as any).speed;
        planet.position.x = (planet.userData as any).distance * Math.cos((planet.userData as any).angle);
        planet.position.z = (planet.userData as any).distance * Math.sin((planet.userData as any).angle);
        planet.rotation.y += 0.01;
      });
      
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
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
         if (currentMount.contains(renderer.domElement)) {
            currentMount.removeChild(renderer.domElement);
        }
      }
      renderer.dispose();
      sunGeometry.dispose();
      sunMaterial.dispose();
      planets.forEach(p => {
        p.geometry.dispose();
        (p.material as THREE.Material).dispose();
      });
    };
  }, [isAnimating]);

  if (!isAnimating && mountRef.current && mountRef.current.firstChild) {
     mountRef.current.removeChild(mountRef.current.firstChild);
  }


  return <div ref={mountRef} className="three-canvas-container w-full h-full" />;
};

export default SolarSystem;
