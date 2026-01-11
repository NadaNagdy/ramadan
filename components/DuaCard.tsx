
import React, { useState, useRef } from 'react';
import { Share2, Heart, Copy, Check, Play, Loader2, Volume2, Image as ImageIcon } from 'lucide-react';
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
  const [sharing, setSharing] = useState(false);

  const handleCopy = () => {
    const shareText = `${title}\n\n${dua}\n\nشاهد المزيد عبر: ${window.location.href}`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // وظيفة لتوليد الصورة ومشاركتها
  const handleShareAsImage = async () => {
    setSharing(true);
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // أبعاد الصورة (مناسبة للسوشيال ميديا)
      canvas.width = 1080;
      canvas.height = 1350;

      // 1. الخلفية
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a1128');
      gradient.addColorStop(1, '#131d3d');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. إطار ذهبي
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 20;
      ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
      
      ctx.lineWidth = 2;
      ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

      // 3. العنوان
      ctx.fillStyle = '#d4af37';
      ctx.textAlign = 'center';
      ctx.direction = 'rtl';
      ctx.font = 'bold 50px Arial';
      ctx.fillText(day ? `دعاء اليوم ${day}` : title, canvas.width / 2, 200);

      // 4. زخرفة بسيطة
      ctx.font = '40px Arial';
      ctx.fillText('✦ ✦ ✦', canvas.width / 2, 280);

      // 5. نص الدعاء (مع الالتفاف التلقائي)
      ctx.fillStyle = '#f8f1e7';
      ctx.font = '60px Arial';
      const words = dua.split(' ');
      let line = '';
      let y = 500;
      const lineHeight = 90;
      const maxWidth = 800;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, canvas.width / 2, y);
          line = words[n] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, canvas.width / 2, y);

      // 6. التذييل (رابط الموقع)
      ctx.fillStyle = '#d4af37';
      ctx.font = '30px Arial';
      ctx.fillText('تمت المشاركة من تطبيق: أدعية رمضان', canvas.width / 2, canvas.height - 150);
      ctx.font = 'italic 25px Arial';
      ctx.fillText(window.location.origin, canvas.width / 2, canvas.height - 100);

      // 7. تحويل الكانفاس إلى ملف ومشاركته
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], `dua-${day || 'share'}.png`, { type: 'image/png' });
        
        const shareData = {
          title: 'أدعية رمضان',
          text: `✨ ${day ? `دعاء اليوم ${day}` : title} ✨\n\n"${dua}"\n\n👇 شاهد المزيد وشاركنا الدعاء عبر الرابط:\n${window.location.href}`,
          files: [file],
        };

        if (navigator.canShare && navigator.canShare(shareData)) {
          await navigator.share(shareData);
        } else {
          // Fallback: تحميل الصورة
          const link = document.createElement('a');
          link.download = `dua-day-${day || 'ramadan'}.png`;
          link.href = canvas.toDataURL();
          link.click();
          alert('تم تحميل الصورة لجهازك. يمكنك الآن مشاركتها يدوياً مع الرابط:\n' + window.location.href);
        }
      });

    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء محاولة المشاركة.');
    } finally {
      setSharing(false);
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
          onClick={handleShareAsImage}
          disabled={sharing}
          className="flex items-center gap-2 text-[#f8f1e7]/60 hover:text-[#d4af37] transition-colors"
          title="مشاركة كصورة"
        >
          {sharing ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImageIcon className="w-5 h-5" />}
          <span className="text-xs">{sharing ? 'جاري التوليد...' : 'مشاركة'}</span>
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
