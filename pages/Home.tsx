
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Calendar, Clock, Star } from 'lucide-react';
import { Lantern, Stars, Divider, CrescentMoon } from '../components/IslamicDecorations';

const Home: React.FC = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // محاكاة يوم رمضان بناءً على تاريخ ثابت
    const ramadanStart = new Date('2025-03-01');
    const today = new Date();
    const diff = Math.floor((today.getTime() - ramadanStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    setCurrentDay(Math.max(1, Math.min(30, diff)));
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a1128] overflow-hidden flex flex-col items-center">
      {/* عناصر الخلفية الزخرفية */}
      <div className="absolute inset-0 z-0">
        <Stars />
        <div className="absolute top-[15%] left-[25%] opacity-30 blur-sm pointer-events-none">
          <CrescentMoon className="w-72 h-72 text-white/5 rotate-[-15deg]" />
        </div>
        
        {/* الفوانيس المعلقة - توزيع مطابق للصورة */}
        <div className="absolute top-24 left-16 opacity-30 animate-float pointer-events-none">
          <Lantern className="w-20 h-32 text-[#d4af37] drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
        </div>
        <div className="absolute top-24 right-16 opacity-30 animate-float pointer-events-none" style={{ animationDelay: '1s' }}>
          <Lantern className="w-20 h-32 text-[#d4af37] drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
        </div>
        
        {/* فوانيس في الأسفل */}
        <div className="absolute bottom-20 left-[15%] opacity-40 animate-float pointer-events-none" style={{ animationDelay: '2s' }}>
          <Lantern className="w-24 h-40 text-[#d4af37]" />
        </div>
        <div className="absolute bottom-20 right-[15%] opacity-40 animate-float pointer-events-none" style={{ animationDelay: '0.5s' }}>
          <Lantern className="w-24 h-40 text-[#d4af37]" />
        </div>
      </div>

      {/* المحتوى الرئيسي - تطابق تام مع التصميم المطلوبة */}
      <section className="relative z-10 w-full max-w-4xl mx-auto px-4 pt-32 pb-24 text-center animate-fade-in flex flex-col items-center">
        <div className="mb-6 relative">
          <div className="absolute inset-0 blur-3xl bg-[#d4af37]/20 rounded-full" />
          <CrescentMoon className="w-28 h-28 text-[#d4af37] mx-auto relative z-10 drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]" />
        </div>
        
        <h1 className="font-amiri text-7xl md:text-9xl font-bold text-[#f8f1e7] mb-4 tracking-wide shadow-text">
          أدعية رمضان
        </h1>
        
        <div className="font-amiri text-3xl md:text-4xl text-[#d4af37] mb-8 drop-shadow-lg">
          ٣٠ يوم
        </div>

        <Divider className="mb-10 w-full max-w-xs opacity-70" />

        <p className="font-cairo text-xl md:text-2xl text-[#f8f1e7]/80 mb-14 max-w-xl mx-auto leading-relaxed font-light">
          مساحة هادئة للدعاء والتأمل
        </p>
        
        {/* أزرار الإجراءات - مطابقة للصورة */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <Link 
            to="/daily" 
            className="group flex items-center gap-4 bg-[#d4af37] text-[#0a1128] px-12 py-5 rounded-full font-bold text-2xl hover:bg-[#b8952d] transition-all transform hover:scale-105 shadow-[0_15px_40px_rgba(212,175,55,0.25)]"
          >
            <Calendar className="w-7 h-7" />
            <span>دعاء اليوم</span>
          </Link>
          
          <Link 
            to="/ai-dua" 
            className="flex items-center gap-4 border-2 border-[#d4af37]/50 text-[#d4af37] px-12 py-5 rounded-full font-bold text-2xl hover:bg-[#d4af37]/10 hover:border-[#d4af37] transition-all group"
          >
            <span>شارك دعاءك</span>
            <Heart className="w-7 h-7 group-hover:fill-[#d4af37]" />
          </Link>
        </div>
      </section>

      {/* تذييل الصفحة السريع */}
      <div className="relative z-10 mt-auto pb-12 flex flex-col items-center">
        <div className="flex gap-6 mb-4">
           {[...Array(3)].map((_, i) => (
             <Star key={i} className="w-5 h-5 text-[#d4af37] animate-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
           ))}
        </div>
        <p className="text-[#f8f1e7]/30 text-base tracking-widest font-amiri italic">تقبل الله منا ومنكم صالح الأعمال</p>
      </div>
      
      <style>{`
        .shadow-text {
          text-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
};

export default Home;
