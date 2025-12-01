
import React from 'react';
import { VisualParam, Language } from '../types';
import { t } from '../utils/translations';

interface ControlsProps {
  params: VisualParam[];
  values: Record<string, number>;
  onChange: (key: string, value: number) => void;
  lang?: Language;
}

const Controls: React.FC<ControlsProps> = ({ params, values, onChange, lang = 'en' }) => {
  if (params.length === 0) return null;

  return (
    <div className="p-6 lg:p-8 bg-white dark:bg-ink-900 border border-stone-200 dark:border-ink-800 rounded-sm mt-8 shadow-sm dark:shadow-none">
      <div className="flex items-center gap-3 mb-6 lg:mb-8">
        <div className="w-1.5 h-4 bg-terracotta-500"></div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-stone-500">{t('parameters', lang)}</h3>
      </div>
      
      <div className="space-y-6 lg:space-y-8">
        {params.map((param) => (
          <div key={param.variable} className="group">
            <div className="flex justify-between items-baseline mb-3 text-sm">
              <label htmlFor={param.variable} className="text-stone-600 dark:text-stone-300 font-medium text-sm lg:text-base">
                {param.label}
              </label>
              {/* Only show numeric value if it's a range slider */}
              {(!param.type || param.type === 'range') && (
                <span className="font-mono text-stone-500 text-sm">{values[param.variable]?.toFixed(2)}</span>
              )}
            </div>

            {/* Render Toggle Group (Select) */}
            {param.type === 'select' && param.options ? (
              <div className="flex flex-wrap gap-2">
                {param.options.map((option) => {
                  const isSelected = values[param.variable] === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => onChange(param.variable, option.value)}
                      className={`
                        flex-1 sm:flex-none px-3 lg:px-4 py-2 rounded-sm text-sm font-medium transition-all duration-200 border whitespace-nowrap
                        ${isSelected 
                          ? 'bg-terracotta-500 text-white border-terracotta-500 shadow-sm' 
                          : 'bg-stone-50 dark:bg-ink-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-ink-700 hover:bg-stone-100 dark:hover:bg-ink-700'
                        }
                      `}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Render Range Slider (Default) */
              <div className="relative h-6 flex items-center">
                <input
                  id={param.variable}
                  type="range"
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  value={values[param.variable] ?? param.default}
                  onChange={(e) => onChange(param.variable, parseFloat(e.target.value))}
                  className="w-full relative z-10 cursor-pointer"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Controls;
