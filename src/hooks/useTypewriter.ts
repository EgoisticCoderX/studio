
"use client";

import { useState, useEffect, useRef } from 'react';

interface TypewriterOptions {
  loop?: boolean;
  typingSpeed?: number;
  deletingSpeed?: number;
  delayAfterTyping?: number;
}

export function useTypewriter(
  texts: string | string[],
  options?: TypewriterOptions
): string {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);
  
  const textsArray = Array.isArray(texts) ? texts : [texts];
  const { 
    loop = false, 
    typingSpeed = 150, 
    deletingSpeed = 100,
    delayAfterTyping = 1500 
  } = options || {};

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    let unmounted = false;

    const handleTyping = () => {
      if (unmounted) return;

      const currentFullText = textsArray[textArrayIndex];
      
      if (isDeleting) {
        setCurrentText(currentFullText.substring(0, currentIndex - 1));
        setCurrentIndex(prev => prev - 1);
      } else {
        setCurrentText(currentFullText.substring(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);
      }
    };

    if (isDeleting && currentIndex === 0) {
      timeoutRef.current = setTimeout(() => {
        if (unmounted) return;
        setIsDeleting(false);
        setTextArrayIndex(prev => (prev + 1) % textsArray.length);
        setCurrentIndex(0); // Reset index for the new text
      }, typingSpeed); // Wait a bit before starting next text if looping
    } else if (!isDeleting && currentIndex === textsArray[textArrayIndex].length) {
      if (loop || textArrayIndex < textsArray.length - 1) {
        timeoutRef.current = setTimeout(() => {
          if (unmounted) return;
          setIsDeleting(true);
        }, delayAfterTyping);
      }
    } else {
      const speed = isDeleting ? deletingSpeed : typingSpeed;
      timeoutRef.current = setTimeout(handleTyping, speed);
    }

    return () => {
      unmounted = true;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if(animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentIndex, isDeleting, textsArray, textArrayIndex, loop, typingSpeed, deletingSpeed, delayAfterTyping]);

  return currentText;
}
