
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Matrix from './components/Matrix';
import CodeEditor from './components/CodeEditor';
import LessonContent from './components/LessonContent';
import Timeline from './components/Timeline';
import ConceptVisualizer from './components/ConceptVisualizer';
import SettingsModal from './components/SettingsModal';
import LearnMoreModal from './components/LearnMoreModal';
import WelcomeSplash from './components/WelcomeSplash';
import { getCurriculum } from './data/curriculum';
import { Lesson, GridConfig, Language, Theme } from './types';
import { explainPattern } from './services/geminiService';
import { t } from './utils/translations';
import { Menu } from 'lucide-react';

const GRID_CONFIG: GridConfig = {
  width: 16,
  height: 16,
  pixelSize: 18,
  gap: 4
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [apiKey, setApiKey] = useState('');
  
  // Initialize curriculum based on language
  const curriculum = getCurriculum(lang);
  const [currentLesson, setCurrentLesson] = useState<Lesson>(curriculum[0]);
  
  const [code, setCode] = useState<string>(curriculum[0].defaultCode);
  const [isPlaying, setIsPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [paramValues, setParamValues] = useState<Record<string, number>>({});

  // Theme Management
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Load API Key and check welcome status from local storage
  useEffect(() => {
    const storedKey = localStorage.getItem('lumina_api_key');
    if (storedKey) setApiKey(storedKey);

    // Show welcome splash on first visit
    const hasSeenWelcome = localStorage.getItem('lumina_seen_welcome');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
  }, []);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('lumina_seen_welcome', 'true');
  };

  const handleSaveKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('lumina_api_key', key);
  };

  // When language changes, update curriculum and current lesson text
  useEffect(() => {
    const newCurriculum = getCurriculum(lang);
    // Try to find the same lesson in the new language by ID
    const sameLesson = newCurriculum.find(l => l.id === currentLesson.id) || newCurriculum[0];
    setCurrentLesson(sameLesson);
  }, [lang]);

  useEffect(() => {
    const initialParams: Record<string, number> = {};
    currentLesson.visualParams.forEach(p => {
      initialParams[p.variable] = p.default;
    });
    setParamValues(initialParams);
  }, [currentLesson]);

  const handleLessonSelect = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setCode(lesson.defaultCode);
    setAiExplanation(null);
    setIsPlaying(true);
    setTime(0);
    setMobileMenuOpen(false);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setMousePos({ x, y });
  };

  const handleExplain = async () => {
    // If user has a custom API key, try to use AI for specific explanations
    if (apiKey) {
      setIsAiLoading(true);
      const explanation = await explainPattern(code, currentLesson.concept, lang, apiKey);
      if (explanation) {
         setAiExplanation(explanation);
         setIsAiLoading(false);
         return;
      }
      // If AI fails or returns empty, fall through to static
    } 

    // Default Fallback: Static Explanation (Instant)
    setIsAiLoading(true);
    setTimeout(() => {
        setAiExplanation(currentLesson.explanation || "No explanation available.");
        setIsAiLoading(false);
    }, 300); // Fake delay for UI feedback
  };


  const handleParamChange = (key: string, value: number) => {
    setParamValues(prev => ({ ...prev, [key]: value }));
  };

  const handleTick = (dt: number) => {
    setTime(prev => prev + dt);
  };

  const handleSeek = (newTime: number) => {
    setTime(newTime);
  };

  const isVisualizerMode = currentLesson.visualizerMode !== 'MATRIX';

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-stone-50 dark:bg-ink-950 text-stone-900 dark:text-stone-100 font-sans overflow-hidden transition-colors duration-300">
      
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        lang={lang}
        onSaveKey={handleSaveKey}
        savedKey={apiKey}
      />

      <LearnMoreModal
        isOpen={showLearnMore}
        onClose={() => setShowLearnMore(false)}
        lang={lang}
      />

      <WelcomeSplash
        isOpen={showWelcome}
        onClose={handleCloseWelcome}
        lang={lang}
      />

      {/* Mobile Header (Visible only on small screens) */}
      <div className="lg:hidden h-14 bg-stone-50 dark:bg-ink-950 border-b border-stone-200 dark:border-ink-800 flex items-center px-4 justify-between shrink-0 z-20">
        <span className="font-bold text-lg text-stone-900 dark:text-stone-100">Lumina Logic</span>
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar (Mobile Overlay + Desktop Static) */}
      <div 
        className={`fixed inset-0 z-50 bg-black/50 lg:hidden transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setMobileMenuOpen(false)}
      >
        <div 
          className={`w-80 h-full shadow-2xl transition-transform duration-300 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} 
          onClick={e => e.stopPropagation()}
        >
           <Sidebar
            currentLessonId={currentLesson.id}
            onSelectLesson={handleLessonSelect}
            curriculum={curriculum}
            lang={lang}
            onToggleLang={() => setLang(l => l === 'en' ? 'hi' : 'en')}
            theme={theme}
            onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            onClose={() => setMobileMenuOpen(false)}
            onOpenSettings={() => setShowSettings(true)}
            onOpenLearnMore={() => setShowLearnMore(true)}
          />
        </div>
      </div>

      <div className="hidden lg:block h-full shadow-lg z-20">
         <Sidebar
            currentLessonId={currentLesson.id}
            onSelectLesson={handleLessonSelect}
            curriculum={curriculum}
            lang={lang}
            onToggleLang={() => setLang(l => l === 'en' ? 'hi' : 'en')}
            theme={theme}
            onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            onOpenSettings={() => setShowSettings(true)}
            onOpenLearnMore={() => setShowLearnMore(true)}
          />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden h-full">

        {/* 1. Visual Stage */}
        <div className="order-1 lg:order-2 w-full lg:flex-1 flex flex-col border-r border-stone-200 dark:border-ink-800 bg-stone-50 dark:bg-ink-950 relative min-h-[400px] shrink-0">
          <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-6 min-h-[300px]">
             <div className="w-full h-full max-w-[60vh] aspect-square relative flex items-center justify-center">
               {isVisualizerMode ? (
                  <ConceptVisualizer 
                    mode={currentLesson.visualizerMode}
                    time={time}
                    isPlaying={isPlaying}
                    onTick={handleTick}
                    mousePos={mousePos}
                    lang={lang}
                    onMouseMove={handleCanvasMouseMove}
                    theme={theme}
                    params={paramValues}
                  />
               ) : (
                  <Matrix 
                    code={code} 
                    config={GRID_CONFIG} 
                    isPlaying={isPlaying} 
                    time={time}
                    onTick={handleTick}
                    mousePos={mousePos}
                    params={paramValues}
                    onMouseMove={handleCanvasMouseMove}
                    theme={theme}
                  />
               )}
             </div>
             <div className="absolute top-4 left-4 opacity-40 pointer-events-none">
               <span className="text-[10px] tracking-widest uppercase font-mono text-stone-500">
                  {isVisualizerMode ? t('concept_view', lang) : t('led_output', lang)}
               </span>
             </div>
          </div>
          <div className="flex-shrink-0">
            <Timeline 
              isPlaying={isPlaying} 
              onTogglePlay={() => setIsPlaying(!isPlaying)} 
              currentTime={time}
              onSeek={handleSeek}
            />
          </div>
        </div>

        {/* 2. Code Editor */}
        <div className="order-2 lg:order-1 w-full lg:w-[400px] h-[500px] lg:h-full flex-col border-r border-stone-200 dark:border-ink-800 bg-white dark:bg-ink-900 z-10 shadow-xl dark:shadow-black shrink-0">
          <CodeEditor 
            code={code} 
            onChange={setCode}
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
            onExplain={handleExplain}
            isExplaining={isAiLoading}
            lang={lang}
            params={currentLesson.visualParams} 
          />
        </div>

        {/* 3. Lesson Content */}
        <div className="order-3 lg:order-3 w-full lg:flex-1 h-auto lg:h-full flex flex-col bg-stone-50 dark:bg-ink-950 overflow-hidden shrink-0">
          <div className="h-full overflow-y-auto custom-scrollbar">
             <LessonContent
              lesson={currentLesson}
              aiExplanation={aiExplanation}
              paramValues={paramValues}
              onParamChange={handleParamChange}
              lang={lang}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
