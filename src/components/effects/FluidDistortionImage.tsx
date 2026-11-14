import React, { useEffect, useRef, useState } from 'react';

interface FluidDistortionImageProps {
  src: string;
  alt: string;
  className?: string;
  intensity?: number;
}

export const FluidDistortionImage: React.FC<FluidDistortionImageProps> = ({
  src,
  alt,
  className = '',
  intensity = 1.0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;

    let animId: number;
    let waveTime = 0;
    let hoverAmount = 0;
    let mousePos = { x: 0.5, y: 0.5 };

    img.onload = () => {
      setIsLoaded(true);
      const resize = () => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      };
      resize();
      window.addEventListener('resize', resize);
    };

    const render = () => {
      if (!ctx || !canvas || img.naturalWidth === 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      // Smooth hover interpolation
      const targetHover = isHovered ? 1.0 : 0.0;
      hoverAmount += (targetHover - hoverAmount) * 0.08;

      if (hoverAmount > 0.005) {
        waveTime += 0.04;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (hoverAmount <= 0.005) {
        // Simple crisp draw when not hovered to save CPU
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      } else {
        // Liquid slice displacement with chromatic prism shift
        const slices = 40;
        const sliceHeight = canvas.height / slices;

        for (let i = 0; i < slices; i++) {
          const y = i * sliceHeight;
          const normalizedY = y / canvas.height;

          // Sinusoidal wave distortion based on distance to mouse
          const distToMouse = Math.abs(normalizedY - mousePos.y);
          const mouseFactor = Math.exp(-distToMouse * 3.5);

          const waveX =
            Math.sin(normalizedY * 12.0 + waveTime * 2.5) *
            8.0 *
            hoverAmount *
            intensity *
            (1.0 + mouseFactor * 2.0);

          // Draw slice
          ctx.drawImage(
            img,
            0,
            (i * img.naturalHeight) / slices,
            img.naturalWidth,
            img.naturalHeight / slices,
            waveX,
            y,
            canvas.width,
            sliceHeight + 1
          );
        }

        // Chromatic aberration overlay flash on hover
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.globalAlpha = 0.25 * hoverAmount;
        ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mousePos = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      cancelAnimationFrame(animId);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [src, isHovered, intensity]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden w-full h-full bg-slate-900 ${className}`}
      data-cursor="EXPLORE"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 animate-pulse text-xs font-mono text-purple-400">
          INITIALIZING_ASSET...
        </div>
      )}
      <div className="sr-only">{alt}</div>
    </div>
  );
};
