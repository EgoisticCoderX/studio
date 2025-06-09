"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CodingSymbol: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    let animationFrameId: number;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null; 

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 4; // Adjusted for Icosahedron

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Coding Symbol Geometry (Icosahedron for a more complex/techy look)
    const geometry = new THREE.IcosahedronGeometry(1.5, 0); // radius, detail
    const material = new THREE.MeshStandardMaterial({ 
        color: 0x4682B4, // Steel Blue (accent color)
        metalness: 0.6,
        roughness: 0.3,
        flatShading: false,
    });
    const symbol = new THREE.Mesh(geometry, material);
    scene.add(symbol);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1.0, 100);
    pointLight.position.set(3, 2, 3);
    scene.add(pointLight);
    const directionalLight = new THREE.DirectionalLight(0xccddff, 0.7);
    directionalLight.position.set(-2, 3, -2);
    scene.add(directionalLight);
    
    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      symbol.rotation.x = elapsedTime * 0.2;
      symbol.rotation.y = elapsedTime * 0.35;
      symbol.rotation.z = elapsedTime * 0.1;
      
      renderer.render(scene, camera);
    };
    animate();

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
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
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

export default CodingSymbol;
