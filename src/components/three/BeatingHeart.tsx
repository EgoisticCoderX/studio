"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BeatingHeart: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); // alpha: true for transparent background
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Heart Geometry (simple sphere as placeholder)
    const geometry = new THREE.SphereGeometry(1.5, 32, 16);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0xff0000, // Red
      metalness: 0.3,
      roughness: 0.6,
    });
    const heart = new THREE.Mesh(geometry, material);
    scene.add(heart);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation
    let scaleDirection = 1;
    const animate = () => {
      requestAnimationFrame(animate);

      heart.rotation.y += 0.005;

      // Simple beating animation
      let scale = heart.scale.x;
      scale += 0.005 * scaleDirection;
      if (scale > 1.1 || scale < 0.9) {
        scaleDirection *= -1;
      }
      heart.scale.set(scale, scale, scale);
      
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
      window.removeEventListener('resize', handleResize);
      if (currentMount) {
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
