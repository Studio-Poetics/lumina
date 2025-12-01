
import { PatternContext, PatternResult } from '../types';

/**
 * Converts a math expression string into a function that returns an RGB object.
 * Securely wraps user code and injects context variables.
 */
export const createPatternFunction = (codeBody: string, paramNames: string[] = []): (ctx: PatternContext) => PatternResult => {
  try {
    // Dynamically generate the destructuring of custom parameters
    // Handle empty params gracefully to avoid syntax errors
    const customParamsExtraction = paramNames.length > 0 
      ? `const { ${paramNames.join(', ')} } = ctx;` 
      : '';

    // We construct the function body carefully to avoid SyntaxErrors (like 'Unexpected token')
    // caused by missing semicolons or ambiguous regex parsing.
    const wrappedCode = `
      "use strict";
      
      // 1. Context Extraction
      const { x, y, t, i, w, h, mx, my } = ctx;
      ${customParamsExtraction}
      
      // 2. Math Shortcuts
      const sin = Math.sin;
      const cos = Math.cos;
      const tan = Math.tan;
      const abs = Math.abs;
      const sqrt = Math.sqrt;
      const pow = Math.pow;
      const floor = Math.floor;
      const ceil = Math.ceil;
      const round = Math.round;
      const max = Math.max;
      const min = Math.min;
      const PI = Math.PI;
      const random = Math.random;
      const sign = Math.sign;
      
      // 3. Helper Functions
      
      // Map a value from one range to another
      function map(value, start1, stop1, start2, stop2) {
        return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
      }

      // Convert HSV to RGB
      function hsv(h, s, v) {
        var r = 0, g = 0, b = 0;
        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var tVal = v * (1 - (1 - f) * s);
        var rem = i % 6;
        
        if (rem === 0) { r = v; g = tVal; b = p; }
        else if (rem === 1) { r = q; g = v; b = p; }
        else if (rem === 2) { r = p; g = v; b = tVal; }
        else if (rem === 3) { r = p; g = q; b = v; }
        else if (rem === 4) { r = tVal; g = p; b = v; }
        else { r = v; g = p; b = q; }
        
        return { r: r * 255, g: g * 255, b: b * 255 };
      }
      
      // Rotate coordinates around 0,0
      function rotate(x, y, angle) {
         var ca = Math.cos(angle);
         var sa = Math.sin(angle);
         return { x: x * ca - y * sa, y: x * sa + y * ca };
      }

      // 4. Execution
      let r = 0;
      let g = 0; 
      let b = 0;
      
      try {
        ${codeBody}
      } catch (e) {
        // Return a dim red color on runtime error
        return { r: 50, g: 0, b: 0 };
      }

      // 5. Safety Clamps
      return { 
        r: Math.max(0, Math.min(255, r || 0)), 
        g: Math.max(0, Math.min(255, g || 0)), 
        b: Math.max(0, Math.min(255, b || 0)) 
      };
    `;

    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    return new Function('ctx', wrappedCode) as (ctx: PatternContext) => PatternResult;
  } catch (err) {
    console.error("Error compiling pattern:", err);
    // Return a safe no-op function that shows dim red to indicate error
    return () => ({ r: 50, g: 0, b: 0 });
  }
};
