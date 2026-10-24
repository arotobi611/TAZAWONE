import React, { useState, useEffect } from 'react';
import { Wind, Play, Pause, RotateCcw, Sparkles } from 'lucide-react';

interface BreathingWidgetProps {
  language?: 'ar' | 'en';
}

export const BreathingWidget: React.FC<BreathingWidgetProps> = ({ language = 'ar' }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [secondsLeft, setSecondsLeft] = useState<number>(4);
  const [cycleCount, setCycleCount] = useState<number>(0);
  const [technique, setTechnique] = useState<'478' | 'box'>('478');

  const isAr = language === 'ar';

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev > 1) {
            return prev - 1;
          }

          // Advance to next phase
          if (technique === '478') {
            if (phase === 'inhale') {
              setPhase('hold');
              return 7;
            } else if (phase === 'hold') {
              setPhase('exhale');
              return 8;
            } else {
              setPhase('inhale');
              setCycleCount((c) => c + 1);
              return 4;
            }
          } else {
            // Box Breathing: 4-4-4-4
            if (phase === 'inhale') {
              setPhase('hold');
              return 4;
            } else if (phase === 'hold') {
              setPhase('exhale');
              return 4;
            } else if (phase === 'exhale') {
              setPhase('pause');
              return 4;
            } else {
              setPhase('inhale');
              setCycleCount((c) => c + 1);
              return 4;
            }
          }
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive, phase, technique]);

  const handleStart = () => {
    setIsActive(true);
    setPhase('inhale');
    setSecondsLeft(4);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('inhale');
    setSecondsLeft(4);
    setCycleCount(0);
  };

  const getPhaseText = () => {
    if (isAr) {
      switch (phase) {
        case 'inhale':
          return 'شهيق هادئ وعميق عبر الأنف...';
        case 'hold':
          return 'احبس نفسك واستشعر السكون الداخلي...';
        case 'exhale':
          return 'زفير طويل وبطيء عبر الفم بتفريغ تام...';
        case 'pause':
          return 'وقفة هادئة بالسكون...';
      }
    } else {
      switch (phase) {
        case 'inhale':
          return 'Inhale deeply and gently through nose...';
        case 'hold':
          return 'Hold gently, feel inner calm...';
        case 'exhale':
          return 'Slow, complete exhale through mouth...';
        case 'pause':
          return 'Rest peacefully in stillness...';
      }
    }
  };

  const getScaleClass = () => {
    if (!isActive) return 'scale-90';
    switch (phase) {
      case 'inhale':
        return 'scale-125 transition-transform duration-[4000ms] ease-out';
      case 'hold':
        return 'scale-125 transition-none';
      case 'exhale':
        return 'scale-75 transition-transform duration-[8000ms] ease-in';
      case 'pause':
        return 'scale-75 transition-none';
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-900/90 via-indigo-900/80 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-blue-400/20 relative overflow-hidden backdrop-blur-md">
      {/* Background ambient glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>{isAr ? 'تمرين تفاعلي مهدئ للأعصاب' : 'Interactive Soothing Breath Oasis'}</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
          {isAr ? 'واحة التنفس والتفريغ العصبي' : 'Breathing & Calm Sanctuary'}
        </h3>
        <p className="text-xs sm:text-sm text-blue-200/80 max-w-md mb-6">
          {isAr
            ? 'دقيقتان من التنفس المتزن كفيلة بإبطاء نبضات قلبك المتسارعة وتنبيه مركز الراحة في دماغك.'
            : 'Two minutes of mindful breathing calms your nervous system and restores quiet balance.'}
        </p>

        {/* Technique toggle */}
        <div className="flex items-center bg-blue-950/60 p-1 rounded-xl border border-blue-500/20 mb-8">
          <button
            onClick={() => {
              setTechnique('478');
              handleReset();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              technique === '478'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-blue-300 hover:text-white'
            }`}
          >
            {isAr ? 'تنفس 4-7-8 (الاسترخاء العميق)' : '4-7-8 Breathing (Deep Sleep & Calm)'}
          </button>
          <button
            onClick={() => {
              setTechnique('box');
              handleReset();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              technique === 'box'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-blue-300 hover:text-white'
            }`}
          >
            {isAr ? 'التنفس المربع (التركيز والصفاء)' : 'Box Breathing (Focus & Balance)'}
          </button>
        </div>

        {/* Breathing Orb Visualization */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center my-4">
          {/* Animated concentric rings */}
          <div
            className={`absolute inset-0 rounded-full border-2 border-cyan-400/20 transition-all duration-1000 ${
              isActive ? 'animate-ping opacity-30' : 'opacity-10'
            }`}
          />
          <div
            className={`absolute -inset-4 rounded-full border border-blue-400/20 transition-all duration-1000 ${
              isActive ? 'scale-105' : 'scale-95'
            }`}
          />

          {/* Central Pulsing Sphere */}
          <div
            className={`w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-cyan-600 via-blue-500 to-indigo-600 shadow-[0_0_50px_rgba(56,189,248,0.5)] flex flex-col items-center justify-center transform ${getScaleClass()}`}
          >
            <Wind className={`w-8 h-8 text-cyan-100 mb-1 ${isActive ? 'animate-pulse' : ''}`} />
            <span className="text-2xl sm:text-3xl font-black text-white font-mono">
              {secondsLeft}s
            </span>
            <span className="text-[10px] uppercase tracking-wider text-cyan-200 font-bold">
              {phase === 'inhale'
                ? isAr ? 'شهيق' : 'Inhale'
                : phase === 'hold'
                ? isAr ? 'حبس' : 'Hold'
                : phase === 'exhale'
                ? isAr ? 'زفير' : 'Exhale'
                : isAr ? 'راحة' : 'Rest'}
            </span>
          </div>
        </div>

        {/* Instruction Caption */}
        <div className="mt-5 mb-6 min-h-[3rem] flex flex-col items-center justify-center">
          <span className="text-base sm:text-lg font-bold text-cyan-200">
            {isActive
              ? getPhaseText()
              : isAr
              ? 'اضغط على زر البدء لتهدئة ذهنك الآن'
              : 'Press Start to calm your mind now'}
          </span>
          {cycleCount > 0 && (
            <span className="text-xs text-blue-300 mt-1">
              {isAr
                ? `أتممت ${cycleCount} ${cycleCount === 1 ? 'دورة كاملة' : 'دورات تنفس'}`
                : `Completed ${cycleCount} cycle${cycleCount > 1 ? 's' : ''}`}
            </span>
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-3">
          {isActive ? (
            <button
              onClick={handlePause}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg border border-cyan-400/30 transition-all active:scale-95 cursor-pointer"
            >
              <Pause className="w-4 h-4 fill-current text-white" />
              <span>{isAr ? 'إيقاف مؤقت' : 'Pause'}</span>
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-7 py-2.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current text-white" />
              <span>{isAr ? 'ابدأ تمرين التنفس' : 'Start Breathing Exercise'}</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-blue-950/70 hover:bg-blue-900 text-blue-300 border border-blue-400/20 transition-all active:scale-95 cursor-pointer"
            aria-label={isAr ? 'إعادة ضبط التمرين' : 'Reset exercise'}
            title={isAr ? 'إعادة ضبط' : 'Reset'}
          >
            <RotateCcw className="w-4 h-4 text-cyan-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
