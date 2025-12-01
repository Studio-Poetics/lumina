
import React from 'react';
import { Lesson, Language, Theme } from '../types';
import { t } from '../utils/translations';
import { Globe, Sun, Moon, X, Settings, ExternalLink } from 'lucide-react';

interface SidebarProps {
  currentLessonId: string;
  onSelectLesson: (lesson: Lesson) => void;
  curriculum: Lesson[];
  lang: Language;
  onToggleLang: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  onClose?: () => void; // For mobile
  onOpenSettings: () => void;
  onOpenLearnMore: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentLessonId, 
  onSelectLesson, 
  curriculum, 
  lang, 
  onToggleLang,
  theme,
  onToggleTheme,
  onClose,
  onOpenSettings,
  onOpenLearnMore
}) => {
  const handleSelect = (lesson: Lesson) => {
    onSelectLesson(lesson);
    if (onClose) onClose();
  };

  return (
    <div className="w-full lg:w-72 flex-shrink-0 bg-stone-50 dark:bg-ink-950 border-r border-stone-200 dark:border-ink-800 flex flex-col h-full overflow-y-auto transition-colors duration-300">
      
      {/* Header with Mobile Close Button */}
      <div className="p-6 lg:p-8 pb-4 lg:pb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-stone-900 dark:text-stone-100">
            Lumina
          </h1>
          <p className="text-xs uppercase tracking-widest text-stone-500 mt-1">{t('subtitle', lang)}</p>
          <p className="text-xs text-stone-400 dark:text-stone-500 mt-1 font-mono italic">
            by Studio Poetics
          </p>
        </div>
        
        {/* Mobile Close Button */}
        {onClose && (
          <button 
            onClick={onClose}
            className="lg:hidden p-2 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          >
            <X size={24} />
          </button>
        )}
      </div>

      <div className="px-6 lg:px-8 mb-6 flex gap-2">
        <button 
          onClick={onToggleLang}
          className="flex-1 flex items-center justify-center gap-2 text-sm text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors border border-stone-200 dark:border-ink-800 px-3 py-2 rounded-sm"
        >
          <Globe size={14} />
          <span>{lang === 'en' ? 'EN' : 'HI'}</span>
        </button>
        
        <button 
          onClick={onToggleTheme}
          className="flex-shrink-0 flex items-center justify-center w-10 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors border border-stone-200 dark:border-ink-800 rounded-sm"
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-2">
        {curriculum.map((lesson, index) => {
          const isActive = currentLessonId === lesson.id;
          return (
            <button
              key={lesson.id}
              onClick={() => handleSelect(lesson)}
              className={`w-full flex items-center justify-between px-4 py-4 text-base transition-all duration-300 group ${
                isActive
                  ? 'bg-stone-200 dark:bg-ink-900 text-stone-900 dark:text-stone-100 border-l-4 border-terracotta-500'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-ink-900/50 border-l-4 border-transparent'
              }`}
            >
              <div className="flex items-center gap-4 text-left">
                <span className={`font-mono text-xs ${isActive ? 'text-terracotta-500' : 'text-stone-400 dark:text-ink-700'}`}>
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <span className="font-normal tracking-wide leading-tight">
                  {lesson.title.includes('. ') ? lesson.title.split('. ')[1] : lesson.title}
                </span>
              </div>
              {isActive && <div className="w-1.5 h-1.5 bg-terracotta-500 rounded-full flex-shrink-0" />}
            </button>
          );
        })}
      </nav>

      <div className="p-6 lg:p-8 border-t border-stone-200 dark:border-ink-800 space-y-4">
        <button
          onClick={onOpenLearnMore}
          className="w-full flex items-center justify-center gap-2 text-sm text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors border border-stone-200 dark:border-ink-800 px-3 py-3 rounded-sm hover:bg-stone-100 dark:hover:bg-ink-900/50"
        >
          <ExternalLink size={14} />
          <span className="font-medium">{lang === 'en' ? 'Learn More' : 'और जानें'}</span>
        </button>

        <div className="flex justify-between items-center">
          <p className="text-sm text-stone-500 leading-relaxed font-mono italic truncate mr-2">
            {lang === 'en' ? '"Observe. Trust."' : '"देखो। भरोसा करो।"'}
          </p>
          <button
            onClick={onOpenSettings}
            className="text-stone-400 hover:text-terracotta-500 transition-colors p-1"
            title={lang === 'hi' ? 'सेटिंग्स' : 'Settings'}
          >
            <Settings size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
