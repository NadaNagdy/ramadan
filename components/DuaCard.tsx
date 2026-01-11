
import React, { useState } from 'react';
import { Share2, Heart, Copy, Check, Play, Loader2, Volume2, Image as ImageIcon } from 'lucide-react';
import { Divider } from './IslamicDecorations';
import { speakDua } from '../services/ttsService';

interface DuaCardProps {
  day?: number;
  title: string;
  dua: string;
  translation?: string;
}

const APP_URL = "https://aistudio.google.com/apps/drive/1PJYcvRNeW67P8MpkAvcSIDWT0mc25VPn?fullscreenApplet=true&showPreview=true";

const DuaCard: React.FC<DuaCardProps> = ({ day, title, dua, translation }) => {
  const [copied, setCopied] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sharing, setSharing] = useState(false);

  const handleCopy = () => {
    const shareText = `✨ ${day ? `دعاء اليوم ${day}` : title} ✨\n\n"${dua}"\n\n👇 شاهد المزيد عبر: ${APP_URL}`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareAsImage = async () => {
    setSharing(true);
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 1080;
      canvas.height = 1350;

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a1128');
      gradient.addColorStop(1, '#131d3d');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 20;
      ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
      
      ctx.lineWidth = 2;
      ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

      ctx.fillStyle = '#d4af37';
      ctx.textAlign = 'center';
      ctx.direction = 'rtl';
      ctx.font = 'bold 50px serif';
      ctx.fillText(day ? `دعاء اليوم ${day}` : title, canvas.width / 2, 200);

      ctx.font = '40px Arial';
      ctx.fillText('✦ ✦ ✦', canvas.width / 2, 280);

      ctx.fillStyle = '#f8f1e7';
      ctx.font = '60px serif';
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

      ctx.fillStyle = '#d4af37';
      ctx.font = '30px Arial';
      ctx.fillText('تمت المشاركة من تطبيق: أدعية رمضان', canvas.width / 2, canvas.height - 150);
      ctx.font = 'italic 25px Arial';
      ctx.fillText("أدعية رمضان", canvas.width / 2, canvas.height - 100);

      const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
      if (!blob) throw new Error("Canvas to Blob failed");

      const file = new File([blob], `dua-${day || 'ramadan'}.png`, { type: 'image/png' });
      const shareData = {
        title: 'أدعية رمضان',
        text: `✨ ${day ? `دعاء اليوم ${day}` : title} ✨\n\n"${dua}"\n\n👇 شاهد المزيد وشاركنا الدعاء عبر الرابط:\n${APP_URL}`,
        files: [file],
      };

      if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        const link = document.createElement('a');
        link.download = `dua-day-${day || 'ramadan'}.png`;
        link.href = canvas.toDataURL();
        link.click();
        alert('تم تحميل الصورة. يمكنك مشاركتها يدوياً مع الرابط:\n' + APP_URL);
      }
    } catch (err: any) {
      // تجاهل خطأ الإلغاء الصادر من المتصفح لضمان عدم ظهور رسالة خطأ مزعجة
      if (err.name !== 'AbortError') {
        console.error('Share Error:', err);
        alert('حدث خطأ أثناء محاولة المشاركة.');
      }
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
      console.error(err);
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
        >
          {loadingAudio ? <Loader2 className="w-5 h-5 animate-spin" /> : (isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <Play className="w-5 h-5" />)}
          <span className="text-xs">{loadingAudio ? 'جاري التحميل...' : (isPlaying ? 'جارِ التشغيل' : 'استمع')}</span>
        </button>

        <button 
          onClick={handleCopy}
          className="flex items-center gap-2 text-[#f8f1e7]/60 hover:text-[#d4af37] transition-colors"
        >
          {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
          <span className="text-xs">{copied ? 'تم النسخ' : 'نسخ'}</span>
        </button>
        
        <button 
          onClick={handleShareAsImage}
          disabled={sharing}
          className="flex items-center gap-2 text-[#f8f1e7]/60 hover:text-[#d4af37] transition-colors"
        >
          {sharing ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImageIcon className="w-5 h-5" />}
          <span className="text-xs">{sharing ? 'جاري التوليد...' : 'مشاركة'}</span>
        </button>

        <button 
          className="flex items-center gap-2 text-[#f8f1e7]/60 hover:text-[#d4af37] transition-colors"
        >
          <Heart className="w-5 h-5" />
          <span className="text-xs">حفظ</span>
        </button>
      </div>
    </div>
  );
};

export default DuaCard;
