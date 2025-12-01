import React from 'react';
import { X, BookOpen, PenTool, Brain, Lightbulb, Globe } from 'lucide-react';
import { Language } from '../types';

interface WelcomeSplashProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onToggleLang: () => void;
}

const WelcomeSplash: React.FC<WelcomeSplashProps> = ({ isOpen, onClose, lang, onToggleLang }) => {
  if (!isOpen) return null;

  const tips = [
    {
      icon: BookOpen,
      title: lang === 'en' ? 'Keep a Notebook Ready' : 'एक नोटबुक तैयार रखें',
      description: lang === 'en'
        ? 'Physical notebooks help your brain process and retain mathematical patterns better than digital notes.'
        : 'भौतिक नोटबुक आपके दिमाग को गणितीय पैटर्न को बेहतर तरीके से समझने और याद रखने में मदद करती है।'
    },
    {
      icon: PenTool,
      title: lang === 'en' ? 'Sketch & Doodle' : 'स्केच और ड्रॉ करें',
      description: lang === 'en'
        ? 'Draw the patterns you see, sketch coordinate grids, and write down mathematical relationships.'
        : 'जो पैटर्न आप देखते हैं उन्हें ड्रॉ करें, कोऑर्डिनेट ग्रिड स्केच करें, और गणितीय संबंध लिखें।'
    },
    {
      icon: Brain,
      title: lang === 'en' ? 'Think Before Coding' : 'कोड करने से पहले सोचें',
      description: lang === 'en'
        ? 'Before changing the code, predict what will happen. Write your hypothesis in your notebook.'
        : 'कोड बदलने से पहले, अनुमान लगाएं कि क्या होगा। अपनी परिकल्पना को नोटबुक में लिखें।'
    },
    {
      icon: Lightbulb,
      title: lang === 'en' ? 'Connect the Dots' : 'संबंध बनाएं',
      description: lang === 'en'
        ? 'Notice how sine waves relate to circles, how time creates motion, and how math becomes art.'
        : 'देखें कि sine waves का circles से क्या संबंध है, time कैसे motion बनाता है, और math कैसे art बन जाता है।'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-ink-900 rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-stone-200 dark:border-ink-800">
          <div>
            <h1 className="text-3xl font-light text-stone-900 dark:text-stone-100 mb-2">
              {lang === 'en' ? 'Welcome to Lumina Logic' : 'Lumina Logic में आपका स्वागत है'}
            </h1>
            <p className="text-stone-500 dark:text-stone-400 font-mono italic">
              {lang === 'en' ? 'Pattern Intuition • by Studio Poetics' : 'पैटर्न की समझ • Studio Poetics द्वारा'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleLang}
              className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors border border-stone-200 dark:border-ink-800 px-3 py-2 rounded-sm"
            >
              <Globe size={14} />
              <span className="font-medium">{lang === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors p-1"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">

          {/* Introduction */}
          <div className="text-center space-y-4">
            <h2 className="text-xl font-medium text-stone-900 dark:text-stone-100">
              {lang === 'en' ? 'Learn Mathematical Patterns Through Code' : 'कोड के माध्यम से गणितीय पैटर्न सीखें'}
            </h2>
            <p className="text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
              {lang === 'en'
                ? 'Explore how mathematical functions create beautiful visual patterns. Interactive learning meets creative coding in this hands-on experience designed to build intuitive understanding.'
                : 'जानें कि गणितीय फ़ंक्शन कैसे सुंदर दृश्य पैटर्न बनाते हैं। यह हैंड्स-ऑन अनुभव सहज समझ विकसित करने के लिए डिज़ाइन किया गया है।'}
            </p>
          </div>

          {/* Learning Tips */}
          <div>
            <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-6 text-center">
              {lang === 'en' ? 'How to Learn Effectively' : 'प्रभावी तरीके से कैसे सीखें'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tips.map((tip, index) => {
                const IconComponent = tip.icon;
                return (
                  <div key={index} className="flex gap-4 p-4 bg-stone-50 dark:bg-ink-950 rounded-sm border border-stone-200 dark:border-ink-800">
                    <div className="flex-shrink-0 w-10 h-10 bg-terracotta-500 rounded-full flex items-center justify-center">
                      <IconComponent size={18} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-stone-900 dark:text-stone-100 mb-2">
                        {tip.title}
                      </h4>
                      <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Features */}
          <div className="bg-gradient-to-r from-terracotta-500/10 to-stone-200/20 dark:from-terracotta-500/20 dark:to-ink-800 p-6 rounded-sm border border-terracotta-200 dark:border-terracotta-600/30">
            <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-4 text-center">
              {lang === 'en' ? 'What You\'ll Discover' : 'आप क्या खोजेंगे'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="font-medium text-terracotta-600 dark:text-terracotta-400">
                  {lang === 'en' ? 'LED Matrix' : 'LED मैट्रिक्स'}
                </div>
                <div className="text-stone-600 dark:text-stone-400 mt-1">
                  {lang === 'en' ? 'Live Visualization' : 'लाइव दृश्यीकरण'}
                </div>
              </div>
              <div className="text-center">
                <div className="font-medium text-terracotta-600 dark:text-terracotta-400">
                  {lang === 'en' ? 'Math Functions' : 'गणित फंक्शन'}
                </div>
                <div className="text-stone-600 dark:text-stone-400 mt-1">
                  {lang === 'en' ? 'Sin, Cos, Time' : 'Sin, Cos, समय'}
                </div>
              </div>
              <div className="text-center">
                <div className="font-medium text-terracotta-600 dark:text-terracotta-400">
                  {lang === 'en' ? 'Real-time Code' : 'रियल-टाइम कोड'}
                </div>
                <div className="text-stone-600 dark:text-stone-400 mt-1">
                  {lang === 'en' ? 'Instant Results' : 'तुरंत परिणाम'}
                </div>
              </div>
              <div className="text-center">
                <div className="font-medium text-terracotta-600 dark:text-terracotta-400">
                  {lang === 'en' ? 'AI Explanations' : 'AI स्पष्टीकरण'}
                </div>
                <div className="text-stone-600 dark:text-stone-400 mt-1">
                  {lang === 'en' ? 'When You Need' : 'जब आवश्यक हो'}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-3 bg-terracotta-500 hover:bg-terracotta-600 text-white px-8 py-4 rounded-sm transition-colors font-medium text-lg"
            >
              <BookOpen size={20} />
              <span>
                {lang === 'en' ? 'Start Learning' : 'सीखना शुरू करें'}
              </span>
            </button>

            <p className="text-xs text-stone-400 dark:text-stone-500 mt-4">
              {lang === 'en'
                ? 'Remember: Keep your notebook close and your curiosity closer'
                : 'याद रखें: अपनी नोटबुक पास रखें और अपनी जिज्ञासा और भी पास'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSplash;