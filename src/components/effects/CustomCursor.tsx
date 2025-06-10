
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import Particle from './Particle';

interface CursorPosition {
  x: number;
  y: number;
}

interface ParticleState {
  id: string;
  startX: number;
  startY: number;
  key: string; 
}

const CustomCursor: FC = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: -100, y: -100 });
  const [isClicked, setIsClicked] = useState(false);
  const [particles, setParticles] = useState<ParticleState[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      const newParticles: ParticleState[] = [];
      for (let i = 0; i < 8; i++) { // Create 8 particles
        const id = `particle-${Date.now()}-${i}`;
        newParticles.push({ 
          id, 
          startX: e.clientX, 
          startY: e.clientY,
          key: id, // React key
        });
      }
      setParticles(prev => [...prev, ...newParticles]);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };
    
    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);


    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  const removeParticle = useCallback((idToRemove: string) => {
    setParticles(prevParticles => prevParticles.filter(p => p.id !== idToRemove));
  }, []);

  const cursorColor = isClicked ? 'hsl(var(--primary))' : 'hsl(var(--accent))';

  if (!isVisible && position.x === -100) { // Initially hide until first mouse move
    return null;
  }

  return (
    <>
      <div
        className="custom-cursor-circle"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          backgroundColor: cursorColor,
          opacity: isVisible ? 1 : 0,
        }}
      />
      {particles.map(p => (
        <Particle
          key={p.key}
          id={p.id}
          startX={p.startX}
          startY={p.startY}
          onComplete={removeParticle}
        />
      ))}
    </>
  );
};

export default CustomCursor;
