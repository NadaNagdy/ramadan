
import React from 'react';
import { QADR_DUAS } from '../constants';
import DuaCard from '../components/DuaCard';
import { Stars, Divider } from '../components/IslamicDecorations';
import { MoonStar } from 'lucide-react';

const QadrDuas: React.FC = () => {
  return (
    <div className="relative min-h-screen pt-32 pb-20 px-4">
      <Stars />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <MoonStar className="w-16 h-16 text-[#d4af37] mx-auto mb-6 opacity-80 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
          <h1 className="font-amiri text-5xl md:text-6xl font-bold text-[#d4af37] mb-4">أدعية ليلة القدر</h1>
          <p className="text-[#f8f1e7]/70 text-xl font-amiri mb-6">"خير من ألف شهر"</p>
          <Divider className="max-w-xs mx-auto" />
        </div>

        <div className="space-y-10 animate-fade-in">
          {QADR_DUAS.map((dua, index) => (
            <DuaCard 
              key={dua.id}
              title={`دعاء ليلة القدر - ${index + 1}`}
              dua={dua.dua}
            />
          ))}
        </div>

        <div className="mt-16 bg-[#131d3d]/40 border border-[#d4af37]/20 rounded-3xl p-8 text-center backdrop-blur-sm">
           <p className="font-amiri text-2xl text-[#f8f1e7]/80 italic">
             اللهم إنك عفو كريم تحب العفو فاعف عني
           </p>
        </div>
      </div>
    </div>
  );
};

export default QadrDuas;
