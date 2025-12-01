
import { Lesson, LessonType, Language } from '../types';

const CURRICULUM_EN: Lesson[] = [
  {
    id: LessonType.INTRO,
    title: "1.0 The Digital Canvas",
    concept: "RGB Color",
    description: "Welcome. This grid is your canvas. It is made of 256 lights (pixels).\n\nTo control a light, we must tell it how much Red, Green, and Blue to emit.\n\nComputers count brightness from 0 (Dark) to 255 (Full Brightness). By mixing these three numbers, we can create over 16 million colors.",
    visualizerMode: 'MATRIX',
    tasks: [
      "Change 'r = 255' to 'r = 0'. Watch the red disappear.",
      "Change 'b = 0' to 'b = 255'. The grid should turn blue.",
      "Mix colors: set r=255, g=0, b=255 to make purple.",
      "Create yellow: set r=255, g=255, b=0."
    ],
    defaultCode: `
// 0 is OFF, 255 is MAX BRIGHTNESS

r = 255;  // Red Channel
g = 0;    // Green Channel
b = 0;    // Blue Channel
    `,
    visualParams: [],
    explanation: "Computers see color as 3 light bulbs: Red, Green, Blue.\n\n*   **0** means the bulb is off.\n*   **255** means the bulb is fully on.\n*   By mixing them, we trick the eye. Red + Green light actually looks Yellow to human eyes!",
    challenges: [
      {
        title: "Make it dimmer",
        description: "Try setting all colors to 128 instead of 255. What happens to the brightness?",
        difficulty: "easy"
      },
      {
        title: "Create cyan color",
        description: "Mix blue and green together (b=255, g=255, r=0). What color do you see?",
        difficulty: "medium"
      },
      {
        title: "Color gradients",
        description: "Can you make the red fade from bright to dim by changing the number gradually?",
        difficulty: "hard"
      }
    ]
  },
  {
    id: LessonType.CONCEPT_COORDS,
    title: "1.1 Concept: The Map",
    concept: "Grid Addresses & Wiring",
    description: "Before we code, we must understand the map.\n\nImagine the grid as a city with streets (Columns X) and avenues (Rows Y).\n\nHowever, the **Wiring** (the red line) shows how the computer actually connects them. Often, LEDs are wired in a 'Zig-Zag' or 'Snake' pattern to save wire.\n\nUse the buttons below to see different physical wiring layouts versus logical X,Y coordinates.",
    visualizerMode: 'COORDINATE_PLANE',
    tasks: [
      "Move your mouse to the top-left corner. Notice it shows 0,0.",
      "Change the 'Wiring Layout' to 'Zig-Zag' using the dropdown below.",
      "Observe how the red path changes but X,Y coordinates stay logical."
    ],
    defaultCode: `
// This view is for observation only.
// Move your mouse over the grid.
// Observe how Index (#) changes vs X,Y.
    `,
    visualParams: [
       { 
         label: 'Wiring Layout', 
         variable: 'layout', 
         default: 0,
         type: 'select',
         options: [
           { label: 'Standard', value: 0 },
           { label: 'Zig-Zag', value: 1 },
           { label: 'Vertical', value: 2 },
           { label: 'Vert Zig-Zag', value: 3 }
         ]
       }
    ],
    explanation: "**Logical vs Physical:**\n\n*   **Logical (X,Y):** How we think. 'Row 2, Column 3'. Easy for math.\n*   **Physical (Index #):** How the wire runs. '#19'. Hard for math.\n*   We write code using X,Y. The LED controller does the hard work of converting X,Y to the Physical Index for us.",
    challenges: [
      {
        title: "Find the corner",
        description: "Move your mouse to each corner of the grid. What are the X,Y coordinates?",
        difficulty: "easy"
      },
      {
        title: "Compare wiring types",
        description: "Switch between 'Standard' and 'Zig-Zag'. How does the red path change?",
        difficulty: "medium"
      },
      {
        title: "Predict the index",
        description: "In Zig-Zag mode, can you guess which Index # corresponds to position (3,1)?",
        difficulty: "hard"
      }
    ]
  },
  {
    id: LessonType.COORDINATES,
    title: "2.0 Meeting the Coordinates",
    concept: "X and Y",
    description: "Every light has an address. \n\n• **x** is the column (0 to 15, left to right).\n• **y** is the row (0 to 15, top to bottom).\n\nWe can use these addresses to change the color across the grid. We also add **t** (Time) so you can see the numbers changing live.",
    visualizerMode: 'MATRIX',
    tasks: [
      "Observe the horizontal moving bands.",
      "Change line 3: replace 'x' with 'y'. Bands now move vertically.",
      "Change line 3: replace '16' with '8'. Bands become tighter.",
      "Try this: change line 1 to 'let val = (x + y + t * 5);' for diagonal motion."
    ],
    defaultCode: `
// We take x (column) and add t (time)
// We multiply by 16 to make it bright.
// The '%' symbol means "loop" (Modulos).

let val = (x + t * 5); 

// Wrap around so it doesn't get stuck at max
r = (val % 16) * 16; 
g = 0;
b = 0;
    `,
    visualParams: [],
    explanation: "We are using the **Address (x)** to decide the **Color**.\n\n*   Since **x** changes from 0 to 15, the color changes across the screen.\n*   Adding **t** (Time) shifts the starting point every frame, creating motion.\n*   Modulo `%` acts like a resetting counter: 1, 2, 3... 0, 1, 2...",
    challenges: [
      {
        title: "Vertical bands",
        description: "Change 'x' to 'y' to make vertical moving bands instead of horizontal ones.",
        difficulty: "easy"
      },
      {
        title: "Faster motion",
        description: "Change 't * 5' to 't * 15'. How does the speed change?",
        difficulty: "medium"
      },
      {
        title: "Diagonal waves",
        description: "Try '((x + y) + t * 5)' - can you create diagonal movement?",
        difficulty: "hard"
      }
    ]
  },
  {
    id: LessonType.CONCEPT_NORMALIZE,
    title: "2.1 Concept: The Gradient",
    concept: "Normalization",
    description: "Computers love decimals between 0.0 and 1.0.\n\n**x** is the specific column we are painting. **w** is the total width of the grid. By dividing **x / w**, we create a decimal between 0 and 1. This is called 'normalization' and it is crucial because it lets us talk in percentages (0% to 100%) instead of pixels.\n\n• Left edge (x=0) becomes 0.0\n• Right edge (x=7) becomes ~1.0\n\nHover to see how the brightness increases from black to white.",
    visualizerMode: 'NORMALIZED_GRADIENT',
    tasks: [
      "Move your mouse to the leftmost edge. Value shows 0.0.",
      "Move your mouse to the rightmost edge. Value approaches 1.0.",
      "Notice how brightness increases smoothly from left to right."
    ],
    defaultCode: `
// Visualizing division:
// brightness = x / width

// This creates a smooth ramp
// from darkness to light.
    `,
    visualParams: [],
    explanation: "**Why Divide by Width?**\n\nImagine you have a pizza.\n*   **x** is 'how many slices I have'.\n*   **w** is 'total slices'.\n*   **x / w** tells you the *percentage* of pizza you have.\n\nThis is useful because 50% is always the middle, whether the grid is 10 pixels wide or 1000 pixels wide."
  },
  {
    id: LessonType.NORMALIZE,
    title: "3.0 The Power of Fractions",
    concept: "Normalization (0 to 1)",
    description: "Normalization is a technique where we shrink big numbers down to the range of 0.0 to 1.0.\n\nBy dividing **x** by the grid width **w**, we create a fraction that represents 'percentage across the screen'.\n\nWhen **x** is 0, **x/w** is 0.0 (Start). When **x** equals **w**, **x/w** is 1.0 (End).\n\nThis is important because it lets us stretch our patterns to fit any size grid without changing the code.",
    visualizerMode: 'MATRIX',
    tasks: [
      "Line 2 creates 'nx' from 0.0 to 1.0 across the width.",
      "Line 5 adds time 't' to make the pattern move.",
      "Line 5: Change 't * 0.5' to 't * 2' to make it move faster."
    ],
    defaultCode: `
// Create a fraction from 0.0 to 1.0
let nx = x / w;

// Add time to make it cycle
let brightness = (nx + t * 0.5) % 1.0;

// Multiply by 255 to make it a color
r = brightness * 255;
g = 0;
b = 0;
    `,
    visualParams: [],
    explanation: "Instead of saying 'Light up pixel number 5', we say 'Light up the pixel at 50%'.\n\n*   **nx = x / w** gives us that percentage.\n*   If we swap to a bigger TV screen, 50% is still the middle.\n*   This makes our patterns **Responsive**."
  },
  {
    id: LessonType.TIME,
    title: "4.0 Introducing Time",
    concept: "Animation (t)",
    description: "Animation is just math that changes over time.\n\nThe variable **t** acts like a stopwatch. It counts up in seconds: 1, 2, 3...\n\nBy multiplying **t** by a large number, we make things move fast. Multiplying by a small decimal makes them move slow.",
    visualizerMode: 'MATRIX',
    tasks: [
      "Press PLAY/PAUSE button below to control animation.",
      "Line 3: Change '50' to '100' for a faster strobe effect.",
      "Line 3: Change '50' to '10' for a slow, steady pulse."
    ],
    defaultCode: `
// Basic flashing light
// We use % 255 to make it loop from 0 to 255 repeatedly.

r = (t * 50) % 255;
g = 0;
b = 0;
    `,
    visualParams: [],
    explanation: "**t** is just a number that keeps growing.\n\n*   If we use **t** directly, the color would get stuck at white (255) instantly.\n*   We use Modulo `%` to wrap it around.\n*   Think of it like a clock hand spinning round and round."
  },
  {
    id: LessonType.CONCEPT_TRIG,
    title: "5.1 Concept: The Circle of Life",
    concept: "Trigonometry Visualizer",
    description: "All waves come from rotation. As the point spins, its relationship to the center changes.\n\n**Sin (Sine):** Measures HEIGHT (Up/Down). Smooth and natural.\n**Cos (Cosine):** Measures WIDTH (Left/Right). Same shape as Sine, just shifted.\n**Tan (Tangent):** Measures SLOPE. It explodes to infinity. Chaotic.\n\nUse the buttons below to see the difference.",
    visualizerMode: 'UNIT_CIRCLE',
    tasks: [
      "Use the 'Function' dropdown below to select 'Sine'. Watch the smooth up/down motion.",
      "Select 'Cosine' from the dropdown. Observe the left/right tracking.",
      "Select 'Tangent' from the dropdown. See how it spikes dramatically."
    ],
    defaultCode: `
// Visualizer Mode
// Use the buttons below to switch functions.
// Sine = Height
// Cosine = Width
// Tangent = Slope/Chaos
    `,
    visualParams: [
      { 
        label: 'Function', 
        variable: 'func', 
        default: 0,
        type: 'select',
        options: [
          { label: 'Sine', value: 0 },
          { label: 'Cosine', value: 1 },
          { label: 'Tangent', value: 2 }
        ]
      }
    ],
    explanation: "**Rotation = Vibration.**\n\n*   **Sine** captures the 'Side View' (Height) of a wheel.\n*   **Cosine** captures the 'Top View' (Width).\n*   **Tangent** is the ratio of Height/Width. When Width gets close to 0, Tan shoots to the moon."
  },
  {
    id: LessonType.OSCILLATION,
    title: "5.2 The Magic of Cycles",
    concept: "Trigonometry (Sin & Cos)",
    description: "Now let's apply that circle to our lights.\n\nWe use **Math.sin(t)** to get that smooth breathing motion.\n\n• **sin(t)** gives a number between -1 and 1.\n• We use 'map' to convert that -1..1 into 0..255 (Dark to Bright).",
    visualizerMode: 'MATRIX',
    tasks: [
      "Watch the grid pulse with breathing-like rhythm.",
      "Line 2: Change 'sin' to 'cos'. Pattern now starts bright.",
      "Line 2: Change '3' to '10' inside the parentheses. Breathing becomes rapid.",
      "Line 2: Try 'Math.sin(t * 3) * Math.sin(t * 3)' for sharper pulses."
    ],
    defaultCode: `
// Get a smooth wave from -1 to 1
let wave = Math.sin(t * 3);

// Map it to color (0 to 255)
// When wave is -1, color is 0
// When wave is 1, color is 255
let brightness = map(wave, -1, 1, 0, 255);

r = brightness;
g = 0; 
b = brightness * 0.5; // Dimmer blue
    `,
    visualParams: [],
    explanation: "**Math.sin(t)** is your best friend.\n\n*   It breathes: -1... 0... 1... 0... -1.\n*   It never shoots off to infinity.\n*   We use **map()** because colors can't be negative (-1). We must translate the wave into the color range (0-255).",
    challenges: [
      {
        title: "Change the speed",
        description: "Try changing 't * 3' to 't * 6'. What happens to the breathing rate?",
        difficulty: "easy"
      },
      {
        title: "Two-color breathing",
        description: "Make both red AND blue breathe by copying the brightness calculation to both r and b.",
        difficulty: "medium"
      },
      {
        title: "Offset breathing",
        description: "Can you make red and blue breathe out of sync? Try 'let blueWave = Math.sin(t * 3 + 1);'",
        difficulty: "hard"
      }
    ]
  },
  {
    id: LessonType.WAVE_SHAPES,
    title: "5.3 Beyond the Circle",
    concept: "Wave Shapes (Square/Saw)",
    description: "Not everything in computers is smooth like a circle. Sometimes we want robotic or sharp movements.\n\n**Square Wave:** Like a light switch. On or Off. We use `sign()`.\n**Sawtooth:** Like a ramp. It goes up and drops instantly. We use `%`.\n**Triangle:** Like a ball bouncing off the ceiling. Up and Down. We use `abs()`.",
    visualizerMode: 'MATRIX',
    tasks: [
      "Lines 7-8: Remove '//' to activate Square wave (robot-like blinking).",
      "Lines 10-11: Remove '//' to activate Sawtooth wave (ramp effect).",
      "Lines 13-14: Remove '//' to activate Triangle wave (bouncing effect)."
    ],
    defaultCode: `
let speed = t * 5;
let val = 0;

// --- 1. SINE (Smooth) ---
val = Math.sin(speed);

// --- 2. SQUARE (Robot Blink) ---
// Remove '//' below to test
// val = Math.sign(Math.sin(speed));

// --- 3. SAWTOOTH (Ramp) ---
// val = (speed % 2) - 1;

// --- 4. TRIANGLE (Bounce) ---
// val = abs((speed % 2) - 1) * 2 - 1;

// Map -1..1 to 0..255
let b = map(val, -1, 1, 0, 255);

r = b; g = b; b = b;
    `,
    visualParams: [],
    explanation: "Different shapes for different feelings:\n\n*   **Sine:** Organic, soft, human.\n*   **Square:** Mechanical, alarm, computer.\n*   **Sawtooth:** Aggressive, laser, scanning.\n*   **Triangle:** Bouncy, ping-pong."
  },
  {
    id: LessonType.CONCEPT_SIN_VS_TAN,
    title: "5.4 Concept: Why Sin?",
    concept: "The Nature of Waves",
    description: "You might ask: Why do we always use **sin()**? Why not **tan()**?\n\n**1. Sin is Natural:** It looks like breathing, ocean waves, and heartbeats. It is smooth and organic.\n\n**2. Sin is Safe:** It always stays between -1 and 1. It loops perfectly forever.\n\n**3. Tan is Chaos:** Tangent shoots off to infinity. It is unstable, spikey, and hard to control. We only use it for glitches or special effects.",
    visualizerMode: 'MATRIX',
    tasks: [
      "Observe the current smooth Sine wave pattern.",
      "Line 4: Add '//' to disable sin. Line 7: Remove '//' to enable tan.",
      "Compare: Sin is smooth and predictable, Tan creates chaotic flashing."
    ],
    defaultCode: `
let val = 0;

// --- 1. THE HERO: SIN() ---
// Smooth, Organic, Predictable
val = sin(t * 3);

// --- 2. THE VILLAIN: TAN() ---
// Chaotic, Unbounded, Glitchy
// val = tan(t * 3);


// Mapping logic
// We use a safe map for Sin
let b = map(val, -1, 1, 0, 255);

r = b; 
g = b * 0.5; 
b = b;
    `,
    visualParams: [],
    explanation: "**Stability is key.**\n\n*   In creative coding, we want control.\n*   Sin is like a dog on a leash (stays close).\n*   Tan is like a rocket without guidance (flies away).\n*   We only use Tan when we *want* the chaos."
  },
  {
    id: LessonType.WAVES,
    title: "6.0 Making Waves",
    concept: "Phase Shift",
    description: "If every pixel runs the same 'sin(t)', the whole grid flashes together.\n\nTo make a wave that moves across the screen, we need to offset the timing for each pixel.\n\nWe do this by adding the coordinate **x** to the time **t**.\n`sin(x + t)`\n\nThis means pixel 0 is at time t, but pixel 1 is slightly ahead at time t+1. This delay creates the shape of a wave.",
    visualizerMode: 'MATRIX',
    tasks: [
      "Line 7 creates waves across the screen using nx * 10.0.",
      "Line 7: Change '10.0' to '20.0' for more waves.",
      "Line 7: Change 't * 5.0' to 't * -5.0' to reverse direction."
    ],
    defaultCode: `
// Normalize position
let nx = x / w; 

// Combine Space (nx) and Time (t)
// 10.0 controls the frequency (tightness)
// 5.0 controls the speed
let shape = Math.sin(nx * 10.0 + t * 5.0);

// Map -1..1 to 0..255
let val = map(shape, -1, 1, 0, 255);

b = val;       // Blue
g = val * 0.5; // Teal
r = 0;         // Red Off
    `,
    visualParams: [],
    explanation: "**The Stadium Wave.**\n\nThink of people doing a wave in a stadium.\n*   They don't all stand up at once.\n*   Person B stands up just a little bit *after* Person A.\n*   `x + t` creates that delay. It tells the next pixel to be in the 'future' of the previous pixel.",
    challenges: [
      {
        title: "Tighter waves",
        description: "Change 'nx * 10.0' to 'nx * 20.0' to create more waves across the screen.",
        difficulty: "easy"
      },
      {
        title: "Reverse the wave",
        description: "Change 't * 5.0' to '- t * 5.0' to make the wave move backwards.",
        difficulty: "medium"
      },
      {
        title: "Multi-color waves",
        description: "Create red AND blue waves with different frequencies: r uses nx * 10.0, b uses nx * 15.0.",
        difficulty: "hard"
      }
    ]
  },
  {
    id: LessonType.DISTANCE,
    title: "7.0 Ripples & Rings",
    concept: "Distance Fields",
    description: "To make circles, we need to calculate the Distance from the center for every pixel.\n\nWe use the Pythagorean theorem (a² + b² = c²).\n\nOnce we know the distance, we can plug it into our **sin()** function just like we did with **x**.\n`sin(distance - t)` creates expanding rings.",
    visualizerMode: 'MATRIX',
    tasks: [
      "Lines 5-7 calculate distance from center point (8,8).",
      "Line 11 uses distance in sin() to create expanding rings.",
      "Line 11: Change '0.8' to '2.0' to make rings thinner/tighter.",
      "Line 11: Change '- t' to '+ t' to make rings move inward."
    ],
    defaultCode: `
// Center point
let cx = 8;
let cy = 8;

// Calculate distance from center
let dx = x - cx;
let dy = y - cy;
let dist = sqrt(dx*dx + dy*dy);

// Use distance to drive the sine wave
let ripple = sin(dist * 0.8 - t * 5);

r = map(ripple, -1, 1, 0, 255);
g = map(ripple, -1, 1, 0, 50);
b = map(ripple, -1, 1, 50, 255);
    `,
    visualParams: [],
    explanation: "**Circles are just Distance.**\n\n*   Every point on the edge of a circle is the *same distance* from the center.\n*   By calculating that distance for every pixel, we draw a map of concentric rings.\n*   Applying Sine makes those rings ripple.",
    challenges: [
      {
        title: "Move the center",
        description: "Change 'cx = 8' to 'cx = 12'. Where do the ripples come from now?",
        difficulty: "easy"
      },
      {
        title: "Tighter rings",
        description: "Change 'dist * 0.8' to 'dist * 2.0' to make the rings much closer together.",
        difficulty: "medium"
      },
      {
        title: "Animated center",
        description: "Make the center move! Try 'let cx = 8 + Math.sin(t) * 3;'",
        difficulty: "hard"
      }
    ]
  },
  {
    id: LessonType.SANDBOX,
    title: "8.0 Pattern Lab",
    concept: "Transformation Sandbox",
    description: "Welcome to the Lab. Here you can manipulate space itself.\n\nWe have added sliders below to control Speed, Scale, and Rotation. These values are available in your code as variables: **speed**, **scale**, and **angle**.\n\nTry using the `rotate(x, y, angle)` function to spin your coordinate system!",
    visualizerMode: 'MATRIX',
    tasks: [
      "Use the 'Rotation' slider below to spin the entire pattern.",
      "Adjust the 'Speed' slider to control animation speed.",
      "Use the 'Scale' slider to zoom in/out of the pattern."
    ],
    defaultCode: `
/* 
  AVAILABLE VARIABLES (from Sliders):
  > speed  (0 to 20)
  > scale  (0.1 to 4)
  > angle  (0 to 6.28)
*/

// Center the coordinates first
let cx = x - 8;
let cy = y - 8;

// 1. Rotate
let p = rotate(cx, cy, angle);

// 2. Scale
let sx = p.x * scale;
let sy = p.y * scale;

// 3. Generate Pattern
let val = sin(sx * 0.3 + t * speed) + sin(sy * 0.3);

// Color Mapping
let h = map(val, -2, 2, 0, 1); 
let c = hsv(h + t * 0.1, 1, 1); 

r = c.r;
g = c.g;
b = c.b;
    `,
    visualParams: [
      { label: 'Speed', variable: 'speed', min: 0, max: 20, step: 0.5, default: 5 },
      { label: 'Scale', variable: 'scale', min: 0.1, max: 4, step: 0.1, default: 1 },
      { label: 'Rotation', variable: 'angle', min: 0, max: 6.28, step: 0.05, default: 0 },
    ],
    explanation: "**You are the Space Bender.**\n\n*   Normally, X and Y are fixed.\n*   But if we multiply them (scale) or use trigonometry to spin them (rotate) *before* we calculate color, the whole world distorts.\n*   This is how complex psychedelic visuals are made.",
    challenges: [
      {
        title: "Experiment with sliders",
        description: "Use the Speed, Scale, and Rotation sliders below to create different effects.",
        difficulty: "easy"
      },
      {
        title: "Modify the pattern",
        description: "Change the 0.3 values in the sin functions to different numbers. What patterns emerge?",
        difficulty: "medium"
      },
      {
        title: "Create your masterpiece",
        description: "Combine everything you've learned to create a unique, mesmerizing pattern!",
        difficulty: "hard"
      }
    ]
  }
];

