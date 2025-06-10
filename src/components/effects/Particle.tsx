
'use client';

import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

interface ParticleProps {
  id: string;
  startX: number;
  startY: number;
  onComplete: (id: string) => void;
}

const PARTICLE_ANIMATION_DURATION = 600; // ms

const Particle: FC<ParticleProps> = ({ id, startX, startY, onComplete }) => {
  const [dx] = useState((Math.random() - 0.5) * 150); // Random horizontal offset
  const [dy] = useState((Math.random() - 0.5) * 150); // Random vertical offset
  const [opacity, setOpacity] = useState(1);
  const [transform, setTransform] = useState('translate(0px, 0px) scale(1)');
  const [size] = useState(Math.random() * 5 + 3); // Random size between 3px and 8px

  useEffect(() => {
    // Start animation
    requestAnimationFrame(() => {
      setTransform(`translate(${dx}px, ${dy}px) scale(0.3)`);
      setOpacity(0);
    });

    // Schedule removal
    const timer = setTimeout(() => {
      onComplete(id);
    }, PARTICLE_ANIMATION_DURATION);

    return () => clearTimeout(timer);
  }, [id, dx, dy, onComplete]);

  return (
    <div
      className="particle"
      style={{
        left: `${startX}px`,
        top: `${startY}px`,
        width: `${size}px`,
        height: `${size}px`,
        opacity: opacity,
        transform: transform,
        backgroundColor: 'hsl(var(--primary))', // Green particles
        transition: `transform ${PARTICLE_ANIMATION_DURATION}ms ease-out, opacity ${PARTICLE_ANIMATION_DURATION}ms ease-out`,
      }}
    />
  );
};

export default Particle;
