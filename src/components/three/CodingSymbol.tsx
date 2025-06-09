"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CodingSymbol: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;

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
      // const elapsedTime = clock.getElapsedTime(); // Keep for original animation if desired

      // Apply subtle rotation based on mouse position
      // Map mouse coordinates (-1 to 1) to a small rotation range (-0.2 to 0.2 radians)
      const targetRotationX = mouseY * 0.2;
      const targetRotationY = mouseX * 0.2;

      // Smoothly interpolate towards the target rotation
      symbol.rotation.x += (targetRotationX - symbol.rotation.x) * 0.05;
      symbol.rotation.y += (targetRotationY - symbol.rotation.y) * 0.05;

      // You can combine with original animation if you like, e.g., symbol.rotation.z = elapsedTime * 0.1;
      
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

    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      if(currentMount){
        // Normalize mouse coordinates to a range of -1 to 1
        mouseX = (event.clientX / currentMount.clientWidth) * 2 - 1;
        mouseY = - (event.clientY / currentMount.clientHeight) * 2 + 1;
      }
    };

    window.addEventListener('resize', handleResize);
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

export default CodingSymbol;
