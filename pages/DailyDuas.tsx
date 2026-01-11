
import React, { useState, useEffect } from 'react';
import { DAILY_DUAS } from '../constants';
import DuaCard from '../components/DuaCard';
import { Stars, CrescentMoon, Divider } from '../components/IslamicDecorations';
import { Calendar as CalendarIcon, ArrowRight, ArrowLeft, LayoutGrid } from 'lucide-react';

const DailyDuas: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [currentRamadanDay, setCurrentRamadanDay] = useState(1);

  useEffect(() => {
    // حساب يوم رمضان الحالي بناءً على تاريخ محاكاة
    const ramadanStart = new Date('2025-03-01');
    const today = new Date();
    const diff = Math.floor((today.getTime() - ramadanStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const day = Math.max(1, Math.min(30, diff));
    setCurrentRamadanDay(day);
    // تفعيل يوم اليوم تلقائياً عند الدخول
    setSelectedDay(day);
  }, []);

  const selectedDua = selectedDay ? DAILY_DUAS.find(d => d.day === selectedDay) : null;

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-4">
      <Stars />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <CalendarIcon className="w-12 h-12 text-[#d4af37] mx-auto mb-4 opacity-80 animate-pulse" />
          <h1 className="font-amiri text-5xl font-bold text-[#d4af37] mb-4">تقويم الأدعية</h1>
          <Divider className="max-w-xs mx-auto mb-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* الجانب الأيمن: شبكة الأيام */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="bg-[#131d3d]/50 border border-[#d4af37]/20 rounded-3xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6 border-b border-[#d4af37]/10 pb-4">
                <h2 className="text-[#d4af37] font-bold flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5" />
                  أيام الشهر
                </h2>
                <span className="text-[#f8f1e7]/40 text-sm">٣٠ يوم</span>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {DAILY_DUAS.map((dua) => (
                  <button
                    key={dua.id}
                    onClick={() => setSelectedDay(dua.day)}
                    className={`h-12 w-full rounded-xl border transition-all flex items-center justify-center font-bold text-lg
                      ${selectedDay === dua.day 
                        ? 'bg-[#d4af37] text-[#0a1128] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-110 z-10' 
                        : (dua.day === currentRamadanDay ? 'border-[#d4af37] text-[#d4af37] bg-[#d4af37]/10' : 'bg-[#0a1128]/40 text-[#f8f1e7]/40 border-[#d4af37]/10 hover:border-[#d4af37]/40')
                      }`}
                  >
                    {dua.day}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* الجانب الأيسر: عرض الدعاء المختار */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            {selectedDua ? (
              <div className="animate-fade-in">
                <DuaCard 
                  day={selectedDua.day}
                  title={selectedDua.arabicTitle}
                  dua={selectedDua.dua}
                />
                
                <div className="flex justify-between mt-8 gap-4">
                  <button 
                    disabled={selectedDay === 1}
                    onClick={() => setSelectedDay((selectedDay || 1) - 1)}
                    className="flex-1 py-4 px-6 bg-[#131d3d] border border-[#d4af37]/20 rounded-2xl flex items-center justify-center gap-3 disabled:opacity-10 hover:border-[#d4af37]/60 transition-all text-[#d4af37]"
                  >
                     <ArrowRight className="w-5 h-5" />
                     <span className="font-bold">اليوم السابق</span>
                  </button>
                  <button 
                    disabled={selectedDay === 30}
                    onClick={() => setSelectedDay((selectedDay || 1) + 1)}
                    className="flex-1 py-4 px-6 bg-[#131d3d] border border-[#d4af37]/20 rounded-2xl flex items-center justify-center gap-3 disabled:opacity-10 hover:border-[#d4af37]/60 transition-all text-[#d4af37]"
                  >
                     <span className="font-bold">اليوم التالي</span>
                     <ArrowLeft className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center border-2 border-dashed border-[#d4af37]/10 rounded-3xl p-12 text-center">
                 <p className="text-[#f8f1e7]/20 text-xl font-amiri">اختر يوماً من القائمة لعرض دعاءه</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyDuas;
