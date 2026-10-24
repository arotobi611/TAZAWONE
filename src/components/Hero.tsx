import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Headphones, 
  Sparkles, 
  Youtube, 
  MessageCircle, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Waves,
  Wind,
  ArrowDown
} from 'lucide-react';
import { formatWhatsAppUrl } from '../utils/readingTime';
import { Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface HeroProps {
  language: Language;
  onExploreClick: () => void;
  onSubmitArticleClick: () => void;
  onBreathingClick?: () => void;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  baseAlpha: number;
}

export const Hero: React.FC<HeroProps> = ({ 
  language, 
  onExploreClick, 
  onSubmitArticleClick,
  onBreathingClick 
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  const t = TRANSLATIONS[language];

  // Canvas fluid wave and particle ambient motion
  const initCanvasAnimation = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respect user's reduced motion preference
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create soothing blue light particles
    const particleCount = Math.min(35, Math.floor(width / 40));
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.35 - 0.1, // gently rising
        alpha: Math.random() * 0.4 + 0.1,
        baseAlpha: Math.random() * 0.4 + 0.1,
      });
    }

    let step = 0;
    const render = () => {
      step += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle sinusoidal flowing blue wave at bottom
      ctx.save();
      const waveGradient = ctx.createLinearGradient(0, height - 120, 0, height);
      waveGradient.addColorStop(0, 'rgba(14, 116, 144, 0.08)');
      waveGradient.addColorStop(1, 'rgba(2, 6, 23, 0.4)');
      ctx.fillStyle = waveGradient;

      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 10) {
        const y = height - 60 + Math.sin(x * 0.005 + step) * 20 + Math.cos(x * 0.008 + step * 0.7) * 15;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Render floating light particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const pulse = Math.sin(step * 2 + i) * 0.2;
        const currentAlpha = Math.max(0.05, Math.min(0.6, p.baseAlpha + pulse));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(103, 232, 249, ${currentAlpha})`;
        ctx.shadowColor = 'rgba(56, 189, 248, 0.8)';
        ctx.shadowBlur = 6;
        ctx.fill();
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, []);

  useEffect(() => {
    const cleanup = initCanvasAnimation();
    return () => {
      if (cleanup) cleanup();
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [initCanvasAnimation]);

  // Calming ambient sound synthesis (soothing ocean wave / pink noise)
  const toggleAmbientSound = () => {
    if (isAudioMuted) {
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          const ctx = new AudioContextClass();
          audioCtxRef.current = ctx;

          // Generate 2 seconds of soothing ocean noise buffer
          const bufferSize = ctx.sampleRate * 2;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          let lastOut = 0.0;
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            lastOut = (lastOut + 0.02 * white) / 1.02;
            data[i] = lastOut * 0.15; // Soft pink noise
          }

          const noise = ctx.createBufferSource();
          noise.buffer = buffer;
          noise.loop = true;

          // Biquad filter to mimic deep soothing sea wave frequency
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(450, ctx.currentTime);

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.25, ctx.currentTime);
          gainNodeRef.current = gain;

          noise.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          noise.start(0);
        } else if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        if (gainNodeRef.current && audioCtxRef.current) {
          gainNodeRef.current.gain.setTargetAtTime(0.25, audioCtxRef.current.currentTime, 0.1);
        }
        setIsAudioMuted(false);
      } catch (err) {
        setIsAudioMuted(true);
      }
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.1);
      }
      setIsAudioMuted(true);
    }
  };

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsVideoPlaying(true)).catch(() => {});
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <section 
      id="home" 
      className="relative overflow-hidden bg-slate-950 text-white min-h-[580px] lg:min-h-[660px] flex items-center justify-center pt-8 pb-16 sm:py-24"
    >
      {/* 1. Looping Animated Blue Video Background (Covers entire Hero) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.65] saturate-[1.15] contrast-[1.05]"
          poster="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1600&q=80"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-calm-sea-waves-1166-large.mp4"
            type="video/mp4"
          />
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-water-waves-in-the-sea-1240-large.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* 2. Interactive Canvas Layer with gentle blue waves and rising light particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-1"
      />

      {/* 3. Deep Navy / Dark Blue Multi-stop Gradient Overlays ensuring AAA text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/85 via-slate-950/75 to-slate-950/95 pointer-events-none z-2" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/15 via-transparent to-transparent pointer-events-none z-2" />

      {/* Floating Hero Media & Sound Controls */}
      <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
        {/* Background Video Play/Pause */}
        <button
          onClick={toggleVideoPlay}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800/90 text-cyan-200 border border-blue-400/30 text-xs font-bold backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg"
          title={isVideoPlaying ? 'إيقاف حركة الفيديو الخلفي مؤقتاً' : 'تشغيل فيديو الأمواج'}
          aria-label={isVideoPlaying ? 'إيقاف الفيديو الخلفي' : 'تشغيل الفيديو الخلفي'}
        >
          {isVideoPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current text-cyan-400" />
              <span className="hidden sm:inline text-[11px]">{t.videoBadge}</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current text-cyan-400" />
              <span className="hidden sm:inline text-[11px]">تشغيل الخلفية</span>
            </>
          )}
        </button>

        {/* Ambient Ocean Sound Toggle */}
        <button
          onClick={toggleAmbientSound}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800/90 text-cyan-200 border border-blue-400/30 text-xs font-bold backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg"
          title={isAudioMuted ? 'تشغيل صوت أمواج البحر المهدئ' : 'كتم صوت الأمواج'}
          aria-label={isAudioMuted ? 'تشغيل صوت البحر المهدئ' : 'كتم صوت البحر'}
        >
          {isAudioMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-blue-300" />
              <span className="hidden sm:inline text-[11px]">{t.soundOptional}</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              <span className="hidden sm:inline text-[11px]">{t.soundActive}</span>
            </>
          )}
        </button>
      </div>

      {/* Main Hero Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-6">
        {/* Brand Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-cyan-400/40 text-cyan-300 text-xs sm:text-sm font-extrabold backdrop-blur-md shadow-lg shadow-blue-500/10 mb-6">
          <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
          <span>{t.heroBadge}</span>
        </div>

        {/* Hero Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.2] sm:leading-[1.15] text-white drop-shadow-md mb-6">
          <span>{t.heroTitle}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-400 text-2xl sm:text-4xl lg:text-5xl font-black mt-2">
            TAWAZONE
          </span>
        </h1>

        {/* Welcoming Description */}
        <p className="text-base sm:text-lg lg:text-xl text-blue-100/95 leading-relaxed max-w-3xl mx-auto font-medium mb-8 drop-shadow-sm">
          {t.heroSubtitle}
        </p>

        {/* Primary Call to Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2 mb-12">
          {/* Explore Audio Articles */}
          <button
            onClick={onExploreClick}
            className="flex items-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-cyan-500/25 transition-all active:scale-95 cursor-pointer"
          >
            <Headphones className="w-5 h-5 text-slate-950" />
            <span>{t.exploreArticlesBtn}</span>
          </button>

          {/* Quick Breathing Exercise */}
          {onBreathingClick && (
            <button
              onClick={onBreathingClick}
              className="flex items-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-blue-600/30 hover:bg-blue-600/45 text-cyan-200 font-extrabold text-sm border border-cyan-400/40 backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-md"
            >
              <Wind className="w-4 h-4 text-cyan-300" />
              <span>{t.startBreathingBtn || 'تمرين التنفس السريع'}</span>
            </button>
          )}

          {/* Publish Article */}
          <button
            onClick={onSubmitArticleClick}
            className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
          >
            {t.submitArticleBtn}
          </button>

          {/* WhatsApp Direct */}
          <a
            href={formatWhatsAppUrl('0725968984', 'مرحباً، أود التواصل مع إدارة منصة TAWAZONE')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3.5 sm:py-4 rounded-2xl bg-blue-900/80 hover:bg-blue-800 text-white font-bold text-sm shadow-md border border-blue-400/30 transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4 text-cyan-300" />
            <span>{t.whatsappDirect}</span>
          </a>

          {/* YouTube Direct */}
          <a
            href="https://www.youtube.com/@MadhaqTabiei"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3.5 sm:py-4 rounded-2xl bg-blue-950/90 hover:bg-blue-900 text-sky-200 font-bold text-sm shadow-md border border-blue-600/40 transition-all active:scale-95"
          >
            <Youtube className="w-4 h-4 text-cyan-300" />
            <span>{t.youtubeDirect}</span>
          </a>
        </div>

        {/* 4 Pillars Trust Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-blue-800/40 max-w-4xl mx-auto">
          <div className="p-3 rounded-2xl bg-slate-900/40 border border-blue-400/20 backdrop-blur-sm">
            <div className="text-xl sm:text-2xl font-black text-cyan-300">{t.statPillars}</div>
            <div className="text-xs text-blue-200/80 font-semibold">{t.statPillarsSub}</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/40 border border-blue-400/20 backdrop-blur-sm">
            <div className="text-xl sm:text-2xl font-black text-cyan-300">{t.statContent}</div>
            <div className="text-xs text-blue-200/80 font-semibold">{t.statContentSub}</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/40 border border-blue-400/20 backdrop-blur-sm">
            <div className="text-xl sm:text-2xl font-black text-cyan-300">{t.statAudio}</div>
            <div className="text-xs text-blue-200/80 font-semibold">{t.statAudioSub}</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/40 border border-blue-400/20 backdrop-blur-sm">
            <div className="text-xl sm:text-2xl font-black text-cyan-300">أزرق ومهدئ</div>
            <div className="text-xs text-blue-200/80 font-semibold">سكينة بصرية وعصبية</div>
          </div>
        </div>
      </div>
    </section>
  );
};
