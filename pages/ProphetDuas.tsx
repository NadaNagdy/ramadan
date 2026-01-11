
import React from 'react';
import { PROPHET_DUAS } from '../constants';
import DuaCard from '../components/DuaCard';
import { Stars, Divider } from '../components/IslamicDecorations';
import { User } from 'lucide-react';

const ProphetDuas: React.FC = () => {
  return (
    <div className="relative min-h-screen pt-32 pb-20 px-4">
      <Stars />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <User className="w-16 h-16 text-[#d4af37] mx-auto mb-6 opacity-80" />
          <h1 className="font-amiri text-5xl md:text-6xl font-bold text-[#d4af37] mb-4">أدعية الأنبياء</h1>
          <p className="text-[#f8f1e7]/70 text-xl font-amiri mb-6">"أدعية خالدة من خير خلق الله"</p>
          <Divider className="max-w-xs mx-auto" />
        </div>

        <div className="grid grid-cols-1 gap-10 animate-fade-in">
          {PROPHET_DUAS.map((dua) => (
            <DuaCard 
              key={dua.id}
              title={dua.arabicTitle}
              dua={dua.dua}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProphetDuas;
