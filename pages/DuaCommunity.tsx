
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
  { id: '1', name: 'أحمد م.', text: 'اللهم اجعلنا ممن نالوا نصيباً من رحمتك في أول عشرة، ومغفرتك في ثانيها، وعتقك من النار في أواخرها.', timestamp: Date.now() - 3600000, likes: 45 },
  { id: '2', name: 'فاطمة س.', text: 'يا رب، بلغنا ليلة القدر ونحن في أحسن حال، واجبر خواطرنا جبراً يتعجب له أهل السماوات والأرض.', timestamp: Date.now() - 7200000, likes: 89 },
  { id: '3', name: 'فاعل خير', text: 'اللهم اشفِ كل مريض أتعبه مرضه في هذا الشهر الفضيل، وأنزل عليه سكينة من عندك.', timestamp: Date.now() - 86400000, likes: 32 },
];

const DuaCommunity: React.FC = () => {
  const [duas, setDuas] = useState<CommunityDua[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDua, setNewDua] = useState('');
  const [userName, setUserName] = useState('');
  const [isRephrasing, setIsRephrasing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ramadan_community_duas_v2');
    if (saved) {
      setDuas(JSON.parse(saved));
    } else {
      setDuas(INITIAL_DUAS);
    }
  }, []);

  const saveDuas = (updated: CommunityDua[]) => {
    setDuas(updated);
    localStorage.setItem('ramadan_community_duas_v2', JSON.stringify(updated));
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

  const handleShare = async (dua: CommunityDua) => {
    const shareText = `✨ دعاء من مجتمع "أدعية رمضان" ✨\n\nبواسطة: ${dua.name}\n\n"${dua.text}"\n\n👇 شاركنا دعاءك عبر الرابط:\n${window.location.href}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'مجتمع أدعية رمضان',
          text: shareText,
          url: window.location.href
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert('تم نسخ الدعاء والرابط لمشاركته يدوياً.');
    }
  };

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-4 flex flex-col items-center">
      <Stars />
      <div className="max-w-6xl w-full relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block p-6 bg-[#d4af37]/10 rounded-full mb-6 border border-[#d4af37]/20">
            <Users className="w-14 h-14 text-[#d4af37]" />
          </div>
          <h1 className="font-amiri text-6xl font-bold text-[#d4af37] mb-4">مجتمع الدعاء</h1>
          <p className="text-[#f8f1e7]/70 text-2xl font-amiri max-w-2xl mx-auto">
            بساط القلوب.. حيث تجتمع الأماني وتتعانق الدعوات في رحاب هذا الشهر المبارك
          </p>
          <Divider className="max-w-md mx-auto mt-8" />
        </div>

        {/* Action Button */}
        <div className="flex justify-center mb-16">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group flex items-center gap-4 bg-[#d4af37] text-[#0a1128] px-12 py-6 rounded-full font-bold text-2xl hover:bg-[#b8952d] transition-all transform hover:scale-105 shadow-[0_20px_40px_rgba(212,175,55,0.3)] active:scale-95"
          >
            <Plus className="w-7 h-7" />
            <span>شاركنا دعاءً من قلبك</span>
          </button>
        </div>

        {/* Duas Masonry-like Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {duas.map((dua) => (
            <div 
              key={dua.id} 
              className="bg-[#131d3d]/70 border border-[#d4af37]/20 rounded-[40px] p-10 backdrop-blur-xl flex flex-col hover:border-[#d4af37]/60 transition-all group shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6 text-[#d4af37]/60">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
                  <span className="font-bold font-cairo text-sm">{dua.name}</span>
                </div>
                <span className="text-xs opacity-50 font-cairo">{new Date(dua.timestamp).toLocaleDateString('ar-EG')}</span>
              </div>
              
              <p className="font-amiri text-3xl leading-relaxed text-[#f8f1e7] flex-grow text-center mb-8 min-h-[120px] flex items-center justify-center">
                "{dua.text}"
              </p>

              <div className="flex items-center justify-between border-t border-[#d4af37]/10 pt-6">
                <button 
                  onClick={() => toggleLike(dua.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f8f1e7]/5 text-[#f8f1e7]/60 hover:text-red-400 hover:bg-red-400/10 transition-all"
                >
                  <Heart className={`w-5 h-5 ${dua.likes > 0 ? 'fill-red-400 text-red-400' : ''}`} />
                  <span className="font-cairo text-sm">{dua.likes} أمنية</span>
                </button>
                <button 
                  onClick={() => handleShare(dua)}
                  className="p-3 text-[#f8f1e7]/40 hover:text-[#d4af37] hover:bg-[#d4af37]/10 rounded-full transition-all"
                  title="مشاركة"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {duas.length === 0 && (
          <div className="text-center py-32 opacity-20 flex flex-col items-center">
            <MessageSquareText className="w-24 h-24 mb-6" />
            <p className="text-3xl font-amiri">كن أول من يزرع دعاءً في بستان المجتمع</p>
          </div>
        )}
      </div>

      {/* Modern Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0a1128]/95 backdrop-blur-2xl animate-fade-in">
          <div className="bg-[#131d3d] border border-[#d4af37]/40 w-full max-w-2xl rounded-[56px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.6)] relative animate-scale-up">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-8 left-8 p-3 bg-[#0a1128]/50 text-[#f8f1e7]/40 hover:text-[#f8f1e7] rounded-full transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-10 md:p-16">
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-[#d4af37]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#d4af37]/20">
                  <Plus className="w-10 h-10 text-[#d4af37]" />
                </div>
                <h2 className="font-amiri text-5xl text-[#d4af37]">أفرغ ما في قلبك</h2>
              </div>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-[#d4af37]/60 text-sm font-cairo mb-3 pr-4">من صاحب الدعاء؟</label>
                  <input 
                    type="text" 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="مثلاً: محمد، فاعل خير، مقصر يرجو رحمة ربه"
                    className="w-full bg-[#0a1128]/60 border border-[#d4af37]/20 rounded-3xl px-8 py-5 outline-none focus:border-[#d4af37] transition-all text-xl font-amiri text-[#f8f1e7]"
                  />
                </div>

                <div className="relative">
                  <label className="block text-[#d4af37]/60 text-sm font-cairo mb-3 pr-4">مناجاتك</label>
                  <textarea 
                    value={newDua}
                    onChange={(e) => setNewDua(e.target.value)}
                    placeholder="اكتب نيتك بكلماتك البسيطة، وسنساعدك في صياغتها.."
                    rows={6}
                    className="w-full bg-[#0a1128]/60 border border-[#d4af37]/20 rounded-[40px] px-8 py-6 outline-none focus:border-[#d4af37] transition-all resize-none font-amiri text-3xl text-[#f8f1e7] leading-relaxed"
                    dir="rtl"
                  />
                  
                  {/* Smart Rephrase Button */}
                  <div className="absolute bottom-6 left-6">
                    <button 
                      onClick={handleRephrase}
                      disabled={!newDua.trim() || isRephrasing}
                      className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all shadow-2xl ${isRephrasing ? 'bg-[#d4af37]/20 text-[#d4af37]' : 'bg-[#d4af37] text-[#0a1128] hover:bg-[#b8952d] hover:scale-105 active:scale-95'}`}
                    >
                      {isRephrasing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span className="text-sm font-bold font-cairo">جاري الصياغة..</span>
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-5 h-5" />
                          <span className="text-sm font-bold font-cairo">تحسين الصياغة ذكياً</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-[#d4af37]/5 border border-[#d4af37]/10 rounded-[32px] p-6 flex items-center gap-4 group">
                  <div className="bg-[#d4af37]/20 p-3 rounded-2xl">
                    <Sparkles className="w-6 h-6 text-[#d4af37] animate-pulse" />
                  </div>
                  <span className="text-sm text-[#d4af37]/80 font-cairo leading-relaxed">
                    تستطيع نشر النص كما كتبته، أو استخدام <strong className="text-[#d4af37]">الصياغة الذكية</strong> ليقوم Gemini بتحويله لأسلوب بليغ.
                  </span>
                </div>

                <button 
                  onClick={handleAddDua}
                  disabled={!newDua.trim() || isRephrasing}
                  className="w-full bg-[#d4af37] text-[#0a1128] py-6 rounded-[32px] font-bold text-2xl hover:bg-[#b8952d] transition-all disabled:opacity-30 flex items-center justify-center gap-4 shadow-2xl active:scale-95"
                >
                  <Send className="w-7 h-7 rotate-180" />
                  <span className="font-cairo">انشر في المجتمع</span>
                </button>
              </div>
            </div>

            <div className="bg-[#d4af37]/5 p-6 text-center border-t border-[#d4af37]/10">
              <p className="text-[#d4af37]/60 text-lg font-amiri">"تُهادُوا الحُبَّ غَيْباً بالدُّعَاء"</p>
            </div>
          </div>
        </div>
      )}

      {/* Decorations */}
      <div className="fixed top-[20%] right-[-5%] opacity-10 pointer-events-none rotate-[20deg]">
        <Lantern className="w-48 h-80 text-[#d4af37]" />
      </div>
      <div className="fixed bottom-[-10%] left-[-5%] opacity-10 pointer-events-none rotate-[-15deg]">
        <Lantern className="w-64 h-[400px] text-[#d4af37]" />
      </div>
    </div>
  );
};

export default DuaCommunity;
