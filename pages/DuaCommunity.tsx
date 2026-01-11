
import React, { useState, useEffect } from 'react';
import { 
  Users, MessageSquareText, Send, 
  Heart, Share2, Sparkles, Loader2, X, Plus, Wand2 
} from 'lucide-react';
import { Stars, Divider, Lantern } from '../components/IslamicDecorations';
import { rephraseDua } from '../services/geminiService';

interface CommunityDua {
  id: string;
  name: string;
  text: string;
  timestamp: number;
  likes: number;
}

const INITIAL_DUAS: CommunityDua[] = [
  { id: '1', name: 'أحمد م.', text: 'اللهم اجعلنا ممن نالوا نصيباً من رحمتك في أول عشرة، ومغفرتك في ثانيها، وعتقك من النار في أواخرها.', timestamp: Date.now() - 100000, likes: 24 },
  { id: '2', name: 'فاطمة س.', text: 'يا رب، بلغنا ليلة القدر ونحن في أحسن حال، واجبر خواطرنا جبراً يتعجب له أهل السماوات والأرض.', timestamp: Date.now() - 500000, likes: 56 },
  { id: '3', name: 'فاعل خير', text: 'اللهم اشفِ كل مريض أتعبه مرضه في هذا الشهر الفضيل، وأنزل عليه سكينة من عندك.', timestamp: Date.now() - 900000, likes: 12 },
];

