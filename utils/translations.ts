
import { Language } from '../types';

type TranslationKey =
  | 'logic'
  | 'syntax_guide'
  | 'explain'
  | 'processing'
  | 'syntax_reference'
  | 'variables'
  | 'functions'
  | 'grid_coords'
  | 'time_seconds'
  | 'width_height'
  | 'observations_tasks'
  | 'insight'
  | 'exercise_mode'
  | 'parameters'
  | 'concept_view'
  | 'led_output'
  | 'subtitle'
  | 'settings_title'
  | 'save'
  | 'close';

export const TRANSLATIONS: Record<Language, Record<TranslationKey, string>> = {
  en: {
    logic: 'Logic',
    syntax_guide: 'Syntax Guide',
    explain: 'Explain',
    processing: 'Processing...',
    syntax_reference: 'Syntax Reference',
    variables: 'Variables',
    functions: 'Functions',
    grid_coords: 'Grid Coordinates',
    time_seconds: 'Time (seconds)',
    width_height: 'Width / Height',
    observations_tasks: 'Observations & Tasks',
    insight: 'Insight',
    exercise_mode: 'Exercise Mode',
    parameters: 'Parameters',
    concept_view: 'Concept View',
    led_output: 'LED Matrix Output',
    subtitle: 'Pattern Intuition',
    settings_title: 'API Settings',
    save: 'Save Key',
    close: 'Close'
  },
  hi: {
    logic: 'तर्क (Logic)',
    syntax_guide: 'नियम पुस्तिका (Rules)',
    explain: 'मुझे समझाओ (Explain)',
    processing: 'सोच रहा हूँ...',
    syntax_reference: 'नियम (Rules)',
    variables: 'चर (Containers)',
    functions: 'सूत्र (Tools)',
    grid_coords: 'पता (Coordinates)',
    time_seconds: 'समय (t)',
    width_height: 'लंबाई / चौड़ाई',
    observations_tasks: 'देखो और करो (Tasks)',
    insight: 'गहराई से समझें (Insight)',
    exercise_mode: 'रियाज़ (Practice)',
    parameters: 'सेटिंग्स (Settings)',
    concept_view: 'कांसैप्ट (Concept)',
    led_output: 'नतीजा (Result)',
    subtitle: 'पैटर्न की समझ',
    settings_title: 'सेटिंग्स (Settings)',
    save: 'सेव करें (Save)',
    close: 'बंद करें (Close)'
  }
};

export const t = (key: TranslationKey, lang: Language): string => {
  return TRANSLATIONS[lang][key] || TRANSLATIONS['en'][key];
};
