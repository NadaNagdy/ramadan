
import React, { useState } from 'react';
import { Sparkles, Send, Loader2, RefreshCw } from 'lucide-react';
import { generatePersonalizedDua } from '../services/geminiService';
import { Stars, Lantern, Divider } from '../components/IslamicDecorations';
import DuaCard from '../components/DuaCard';

const AIDuaGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ arabic: string; translation: string; reflection: string } | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const data = await generatePersonalizedDua(prompt);
      setResult(data);
    } catch (err) {
      alert("عذراً، حدث خطأ أثناء صياغة الدعاء. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-4">
      <Stars />
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-[#d4af37]/10 rounded-full mb-4 animate-float">
            <Sparkles className="w-10 h-10 text-[#d4af37]" />
          </div>
          <h1 className="font-amiri text-4xl md:text-5xl font-bold text-[#d4af37] mb-4">تهادوا الحب غيباً بالدعاء</h1>
          <p className="text-[#f8f1e7]/70 text-lg">
            اكتب حاجتك أو لمن تحب بصدق، وسيقوم النظام بصياغة دعاء مأثور ومناسب ببركة هذا الشهر
          </p>
        </div>

        <form onSubmit={handleGenerate} className="mb-12">
          <div className="relative group">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="مثلاً: أدعو بالشفاء لصديق، أو بالسكينة في قلبي، أو بالنجاح في عملي..."
              className="w-full h-40 bg-[#131d3d] border border-[#d4af37]/30 rounded-3xl p-6 text-[#f8f1e7] text-lg focus:outline-none focus:border-[#d4af37] transition-all resize-none shadow-inner"
              dir="rtl"
            />
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="absolute bottom-4 left-4 bg-[#d4af37] text-[#0a1128] px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-[#b8952d] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              {loading ? "جاري الصياغة..." : "صياغة الدعاء"}
            </button>
          </div>
        </form>

        {result && !loading && (
          <div className="animate-fade-in space-y-8">
            <Divider />
            <DuaCard 
              title="الدعاء المصاغ" 
              dua={result.arabic} 
              translation={result.translation}
            />
            
            <div className="bg-[#d4af37]/10 border border-[#d4af37]/20 rounded-3xl p-8">
              <h4 className="font-bold text-[#d4af37] mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                لمسة روحانية
              </h4>
              <p className="text-[#f8f1e7]/80 leading-relaxed italic font-amiri text-xl">
                {result.reflection}
              </p>
            </div>

            <button 
              onClick={() => { setResult(null); setPrompt(''); }}
              className="w-full py-4 border-2 border-dashed border-[#d4af37]/30 rounded-2xl text-[#d4af37] hover:bg-[#d4af37]/5 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              صياغة دعاء جديد
            </button>
          </div>
        )}

        <div className="mt-20 opacity-30 pointer-events-none flex justify-center gap-20">
          <Lantern className="w-20 h-20 text-[#d4af37] animate-float" />
          <Lantern className="w-20 h-20 text-[#d4af37] animate-float" style={{ animationDelay: '1.5s' }} />
        </div>
      </div>
    </div>
  );
};

export default AIDuaGenerator;
