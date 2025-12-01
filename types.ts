
export type Language = 'en' | 'hi';

export type Theme = 'light' | 'dark';

export enum LessonType {
  INTRO = 'INTRO',
  CONCEPT_COORDS = 'CONCEPT_COORDS',
  COORDINATES = 'COORDINATES',
  CONCEPT_NORMALIZE = 'CONCEPT_NORMALIZE',
  NORMALIZE = 'NORMALIZE',
  TIME = 'TIME',
  CONCEPT_TRIG = 'CONCEPT_TRIG',
  OSCILLATION = 'OSCILLATION',
  WAVE_SHAPES = 'WAVE_SHAPES',
  CONCEPT_SIN_VS_TAN = 'CONCEPT_SIN_VS_TAN',
  WAVES = 'WAVES',
  DISTANCE = 'DISTANCE',
  SANDBOX = 'SANDBOX'
}

export type VisualizerMode = 'MATRIX' | 'COORDINATE_PLANE' | 'UNIT_CIRCLE' | 'NORMALIZED_GRADIENT';

export interface PatternContext {
  x: number;      // Column index (0 to width-1)
  y: number;      // Row index (0 to height-1)
  t: number;      // Time in seconds
  i: number;      // Linear index
  w: number;      // Grid Width
  h: number;      // Grid Height
  mx: number;     // Normalized Mouse X (0-1)
  my: number;     // Normalized Mouse Y (0-1)
  [key: string]: number; // Allow dynamic parameters
}

export interface PatternResult {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
}

export interface VisualParamOption {
  label: string;
  value: number;
}

export interface VisualParam {
  label: string;
  variable: string;
  min?: number;
  max?: number;
  step?: number;
  default: number;
  type?: 'range' | 'select'; // 'range' is default if undefined
  options?: VisualParamOption[]; // Only used if type is 'select'
}

export interface Challenge {
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Lesson {
  id: LessonType;
  title: string;
  concept: string;
  description: string;
  visualizerMode: VisualizerMode;
  tasks: string[]; // List of specific sub-exercises
  defaultCode: string;
  visualParams: VisualParam[];
  explanation?: string;
  challenges: Challenge[];
}

export interface GridConfig {
  width: number;
  height: number;
  pixelSize: number;
  gap: number;
}
