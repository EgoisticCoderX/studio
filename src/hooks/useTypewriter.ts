
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

  useEffect(() => {
    const handleTyping = () => {
      const currentFullText = textsArray[textArrayIndex];
      
      if (isDeleting) {
        setCurrentText(currentFullText.substring(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      } else {
        setCurrentText(currentFullText.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }

      if (!isDeleting && currentIndex === currentFullText.length) {
        if (textsArray.length > 1 || loop) {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), delayAfterTyping);
        }
      } else if (isDeleting && currentIndex === 0) {
        setIsDeleting(false);
        if (textsArray.length > 1) {
          setTextArrayIndex((prev) => (prev + 1) % textsArray.length);
        }
        if (!loop && textArrayIndex === textsArray.length - 1 && textsArray.length > 1) {
          // Stop if not looping and it's the last text in a multi-text array
          return; 
        }
      }
    };

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    timeoutRef.current = setTimeout(handleTyping, speed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, isDeleting, textsArray, textArrayIndex, loop, typingSpeed, deletingSpeed, delayAfterTyping]);

  return currentText;
}
