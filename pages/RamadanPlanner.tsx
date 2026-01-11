
import React from 'react';
import { Stars, Divider } from '../components/IslamicDecorations';
import { GanttChart, Clock, Info, Download } from 'lucide-react';

const RamadanPlanner: React.FC = () => {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  
  // تمثيل مرئي مبسط لمخطط غانت داخل التطبيق
  return (
    <div className="relative min-h-screen pt-32 pb-20 px-4">
      <Stars />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <GanttChart className="w-16 h-16 text-[#d4af37] mx-auto mb-6 opacity-80" />
          <h1 className="font-amiri text-5xl font-bold text-[#d4af37] mb-4">مخطط رمضان الزمني</h1>
          <p className="text-[#f8f1e7]/70 text-xl font-amiri mb-6">رؤية شاملة لرحلة الثلاثين يوماً (تقديري لعام ٢٠٢٦)</p>
          <Divider className="max-w-xs mx-auto" />
        </div>

        <div className="bg-[#131d3d]/60 border border-[#d4af37]/20 rounded-[40px] p-6 md:p-10 backdrop-blur-xl overflow-x-auto shadow-2xl">
          <div className="min-w-[800px]">
            {/* Header / Hours */}
            <div className="grid grid-cols-13 gap-2 mb-6 border-b border-[#d4af37]/10 pb-4 text-xs font-cairo text-[#d4af37]/60">
              <div className="col-span-1 text-right">اليوم</div>
              <div className="col-span-1">٠٤:٠٠ (سحور)</div>
              <div className="col-span-5 text-center">فترة الصيام (النهار)</div>
              <div className="col-span-1 text-center">١٨:٠٠ (إفطار)</div>
              <div className="col-span-5 text-left">قيام وعبادة (الليل)</div>
            </div>

            {/* Rows */}
            <div className="space-y-3">
              {days.map((day) => (
                <div key={day} className="grid grid-cols-13 gap-2 items-center group">
                  <div className="col-span-1 text-sm font-bold text-[#d4af37]">يوم {day}</div>
                  
                  {/* Visual Timeline Bar Container */}
                  <div className="col-span-12 h-8 bg-[#0a1128]/40 rounded-full relative overflow-hidden flex border border-[#d4af37]/5 group-hover:border-[#d4af37]/30 transition-all">
                    {/* Suhoor Block */}
                    <div className="h-full bg-blue-500/20 w-[10%] border-l border-[#d4af37]/10" title="سحور" />
                    {/* Fasting Block */}
                    <div className="h-full bg-gradient-to-r from-orange-500/20 to-yellow-500/30 w-[50%] flex items-center justify-center">
                       <span className="text-[10px] text-white/20 font-cairo opacity-0 group-hover:opacity-100 transition-opacity">صيام</span>
                    </div>
                    {/* Iftar Block */}
                    <div className="h-full bg-red-500/40 w-[5%] border-x border-[#d4af37]/20" title="إفطار" />
                    {/* Prayer/Taraweeh Block */}
                    <div className="h-full bg-gradient-to-r from-[#d4af37]/10 to-[#d4af37]/40 w-[35%] flex items-center justify-center">
                       <span className="text-[10px] text-[#d4af37]/40 font-cairo opacity-0 group-hover:opacity-100 transition-opacity">تراويح وتهجد</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend & Python Tool Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#131d3d]/40 p-8 rounded-[32px] border border-[#d4af37]/10 flex flex-col gap-4">
            <h3 className="text-[#d4af37] font-bold flex items-center gap-2">
              <Info className="w-5 h-5" />
              دليل المخطط
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-orange-500/20 rounded-sm" />
                <span className="text-sm text-[#f8f1e7]/60">فترة الإمساك والصيام</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-[#d4af37]/40 rounded-sm" />
                <span className="text-sm text-[#f8f1e7]/60">فترة القيام والصلوات (العشاء، التراويح، التهجد)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-red-500/40 rounded-sm" />
                <span className="text-sm text-[#f8f1e7]/60">وقت الإفطار المبارك</span>
              </div>
            </div>
          </div>

          <div className="bg-[#131d3d]/40 p-8 rounded-[32px] border border-[#d4af37]/10 flex flex-col justify-between">
            <div>
              <h3 className="text-[#d4af37] font-bold flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5" />
                توليد مخطط احترافي (Python)
              </h3>
              <p className="text-[#f8f1e7]/60 text-sm leading-relaxed mb-6">
                قمنا بتضمين ملف <code className="text-[#d4af37]">ramadan_planner.py</code> في جذر المشروع. 
                يمكنك تشغيله باستخدام Python و Plotly للحصول على نسخة تفاعلية كاملة وقابلة للطباعة من جدولك الرمضاني.
              </p>
            </div>
            <div className="p-4 bg-[#0a1128]/60 rounded-2xl text-xs font-mono text-[#d4af37]/80">
              pip install plotly pandas<br/>
              python ramadan_planner.py
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RamadanPlanner;
