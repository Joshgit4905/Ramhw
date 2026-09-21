'use client';
import { useState, useEffect } from 'react';

interface TextTypeProps {
  text: string | string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
}

export default function TextType({ 
  text, 
  typingSpeed = 50, 
  deletingSpeed = 30,
  loop = false,
  className = '', 
  showCursor = true 
}: TextTypeProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);

  useEffect(() => {
    const currentString = Array.isArray(text) ? text[loopIndex % text.length] : text;
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedText !== currentString) {
      // Typing forward
      timer = setTimeout(() => {
        setDisplayedText(currentString.substring(0, displayedText.length + 1));
      }, typingSpeed);
    } else if (isDeleting && displayedText !== '') {
      // Deleting backward
      timer = setTimeout(() => {
        setDisplayedText(currentString.substring(0, displayedText.length - 1));
      }, deletingSpeed);
    } else if (displayedText === currentString) {
      if (loop || (Array.isArray(text) && text.length > 1 && loopIndex < text.length - 1)) {
        timer = setTimeout(() => setIsDeleting(true), 2000); // Pause before delete
      }
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setLoopIndex(loopIndex + 1);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, text, typingSpeed, deletingSpeed, loop, loopIndex]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && <span style={{ opacity: 0.8, animation: 'blink 1s step-end infinite' }}>_</span>}
      <style jsx>{`
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </span>
  );
}
