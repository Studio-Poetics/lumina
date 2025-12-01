
import React, { useState, useEffect } from 'react';
import { X, Key, ExternalLink, Save } from 'lucide-react';
import { t } from '../utils/translations';
import { Language } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSaveKey: (key: string) => void;
  savedKey: string;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  lang, 
  onSaveKey, 
  savedKey 
}) => {
  const [keyInput, setKeyInput] = useState(savedKey);

  useEffect(() => {
    setKeyInput(savedKey);
  }, [savedKey, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveKey(keyInput);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-ink-900 w-full max-w-md rounded-sm shadow-2xl border border-stone-200 dark:border-ink-800 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-ink-800 bg-stone-50 dark:bg-ink-950">
          <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Key size={18} className="text-terracotta-500"/>
            {t('settings_title', lang)}
          </h3>
          <button onClick={onClose} className="text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="space-y-2 text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
            <p>
              {lang === 'hi' 
                ? 'AI ट्यूटर का उपयोग करने के लिए अपनी खुद की Google Gemini API Key डालें। यदि आपके पास की (Key) नहीं है, तो हम आपको पहले से तैयार पाठ दिखाएंगे।'
                : 'Enter your own Google Gemini API Key to enable custom AI explanations and challenges. If you leave this empty, you will see the default curriculum content.'}
            </p>
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-terracotta-500 hover:underline text-xs font-bold uppercase tracking-wider"
            >
              {lang === 'hi' ? 'की (Key) यहाँ से प्राप्त करें' : 'Get API Key here'} <ExternalLink size={12} />
            </a>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-widest block">
              API Key
            </label>
            <input 
              type="password" 
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder={lang === 'hi' ? 'यहाँ पेस्ट करें...' : 'Paste key here...'}
              className="w-full bg-stone-100 dark:bg-ink-950 border border-stone-200 dark:border-ink-800 rounded-sm px-4 py-3 text-stone-900 dark:text-stone-100 focus:border-terracotta-500 focus:ring-1 focus:ring-terracotta-500 outline-none transition-all font-mono text-sm"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-stone-50 dark:bg-ink-950 border-t border-stone-200 dark:border-ink-800 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          >
            {t('close', lang)}
          </button>
          <button 
            onClick={handleSave}
            className="px-5 py-2 bg-terracotta-500 hover:bg-terracotta-600 text-white text-sm font-medium rounded-sm shadow-sm flex items-center gap-2 transition-colors"
          >
            <Save size={16} />
            {t('save', lang)}
          </button>
        </div>

      </div>
    </div>
  );
};

export default SettingsModal;
