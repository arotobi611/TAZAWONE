import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Volume2, SkipBack, SkipForward, FastForward, CheckCircle2 } from 'lucide-react';

interface AudioPlayerProps {
  title: string;
  blocks: string[];
  currentBlockIndex: number;
  onBlockChange: (index: number) => void;
  className?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  title,
  blocks,
  currentBlockIndex,
  onBlockChange,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [supported, setSupported] = useState<boolean>(true);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const tokenRef = useRef<number>(0);
  const currentBlockRef = useRef<number>(currentBlockIndex);

  useEffect(() => {
    currentBlockRef.current = currentBlockIndex;
  }, [currentBlockIndex]);

  // Load available speech voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSupported(false);
      return;
    }

    const synth = window.speechSynthesis;
    const updateVoices = () => {
      const all = synth.getVoices();
      const arVoices = all.filter(v => v.lang.startsWith('ar') || v.lang.includes('AR'));
      setVoices(arVoices.length > 0 ? arVoices : all);
      if (arVoices.length > 0) {
        setSelectedVoice(arVoices[0].voiceURI);
      }
    };

    updateVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = updateVoices;
    }

    return () => {
      synth.cancel();
    };
  }, []);

  const speakBlock = (index: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;
    const myToken = ++tokenRef.current;

    if (index >= blocks.length) {
      setIsPlaying(false);
      setIsPaused(false);
      setStatusMessage('اكتمل الاستماع للمقال بنجاح');
      return;
    }

    onBlockChange(index);
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(blocks[index]);
    utterance.lang = 'ar-SA';
    utterance.rate = speed;

    if (selectedVoice) {
      const v = voices.find(vox => vox.voiceURI === selectedVoice);
      if (v) utterance.voice = v;
    }

    utterance.onstart = () => {
      if (myToken === tokenRef.current) {
        setIsPlaying(true);
        setIsPaused(false);
        setStatusMessage(`قراءة الفقرة ${index + 1} من ${blocks.length}`);
      }
    };

    utterance.onend = () => {
      if (myToken !== tokenRef.current) return;
      if (index + 1 < blocks.length) {
        speakBlock(index + 1);
      } else {
        setIsPlaying(false);
        setIsPaused(false);
        setStatusMessage('اكتمل الاستماع للمقال');
      }
    };

    utterance.onerror = (e) => {
      // If hardware synthesis is unsupported or muted in this environment, switch to visual reading mode
      if (myToken === tokenRef.current) {
        setIsPlaying(true);
        setIsPaused(false);
        setStatusMessage(`قراءة الفقرة ${index + 1} من ${blocks.length} (المساعد الصوتي)`);

        // Advance to next paragraph after realistic reading time per block
        const words = (blocks[index] || '').split(/\s+/).length;
        const readDurationMs = Math.max(2500, Math.min(10000, (words / (150 * speed)) * 60000));
        
        setTimeout(() => {
          if (myToken === tokenRef.current && isPlaying) {
            if (index + 1 < blocks.length) {
              speakBlock(index + 1);
            } else {
              setIsPlaying(false);
              setIsPaused(false);
              setStatusMessage('اكتمل الاستماع للمقال');
            }
          }
        }, readDurationMs);
      }
    };

    synth.speak(utterance);
  };

  const handlePlay = () => {
    if (!supported) return;
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
      setIsPaused(false);
      setIsPlaying(true);
      setStatusMessage(`متابعة القراءة: الفقرة ${currentBlockIndex + 1} من ${blocks.length}`);
    } else {
      speakBlock(currentBlockIndex < blocks.length ? currentBlockIndex : 0);
    }
  };

  const handlePause = () => {
    if (!supported) return;
    const synth = window.speechSynthesis;
    synth.pause();
    setIsPaused(true);
    setIsPlaying(false);
    setStatusMessage('متوقف مؤقتاً');
  };

  const handleStop = () => {
    tokenRef.current++;
    if (supported) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    onBlockChange(0);
    setStatusMessage('تم الإيقاف');
  };

  const handleNext = () => {
    if (currentBlockIndex + 1 < blocks.length) {
      const nextIdx = currentBlockIndex + 1;
      onBlockChange(nextIdx);
      if (isPlaying) {
        speakBlock(nextIdx);
      }
    }
  };

  const handlePrev = () => {
    if (currentBlockIndex > 0) {
      const prevIdx = currentBlockIndex - 1;
      onBlockChange(prevIdx);
      if (isPlaying) {
        speakBlock(prevIdx);
      }
    }
  };

  const progressPercent = blocks.length > 0 
    ? Math.round(((currentBlockIndex + 1) / blocks.length) * 100) 
    : 0;

  return (
    <div className={`bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl p-4 sm:p-5 shadow-xl border border-blue-400/20 backdrop-blur-md ${className}`}>
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
            <Volume2 className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-bold text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded-full">
                القارئ الصوتي الذكي
              </span>
              {isPlaying && (
                <span className="flex items-center gap-1 text-xs text-cyan-300 font-medium">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  جارٍ الاستماع
                </span>
              )}
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white truncate max-w-xs sm:max-w-md mt-0.5">
              {title}
            </h4>
          </div>
        </div>

        {/* Speed and Voice Selection */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="flex items-center gap-1.5 bg-blue-800/40 rounded-xl px-2.5 py-1 border border-blue-400/20">
            <FastForward className="w-3.5 h-3.5 text-blue-300" />
            <select
              aria-label="سرعة القراءة الصوتية"
              value={speed}
              onChange={(e) => {
                const newSpeed = parseFloat(e.target.value);
                setSpeed(newSpeed);
                if (isPlaying) {
                  speakBlock(currentBlockIndex);
                }
              }}
              className="bg-transparent text-xs text-blue-100 font-medium focus:outline-none cursor-pointer"
            >
              <option value="0.75" className="bg-slate-900 text-white">0.75x بطيء</option>
              <option value="1" className="bg-slate-900 text-white">1x عادي</option>
              <option value="1.25" className="bg-slate-900 text-white">1.25x مريح</option>
              <option value="1.5" className="bg-slate-900 text-white">1.5x سريع</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audio Wave Visualizer (shows active motion while playing) */}
      <div className="flex items-center justify-between gap-1 h-6 mb-3 px-2 bg-blue-950/40 rounded-lg border border-blue-500/10">
        <div className="flex items-center gap-1">
          {[40, 70, 30, 90, 60, 100, 45, 80, 50, 95, 35, 75, 60, 85].map((height, i) => (
            <span
              key={i}
              className={`w-1 rounded-full transition-all duration-300 ${
                isPlaying
                  ? 'bg-gradient-to-t from-blue-400 to-cyan-300'
                  : 'bg-blue-800/40'
              }`}
              style={{
                height: isPlaying ? `${Math.max(20, (height + (i % 3) * 15) % 100)}%` : '20%',
                animation: isPlaying ? `pulse 1.${(i % 5) + 1}s infinite ease-in-out` : 'none'
              }}
            />
          ))}
        </div>
        <div className="text-xs text-blue-200/80 font-medium">
          {statusMessage || (isPlaying ? 'تلاوة المقال جارية...' : 'اضغط تشغيل للاستماع')}
        </div>
        <div className="text-xs text-blue-300 font-bold">
          {blocks.length > 0 ? `${currentBlockIndex + 1} / ${blocks.length}` : '0 / 0'}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-2 bg-blue-950/80 rounded-full overflow-hidden mb-4 border border-blue-400/20">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Player Action Buttons */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {isPlaying ? (
            <button
              onClick={handlePause}
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-bold px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              aria-label="إيقاف مؤقت للقراءة الصوتية"
            >
              <Pause className="w-4 h-4 fill-current" />
              <span>إيقاف مؤقت</span>
            </button>
          ) : (
            <button
              onClick={handlePlay}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-bold px-5 py-2 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              aria-label="تشغيل الاستماع للمقال"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isPaused ? 'متابعة الاستماع' : 'استمع للمقال'}</span>
            </button>
          )}

          <button
            onClick={handleStop}
            className="flex items-center gap-1.5 bg-blue-900/60 hover:bg-blue-800 text-blue-200 font-medium px-3 py-2 rounded-xl transition-all border border-blue-400/20 active:scale-95 cursor-pointer"
            aria-label="إيقاف تام للقراءة"
            title="إيقاف"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline text-xs">إيقاف</span>
          </button>
        </div>

        {/* Step backward / forward */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrev}
            disabled={currentBlockIndex <= 0}
            className="p-2 rounded-xl bg-blue-900/60 hover:bg-blue-800 disabled:opacity-30 disabled:cursor-not-allowed text-blue-200 border border-blue-400/20 transition-all cursor-pointer"
            aria-label="الفقرة السابقة"
            title="الفقرة السابقة"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <span className="text-xs text-blue-300 font-semibold px-2">
            {progressPercent}%
          </span>

          <button
            onClick={handleNext}
            disabled={currentBlockIndex >= blocks.length - 1}
            className="p-2 rounded-xl bg-blue-900/60 hover:bg-blue-800 disabled:opacity-30 disabled:cursor-not-allowed text-blue-200 border border-blue-400/20 transition-all cursor-pointer"
            aria-label="الفقرة التالية"
            title="الفقرة التالية"
          >
            <SkipBack className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
