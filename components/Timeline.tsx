
import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimelineProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentTime: number;
  onSeek: (time: number) => void;
  duration?: number;
}

const Timeline: React.FC<TimelineProps> = ({ 
  isPlaying, 
  onTogglePlay, 
  currentTime, 
  onSeek,
  duration = 10 
}) => {
  const sliderValue = currentTime % duration;

  return (
    <div className="flex items-center gap-4 lg:gap-8 px-4 lg:px-8 py-4 lg:py-6 bg-stone-50 dark:bg-ink-950 border-b border-stone-200 dark:border-ink-800 w-full h-16 lg:h-20 transition-colors duration-300">
      
      {/* Functional, geometric play button */}
      <button 
        onClick={onTogglePlay}
        className={`flex-shrink-0 flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-sm transition-all duration-200 ${
          isPlaying 
            ? 'bg-terracotta-500 text-white hover:bg-terracotta-600' 
            : 'bg-stone-200 dark:bg-ink-800 text-stone-600 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-ink-700'
        }`}
      >
        {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
      </button>

      {/* Reset/Seek 0 */}
      <button onClick={() => onSeek(0)} className="flex-shrink-0 text-stone-400 dark:text-ink-700 hover:text-stone-900 dark:hover:text-stone-300 transition-colors">
        <RotateCcw size={18} />
      </button>

      <div className="flex-1 flex flex-col justify-center gap-1 min-w-0">
        <input
          type="range"
          min={0}
          max={duration}
          step={0.01}
          value={sliderValue}
          onChange={(e) => {
            if (isPlaying) onTogglePlay();
            onSeek(parseFloat(e.target.value));
          }}
          className="w-full"
        />
      </div>

      <div className="w-16 lg:w-20 text-right font-mono text-xs text-stone-500 hidden sm:block">
        t: <span className="text-stone-900 dark:text-stone-300 text-sm">{currentTime.toFixed(1)}</span>
      </div>
    </div>
  );
};

export default Timeline;