const DuaCommunity: React.FC = () => {
  const [duas, setDuas] = useState<CommunityDua[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDua, setNewDua] = useState('');
  const [userName, setUserName] = useState('');
  const [isRephrasing, setIsRephrasing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ramadan_community_duas');
    if (saved) {
      setDuas(JSON.parse(saved));
    } else {
      setDuas(INITIAL_DUAS);
    }
  }, []);

  const saveDuas = (updated: CommunityDua[]) => {
    setDuas(updated);
    localStorage.setItem('ramadan_community_duas', JSON.stringify(updated));
  };

  const handleAddDua = () => {
    if (!newDua.trim()) return;
    const item: CommunityDua = {
      id: Date.now().toString(),
      name: userName.trim() || 'فاعل خير',
      text: newDua,
      timestamp: Date.now(),
      likes: 0
    };
    saveDuas([item, ...duas]);
    setNewDua('');
    setUserName('');
    setIsModalOpen(false);
  };

  const handleRephrase = async () => {
    if (!newDua.trim() || isRephrasing) return;
    setIsRephrasing(true);
    try {
      const enhanced = await rephraseDua(newDua);
      setNewDua(enhanced);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRephrasing(false);
    }
  };

  const toggleLike = (id: string) => {
    saveDuas(duas.map(d => d.id === id ? { ...d, likes: d.likes + 1 } : d));
  };

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-4">
      <Stars />
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block p-4 bg-[#d4af37]/10 rounded-full mb-6">
            <Users className="w-12 h-12 text-[#d4af37]" />
          </div>
          <h1 className="font-amiri text-5xl font-bold text-[#d4af37] mb-4">مجتمع الدعاء</h1>
          <p className="text-[#f8f1e7]/70 text-xl font-amiri mb-4">بساط القلوب.. حيث تجتمع الأماني وتتعانق الدعوات</p>
          <Divider className="max-w-xs mx-auto" />
        </div>

        {/* Action Button */}
        <div className="flex justify-center mb-12">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group flex items-center gap-3 bg-[#d4af37] text-[#0a1128] px-10 py-5 rounded-full font-bold text-xl hover:bg-[#b8952d] transition-all transform hover:scale-105 shadow-[0_15px_35px_rgba(212,175,55,0.3)]"
          >
            <Plus className="w-6 h-6" />
            <span>انشر دعاءً جديداً</span>
          </button>
        </div>

        {/* Duas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {duas.map((dua) => (
            <div 
              key={dua.id} 
              className="bg-[#131d3d]/60 border border-[#d4af37]/20 rounded-[30px] p-8 backdrop-blur-md flex flex-col hover:border-[#d4af37]/50 transition-all group"
            >
              <div className="flex items-center justify-between mb-4 text-[#d4af37]/50">
                <span className="font-bold text-sm">{dua.name}</span>
                <span className="text-xs opacity-50">{new Date(dua.timestamp).toLocaleDateString('ar-EG')}</span>
              </div>
              
              <p className="font-amiri text-2xl leading-relaxed text-[#f8f1e7] flex-grow text-center mb-6 min-h-[100px] flex items-center justify-center">
                "{dua.text}"
              </p>

              <div className="flex items-center justify-between border-t border-[#d4af37]/10 pt-4">
                <button 
                  onClick={() => toggleLike(dua.id)}
                  className="flex items-center gap-2 text-[#f8f1e7]/40 hover:text-red-400 transition-colors"
                >
                  <Heart className={`w-5 h-5 ${dua.likes > 0 ? 'fill-red-400 text-red-400' : ''}`} />
                  <span>{dua.likes} أمنية</span>
                </button>
                <button className="text-[#f8f1e7]/40 hover:text-[#d4af37] transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {duas.length === 0 && (
          <div className="text-center py-20 opacity-30">
            <MessageSquareText className="w-20 h-20 mx-auto mb-4" />
            <p className="text-xl font-amiri">كن أول من يشارك دعاءه في هذا المجتمع المبارك</p>
          </div>
        )}
      </div>

      {/* Add Dua Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0a1128]/95 backdrop-blur-xl animate-fade-in">
          <div className="bg-[#131d3d] border border-[#d4af37]/30 w-full max-w-2xl rounded-[40px] overflow-hidden shadow-2xl relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 left-6 text-[#f8f1e7]/40 hover:text-[#f8f1e7] transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="p-8 md:p-12">
              <h2 className="font-amiri text-4xl text-[#d4af37] text-center mb-8">أفرغ ما في قلبك</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[#f8f1e7]/40 text-sm mb-2 pr-2">اسمك (اختياري)</label>
                  <input 
                    type="text" 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="اسمك أو فاعل خير"
                    className="w-full bg-[#0a1128]/50 border border-[#d4af37]/20 rounded-2xl px-6 py-4 outline-none focus:border-[#d4af37] transition-all"
                  />
                </div>

                <div className="relative">
                  <label className="block text-[#f8f1e7]/40 text-sm mb-2 pr-2">دعاؤك</label>
                  <textarea 
                    value={newDua}
                    onChange={(e) => setNewDua(e.target.value)}
                    placeholder="اكتب دعاءك بكلماتك البسيطة..."
                    rows={5}
                    className="w-full bg-[#0a1128]/50 border border-[#d4af37]/20 rounded-3xl px-6 py-4 outline-none focus:border-[#d4af37] transition-all resize-none font-amiri text-2xl"
                    dir="rtl"
                  />
                  
                  {/* Rephrase Button */}
                  <div className="absolute bottom-4 left-4">
                    <button 
                      onClick={handleRephrase}
                      disabled={!newDua.trim() || isRephrasing}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all shadow-lg ${isRephrasing ? 'bg-[#d4af37]/20 text-[#d4af37]' : 'bg-[#d4af37] text-[#0a1128] hover:bg-[#b8952d]'}`}
                      title="إعادة صياغة ذكية"
                    >
                      {isRephrasing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-xs font-bold">جاري الصياغة..</span>
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4" />
                          <span className="text-xs font-bold">تحسين الصياغة</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-[#d4af37]/5 border border-[#d4af37]/10 rounded-2xl p-4 flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#d4af37]" />
                  <span className="text-sm text-[#d4af37]/70">اكتب نيتك، وسنساعدك في صياغتها بأجمل الكلمات بضغطة زر.</span>
                </div>

                <button 
                  onClick={handleAddDua}
                  disabled={!newDua.trim() || isRephrasing}
                  className="w-full bg-[#d4af37] text-[#0a1128] py-5 rounded-2xl font-bold text-xl hover:bg-[#b8952d] transition-all disabled:opacity-30 flex items-center justify-center gap-3 shadow-lg"
                >
                  <Send className="w-6 h-6 rotate-180" />
                  <span>انشر في المجتمع</span>
                </button>
              </div>
            </div>

            <div className="bg-[#d4af37]/10 p-4 text-center">
              <p className="text-[#d4af37] text-sm font-amiri">"تهادوا الحب غيباً بالدعاء"</p>
            </div>
          </div>
        </div>
      )}

      {/* Background Decorations */}
      <div className="absolute top-[20%] right-[10%] opacity-10 pointer-events-none">
        <Lantern className="w-24 h-40 text-[#d4af37] animate-float" />
      </div>
      <div className="absolute bottom-[20%] left-[10%] opacity-10 pointer-events-none" style={{ animationDelay: '1.5s' }}>
        <Lantern className="w-32 h-56 text-[#d4af37] animate-float" />
      </div>
    </div>
  );
};

export default DuaCommunity;
