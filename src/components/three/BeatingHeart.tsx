"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BeatingHeart: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    let animationFrameId: number;

    const mouse = new THREE.Vector2();

    // Scene
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 3.5; // Adjusted for new geometry size

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Heart Geometry (TorusKnot as a more abstract "tech" heart)
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16); // radius, tube, tubularSegments, radialSegments
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x50C878, // Emerald green (primary color)
      metalness: 0.4,
      roughness: 0.5,
      emissive: 0x103010, // Slight green glow
    });
    const heart = new THREE.Mesh(geometry, material);
    scene.add(heart);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1.2, 100);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(-2, -1, 1);
    scene.add(directionalLight);


    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      
      // Existing rotation
      // heart.rotation.y = elapsedTime * 0.3;
      // heart.rotation.x = elapsedTime * 0.15;

      // Rotate heart based on mouse position (subtle effect)
      heart.rotation.y = mouse.x * 0.5; // Adjust multiplier for sensitivity
      heart.rotation.x = mouse.y * 0.5; // Adjust multiplier for sensitivity

      // Smoother beating animation using sine wave
      const scaleFactor = 0.1 * Math.sin(elapsedTime * Math.PI * 1.5); // Adjust speed/amplitude of beat
      const baseScale = 1.0;
      heart.scale.set(baseScale + scaleFactor, baseScale + scaleFactor, baseScale + scaleFactor);
      
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
    
    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
        if(currentMount) {
            // Normalize mouse coordinates (-1 to +1)
            mouse.x = (event.clientX / currentMount.clientWidth) * 2 - 1;
            mouse.y = -(event.clientY / currentMount.clientHeight) * 2 + 1;
        }
    };
    currentMount.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      currentMount.removeEventListener('mousemove', handleMouseMove);
      if (currentMount && renderer.domElement && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={mountRef} className="three-canvas-container h-48 w-48 md:h-64 md:w-64" />;
};

export default BeatingHeart;
