
import React, { useState } from 'react';
import { Share2, Heart, Copy, Check, Play, Loader2, Volume2 } from 'lucide-react';
import { Divider } from './IslamicDecorations';
import { speakDua } from '../services/ttsService';

interface DuaCardProps {
  day?: number;
  title: string;
  dua: string;
  translation?: string;
}

const DuaCard: React.FC<DuaCardProps> = ({ day, title, dua, translation }) => {
  const [copied, setCopied] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(dua);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title, text: dua });
    }
  };

  const handleListen = async () => {
    if (isPlaying || loadingAudio) return;
    setLoadingAudio(true);
    try {
      const source = await speakDua(dua);
      setIsPlaying(true);
      source.onended = () => setIsPlaying(false);
    } catch (err) {
      alert("خطأ في تشغيل الصوت");
    } finally {
      setLoadingAudio(false);
    }
  };

  return (
    <div className="group relative bg-[#131d3d] border border-[#d4af37]/30 rounded-3xl p-8 transition-all hover:border-[#d4af37]/60 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]">
      {day && (
        <div className="absolute -top-4 right-8 bg-[#d4af37] text-[#0a1128] px-5 py-1.5 rounded-full text-sm font-bold shadow-lg">
          اليوم {day}
        </div>
      )}
      
      <h3 className="font-amiri text-2xl text-[#d4af37] text-center mb-2">{title}</h3>
      <Divider className="mb-6" />
      
      <p className="font-amiri text-2xl md:text-3xl leading-relaxed text-[#f8f1e7] text-center mb-6">
        {dua}
      </p>

      {translation && (
        <div className="bg-[#0a1128]/50 p-4 rounded-xl mb-6">
          <p className="text-[#f8f1e7]/70 text-sm text-center italic">
            {translation}
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-6 border-t border-[#d4af37]/10 pt-6 mt-2">
        <button 
          onClick={handleListen}
          disabled={loadingAudio}
          className={`flex items-center gap-2 transition-colors ${isPlaying ? 'text-[#d4af37]' : 'text-[#f8f1e7]/60 hover:text-[#d4af37]'}`}
          title="استمع"
        >
          {loadingAudio ? <Loader2 className="w-5 h-5 animate-spin" /> : (isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <Play className="w-5 h-5" />)}
          <span className="text-xs">{loadingAudio ? 'جاري التحميل...' : (isPlaying ? 'جارِ التشغيل' : 'استمع')}</span>
        </button>

        <button 
          onClick={handleCopy}
          className="flex items-center gap-2 text-[#f8f1e7]/60 hover:text-[#d4af37] transition-colors"
          title="نسخ"
        >
          {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
          <span className="text-xs">{copied ? 'تم النسخ' : 'نسخ'}</span>
        </button>
        
        <button 
          onClick={handleShare}
          className="flex items-center gap-2 text-[#f8f1e7]/60 hover:text-[#d4af37] transition-colors"
          title="مشاركة"
        >
          <Share2 className="w-5 h-5" />
          <span className="text-xs">مشاركة</span>
        </button>

        <button 
          className="flex items-center gap-2 text-[#f8f1e7]/60 hover:text-[#d4af37] transition-colors"
          title="تفضيل"
        >
          <Heart className="w-5 h-5" />
          <span className="text-xs">حفظ</span>
        </button>
      </div>
    </div>
  );
};

export default DuaCard;
