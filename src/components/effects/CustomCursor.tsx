import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Buttery spring physics for fluid trailing feel
  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable custom cursor for pointer devices with hover capability
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor]');
      if (interactiveEl) {
        setIsHovered(true);
        const customText = interactiveEl.getAttribute('data-cursor');
        if (customText) {
          setCursorText(customText);
        } else if (interactiveEl.tagName === 'A' || interactiveEl.tagName === 'BUTTON') {
          // Subtle hover state
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer fluid trailing ring with iridescent glow */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center font-mono text-[10px] uppercase tracking-wider text-white font-semibold backdrop-blur-[2px]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorText ? 84 : isHovered ? 54 : 32,
          height: cursorText ? 84 : isHovered ? 54 : 32,
          backgroundColor: cursorText
            ? 'rgba(139, 92, 246, 0.4)'
            : isHovered
            ? 'rgba(6, 182, 212, 0.25)'
            : 'rgba(255, 255, 255, 0.05)',
          borderColor: cursorText
            ? 'rgba(236, 72, 153, 0.6)'
            : isHovered
            ? 'rgba(168, 85, 247, 0.5)'
            : 'rgba(255, 255, 255, 0.25)',
          scale: isPressed ? 0.85 : 1,
          borderWidth: '1.5px',
          boxShadow: isHovered
            ? '0 0 25px rgba(139, 92, 246, 0.4), 0 0 10px rgba(6, 182, 212, 0.3)'
            : 'none',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="tracking-widest text-cyan-200"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Center sharp pinpoint bead */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
};
