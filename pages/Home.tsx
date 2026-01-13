
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, Clock, Star, Sparkles, RefreshCw, MoonStar, BookOpen, User } from 'lucide-react';
import { Lantern, Stars, Divider, CrescentMoon } from '../components/IslamicDecorations';
import { getDailyReflection } from '../services/geminiService';

const Home: React.FC = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const [reflection, setReflection] = useState<string>('');
  const [loadingReflection, setLoadingReflection] = useState(true);

  const fetchReflection = async () => {
    setLoadingReflection(true);
    try {
      const res = await getDailyReflection();
      setReflection(res);
    } catch (err) {
      setReflection('رمضان شهر التغيير والتقرب من الله.');
    } finally {
      setLoadingReflection(false);
    }
  };

  useEffect(() => {
    const ramadanStart = new Date('2025-03-01');
    const today = new Date();
    const diff = Math.floor((today.getTime() - ramadanStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    setCurrentDay(Math.max(1, Math.min(30, diff)));
    
    fetchReflection();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a1128] overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 z-0">
        <Stars />
        <div className="absolute top-[10%] left-[20%] opacity-20 blur-sm pointer-events-none">
          <CrescentMoon className="w-[400px] h-[400px] text-white/5 rotate-[-15deg]" />
        </div>
        
        <div className="absolute top-0 left-20 h-64 border-l border-[#d4af37]/20 flex flex-col items-center opacity-30 animate-float">
          <div className="h-full w-px bg-[#d4af37]/20" />
          <Lantern className="w-16 h-24 text-[#d4af37] -mt-1" />
        </div>
        
        <div className="absolute top-0 right-20 h-48 border-l border-[#d4af37]/20 flex flex-col items-center opacity-30 animate-float" style={{ animationDelay: '1s' }}>
          <div className="h-full w-px bg-[#d4af37]/20" />
          <Lantern className="w-16 h-24 text-[#d4af37] -mt-1" />
        </div>

        <div className="absolute bottom-0 left-[15%] h-60 border-l border-[#d4af37]/20 flex flex-col-reverse items-center opacity-30 animate-float" style={{ animationDelay: '1.5s' }}>
           <div className="h-full w-px bg-[#d4af37]/20" />
           <Lantern className="w-20 h-32 text-[#d4af37] -mb-1" />
        </div>

        <div className="absolute bottom-0 right-[15%] h-80 border-l border-[#d4af37]/20 flex flex-col-reverse items-center opacity-30 animate-float" style={{ animationDelay: '0.5s' }}>
           <div className="h-full w-px bg-[#d4af37]/20" />
           <Lantern className="w-20 h-32 text-[#d4af37] -mb-1" />
        </div>
      </div>

      <section className="relative z-10 w-full max-w-5xl mx-auto px-4 pt-32 pb-16 text-center animate-fade-in flex flex-col items-center">
        <div className="mb-4">
          <CrescentMoon className="w-28 h-28 text-[#d4af37] mx-auto drop-shadow-[0_0_25px_rgba(212,175,55,0.6)]" />
        </div>
        
        <h1 className="font-amiri text-7xl md:text-9xl font-bold text-[#f8f1e7] mb-2 tracking-tight">
          أدعية رمضان
        </h1>
        
        <div className="font-amiri text-3xl md:text-4xl text-[#d4af37] mb-2">
          ٣٠ يوم
        </div>

        <div className="font-amiri text-2xl text-[#f8f1e7]/60 mb-6 italic">
          "الدعاء عبادة"
        </div>

        <Divider className="mb-8 w-full max-w-xs opacity-60" />

        <p className="font-cairo text-xl md:text-2xl text-[#f8f1e7]/90 mb-10 max-w-xl mx-auto leading-relaxed font-light">
          مساحة هادئة للدعاء والتأمل
        </p>
        
        {/* أزرار الإجراءات الرئيسية */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16 w-full max-w-5xl">
          <Link 
            to="/daily" 
            className="group flex flex-col items-center justify-center gap-3 bg-[#d4af37] text-[#0a1128] p-6 rounded-[30px] font-bold hover:bg-[#b8952d] transition-all transform hover:scale-105 shadow-xl"
          >
            <Calendar className="w-8 h-8" />
            <span className="text-xl">أدعية الأيام</span>
          </Link>

          <Link 
            to="/qadr" 
            className="group flex flex-col items-center justify-center gap-3 bg-[#131d3d] border border-[#d4af37]/40 text-[#d4af37] p-6 rounded-[30px] font-bold hover:bg-[#d4af37] hover:text-[#0a1128] transition-all transform hover:scale-105 shadow-xl"
          >
            <MoonStar className="w-8 h-8" />
            <span className="text-xl">ليلة القدر</span>
          </Link>

          <Link 
            to="/prophets" 
            className="group flex flex-col items-center justify-center gap-3 bg-[#131d3d] border border-[#d4af37]/40 text-[#d4af37] p-6 rounded-[30px] font-bold hover:bg-[#d4af37] hover:text-[#0a1128] transition-all transform hover:scale-105 shadow-xl"
          >
            <User className="w-8 h-8" />
            <span className="text-xl">أدعية الأنبياء</span>
          </Link>

          <Link 
            to="/quranic" 
            className="group flex flex-col items-center justify-center gap-3 bg-[#131d3d] border border-[#d4af37]/40 text-[#d4af37] p-6 rounded-[30px] font-bold hover:bg-[#d4af37] hover:text-[#0a1128] transition-all transform hover:scale-105 shadow-xl"
          >
            <BookOpen className="w-8 h-8" />
            <span className="text-xl">أدعية قرآنية</span>
          </Link>
          
          <Link 
            to="/ai-dua" 
            className="group flex flex-col items-center justify-center gap-3 border-2 border-[#d4af37]/20 bg-[#131d3d]/20 text-[#f8f1e7]/80 p-6 rounded-[30px] font-bold hover:border-[#d4af37] transition-all transform hover:scale-105 shadow-xl"
          >
            <Heart className="w-8 h-8 group-hover:fill-[#d4af37] transition-all" />
            <span className="text-xl">شارك دعاءك</span>
          </Link>
        </div>

        <div className="max-w-2xl w-full">
           <div className="bg-[#131d3d]/40 border border-[#d4af37]/10 rounded-[40px] p-8 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform">
                 <Sparkles className="w-24 h-24 text-[#d4af37]" />
              </div>
              
              <div className="flex items-center justify-between mb-4">
                 <h3 className="font-amiri text-[#d4af37] text-2xl flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    تأملات رمضانية
                 </h3>
                 <button 
                  onClick={fetchReflection}
                  disabled={loadingReflection}
                  className="text-[#d4af37]/50 hover:text-[#d4af37] transition-colors p-2"
                 >
                    <RefreshCw className={`w-5 h-5 ${loadingReflection ? 'animate-spin' : ''}`} />
                 </button>
              </div>

              <div className="min-h-[80px] flex items-center justify-center">
                {loadingReflection ? (
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce [animation-delay:-0.3s]" />
                  </div>
                ) : (
                  <p className="font-amiri text-2xl md:text-3xl leading-relaxed text-[#f8f1e7] animate-fade-in italic">
                    "{reflection}"
                  </p>
                )}
              </div>
           </div>
        </div>
      </section>

      <div className="relative z-10 mt-auto pb-12 flex flex-col items-center">
        <div className="flex gap-6 mb-4">
           {[...Array(3)].map((_, i) => (
             <Star key={i} className="w-5 h-5 text-[#d4af37] animate-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
           ))}
        </div>
        <p className="text-[#f8f1e7]/30 text-lg tracking-widest font-amiri opacity-60">تقبل الله منا ومنكم صالح الأعمال</p>
      </div>
    </div>
  );
};

export default Home;
