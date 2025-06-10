
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
): { typedText: string; currentFullText: string; isDeleting: boolean } {
  const [typedTextState, setTypedTextState] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeletingState, setIsDeletingState] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);

  const textsArray = Array.isArray(texts) ? texts : (texts ? [texts] : []); // Handle null/undefined texts gracefully

  const {
    loop = false,
    typingSpeed = 150,
    deletingSpeed = 100,
    delayAfterTyping = 1500
  } = options || {};

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Handle empty or all-empty texts array
    if (textsArray.length === 0 || textsArray.every(t => t.length === 0)) {
      setTypedTextState(''); // Ensure typedText is cleared
      return;
    }

    let unmounted = false;
    const currentFullTextForEffect = textsArray[textArrayIndex % textsArray.length]; // Ensure textArrayIndex is valid

    const handleTyping = () => {
      if (unmounted) return;

      if (isDeletingState) {
        setTypedTextState(currentFullTextForEffect.substring(0, currentIndex - 1));
        setCurrentIndex(prev => prev - 1);
      } else {
        setTypedTextState(currentFullTextForEffect.substring(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);
      }
    };

    if (isDeletingState && currentIndex === 0) {
      timeoutRef.current = setTimeout(() => {
        if (unmounted) return;
        setIsDeletingState(false);
        setTextArrayIndex(prev => (prev + 1) % textsArray.length);
        // currentIndex will remain 0, ready for the next phrase
      }, deletingSpeed); 
    } else if (!isDeletingState && currentIndex === currentFullTextForEffect.length) {
      if (loop || textArrayIndex < textsArray.length - 1) {
        timeoutRef.current = setTimeout(() => {
          if (unmounted) return;
          setIsDeletingState(true);
        }, delayAfterTyping);
      }
    } else {
      // Only set timeout if currentFullTextForEffect is defined and has length
      if (currentFullTextForEffect && currentFullTextForEffect.length > 0) {
        const speed = isDeletingState ? deletingSpeed : typingSpeed;
        timeoutRef.current = setTimeout(handleTyping, speed);
      } else if (loop) { // If current text is empty but we are looping, move to next
        timeoutRef.current = setTimeout(() => {
            if (unmounted) return;
            setIsDeletingState(false); // Should be false to start typing next
            setTextArrayIndex(prev => (prev + 1) % textsArray.length);
            setCurrentIndex(0);
        }, typingSpeed);
      }
    }

    return () => {
      unmounted = true;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, isDeletingState, textsArray, textArrayIndex, loop, typingSpeed, deletingSpeed, delayAfterTyping]);
  
  const currentFullTextDisplay = (textsArray.length > 0 && textsArray[textArrayIndex % textsArray.length]) || "";

  return {
    typedText: typedTextState,
    currentFullText: currentFullTextDisplay,
    isDeleting: isDeletingState,
  };
}
