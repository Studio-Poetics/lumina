
import React, { useState } from 'react';
import { Wand2, X } from 'lucide-react';
import { Language, VisualParam } from '../types';
import { t } from '../utils/translations';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onExplain: () => void;
  isExplaining: boolean;
  lang: Language;
  params?: VisualParam[];
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  code, 
  onChange, 
  onExplain,
  isExplaining,
  lang,
  params = []
}) => {
  const [showDocs, setShowDocs] = useState(false);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-ink-900 border-stone-200 dark:border-ink-800 relative font-mono transition-colors duration-300 lg:border-l lg:border-t-0 border-t border-b lg:border-b-0">
      <div className="flex items-center justify-between px-4 lg:px-6 py-4 border-b border-stone-200 dark:border-ink-800 bg-stone-50 dark:bg-ink-950">
        <h3 className="text-xs font-bold text-stone-500 tracking-widest uppercase">{t('logic', lang)}</h3>
        <div className="flex gap-4 lg:gap-6">
           <button 
            onClick={() => setShowDocs(!showDocs)}
            className="text-xs uppercase tracking-wider text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 transition-colors"
          >
            {t('syntax_guide', lang)}
          </button>
          <button 
            onClick={onExplain}
            disabled={isExplaining}
            className={`text-xs flex items-center gap-2 transition-colors ${
              isExplaining ? 'text-stone-400' : 'text-stone-500 dark:text-stone-400 hover:text-terracotta-500'
            }`}
          >
            <Wand2 size={16} />
            <span className="hidden sm:inline">{isExplaining ? t('processing', lang) : t('explain', lang)}</span>
            <span className="sm:hidden">{isExplaining ? '...' : t('explain', lang).split(' ')[0]}</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1 relative bg-white dark:bg-ink-950">
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="absolute inset-0 w-full h-full p-4 lg:p-8 bg-white dark:bg-ink-950 text-stone-900 dark:text-stone-300 text-sm leading-7 resize-none focus:outline-none focus:bg-stone-50 dark:focus:bg-ink-900/50 transition-colors"
          style={{ tabSize: 2, fontFamily: "'JetBrains Mono', monospace" }}
        />
        
        {/* Sumi-style Documentation Overlay */}
        {showDocs && (
          <div className="absolute inset-0 bg-stone-50/95 dark:bg-ink-950/95 backdrop-blur-sm z-20 p-6 lg:p-8 overflow-y-auto">
             <div className="flex justify-between items-start mb-6 lg:mb-8">
               <h4 className="text-stone-900 dark:text-stone-100 font-medium text-lg">{t('syntax_reference', lang)}</h4>
               <button onClick={() => setShowDocs(false)} className="text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"><X size={20}/></button>
             </div>
             <div className="grid grid-cols-1 gap-8 text-sm text-stone-600 dark:text-stone-400">
               
               {/* Context Variables */}
               <div>
                 <strong className="text-terracotta-500 block mb-4 uppercase tracking-wider text-xs">{t('variables', lang)}</strong>
                 <ul className="space-y-3">
                   <li className="flex justify-between border-b border-stone-200 dark:border-ink-800 pb-2"><span>x, y</span> <span className="text-stone-500 dark:text-stone-600">{t('grid_coords', lang)}</span></li>
                   <li className="flex justify-between border-b border-stone-200 dark:border-ink-800 pb-2"><span>t</span> <span className="text-stone-500 dark:text-stone-600">{t('time_seconds', lang)}</span></li>
                   <li className="flex justify-between border-b border-stone-200 dark:border-ink-800 pb-2"><span>w, h</span> <span className="text-stone-500 dark:text-stone-600">{t('width_height', lang)}</span></li>
                 </ul>
               </div>

               {/* Dynamic Slider Variables */}
               {params.length > 0 && (
                 <div>
                   <strong className="text-terracotta-500 block mb-4 uppercase tracking-wider text-xs">{t('parameters', lang)}</strong>
                   <ul className="space-y-3">
                     {params.map(p => (
                       <li key={p.variable} className="flex justify-between border-b border-stone-200 dark:border-ink-800 pb-2">
                         <span className="font-bold text-stone-900 dark:text-stone-200">{p.variable}</span>
                         <span className="text-stone-500 dark:text-stone-600 italic">from slider "{p.label}"</span>
                       </li>
                     ))}
                   </ul>
                 </div>
               )}

               {/* Functions */}
               <div>
                 <strong className="text-terracotta-500 block mb-4 uppercase tracking-wider text-xs">{t('functions', lang)}</strong>
                 <ul className="space-y-3">
                   <li className="flex justify-between border-b border-stone-200 dark:border-ink-800 pb-2"><span>sin(t)</span> <span className="text-stone-500 dark:text-stone-600">Wave -1 to 1</span></li>
                   <li className="flex justify-between border-b border-stone-200 dark:border-ink-800 pb-2"><span>map(v, a, b, c, d)</span> <span className="text-stone-500 dark:text-stone-600">Remap range</span></li>
                   <li className="flex justify-between border-b border-stone-200 dark:border-ink-800 pb-2"><span>rotate(x, y, a)</span> <span className="text-stone-500 dark:text-stone-600">Spin coordinates</span></li>
                   <li className="flex justify-between border-b border-stone-200 dark:border-ink-800 pb-2"><span>hsv(h, s, v)</span> <span className="text-stone-500 dark:text-stone-600">Rainbow Color</span></li>
                   <li className="flex justify-between border-b border-stone-200 dark:border-ink-800 pb-2"><span>abs(n)</span> <span className="text-stone-500 dark:text-stone-600">Positive only</span></li>
                   <li className="flex justify-between border-b border-stone-200 dark:border-ink-800 pb-2"><span>sign(n)</span> <span className="text-stone-500 dark:text-stone-600">1 or -1</span></li>
                 </ul>
               </div>
             </div>
          </div>
        )}
      </div>
      
      <div className="px-4 lg:px-6 py-4 bg-stone-50 dark:bg-ink-900 border-t border-stone-200 dark:border-ink-800 text-xs text-stone-500 dark:text-ink-700 flex justify-between uppercase tracking-wider">
        <span>JS Context</span>
        <span>Ready</span>
      </div>
    </div>
  );
};

export default CodeEditor;
