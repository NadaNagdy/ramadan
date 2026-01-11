
import React, { useState, useEffect } from 'react';
import { CATEGORIES, STATIC_CATEGORY_DUAS } from '../constants';
import DuaCard from '../components/DuaCard';
import { Stars, Divider } from '../components/IslamicDecorations';
import { generateCategoryDuas } from '../services/geminiService';
import { PlusCircle, Loader2 } from 'lucide-react';

const Categories: React.FC = () => {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0].id);
  const [categoryDuas, setCategoryDuas] = useState<Record<string, string[]>>(STATIC_CATEGORY_DUAS);
  const [loadingMore, setLoadingMore] = useState(false);

  const activeCategoryName = CATEGORIES.find(c => c.id === activeTab)?.arabicName || "";
  const currentDuas = categoryDuas[activeTab] || [];

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      const newDuas = await generateCategoryDuas(activeCategoryName, 5);
      setCategoryDuas(prev => ({
        ...prev,
        [activeTab]: [...(prev[activeTab] || []), ...newDuas]
      }));
    } catch (err) {
      alert("تعذر جلب المزيد من الأدعية حالياً.");
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-4">
      <Stars />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-amiri text-4xl font-bold text-[#d4af37] mb-4">أدعية بالنية</h1>
          <Divider className="max-w-xs mx-auto" />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all ${
                activeTab === cat.id 
                  ? 'bg-[#d4af37] text-[#0a1128] font-bold shadow-lg shadow-[#d4af37]/20' 
                  : 'bg-[#131d3d] text-[#f8f1e7]/60 border border-[#d4af37]/20 hover:border-[#d4af37]/50'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.arabicName}</span>
            </button>
          ))}
        </div>

        {/* Duas List */}
        <div className="space-y-8 animate-fade-in">
          {currentDuas.map((dua, index) => (
            <DuaCard 
              key={`${activeTab}-${index}`}
              title={`${activeCategoryName} - ${index + 1}`}
              dua={dua}
            />
          ))}
        </div>

        {/* Load More Trigger */}
        <div className="mt-12 text-center">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore || currentDuas.length >= 50}
            className="group flex items-center justify-center gap-3 mx-auto px-8 py-4 border-2 border-dashed border-[#d4af37]/30 rounded-2xl text-[#d4af37] hover:border-[#d4af37] hover:bg-[#d4af37]/5 transition-all disabled:opacity-30"
          >
            {loadingMore ? <Loader2 className="w-6 h-6 animate-spin" /> : <PlusCircle className="w-6 h-6" />}
            <span className="font-bold">
              {currentDuas.length >= 50 ? 'تم الوصول للحد الأقصى' : 'استكشف المزيد من الأدعية بالذكاء الاصطناعي'}
            </span>
          </button>
          <p className="mt-4 text-[#f8f1e7]/30 text-sm italic">
            جارٍ التوسع للوصول إلى ٥٠ دعاءً في كل قسم
          </p>
        </div>
      </div>
    </div>
  );
};

export default Categories;
