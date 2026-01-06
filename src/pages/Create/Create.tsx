import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snowflake, Sparkles, Sun, Moon, Cloud, Palette, Heart } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import Navbar from '@/components/Navbar';

// Guidance chips for creative suggestions
const guidanceChips = [
  { icon: Sun, label: 'Lighting', suggestions: ['soft glow', 'golden hour', 'moonlit', 'misty'] },
  { icon: Heart, label: 'Mood', suggestions: ['peaceful', 'magical', 'cozy', 'dreamy'] },
  { icon: Cloud, label: 'Weather', suggestions: ['snowy', 'starry night', 'foggy', 'aurora'] },
  { icon: Palette, label: 'Style', suggestions: ['watercolor', 'soft pastel', 'storybook', 'ethereal'] },
  { icon: Moon, label: 'Time', suggestions: ['dawn', 'twilight', 'midnight', 'sunset'] },
];

// Placeholder prompts for inspiration
const placeholderPrompts = [
  'A quiet winter village under soft moonlight…',
  'A cozy treehouse in a snowy forest…',
  'A friendly dragon sharing tea with a bunny…',
  'A magical library with floating books…',
  'A peaceful meadow with glowing fireflies…',
];

const Create = React.memo(() => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  // Random placeholder on mount
  const placeholder = useMemo(() => 
    placeholderPrompts[Math.floor(Math.random() * placeholderPrompts.length)],
  []);

  const handlePromptChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  }, []);

  const handleChipClick = useCallback((label: string) => {
    setActiveChip(prev => prev === label ? null : label);
  }, []);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setPrompt(prev => {
      const trimmed = prev.trim();
      if (trimmed && !trimmed.endsWith(',') && !trimmed.endsWith('…')) {
        return `${trimmed}, ${suggestion}`;
      }
      return trimmed ? `${trimmed} ${suggestion}` : suggestion;
    });
    setActiveChip(null);
  }, []);

  const handleGenerate = useCallback(() => {
    if (!prompt.trim() || isGenerating) return;
    
    setIsGenerating(true);
    // Simulate generation with placeholder images
    setTimeout(() => {
      setGeneratedImages([
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80',
        'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=600&q=80',
        'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&q=80',
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80',
      ]);
      setIsGenerating(false);
    }, 2000);
  }, [prompt, isGenerating]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Area */}
      <section className="pt-28 pb-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Snowflake Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-900/30 dark:to-blue-900/30 mb-6">
            <Snowflake className="w-8 h-8 text-sky-500" />
          </div>
          
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-slate-800 dark:text-white">Create with </span>
            <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
              Snowman
            </span>
            <span className="text-slate-800 dark:text-white"> ❄️</span>
          </h1>
          
          {/* Subtext */}
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Describe what you imagine, Snowman will help you shape it.
          </p>
        </div>
      </section>

      {/* Main Prompt Input */}
      <section className="px-4 pb-6">
        <div className="max-w-3xl mx-auto">
          <div className={`
            relative rounded-2xl overflow-hidden
            ${isDark 
              ? 'bg-white/5 border border-white/10' 
              : 'bg-white/70 border border-slate-200'
            }
            backdrop-blur-md shadow-lg
          `}>
            <textarea
              value={prompt}
              onChange={handlePromptChange}
              placeholder={placeholder}
              rows={4}
              className={`
                w-full px-6 py-5 text-lg resize-none
                bg-transparent outline-none
                ${isDark ? 'text-white placeholder:text-slate-500' : 'text-slate-800 placeholder:text-slate-400'}
              `}
            />
            
            {/* Character hint */}
            <div className="px-6 pb-4 flex items-center justify-between">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Let your imagination flow freely
              </p>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                {prompt.length} / 500
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Guidance Chips */}
      <section className="px-4 pb-6">
        <div className="max-w-3xl mx-auto">
          {/* Snowman hint */}
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-4">
            Want help imagining? ❄️
          </p>
          
          {/* Chips */}
          <div className="flex flex-wrap justify-center gap-2">
            {guidanceChips.map(({ icon: Icon, label }) => (
              <button
                key={label}
                onClick={() => handleChipClick(label)}
                className={`
                  inline-flex items-center gap-2 px-4 py-2 rounded-full
                  text-sm font-medium transition-all duration-200
                  ${activeChip === label
                    ? 'bg-sky-500 text-white shadow-md'
                    : isDark
                      ? 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Suggestions dropdown */}
          {activeChip && (
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {guidanceChips
                .find(c => c.label === activeChip)
                ?.suggestions.map(suggestion => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`
                      px-3 py-1.5 rounded-full text-sm
                      transition-colors duration-200
                      ${isDark
                        ? 'bg-sky-900/30 text-sky-300 hover:bg-sky-900/50'
                        : 'bg-sky-50 text-sky-600 hover:bg-sky-100'
                      }
                    `}
                  >
                    + {suggestion}
                  </button>
                ))
              }
            </div>
          )}
        </div>
      </section>

      {/* Generate Button */}
      <section className="px-4 pb-12">
        <div className="max-w-3xl mx-auto flex justify-center">
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className={`
              inline-flex items-center gap-3 px-8 py-4 rounded-2xl
              text-lg font-semibold transition-all duration-300
              ${prompt.trim() && !isGenerating
                ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg hover:shadow-xl hover:shadow-sky-500/25'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
              }
            `}
          >
            <Sparkles className={`w-5 h-5 ${isGenerating ? 'animate-pulse' : ''}`} />
            {isGenerating ? 'Creating…' : 'Create Image'}
          </button>
        </div>
      </section>

      {/* Snowman Guidance */}
      {prompt.length > 0 && prompt.length < 20 && (
        <section className="px-4 pb-8">
          <div className="max-w-3xl mx-auto">
            <div className={`
              flex items-start gap-3 px-5 py-4 rounded-xl
              ${isDark ? 'bg-sky-950/30' : 'bg-sky-50'}
            `}>
              <Snowflake className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Try adding more details about the mood or setting to help Snowman understand your vision better.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Output Area */}
      {generatedImages.length > 0 && (
        <section className="px-4 pb-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white text-center mb-6">
              Your Creations
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {generatedImages.map((src, index) => (
                <div
                  key={index}
                  className={`
                    aspect-square rounded-xl overflow-hidden
                    bg-slate-200 dark:bg-slate-800
                    transition-all duration-500 ease-out
                    hover:translate-y-[-2px] hover:shadow-lg
                  `}
                  style={{
                    opacity: 0,
                    animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`,
                  }}
                >
                  <img
                    src={src}
                    alt={`Generated image ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fade-in animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
});

Create.displayName = 'Create';

export default Create;
