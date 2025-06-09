
"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const StarryNightBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const starMaterialsRef = useRef<THREE.PointsMaterial[]>([]);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null; 

    // Camera
    const camera = new THREE.PerspectiveCamera(60, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 1;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Starfield
    const starVertices: number[] = [];
    const numStars = 15000;
    starMaterialsRef.current = [];

    for (let i = 0; i < numStars; i++) {
      const x = THREE.MathUtils.randFloatSpread(1500); // Spread stars wider
      const y = THREE.MathUtils.randFloatSpread(1500);
      const z = THREE.MathUtils.randFloatSpread(1500);
      starVertices.push(x, y, z);
    }
    
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

    // Create a few materials for different star appearances (size, opacity for twinkling)
    const materialConfigs = [
        { size: 0.008, color: 0xffffff, opacity: 1.0 },
        { size: 0.01, color: 0xeeeeff, opacity: 0.8 },
        { size: 0.006, color: 0xffdddd, opacity: 0.9 },
    ];
    
    // Assign materials somewhat randomly to groups of stars if needed, or use one main material
    // For simplicity with twinkling on main material:
    const mainStarMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.007,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.85 
    });
    starMaterialsRef.current.push(mainStarMaterial);

    const stars = new THREE.Points(starGeometry, mainStarMaterial);
    starsRef.current = stars;
    scene.add(stars);


    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (starsRef.current) {
        starsRef.current.rotation.x = elapsedTime * 0.005;
        starsRef.current.rotation.y = elapsedTime * 0.008;

        // Subtle twinkling effect by oscillating opacity
        const mainMat = starsRef.current.material as THREE.PointsMaterial;
        mainMat.opacity = 0.75 + Math.sin(elapsedTime * 1.5) * 0.25; // Oscillate between 0.5 and 1.0
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (currentMount) {
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
      if (currentMount && renderer.domElement && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      starGeometry.dispose();
      starMaterialsRef.current.forEach(mat => mat.dispose());
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
};

export default StarryNightBackground;