const CURRICULUM_HI: Lesson[] = [
  {
    id: LessonType.INTRO,
    title: "1.0 डिजिटल कैनवास",
    concept: "RGB रंग (Color)",
    description: "नमस्ते। यह ग्रिड आपका कैनवास है। इसमें 256 लाइटें (Pixels) लगी हैं।\n\nकिसी भी लाइट को जलाने के लिए हमें उसे बताना पड़ता है कि उसमें कितना Red (लाल), Green (हरा), और Blue (नीला) रंग भरना है।\n\nकंप्यूटर में 'अंधेरा' मतलब 0 और 'पूरी चमक' मतलब 255। इन तीनों को मिलाकर हम करोड़ों रंग बना सकते हैं।",
    visualizerMode: 'MATRIX',
    tasks: [
      "'r = 255' को 'r = 0' बदलें। लाल रंग गायब हो जाएगा।",
      "'b = 0' को 'b = 255' बदलें। ग्रिड नीला हो जाएगा।",
      "रंग मिलाएं: r=255, g=0, b=255 करके बैंगनी बनाएं।",
      "पीला बनाएं: r=255, g=255, b=0 सेट करें।"
    ],
    defaultCode: `
// 0 मतलब "बंद" (OFF)
// 255 मतलब "पूरी ताकत" (FULL BRIGHTNESS)

r = 255;  // लाल (Red) की मात्रा
g = 0;    // हरा (Green) की मात्रा
b = 0;    // नीला (Blue) की मात्रा
    `,
    visualParams: [],
    explanation: "कंप्यूटर 3 बल्बों से रंग बनाता है: लाल, हरा, नीला।\n\n*   **0** मतलब बल्ब बंद।\n*   **255** मतलब बल्ब फुल पावर पर।\n*   इन्हें मिलाकर हम आंखों को धोखा देते हैं। लाल + हरा मिलकर पीला दिखता है!"
  },
  {
    id: LessonType.CONCEPT_COORDS,
    title: "1.1 कांसेप्ट: नक्शा (Map)",
    concept: "ग्रिड का पता और वायरिंग",
    description: "कोडिंग से पहले, नक्शे को समझो।\n\nइस ग्रिड को एक शहर की तरह सोचो। इसमें गलियां (Columns X) और सड़कें (Rows Y) हैं।\n\nलेकिन **वायरिंग** (लाल रेखा) बताती है कि कंप्यूटर असल में इन्हें कैसे जोड़ता है। अक्सर तार बचाने के लिए LEDs को 'सांप' (Zig-Zag) की तरह जोड़ा जाता है।\n\nनीचे दिए गए बटनों का उपयोग करके अलग-अलग वायरिंग देखें।",
    visualizerMode: 'COORDINATE_PLANE',
    tasks: [
      "माउस को सबसे ऊपर-बाएं कोने पर ले जाएं। 0,0 दिखेगा।",
      "नीचे 'वायरिंग' ड्रॉपडाउन से 'सांप (Zig)' चुनें।",
      "देखें कि लाल रास्ता बदल जाता है लेकिन X,Y वही रहते हैं।"
    ],
    defaultCode: `
// यह कोड सिर्फ देखने के लिए है।
// माउस को ग्रिड पर घुमाओ।
// देखो कि Index (#) और X,Y कैसे बदलते हैं।
    `,
    visualParams: [
        { 
          label: 'वायरिंग (Wiring)', 
          variable: 'layout', 
          default: 0,
          type: 'select',
          options: [
            { label: 'सीधा (Std)', value: 0 },
            { label: 'सांप (Zig)', value: 1 },
            { label: 'खड़ा (Col)', value: 2 },
            { label: 'खड़ा सांप (CZ)', value: 3 }
          ]
        }
    ],
    explanation: "**लॉजिक बनाम हकीकत:**\n\n*   **लॉजिक (X,Y):** जैसे हम सोचते हैं। 'गली नंबर 2, घर नंबर 3'।\n*   **फिजिकल (Index #):** जैसे तार दौड़ता है। '#19'।\n*   हम कोड X,Y में लिखते हैं। कंप्यूटर खुद उसे Index में बदल लेता है।"
  },
  {
    id: LessonType.COORDINATES,
    title: "2.0 X और Y से मिलें",
    concept: "X और Y",
    description: "हर लाइट का एक पता है।\n\n• **x** कॉलम है (0 से 15, बाएं से दाएं)।\n• **y** पंक्ति है (0 से 15, ऊपर से नीचे)।\n\nहम इन पतों का उपयोग करके ग्रिड पर रंग बदल सकते हैं। हम **t** (Time/समय) भी जोड़ते हैं ताकि आप नंबरों को बदलते हुए देख सकें।",
    visualizerMode: 'MATRIX',
    tasks: [
      "देखें कि पट्टियां (bands) बाएं से दाएं चल रही हैं।",
      "लाइन 4: 'x' को 'y' से बदलें। अब पट्टियां ऊपर-नीचे चलेंगी।",
      "लाइन 4: पहले '16' को '8' से बदलें। पट्टियां पतली हो जाएंगी।",
      "लाइन 4: 'x' को '(x + y)' बदलें तिरछी गति के लिए।"
    ],
    defaultCode: `
// हम x (जगह) में t (समय) जोड़ते हैं
// 16 से गुणा (Multiply) किया ताकि रंग चमके

let val = (x + t * 5); 

// '%' का मतलब है "लूप" (घड़ी की तरह गोल)
// यह गिनती को 0 से 15 के बीच रखता है
r = (val % 16) * 16; 
g = 0;
b = 0;
    `,
    visualParams: [],
    explanation: "हम **पते (x)** का इस्तेमाल **रंग** तय करने के लिए कर रहे हैं।\n\n*   जैसे-जैसे **x** बढ़ता है, रंग बदलता है।\n*   **t** (समय) जोड़ने से शुरुआत की जगह बदलती रहती है, जिससे चीज़ें चलती हुई दिखती हैं।\n*   Modulo `%` एक रीसेट बटन की तरह है: 1, 2, 3... फिर वापस 0."
  },
  {
    id: LessonType.CONCEPT_NORMALIZE,
    title: "2.1 कांसेप्ट: ढलान (Gradient)",
    concept: "हि हिस्सेदारी (Normalization)",
    description: "कंप्यूटर को 0.0 और 1.0 के बीच के नंबर बहुत पसंद हैं।\n\n**x** वो कॉलम है जिसे हम पेंट कर रहे हैं। **w** ग्रिड की कुल चौड़ाई है। **x / w** करके, हम 0 और 1 के बीच का एक दशमलव बनाते हैं। इसे 'नॉर्मलाइज़ेशन' कहते हैं और यह ज़रूरी है क्योंकि इससे हम पिक्सेल के बजाय प्रतिशत (0% से 100%) में बात कर सकते हैं।\n\n• बायां किनारा (x=0) बन जाता है 0.0\n• दायां किनारा (x=7) बन जाता है ~1.0\n\nमाउस घुमाओ और देखो कि कैसे चमक काले से सफेद की ओर बढ़ती है।",
    visualizerMode: 'NORMALIZED_GRADIENT',
    tasks: [
      "माउस को सबसे बाएं ले जाएं। मान 0.0 दिखेगा।",
      "माउस को सबसे दाएं ले जाएं। मान 1.0 के करीब होगा।",
      "देखें कि चमक बाएं से दाएं कैसे बढ़ती है।"
    ],
    defaultCode: `
// भाग (Division) का जादू देखो:
// चमक = x / चौड़ाई

// x=0 पर चमक 0 (अंधेरा)
// x=7 पर चमक ~1 (उजाला)
    `,
    visualParams: [],
    explanation: "**चौड़ाई से भाग क्यों?**\n\nसोचो तुम्हारे पास पिज़्ज़ा है।\n*   **x** है 'मेरे पास कितने स्लाइस हैं'।\n*   **w** है 'कुल स्लाइस'।\n*   **x / w** बताता है कि तुम्हारे पास कितना **प्रतिशत** पिज़्ज़ा है।\n\nइससे 50% हमेशा बीच में ही रहेगा, चाहे ग्रिड छोटा हो या बड़ा।"
  },
  {
    id: LessonType.NORMALIZE,
    title: "3.0 भिन्नों (Fractions) की ताकत",
    concept: "नॉर्मलाइजेशन (0 से 1)",
    description: "नॉर्मलाइजेशन मतलब बड़ी संख्याओं को 0.0 से 1.0 के बीच में सिकोड़ देना।\n\n**x** को ग्रिड की चौड़ाई **w** से भाग देकर, हम एक भिन्न (Fraction) बनाते हैं जो बताता है 'हम स्क्रीन पर कहां हैं'।\n\nजब **x** 0 है, **x/w** 0.0 है (शुरुआत)। जब **x**, **w** के बराबर है, **x/w** 1.0 है (अंत)।\n\nयह ज़रूरी है क्योंकि इससे हमारा पैटर्न किसी भी साइज़ की स्क्रीन पर फिट हो जाता है।",
    visualizerMode: 'MATRIX',
    tasks: [
      "लाइन 2: 'nx' को 0.0 से 1.0 के बीच बनाती है।",
      "लाइन 5: समय 't' जोड़ कर पैटर्न को चलाती है।",
      "लाइन 5: 't * 0.5' को 't * 2' बदलें तेज़ी के लिए।"
    ],
    defaultCode: `
// 0.0 से 1.0 के बीच का हिस्सा (Ratio)
let nx = x / w;

// समय (t) जोड़ो ताकि यह चलता रहे
let brightness = (nx + t * 0.5) % 1.0;

// 255 से गुणा करो ताकि रंग दिखे
r = brightness * 255;
g = 0;
b = 0;
    `,
    visualParams: [],
    explanation: "पिक्सेल नंबर 5 को जलाने के बजाय, हम कहते हैं '50% वाली जगह को जलाओ'।\n\n*   **nx = x / w** हमें वो प्रतिशत देता है।\n*   अगर हम बड़ी टीवी स्क्रीन ले आएं, तो भी 50% बीच में ही रहेगा।\n*   इसे कहते हैं **Responsive** (हर जगह फिट होने वाला)।"
  },
  {
    id: LessonType.TIME,
    title: "4.0 समय (Time) का खेल",
    concept: "एनीमेशन (t)",
    description: "एनीमेशन बस वह गणित है जो समय के साथ बदलता है।\n\nवेरिएबल **t** एक घड़ी की तरह है जो कभी नहीं रुकती। यह सेकंड में गिनता है: 1, 2, 3...\n\n**t** को बड़ी संख्या से गुणा करोगे तो चीज़ें तेज़ चलेंगी। छोटी संख्या से गुणा करोगे तो धीमी हो जाएंगी।",
    visualizerMode: 'MATRIX',
    tasks: [
      "नीचे PLAY/PAUSE बटन दबाकर एनीमेशन कंट्रोल करें।",
      "लाइन 3: '50' को '100' बदलें तेज़ स्ट्रोब के लिए।",
      "लाइन 3: '50' को '10' बदलें धीमी पल्स के लिए।"
    ],
    defaultCode: `
// साधारण चमकती लाइट
// % 255 का मतलब: 
// 0 से 255 तक जाओ, फिर वापस 0 पर आओ

r = (t * 50) % 255;
g = 0;
b = 0;
    `,
    visualParams: [],
    explanation: "**t** बस एक नंबर है जो बढ़ता रहता है।\n\n*   अगर हम सीधे **t** यूज़ करें, तो रंग तुरंत 255 (सफेद) पर अटक जाएगा।\n*   हम Modulo `%` यूज़ करते हैं ताकि वह घूम कर वापस 0 पर आए।\n*   इसे घड़ी की सुई की तरह सोचो।"
  },
  {
    id: LessonType.CONCEPT_TRIG,
    title: "5.1 कांसेप्ट: जीवन का चक्र",
    concept: "त्रिकोणमिति (Visualizer)",
    description: "लहरें 'चक्र' (Circle) से आती हैं।\n\n**Sin (साइन):** ऊंचाई (Height) मापता है। चिकनी और कुदरती।\n**Cos (कोसाइन):** चौड़ाई (Width) मापता है। साइन जैसा ही है, बस थोड़ा खिसका हुआ।\n**Tan (टैन):** ढलान (Slope) मापता है। यह अनंत तक भागता है और पागल (Chaotic) है।\n\nनीचे दिए गए बटनों से बदल कर देखें।",
    visualizerMode: 'UNIT_CIRCLE',
    tasks: [
      "नीचे 'फंक्शन' ड्रॉपडाउन से 'Sine' चुनें। चिकनी गति देखें।",
      "ड्रॉपडाउन से 'Cosine' चुनें। बाएं-दाएं की गति देखें।",
      "ड्रॉपडाउन से 'Tangent' चुनें। तीखे स्पाइक्स देखें।"
    ],
    defaultCode: `
// विज़ुअलाइज़र मोड (Visualizer Mode)
// नीचे दिए गए बटन से फंक्शन बदलो:
// Sine = ऊंचाई (Height)
// Cosine = चौड़ाई (Width)
// Tangent = पागलपन (Chaos)
    `,
    visualParams: [
      { 
        label: 'फंक्शन (Function)', 
        variable: 'func', 
        default: 0,
        type: 'select',
        options: [
          { label: 'Sine (साइन)', value: 0 },
          { label: 'Cosine (कोस)', value: 1 },
          { label: 'Tangent (टैन)', value: 2 }
        ]
      }
    ],
    explanation: "**घूमना = कांपना।**\n\n*   **Sine** पहिये की 'ऊंचाई' (Height) है।\n*   **Cosine** पहिये की 'चौड़ाई' (Width) है।\n*   **Tangent** उनका अनुपात (Ratio) है। जब चौड़ाई 0 होती है, तो Tan धमाका करता है।"
  },
  {
    id: LessonType.OSCILLATION,
    title: "5.2 चक्रों का जादू",
    concept: "त्रिकोणमिति (Sin & Cos)",
    description: "अब उस चक्र को अपनी लाइट्स पर लगाओ।\n\nहम 'सांस लेने' जैसी गति पाने के लिए **Math.sin(t)** का इस्तेमाल करते हैं।\n\n• **sin(t)** हमेशा -1 और 1 के बीच का नंबर देता है।\n• हम 'map' का इस्तेमाल करके उसे 0 से 255 (रंग) में बदलते हैं।",
    visualizerMode: 'MATRIX',
    tasks: [
      "ग्रिड को सांस जैसी लय में पल्स करते देखें।",
      "लाइन 2: 'sin' को 'cos' बदलें। अब उजाले से शुरू होगा।",
      "लाइन 2: कोष्ठक में '3' को '10' बदलें। तेज़ सांस।",
      "लाइन 2: 'Math.sin(t * 3) * Math.sin(t * 3)' करें।"
    ],
    defaultCode: `
// सांस लेने जैसा पैटर्न (Sine Wave)
// -1 से 1 के बीच का नंबर
let wave = Math.sin(t * 3);

// 'map' का काम:
// -1 को बनाओ 0 (अंधेरा)
// 1 को बनाओ 255 (पूरा उजाला)
let brightness = map(wave, -1, 1, 0, 255);

r = brightness;
g = 0; 
b = brightness * 0.5; // थोड़ा हल्का नीला
    `,
    visualParams: [],
    explanation: "**Math.sin(t)** तुम्हारा सबसे अच्छा दोस्त है।\n\n*   यह सांस लेता है: -1... 0... 1... 0... -1.\n*   यह कभी भागता नहीं है।\n*   हम **map()** यूज़ करते हैं क्योंकि रंग नेगेटिव (-1) नहीं हो सकते। हमें उसे 0-255 में बदलना होता है।"
  },
  {
    id: LessonType.WAVE_SHAPES,
    title: "5.3 चक्र से आगे (Wave Types)",
    concept: "लहरों के रूप (Forms)",
    description: "कंप्यूटर में हर चीज़ गोल या चिकनी नहीं होती। कभी-कभी हमें रोबोट जैसी या तीखी चाल चाहिए होती है।\n\n**चौकोर (Square):** बिजली के स्विच जैसा। या तो चालू या बंद। `sign()` का इस्तेमाल करें।\n**आरी (Sawtooth):** एक रैंप जैसा। ऊपर चढ़ो और धड़ाम से गिरो। `%` का इस्तेमाल करें।\n**त्रिकोण (Triangle):** गेंद का टप्पा। ऊपर और नीचे। `abs()` का इस्तेमाल करें।",
    visualizerMode: 'MATRIX',
    tasks: [
      "लाइन 7-8: '//' हटाकर Square wave चालू करें (रोबोट जैसी)।",
      "लाइन 10-11: '//' हटाकर Sawtooth wave चालू करें।",
      "लाइन 13-14: '//' हटाकर Triangle wave चालू करें।"
    ],
    defaultCode: `
let speed = t * 5;
let val = 0;

// --- 1. SINE (चिकनी लहर) ---
val = Math.sin(speed);

// --- 2. SQUARE (रोबोट) ---
// नीचे से '//' हटा कर देखो
// val = Math.sign(Math.sin(speed));

// --- 3. SAWTOOTH (Ramp) ---
// val = (speed % 2) - 1;

// --- 4. TRIANGLE (टप्पा) ---
// val = abs((speed % 2) - 1) * 2 - 1;

// -1..1 को 0..255 (रंग) में बदलो
let b = map(val, -1, 1, 0, 255);

r = b; g = b; b = b;
    `,
    visualParams: [],
    explanation: "अलग-अलग अहसास के लिए अलग आकार:\n\n*   **Sine:** कुदरती, नरम, इंसान जैसा।\n*   **Square:** मशीनी, अलार्म, कंप्यूटर।\n*   **Sawtooth:** तेज़, लेज़र, स्कैनिंग।\n*   **Triangle:** उछलता हुआ, पिंग-पोंग।"
  },
  {
    id: LessonType.CONCEPT_SIN_VS_TAN,
    title: "5.4 कांसेप्ट: Sin ही क्यों?",
    concept: "लहरों का स्वभाव",
    description: "सवाल यह है: हम हमेशा **sin()** का ही उपयोग क्यों करते हैं? **tan()** का क्यों नहीं?\n\n**1. Sin कुदरती है:** यह सांस लेने जैसा, समुद्र की लहर जैसा है। यह चिकना (Smooth) है।\n\n**2. Sin सेफ है:** यह हमेशा -1 और 1 के बीच रहता है। यह कभी नहीं अटकता।\n\n**3. Tan पागल है:** Tangent अनंत (Infinity) तक भागता है। यह भड़कता है, टूटता है और काबू से बाहर हो जाता है। इसका इस्तेमाल सिर्फ 'गड़बड़' (Glitch) बनाने के लिए होता है।",
    visualizerMode: 'MATRIX',
    tasks: [
      "मौजूदा चिकनी Sine wave पैटर्न देखें।",
      "लाइन 4: '//' जोड़कर sin बंद करें। लाइन 7: '//' हटाकर tan चालू करें।",
      "तुलना करें: Sin चिकना है, Tan पागल चमकाता है।"
    ],
    defaultCode: `
let val = 0;

// --- 1. हीरो: SIN() ---
// शांत, चिकना, भरोसेमंद
val = sin(t * 3);

// --- 2. विलेन: TAN() ---
// पागल, अनियंत्रित, झटका
// val = tan(t * 3);


// रंग भरने का तरीका
let b = map(val, -1, 1, 0, 255);

r = b; 
g = b * 0.5; 
b = b;
    `,
    visualParams: [],
    explanation: "**कंट्रोल ज़रूरी है।**\n\n*   क्रिएटिव कोडिंग में हमें कंट्रोल चाहिए।\n*   Sin एक पालतू कुत्ते जैसा है (पास रहता है)।\n*   Tan एक बिना लगाम के रॉकेट जैसा है (उड़ जाता है)।\n*   हम Tan तभी यूज़ करते हैं जब हमें 'हंगामा' चाहिए।"
  },
  {
    id: LessonType.WAVES,
    title: "6.0 लहरें बनाना",
    concept: "Phase Shift",
    description: "अगर हर पिक्सेल एक ही 'sin(t)' चलाएगा, तो पूरा ग्रिड एक साथ चमकेगा।\n\nलहर बनाने के लिए, हमें हर पिक्सेल का समय थोड़ा आगे-पीछे करना होगा।\n\nहम ऐसा **x** को **t** में जोड़कर करते हैं।\n`sin(x + t)`\n\nइसका मतलब: पिक्सेल 0 समय t पर है, लेकिन पिक्सेल 1 थोड़ा आगे t+1 पर है। यही देरी लहर बनाती है।",
    visualizerMode: 'MATRIX',
    tasks: [
      "लाइन 7: nx * 10.0 से स्क्रीन पर लहरें बनती हैं।",
      "लाइन 7: '10.0' को '20.0' बदलें ज़्यादा लहरों के लिए।",
      "लाइन 7: 't * 5.0' को 't * -5.0' बदलें उल्टी दिशा के लिए।"
    ],
    defaultCode: `
// स्थिति (Position) को 0-1 के बीच लाओ
let nx = x / w; 

// जगह (nx) और समय (t) को मिलाओ
// 10.0 = कितनी लहरें (Frequency)
// 5.0 = कितनी तेज़ (Speed)
let shape = Math.sin(nx * 10.0 + t * 5.0);

// -1..1 को 0..255 में बदलो
let val = map(shape, -1, 1, 0, 255);

b = val;       // नीला
g = val * 0.5; // थोड़ा हरा
r = 0;         // लाल बंद
    `,
    visualParams: [],
    explanation: "**स्टेडियम वेव (Stadium Wave)।**\n\nस्टेडियम में जब लोग लहर बनाते हैं:\n*   वे सब एक साथ खड़े नहीं होते।\n*   बंदा B, बंदा A के *थोड़ी देर बाद* खड़ा होता है।\n*   `x + t` वही देरी (Delay) पैदा करता है। यह अगले पिक्सेल को पिछले पिक्सेल के 'भविष्य' में भेज देता है।"
  },
  {
    id: LessonType.DISTANCE,
    title: "7.0 पानी में पत्थर (Ripples)",
    concept: "दूरी (Distance)",
    description: "गोल छल्ले बनाने के लिए, हमें पता करना होगा कि पिक्सेल केंद्र (Center) से कितना दूर है।\n\nहम गणित का एक पुराना फॉर्मूला (Pythagoras) इस्तेमाल करते हैं।\n\nजैसे ही हमें दूरी (**dist**) मिल जाती है, हम उसे **sin()** में डाल देते हैं।\n`sin(distance - t)` पानी में पत्थर फेंकने जैसा असर देता है।",
    visualizerMode: 'MATRIX',
    tasks: [
      "लाइन 5-7: केंद्र (8,8) से दूरी निकालते हैं।",
      "लाइन 11: दूरी को sin() में डालकर फैलते छल्ले बनाते हैं।",
      "लाइन 11: '0.8' को '2.0' बदलें पतले छल्लों के लिए।",
      "लाइन 11: '- t' को '+ t' बदलें अंदर की गति के लिए।"
    ],
    defaultCode: `
// केंद्र (Center) सेट करो
let cx = 8;
let cy = 8;

// पाइथागोरस (Pythagoras) से दूरी निकालो
let dx = x - cx;
let dy = y - cy;
let dist = sqrt(dx*dx + dy*dy);

// दूरी (dist) से लहर बनाओ
// t घटाने से लहर बाहर जाएगी
let ripple = sin(dist * 0.8 - t * 5);

// रंग सेट करो
r = map(ripple, -1, 1, 0, 255);
g = map(ripple, -1, 1, 0, 50);
b = map(ripple, -1, 1, 50, 255);
    `,
    visualParams: [],
    explanation: "**गोले बस दूरी हैं।**\n\n*   गोले के किनारे पर हर बिंदु केंद्र से *बराबर दूरी* पर होता है।\n*   हर पिक्सेल की दूरी निकाल कर, हम एक नक्शा बनाते हैं।\n*   उस पर Sine लगाने से वो लहर बन जाता है।"
  },
  {
    id: LessonType.SANDBOX,
    title: "8.0 पैटर्न की प्रयोगशाला",
    concept: "सैंडबॉक्स (Sandbox)",
    description: "लैब में स्वागत है। यहां तुम जगह (Space) को मोड़ सकते हो।\n\nनीचे स्लाइडर दिए गए हैं। इनका नाम कोड में है: **speed**, **scale**, और **angle**।\n\nग्रिड को घुमाने के लिए `rotate(x, y, angle)` का इस्तेमाल करो!",
    visualizerMode: 'MATRIX',
    tasks: [
      "नीचे 'कोण (Rotate)' स्लाइडर से पूरा पैटर्न घुमाएं।",
      "'गति (Speed)' स्लाइडर से एनीमेशन की रफ्तार बदलें।",
      "'स्केल (Scale)' स्लाइडर से पैटर्न को ज़ूम इन/आउट करें।"
    ],
    defaultCode: `
/* 
  स्लाइडर वेरिएबल्स (Variables):
  > speed (गति)
  > scale (ज़ूम)
  > angle (कोण)
*/

// केंद्र को बीच में लाओ
let cx = x - 8;
let cy = y - 8;

// 1. घुमाओ (Rotate)
let p = rotate(cx, cy, angle);

// 2. ज़ूम (Scale)
let sx = p.x * scale;
let sy = p.y * scale;

// 3. पैटर्न बनाओ
let val = sin(sx * 0.3 + t * speed) + sin(sy * 0.3);

// रंग भरो (HSV कलर)
let h = map(val, -2, 2, 0, 1); 
let c = hsv(h + t * 0.1, 1, 1); 

r = c.r;
g = c.g;
b = c.b;
    `,
    visualParams: [
      { label: 'गति (Speed)', variable: 'speed', min: 0, max: 20, step: 0.5, default: 5 },
      { label: 'स्केल (Scale)', variable: 'scale', min: 0.1, max: 4, step: 0.1, default: 1 },
      { label: 'कोण (Rotate)', variable: 'angle', min: 0, max: 6.28, step: 0.05, default: 0 },
    ],
    explanation: "**तुम स्पेस को मोड़ रहे हो।**\n\n*   आम तौर पर X और Y फिक्स होते हैं।\n*   लेकिन अगर हम रंग भरने से *पहले* उन्हें गुणा करें या घुमाएं, तो पूरी दुनिया मुड़ जाती है।\n*   इसी तरह साइकेडेलिक (Psychedelic) विजुअल्स बनते हैं।"
  }
];

export const getCurriculum = (lang: Language): Lesson[] => {
  return lang === 'hi' ? CURRICULUM_HI : CURRICULUM_EN;
};

// Default export for backward compatibility
export const CURRICULUM = CURRICULUM_EN;
