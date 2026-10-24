import React from 'react';
import { Heart, Activity, Brain, Compass, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { CategoryType } from '../types';

interface CategoriesSectionProps {
  onSelectCategory: (category: CategoryType) => void;
  activeCategory: CategoryType;
  language?: 'ar' | 'en';
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onSelectCategory,
  activeCategory,
  language = 'ar',
}) => {
  const isAr = language === 'ar';

  const categories = isAr
    ? [
        {
          id: 'psych' as CategoryType,
          title: 'العلاج النفسي',
          subtitle: 'القلق، الثقة بالنفس، المشاعر، العلاقات، والتعامل مع الضغوط',
          icon: Heart,
          imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80',
          topics: ['القلق والتوتر', 'الثقة بالنفس', 'تمارين التنفس', 'طلب المساعدة النفسية', 'فهم المشاعر'],
          disclaimer: 'المحتوى في هذا القسم تثقيفي ولا يُغني عن استشارة مختص نفسي معتمد.',
        },
        {
          id: 'body' as CategoryType,
          title: 'العلاج الجسدي',
          subtitle: 'التغذية، النوم، الحركة، الترطيب، والعادات الصحية اليومية',
          icon: Activity,
          imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
          topics: ['التغذية المتوازنة', 'النوم والراحة', 'تمارين التمدد', 'الترطيب الخلوي', 'الطاقة اليومية'],
          disclaimer: 'الأغذية والتمارين معلومات تثقيفية وليست بديلاً عن الرعاية الطبية المتخصصة.',
        },
        {
          id: 'mind' as CategoryType,
          title: 'العلاج العقلي',
          subtitle: 'التركيز، الذاكرة، التفكير النقدي، تنظيم الوقت، والانضباط الذاتي',
          icon: Brain,
          imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
          topics: ['التركيز والانتباه', 'تنظيم الوقت', 'التخلص من التسويف', 'اتخاذ القرارات', 'العمل العميق'],
          disclaimer: 'تمارين عقلية واستراتيجيات إنتاجية مثبتة لبناء روتين فكري هادئ.',
        },
        {
          id: 'spirit' as CategoryType,
          title: 'العلاج الروحي',
          subtitle: 'السكينة، الامتنان، الصبر، والتوازن بين العبادة والعمل والحياة',
          icon: Compass,
          imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
          topics: ['السكينة والطمأنينة', 'الامتنان والشكر', 'الصبر والرضا', 'التعامل مع الفقد', 'التأمل الصادق'],
          disclaimer: 'محتوى روحي إيماني يعزز السلام الباطني والاتصال الصادق بالله.',
        },
      ]
    : [
        {
          id: 'psych' as CategoryType,
          title: 'Psychological Healing',
          subtitle: 'Anxiety relief, emotional self-awareness, relationships, and mindful resilience',
          icon: Heart,
          imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80',
          topics: ['Stress & Anxiety', 'Self-Esteem', 'Breathwork', 'Professional Guidance', 'Emotions'],
          disclaimer: 'Educational content for mental well-being; not a clinical replacement.',
        },
        {
          id: 'body' as CategoryType,
          title: 'Physical Healing',
          subtitle: 'Cellular hydration, sleep architecture, gut-brain axis, and vitality',
          icon: Activity,
          imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
          topics: ['Mindful Nutrition', 'Deep Sleep', 'Mobility', 'Hydration', 'Sustained Energy'],
          disclaimer: 'Nutritional and lifestyle guidance for everyday holistic health.',
        },
        {
          id: 'mind' as CategoryType,
          title: 'Mental Healing',
          subtitle: 'Deep focus, cognitive clarity, habit building, and inner discipline',
          icon: Brain,
          imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
          topics: ['Deep Focus', 'Time Mastery', 'Overcoming Delay', 'Clear Choices', 'Daily Routine'],
          disclaimer: 'Cognitive strategies for mental clarity and structured focus.',
        },
        {
          id: 'spirit' as CategoryType,
          title: 'Spiritual Healing',
          subtitle: 'Inner serenity, gratitude, patience, and soulful purpose in daily life',
          icon: Compass,
          imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
          topics: ['Inner Peace', 'Gratitude', 'Patience', 'Grief & Healing', 'Mindful Reflection'],
          disclaimer: 'Spiritual reflections cultivating peace and heart-felt serenity.',
        },
      ];

  return (
    <section id="sections" className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-300 text-xs font-bold mb-3 border border-blue-200 dark:border-blue-800">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            <span>{isAr ? 'الأركان الأربعة المتوازنة · TAWAZONE' : 'The Four Balanced Pillars · TAWAZONE'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            {isAr ? 'أقسامنا الأربعة للصحة المتكاملة' : 'Our Four Pillars for Holistic Wellbeing'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-medium">
            {isAr
              ? 'اختر المحور الذي يحتاجه عقلك وجسدك ونفسك وروحك في هذه المرحلة.'
              : 'Choose the pillar your mind, body, heart, and spirit need most right now.'}
          </p>
        </div>

        {/* 4 Cards Grid with Bluish Aesthetic Banners (Unique images) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;

            return (
              <div
                key={cat.id}
                id={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group rounded-3xl bg-white dark:bg-slate-800 border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 cursor-pointer flex flex-col ${
                  isSelected
                    ? 'border-blue-500 ring-2 ring-blue-500/30'
                    : 'border-slate-200/80 dark:border-blue-900/40 hover:border-blue-400 dark:hover:border-cyan-400'
                }`}
              >
                {/* Bluish Curated Image Banner */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={cat.imageUrl}
                    alt={cat.title}
                    className="w-full h-full object-cover filter brightness-90 saturate-95 group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Bluish gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/30 to-blue-900/20" />
                  
                  {/* Floating Category Icon Badge */}
                  <div className="absolute bottom-3 right-4 left-4 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-white/90 dark:bg-slate-900/90 text-blue-600 dark:text-cyan-400 flex items-center justify-center shadow-md backdrop-blur-sm shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-white font-extrabold text-base drop-shadow-sm truncate">
                      {cat.title}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {cat.subtitle}
                    </p>

                    {/* Topics Pill List */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cat.topics.map((topic, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-cyan-300 border border-blue-200/60 dark:border-blue-800/40"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Disclaimer & Action */}
                  <div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 italic mb-3">
                      {cat.disclaimer}
                    </p>
                    <div className="flex items-center justify-between text-xs font-bold text-blue-600 dark:text-cyan-400 pt-3 border-t border-slate-100 dark:border-slate-700">
                      <span>{isAr ? 'عرض مقالات القسم' : 'Explore Pillar Articles'}</span>
                      {isAr ? (
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      ) : (
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
