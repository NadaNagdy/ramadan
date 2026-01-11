
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar, Sparkles, RefreshCw, MoonStar, BookOpen, User, Send, Star, ChevronLeft } from 'lucide-react';
import { Lantern, Stars, Divider, CrescentMoon } from '../components/IslamicDecorations';
import { getDailyReflection } from '../services/geminiService';
import { DAILY_DUAS } from '../constants';
import DuaCard from '../components/DuaCard';

const Home: React.FC = () => {
  const [reflection, setReflection] = useState<string>('');
  const [loadingReflection, setLoadingReflection] = useState(true);
  const [userDua, setUserDua] = useState('');
  const [currentDay, setCurrentDay] = useState(1);
  const navigate = useNavigate();

  // حساب يوم رمضان بناءً على تاريخ 2026
  useEffect(() => {
    const ramadanStart2026 = new Date('2026-02-18'); // بداية رمضان 2026 المتوقعة
    const today = new Date();
    
    // لحساب الفرق بالأيام
    const diffTime = today.getTime() - ramadanStart2026.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    // حصر اليوم بين 1 و 30 (أو عرض اليوم الأول إذا كان التاريخ قبل رمضان)
    const day = Math.max(1, Math.min(30, diffDays));
    setCurrentDay(day);
  }, []);

  const todayDua = DAILY_DUAS.find(d => d.day === currentDay) || DAILY_DUAS[0];

  const fetchReflection = async () => {
    setLoadingReflection(true);
    try {
      const res = await getDailyReflection();
      setReflection(res);
    } catch (err) {
      setReflection('رمضان فرصة لترميم القلوب والتقرب من علام الغيوب.');
    } finally {
      setLoadingReflection(false);
    }
  };

  const handleQuickDua = (e: React.FormEvent) => {
    e.preventDefault();
    if (userDua.trim()) {
      navigate('/ai-dua', { state: { initialPrompt: userDua } });
    }
  };

  useEffect(() => {
    fetchReflection();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a1128] overflow-hidden flex flex-col items-center select-none">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <Stars />
        <div className="absolute top-[15%] left-[10%] opacity-10 pointer-events-none">
          <CrescentMoon className="w-[400px] h-[400px] text-[#d4af37]/20 rotate-[-15deg] blur-sm" />
        </div>
        
        {/* Floating Lanterns */}
        <div className="absolute top-10 left-[10%] opacity-40 animate-float">
          <Lantern className="w-16 h-28 text-[#d4af37]" />
        </div>
        <div className="absolute top-40 right-[15%] opacity-30 animate-float" style={{ animationDelay: '1.5s' }}>
          <Lantern className="w-20 h-32 text-[#d4af37]" />
        </div>
        <div className="absolute bottom-20 left-[20%] opacity-20 animate-float" style={{ animationDelay: '0.7s' }}>
          <Lantern className="w-24 h-40 text-[#d4af37]" />
        </div>
      </div>

      {/* Main Content */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-4 pt-32 pb-20 text-center flex flex-col items-center">
        <div className="mb-8 animate-fade-in">
          <CrescentMoon className="w-28 h-28 text-[#d4af37] mx-auto drop-shadow-[0_0_30px_rgba(212,175,55,0.7)]" />
        </div>
        
        <h1 className="font-amiri text-7xl md:text-9xl font-bold text-[#f8f1e7] mb-2 tracking-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>
          أدعية رمضان
        </h1>

        <div className="font-amiri text-3xl md:text-4xl text-[#d4af37] mb-6 drop-shadow-md animate-fade-in" style={{ animationDelay: '0.4s' }}>
          تقويم عام ١٤٤٧ هـ - ٢٠٢٦ م
        </div>

        <Divider className="mb-10 w-full max-w-xs opacity-60 animate-fade-in" style={{ animationDelay: '0.5s' }} />

        {/* Daily Dua Card - New Highlighted Section */}
        <div className="w-full max-w-3xl mb-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center justify-between mb-4 px-4">
            <h2 className="text-[#d4af37] font-amiri text-2xl flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              دعاء اليوم {currentDay}
            </h2>
            <Link to="/daily" className="text-[#f8f1e7]/40 hover:text-[#d4af37] transition-all text-sm flex items-center gap-1 font-cairo">
              عرض التقويم كاملاً
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>
          <DuaCard 
            day={todayDua.day}
            title={todayDua.arabicTitle}
            dua={todayDua.dua}
          />
        </div>

        {/* Smart Quick Bar */}
        <form 
          onSubmit={handleQuickDua} 
          className="w-full max-w-2xl mb-16 animate-fade-in group" 
          style={{ animationDelay: '0.7s' }}
        >
          <div className="relative flex items-center bg-[#131d3d]/80 backdrop-blur-2xl border-2 border-[#d4af37]/20 rounded-full p-2.5 transition-all focus-within:border-[#d4af37] hover:border-[#d4af37]/50 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            <input 
              type="text"
              value={userDua}
              onChange={(e) => setUserDua(e.target.value)}
              placeholder="اكتب نيتك.. لنصيغ لك دعاءً بليغاً"
              className="flex-grow bg-transparent border-none outline-none px-8 py-3 text-xl font-amiri text-[#f8f1e7] placeholder-[#f8f1e7]/30"
              dir="rtl"
            />
            <button 
              type="submit"
              className="bg-[#d4af37] text-[#0a1128] p-4 rounded-full hover:bg-[#b8952d] transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center"
            >
              <Send className="w-6 h-6 rotate-180" />
            </button>
          </div>
          <p className="mt-4 text-[#f8f1e7]/30 text-sm tracking-widest font-cairo uppercase">خدمة صياغة الأدعية بالذكاء الاصطناعي</p>
        </form>
        
        {/* Navigation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-20 w-full max-w-4xl animate-fade-in" style={{ animationDelay: '0.8s' }}>
          {[
            { to: "/community", icon: User, label: "مجتمع الدعاء", color: "bg-[#d4af37] text-[#0a1128]" },
            { to: "/qadr", icon: MoonStar, label: "ليلة القدر", color: "bg-[#131d3d] text-[#d4af37]" },
            { to: "/prophets", icon: Sparkles, label: "أدعية الأنبياء", color: "bg-[#131d3d] text-[#d4af37]" },
            { to: "/quranic", icon: BookOpen, label: "أدعية قرآنية", color: "bg-[#131d3d] text-[#d4af37]" }
          ].map((item, idx) => (
            <Link 
              key={idx}
              to={item.to} 
              className={`flex flex-col items-center justify-center gap-3 p-6 rounded-[32px] border border-[#d4af37]/20 font-bold transition-all transform hover:scale-105 hover:shadow-2xl ${item.color}`}
            >
              <item.icon className="w-7 h-7" />
              <span className="text-lg font-cairo">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Reflection Card */}
        <div className="max-w-3xl w-full animate-fade-in" style={{ animationDelay: '0.9s' }}>
           <div className="bg-[#131d3d]/40 border border-[#d4af37]/10 rounded-[48px] p-10 backdrop-blur-lg relative overflow-hidden group shadow-inner">
              <div className="absolute -top-10 -right-10 p-4 opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000">
                 <Sparkles className="w-64 h-64 text-[#d4af37]" />
              </div>
              
              <div className="flex items-center justify-between mb-6">
                 <h3 className="font-amiri text-[#d4af37] text-2xl flex items-center gap-3">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                    تأملات رمضانية
                 </h3>
                 <button 
                  onClick={fetchReflection}
                  disabled={loadingReflection}
                  className="text-[#d4af37]/40 hover:text-[#d4af37] transition-all p-2 bg-[#d4af37]/5 rounded-full"
                 >
                    <RefreshCw className={`w-5 h-5 ${loadingReflection ? 'animate-spin' : ''}`} />
                 </button>
              </div>

              <div className="min-h-[100px] flex items-center justify-center">
                {loadingReflection ? (
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-[#d4af37] rounded-full animate-bounce" />
                    <div className="w-3 h-3 bg-[#d4af37] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-3 h-3 bg-[#d4af37] rounded-full animate-bounce [animation-delay:-0.3s]" />
                  </div>
                ) : (
                  <p className="font-amiri text-3xl md:text-4xl leading-relaxed text-[#f8f1e7] italic text-center drop-shadow-sm">
                    "{reflection}"
                  </p>
                )}
              </div>
           </div>
        </div>
      </section>

      {/* Footer Decoration */}
      <div className="relative z-10 mt-auto pb-16 flex flex-col items-center">
        <div className="flex gap-4 mb-4">
           {[...Array(3)].map((_, i) => (
             <Star key={i} className="w-4 h-4 text-[#d4af37] animate-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
           ))}
        </div>
        <p className="text-[#f8f1e7]/20 text-lg tracking-[0.2em] font-amiri">تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ</p>
      </div>
    </div>
  );
};

export default Home;
