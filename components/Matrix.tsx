
import React, { useEffect, useRef, useMemo } from 'react';
import { PatternContext, GridConfig, PatternResult, Theme } from '../types';
import { createPatternFunction } from '../utils/mathEngine';

interface MatrixProps {
  code: string;
  config: GridConfig;
  isPlaying: boolean;
  time: number;
  mousePos: { x: number; y: number };
  params: Record<string, number>;
  onTick: (dt: number) => void;
  onMouseMove?: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  theme?: Theme;
}

const Matrix: React.FC<MatrixProps> = ({ 
  code, 
  config, 
  isPlaying, 
  time,
  mousePos, 
  params,
  onTick,
  onMouseMove,
  theme = 'dark'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  
  const timeRef = useRef(time);
  useEffect(() => {
    timeRef.current = time;
  }, [time]);

  const paramNames = useMemo(() => Object.keys(params), [params]);
  const patternFn = useMemo(() => createPatternFunction(code, paramNames), [code, paramNames]);

  const draw = (timestamp: number) => {
    if (!lastFrameTimeRef.current) lastFrameTimeRef.current = timestamp;
    const dt = (timestamp - lastFrameTimeRef.current) / 1000;
    lastFrameTimeRef.current = timestamp;

    if (isPlaying) {
      onTick(dt);
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background color based on theme
    ctx.fillStyle = theme === 'dark' ? '#0a0a0a' : '#fafaf9'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const { width, height, pixelSize, gap } = config;
    const totalW = width * (pixelSize + gap);
    const totalH = height * (pixelSize + gap);
    const offsetX = (canvas.width - totalW) / 2;
    const offsetY = (canvas.height - totalH) / 2;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = y * width + x;
        const px = offsetX + x * (pixelSize + gap);
        const py = offsetY + y * (pixelSize + gap);
        
        // 1. Draw the "Off" state (Physical LED casing)
        ctx.beginPath();
        ctx.arc(px + pixelSize/2, py + pixelSize/2, pixelSize/2, 0, Math.PI * 2);
        // Dark Mode: Dark Grey LED. Light Mode: Light Grey placeholder.
        ctx.fillStyle = theme === 'dark' ? '#1c1c1c' : '#e7e5e4';
        ctx.fill();

        // 2. Calculate Pattern
        const context: PatternContext = {
          x, y, t: timeRef.current, i, w: width, h: height,
          mx: mousePos.x, my: mousePos.y,
          ...params
        };

        const color: PatternResult = patternFn(context);
        const r = isNaN(color.r) ? 0 : Math.max(0, Math.min(255, color.r));
        const g = isNaN(color.g) ? 0 : Math.max(0, Math.min(255, color.g));
        const b = isNaN(color.b) ? 0 : Math.max(0, Math.min(255, color.b));

        // 3. Draw "On" state
        if (r > 5 || g > 5 || b > 5) {
            ctx.beginPath();
            ctx.arc(px + pixelSize/2, py + pixelSize/2, (pixelSize/2) - 1, 0, Math.PI * 2);
            ctx.fillStyle = `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
            ctx.fill();

            // Glow only in dark mode or if very bright
            if (theme === 'dark' && (r+g+b > 200)) {
              ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
              ctx.shadowBlur = pixelSize / 2;
            } else {
              ctx.shadowBlur = 0;
            }
        } else {
           ctx.shadowBlur = 0;
        }
      }
    }
    
    requestRef.current = requestAnimationFrame(draw);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(draw);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [patternFn, isPlaying, params, theme]); 

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-stone-50 dark:bg-ink-950 transition-colors duration-300">
      <div className="relative p-1 bg-white dark:bg-ink-900 rounded-sm shadow-xl dark:shadow-black">
        <canvas
          ref={canvasRef}
          width={600}
          height={600}
          className="max-w-full max-h-full rounded-sm"
          onMouseMove={onMouseMove}
        />
      </div>
    </div>
  );
};

export default Matrix;
