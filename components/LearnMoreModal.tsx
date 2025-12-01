import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Language } from '../types';

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const LearnMoreModal: React.FC<LearnMoreModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  const topics = [
    { name: 'Artificial Intelligence', nameHi: 'कृत्रिम बुद्धिमत्ता', icon: '🤖' },
    { name: 'Blockchain Technology', nameHi: 'ब्लॉकचेन तकनीक', icon: '⛓️' },
    { name: 'Smart Textiles', nameHi: 'स्मार्ट वस्त्र', icon: '🧵' },
    { name: 'Robotics', nameHi: 'रोबोटिक्स', icon: '🤖' },
    { name: 'Future Interfaces', nameHi: 'भविष्य की तकनीकें', icon: '✋' },
    { name: 'Quantum Computing', nameHi: 'क्वांटम कंप्यूटिंग', icon: '⚛️' },
    { name: 'Bio-Robotics', nameHi: 'बायो-रोबोटिक्स', icon: '🧬' },
    { name: 'Metaverse', nameHi: 'मेटावर्स', icon: '🌐' },
    { name: 'Edge Computing', nameHi: 'एज कंप्यूटिंग', icon: '💻' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-ink-900 rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-200 dark:border-ink-800">
          <div>
            <h2 className="text-2xl font-medium text-stone-900 dark:text-stone-100">
              {lang === 'en' ? 'Explore Emerging Technologies' : 'उभरती तकनीकों का अन्वेषण करें'}
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
              {lang === 'en' ? 'Continue your learning journey with Studio Poetics' : 'Studio Poetics के साथ अपनी शिक्षा यात्रा जारी रखें'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">

          {/* Platform Introduction */}
          <div className="bg-stone-50 dark:bg-ink-950 p-6 rounded-sm border border-stone-200 dark:border-ink-800">
            <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-3">
              {lang === 'en' ? 'ETH Poetics Studio' : 'ETH कविता स्टूडियो'}
            </h3>
            <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed mb-4">
              {lang === 'en'
                ? 'An emerging technology hub designed for accessible learning. We create interactive experiences that make cutting-edge technologies approachable for non-technical learners through visual communication and hands-on exploration.'
                : 'एक उभरती तकनीकी केंद्र जो सुलभ शिक्षा के लिए डिज़ाइन किया गया है। हम इंटरैक्टिव अनुभव बनाते हैं जो दृश्य संचार और व्यावहारिक अन्वेषण के माध्यम से गैर-तकनीकी शिक्षार्थियों के लिए अत्याधुनिक तकनीकों को सुलभ बनाते हैं।'}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs text-stone-500 dark:text-stone-400">
              <div>• {lang === 'en' ? 'Interactive Learning' : 'इंटरैक्टिव सीखना'}</div>
              <div>• {lang === 'en' ? 'Visual Communication' : 'दृश्य संचार'}</div>
              <div>• {lang === 'en' ? 'Hands-on Workshops' : 'व्यावहारिक कार्यशालाएं'}</div>
              <div>• {lang === 'en' ? 'Community Learning' : 'सामुदायिक शिक्षा'}</div>
              <div>• {lang === 'en' ? 'Progress Tracking' : 'प्रगति ट्रैकिंग'}</div>
              <div>• {lang === 'en' ? 'Weekend Sessions' : 'सप्ताहांत सत्र'}</div>
            </div>
          </div>

          {/* Topics Grid */}
          <div>
            <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-4">
              {lang === 'en' ? 'Learning Topics' : 'शिक्षण विषय'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {topics.map((topic, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-stone-50 dark:bg-ink-950 border border-stone-200 dark:border-ink-800 rounded-sm hover:bg-stone-100 dark:hover:bg-ink-900 transition-colors"
                >
                  <span className="text-lg">{topic.icon}</span>
                  <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                    {lang === 'en' ? topic.name : topic.nameHi}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4 border-t border-stone-200 dark:border-ink-800">
            <a
              href="https://eth.poetics.studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 bg-terracotta-500 hover:bg-terracotta-600 text-white px-6 py-4 rounded-sm transition-colors font-medium"
            >
              <span>
                {lang === 'en' ? 'Explore ETH Poetics Studio' : 'ETH Poetics Studio का अन्वेषण करें'}
              </span>
              <ExternalLink size={16} />
            </a>

            <p className="text-xs text-stone-400 dark:text-stone-500 text-center mt-3">
              {lang === 'en'
                ? 'Part of Community Innovation Labs • Designed for tomorrow\'s innovators'
                : 'सामुदायिक नवाचार प्रयोगशालाओं का हिस्सा • कल के नवप्रवर्तकों के लिए डिज़ाइन किया गया'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMoreModal;