
import React, { useRef, useEffect } from 'react';
import { VisualizerMode, Language, Theme } from '../types';

interface ConceptVisualizerProps {
  mode: VisualizerMode;
  time: number;
  isPlaying: boolean;
  onTick: (dt: number) => void;
  mousePos: { x: number; y: number };
  lang?: Language;
  onMouseMove?: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  theme?: Theme;
  params?: Record<string, number>;
}

const ConceptVisualizer: React.FC<ConceptVisualizerProps> = ({ 
  mode, 
  time, 
  isPlaying,
  onTick,
  mousePos, 
  lang = 'en', 
  onMouseMove, 
  theme = 'light', 
  params = {} 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);

  // Animation Loop for Concept Visualizer
  const animate = (timestamp: number) => {
    if (!lastFrameTimeRef.current) lastFrameTimeRef.current = timestamp;
    const dt = (timestamp - lastFrameTimeRef.current) / 1000;
    lastFrameTimeRef.current = timestamp;

    if (isPlaying) {
      onTick(dt);
    }
    
    // Trigger render
    renderCanvas();
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, mode, lang, theme, params, time, mousePos]); // Dependencies for re-render


  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set dimensions
    const width = canvas.width;
    const height = canvas.height;

    // Clear with theme background
    ctx.fillStyle = theme === 'dark' ? '#0a0a0a' : '#fafaf9';
    ctx.fillRect(0, 0, width, height);

    if (mode === 'COORDINATE_PLANE') {
      drawCoordinatePlane(ctx, width, height, mousePos, lang, theme, params);
    } else if (mode === 'UNIT_CIRCLE') {
      drawUnitCircle(ctx, width, height, time, lang, theme, params);
    } else if (mode === 'NORMALIZED_GRADIENT') {
      drawNormalizedGradient(ctx, width, height, mousePos, lang, theme);
    }
  };

  // --- Helpers for Theme Colors ---
  const getColors = (t: Theme) => ({
    text: t === 'dark' ? '#78716c' : '#57534e',
    textHighlight: t === 'dark' ? '#a34131' : '#a34131',
    line: t === 'dark' ? '#262626' : '#e7e5e4',
    lineHighlight: t === 'dark' ? '#a34131' : '#a34131',
    gridDefault: t === 'dark' ? '#404040' : '#d6d3d1',
    path: t === 'dark' ? 'rgba(163, 65, 49, 0.4)' : 'rgba(163, 65, 49, 0.3)'
  });

  // --- Visualizer Logic: Coordinate Plane ---
  const drawCoordinatePlane = (ctx: CanvasRenderingContext2D, w: number, h: number, mouse: { x: number; y: number }, lang: Language, theme: Theme, params: Record<string, number>) => {
    const gridSize = 60;
    const cols = 8;
    const rows = 8;
    const colors = getColors(theme);
    const layout = Math.round(params['layout'] ?? 0); // 0=Standard, 1=ZigZag, 2=Col, 3=ColZigZag

    // Center the grid
    const startX = (w - (cols * gridSize)) / 2;
    const startY = (h - (rows * gridSize)) / 2;

    // 1. Draw Data Path (Snake Line)
    ctx.beginPath();
    ctx.strokeStyle = colors.path;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const getCoordForIndex = (i: number) => {
      let x = 0, y = 0;
      // Reverse math to find x,y from index based on layout
      if (layout === 0) { // Row Major (Standard)
         y = Math.floor(i / cols);
         x = i % cols;
      } else if (layout === 1) { // Row ZigZag
         y = Math.floor(i / cols);
         x = (y % 2 === 0) ? (i % cols) : (cols - 1 - (i % cols));
      } else if (layout === 2) { // Col Major
         x = Math.floor(i / rows);
         y = i % rows;
      } else if (layout === 3) { // Col ZigZag
         x = Math.floor(i / rows);
         y = (x % 2 === 0) ? (i % rows) : (rows - 1 - (i % rows));
      }
      return { x, y };
    };

    // Draw the line connecting 0 to 63
    const totalPixels = cols * rows;
    for(let i = 0; i < totalPixels; i++) {
      const p = getCoordForIndex(i);
      const px = startX + p.x * gridSize + gridSize/2;
      const py = startY + p.y * gridSize + gridSize/2;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // 2. Draw Boxes and Coordinates
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for(let y = 0; y < rows; y++) {
      for(let x = 0; x < cols; x++) {
        const px = startX + x * gridSize;
        const py = startY + y * gridSize;
        
        // Exact pixel hit testing
        const isHovered = 
            mouse.x * w > px && 
            mouse.x * w < px + gridSize && 
            mouse.y * h > py && 
            mouse.y * h < py + gridSize;

        // Calculate physical index for this coordinate
        let index = 0;
        if (layout === 0) index = y * cols + x;
        else if (layout === 1) index = (y % 2 === 0) ? (y * cols + x) : (y * cols + (cols - 1 - x));
        else if (layout === 2) index = x * rows + y;
        else if (layout === 3) index = (x % 2 === 0) ? (x * rows + y) : (x * rows + (rows - 1 - y));

        // Draw Box
        ctx.strokeStyle = isHovered ? colors.lineHighlight : colors.line;
        ctx.lineWidth = isHovered ? 3 : 1;
        ctx.strokeRect(px, py, gridSize, gridSize);

        // Draw Logical Coord (Large)
        if (isHovered) {
          ctx.fillStyle = colors.textHighlight;
          ctx.font = 'bold 18px "JetBrains Mono"';
        } else {
          ctx.fillStyle = colors.gridDefault;
          ctx.font = '14px "JetBrains Mono"';
        }
        ctx.fillText(`${x},${y}`, px + gridSize/2, py + gridSize/2 - 8);

        // Draw Physical Index (Small)
        ctx.font = '12px "JetBrains Mono"';
        ctx.fillStyle = colors.text;
        ctx.fillText(`#${index}`, px + gridSize/2, py + gridSize/2 + 12);
      }
    }

    ctx.fillStyle = colors.textHighlight;
    ctx.font = lang === 'hi' ? '18px sans-serif' : '18px Inter';
    ctx.textAlign = 'center';
    
    // Layout Name Display
    let layoutName = "";
    if (layout === 0) layoutName = lang === 'hi' ? "सीधा (Standard)" : "Standard";
    if (layout === 1) layoutName = lang === 'hi' ? "सांप (ZigZag)" : "ZigZag";
    if (layout === 2) layoutName = lang === 'hi' ? "खड़ा (Vertical)" : "Vertical";
    if (layout === 3) layoutName = lang === 'hi' ? "खड़ा सांप (Vert ZigZag)" : "Vert ZigZag";

    const text = lang === 'hi' 
      ? `वायरिंग: ${layoutName}` 
      : `Wiring: ${layoutName}`;
      
    ctx.fillText(text, w/2, h - 30);
  };

  // --- Visualizer Logic: Normalized Gradient ---
  const drawNormalizedGradient = (ctx: CanvasRenderingContext2D, w: number, h: number, mouse: { x: number; y: number }, lang: Language, theme: Theme) => {
    const gridSize = 60;
    const cols = 8; 
    const colors = getColors(theme);
    
    // Center the grid
    const startX = (w - (cols * gridSize)) / 2;
    const startY = h/2 - gridSize/2; 

    ctx.font = '14px "JetBrains Mono"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = colors.text;
    ctx.fillText("x = 0", startX + gridSize/2, startY - 30);
    ctx.fillText("x = 7", startX + (cols-1)*gridSize + gridSize/2, startY - 30);

    for(let x = 0; x < cols; x++) {
        const px = startX + x * gridSize;
        const py = startY;
        
        const normalized = x / cols; 
        const val = Math.floor(normalized * 255);

        const isHovered = 
            mouse.x * w > px && 
            mouse.x * w < px + gridSize && 
            mouse.y * h > py && 
            mouse.y * h < py + gridSize;

        // Draw Box Fill (Always grayscale logic)
        ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
        ctx.fillRect(px, py, gridSize, gridSize);
        
        // Border
        ctx.strokeStyle = isHovered ? colors.lineHighlight : colors.line;
        ctx.lineWidth = isHovered ? 3 : 1;
        ctx.strokeRect(px, py, gridSize, gridSize);

        // Draw Text
        ctx.fillStyle = val > 128 ? '#000' : '#fff';
        if (isHovered) {
             ctx.font = 'bold 16px "JetBrains Mono"';
             ctx.fillText((x/cols).toFixed(2), px + gridSize/2, py + gridSize/2);
        } else {
             ctx.font = '14px "JetBrains Mono"';
             ctx.fillText(x.toString(), px + gridSize/2, py + gridSize/2);
        }
    }
    
    ctx.fillStyle = colors.textHighlight;
    ctx.font = lang === 'hi' ? '18px sans-serif' : '18px Inter';
    ctx.textAlign = 'center';
    const text = lang === 'hi' 
      ? "चमक (Brightness) = x / चौड़ाई (width)" 
      : "Brightness = x / width";
    ctx.fillText(text, w/2, h - 80);
  };


  // --- Visualizer Logic: Unit Circle (Sine/Cos/Tan) ---
  const drawUnitCircle = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number, lang: Language, theme: Theme, params: Record<string, number>) => {
    const cx = w * 0.3; 
    const cy = h / 2;   
    const radius = 80; 
    const colors = getColors(theme);
    
    // 'func' Param: 0 = Sin, 1 = Cos, 2 = Tan
    const funcMode = Math.round(params['func'] ?? 0);
    
    // Different visual colors for different functions
    let accentColor = colors.lineHighlight; // Default Red (Sin)
    if (funcMode === 1) accentColor = '#2563eb'; // Blue (Cos)
    if (funcMode === 2) accentColor = '#d97706'; // Orange (Tan)

    const angle = t * 2; 
    const px = cx + Math.cos(angle) * radius;
    const py = cy + Math.sin(angle) * radius;

    // 1. Draw Axis
    ctx.strokeStyle = colors.line;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, cy); ctx.lineTo(w, cy); 
    ctx.moveTo(cx, 0); ctx.lineTo(cx, h); 
    ctx.stroke();

    // 2. Draw Circle
    ctx.strokeStyle = colors.gridDefault;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    // 3. Draw Radius Arm
    ctx.strokeStyle = theme === 'dark' ? '#f5f5f4' : '#1c1917';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    // For Tan, we extend the line
    if (funcMode === 2) {
         // Calculate extension to hit the tangent line (x = radius)
         // cos(a) * L = radius => L = radius / cos(a)
         // But careful with division by zero
         const cosA = Math.cos(angle);
         if (Math.abs(cosA) > 0.01) {
            const extLen = radius / Math.abs(cosA);
            // Cap it visually so it doesn't draw infinite lines
            const drawLen = Math.min(extLen, 500); 
            const extX = cx + Math.cos(angle) * drawLen;
            const extY = cy + Math.sin(angle) * drawLen;
            ctx.lineTo(extX, extY);
         } else {
             ctx.lineTo(px, py); // Fallback
         }
    } else {
        ctx.lineTo(px, py);
    }
    ctx.stroke();

    // 4. Highlight the Component (Sin=Y, Cos=X, Tan=Slope)
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 4;
    ctx.beginPath();
    
    if (funcMode === 1) { 
        // COSINE: Highlight Width (X-axis projection)
        ctx.moveTo(cx, cy);
        ctx.lineTo(px, cy);
    } else if (funcMode === 2) {
        // TANGENT: Draw the tangent vertical line at edge
        // The tangent value is the height on this line where the radius hits
        // We simulate the visual by drawing the line x = radius
        const tanX = cx + radius; // Right edge
        ctx.strokeStyle = colors.gridDefault;
        ctx.moveTo(tanX, 0);
        ctx.lineTo(tanX, h);
        ctx.stroke();

        // Draw the "Value" line on the tangent
        const tanVal = Math.tan(angle);
        const tanY = cy + tanVal * radius; // Inverted Y in canvas? No, sin is y.
        // Canvas Y grows down. Math Y grows up.
        // sin(a) is +down in canvas terms if we map directly? 
        // Actually earlier: py = cy + sin(a)*r. So sin(a)=1 -> py = cy+r (Down).
        // So visually +1 is Down. That's fine for consistency.
        
        ctx.strokeStyle = accentColor;
        ctx.beginPath();
        ctx.moveTo(tanX, cy);
        // Clamp drawing for visual sanity
        const clampY = Math.max(-1000, Math.min(1000, tanY));
        ctx.lineTo(tanX, clampY);
    } else {
        // SINE (Default): Highlight Height (Y-axis projection) inside circle
        ctx.moveTo(px, cy);
        ctx.lineTo(px, py);
    }
    ctx.stroke();

    // 5. Draw Connecting Line to Wave Graph
    const waveStartX = w * 0.55;
    ctx.strokeStyle = accentColor; 
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();

    if (funcMode === 1) {
        // Cos connects from the X position on the circle? 
        // Hard to map X-movement to a scrolling Y-graph intuitively.
        // Standard convention: Rotate the graph or just map the value.
        // Let's just map the "Value" line to the graph center.
        ctx.moveTo(px, cy + 10); // slightly offset
        ctx.lineTo(waveStartX, cy + Math.cos(angle) * radius);
    } else if (funcMode === 2) {
        const tanVal = Math.tan(angle);
        const tanY = cy + tanVal * radius; 
         // Don't draw connection if off screen
        if (Math.abs(tanVal) < 4) {
             ctx.moveTo(cx + radius, tanY);
             ctx.lineTo(waveStartX, tanY);
        }
    } else {
        // Sin connects naturally
        ctx.moveTo(px, py);
        ctx.lineTo(waveStartX, py);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // 6. Draw Wave Trail
    ctx.beginPath();
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 3;
    for (let i = 0; i < 200; i++) {
        const xOffset = i;
        const histAngle = angle - xOffset * 0.05;
        let val = 0;
        if (funcMode === 1) val = Math.cos(histAngle);
        else if (funcMode === 2) {
            val = Math.tan(histAngle);
            // Clamp Tan for rendering or it breaks the path
            if (val > 4) val = 4;
            if (val < -4) val = -4; 
            // Break path on jump? Simplification: Just draw clamped
        }
        else val = Math.sin(histAngle);

        const waveY = cy + val * radius;
        
        // Don't draw loose lines during Tan jumps
        if (funcMode === 2 && Math.abs(val) > 3.8) {
            ctx.stroke();
            ctx.beginPath();
            continue;
        }

        if (i === 0) {
            ctx.moveTo(waveStartX + xOffset, waveY);
        } else {
            ctx.lineTo(waveStartX + xOffset, waveY);
        }
    }
    ctx.stroke();

    // Labels
    ctx.fillStyle = colors.text;
    ctx.font = lang === 'hi' ? '16px sans-serif' : '14px Inter';
    ctx.textAlign = 'center';
    
    let labelName = "Sine";
    if (funcMode === 1) labelName = "Cosine";
    if (funcMode === 2) labelName = "Tangent";

    ctx.fillText(labelName, waveStartX + 80, cy + radius + 50);
  };

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

export default ConceptVisualizer;
