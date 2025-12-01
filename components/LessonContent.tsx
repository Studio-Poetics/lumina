
import React, { useState } from 'react';
import { Lesson, Language, Challenge } from '../types';
import { Sparkles, Target, Zap } from 'lucide-react';
import Controls from './Controls';
import { t } from '../utils/translations';

interface LessonContentProps {
  lesson: Lesson;
  aiExplanation: string | null;
  paramValues: Record<string, number>;
  onParamChange: (key: string, value: number) => void;
  lang: Language;
}

// Helper to parse bold markdown (**text**)
const parseBold = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="text-stone-900 dark:text-stone-100 font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

const FormattedText: React.FC<{ text: string }> = ({ text }) => {
  // Split by double newline to separate paragraphs/sections
  const blocks = text.split(/\n\n+/);

  return (
    <div className="space-y-6 text-base text-stone-600 dark:text-stone-300 leading-8 font-light">
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // 1. Check for Lists (starts with * or -)
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
          const items = trimmed.split(/\n/).map(line => line.replace(/^[*|-]\s+/, '').trim());
          return (
            <ul key={i} className="space-y-3 pl-2 my-4">
              {items.map((item, j) => (
                <li key={j} className="flex gap-3">
                  <span className="text-terracotta-500 text-lg leading-none mt-1.5">•</span>
                  <span>{parseBold(item)}</span>
                </li>
              ))}
            </ul>
          );
        }

        // 2. Check for Headers (Whole line is bold like **Header**)
        if (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.indexOf('**', 2) === trimmed.length - 2) {
           return (
             <h4 key={i} className="text-lg font-bold text-terracotta-500 dark:text-terracotta-500 mt-6 mb-2">
               {trimmed.slice(2, -2)}
             </h4>
           );
        }
        
        // 3. Regular Paragraph
        return (
          <p key={i} className="mb-2">
            {parseBold(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

const LessonContent: React.FC<LessonContentProps> = ({
  lesson,
  aiExplanation,
  paramValues,
  onParamChange,
  lang
}) => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  return (
    <div className="flex flex-col h-full bg-stone-50 dark:bg-ink-950 transition-colors duration-300">
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10">
        
        {/* Header Section */}
        <div className="mb-10 lg:mb-12 border-b border-stone-200 dark:border-ink-800 pb-8 lg:pb-10">
          <div className="flex items-center gap-3 mb-4 lg:mb-6">
             <span className="text-xs font-bold tracking-widest text-terracotta-500 uppercase">
               {lesson.concept}
             </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-light text-stone-900 dark:text-stone-100 mb-6 lg:mb-8 tracking-tight leading-tight">{lesson.title}</h2>
          
          <div className="space-y-6">
             <FormattedText text={lesson.description} />
          </div>
        </div>

        {/* Exercises / Tasks */}
        {lesson.tasks && lesson.tasks.length > 0 && (
          <div className="mb-10 lg:mb-12">
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-6">
              {t('observations_tasks', lang)}
            </h4>
            <ul className="space-y-4 border-l-2 border-stone-200 dark:border-ink-800 pl-6">
              {lesson.tasks.map((task, i) => (
                <li key={i} className="text-base text-stone-600 dark:text-stone-300 leading-7 flex gap-3">
                   <span className="text-stone-400 font-mono text-sm mt-0.5">0{i + 1}.</span> 
                   <span>{parseBold(task)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Sandbox Controls */}
        {lesson.visualParams.length > 0 && (
          <div className="mb-10 lg:mb-12">
            <Controls 
              params={lesson.visualParams} 
              values={paramValues} 
              onChange={onParamChange}
              lang={lang} 
            />
          </div>
        )}

        {/* AI Insight Section */}
        {aiExplanation && (
          <div className="mb-10 p-6 lg:p-8 bg-white dark:bg-ink-900 rounded-sm border-l-4 border-terracotta-500 animate-in fade-in shadow-sm">
            <h4 className="flex items-center gap-2 text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-6">
              <Sparkles size={16} className="text-terracotta-500" /> {t('insight', lang)}
            </h4>
            {/* Re-use the smart formatter for the explanation text */}
            <FormattedText text={aiExplanation} />
          </div>
        )}

        {/* Static Challenges */}
        {lesson.challenges && lesson.challenges.length > 0 && (
          <div className="mb-10 lg:mb-12">
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-6">
              {lang === 'hi' ? 'चुनौतियाँ' : 'Challenges'}
            </h4>
            <div className="grid gap-4">
              {lesson.challenges.map((challenge, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedChallenge(selectedChallenge?.title === challenge.title ? null : challenge)}
                  className={`group w-full text-left p-4 border rounded-sm transition-all ${
                    challenge.difficulty === 'easy'
                      ? 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900'
                      : challenge.difficulty === 'medium'
                      ? 'border-stone-300 dark:border-stone-600 bg-stone-100 dark:bg-stone-800'
                      : 'border-stone-400 dark:border-stone-500 bg-stone-150 dark:bg-stone-750'
                  } hover:shadow-sm`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {challenge.difficulty === 'easy' && <Target size={16} className="text-stone-500 dark:text-stone-400" />}
                      {challenge.difficulty === 'medium' && <Zap size={16} className="text-stone-600 dark:text-stone-300" />}
                      {challenge.difficulty === 'hard' && <Sparkles size={16} className="text-stone-700 dark:text-stone-200" />}
                      <span className="font-medium text-stone-900 dark:text-stone-100">{challenge.title}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wide ${
                      challenge.difficulty === 'easy'
                        ? 'bg-stone-200 text-stone-700 dark:bg-stone-700 dark:text-stone-200'
                        : challenge.difficulty === 'medium'
                        ? 'bg-stone-300 text-stone-800 dark:bg-stone-600 dark:text-stone-100'
                        : 'bg-stone-400 text-stone-900 dark:bg-stone-500 dark:text-stone-50'
                    }`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  {selectedChallenge?.title === challenge.title && (
                    <div className="mt-3 pt-3 border-t border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300">
                      {challenge.description}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonContent;
