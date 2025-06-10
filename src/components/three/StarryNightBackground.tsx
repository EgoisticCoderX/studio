
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
    const camera = new THREE.PerspectiveCamera(60, currentMount.clientWidth / currentMount.clientHeight, 0.1, 2000); // Increased far plane
    camera.position.z = 5; 

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Starfield
    const starVertices: number[] = []; 
    const numStars = 15000;
    starMaterialsRef.current = [];

    for (let i = 0; i < numStars; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000); // Spread stars wider
      const y = THREE.MathUtils.randFloatSpread(2000);
      const z = THREE.MathUtils.randFloatSpread(2000); // Spread stars deeper
      starVertices.push(x, y, z);
    }
    
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    
    const mainStarMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.5, 
      sizeAttenuation: true,
      transparent: true, 
      opacity: 0.85,
      map: createStarTexture(), // Add a simple circular texture
      blending: THREE.AdditiveBlending, // For a brighter look
    });
    starMaterialsRef.current.push(mainStarMaterial);

    function createStarTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const context = canvas.getContext('2d');
      if (context) {
        context.beginPath();
        context.arc(32, 32, 30, 0, 2 * Math.PI);
        context.fillStyle = 'white';
        context.fill();
      }
      return new THREE.CanvasTexture(canvas);
    }


    const stars = new THREE.Points(starGeometry, mainStarMaterial);
    starsRef.current = stars;
    scene.add(stars);


    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (starsRef.current) {
        const mainMat = starsRef.current.material as THREE.PointsMaterial;
        // Subtle individual star twinkling can be complex; this is a global opacity pulse.
        mainMat.opacity = 0.7 + Math.sin(elapsedTime * 1.5) * 0.3; 
      }

      if (starsRef.current) {
        starsRef.current.rotation.x += 0.0001; // Slower rotation
        starsRef.current.rotation.y += 0.0002; // Slower rotation
      }

      // Move camera forward for 'flying through space' effect
      camera.position.z -= 0.1; // Adjust speed of travel
      if (camera.position.z < -1000) camera.position.z = 1000; // Loop camera position
      
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
      starMaterialsRef.current.forEach(mat => {
        if (mat.map) mat.map.dispose();
        mat.dispose();
      });
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
};

export default StarryNightBackground;
