import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface OpeningAnimationProps {
  onComplete: () => void;
}

export const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete }) => {
  // 4 Scenes from the official SAAKHYA storyboard:
  // 1: Hands approaching
  // 2: Hands getting closer
  // 3: Handshake clasp
  // 4: SAAKHYA logo reveal
  // fading: Dissolve into login
  const [scene, setScene] = useState<1 | 2 | 3 | 4 | 'fading'>(1);

  useEffect(() => {
    // Respect reduced motion accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    // Scene 1 -> Scene 2: Hands naturally enter and approach smoothly (0 - 1.4s)
    const t1 = setTimeout(() => {
      setScene(2);
    }, 1400);

    // Scene 2 -> Scene 3: Hands align and meet in natural professional handshake (1.4s - 2.8s)
    const t2 = setTimeout(() => {
      setScene(3);
    }, 2800);

    // Scene 3 -> Scene 4: Transition to SAAKHYA brand logo reveal (2.8s - 4.3s)
    const t3 = setTimeout(() => {
      setScene(4);
    }, 4300);

    // Scene 4 -> Fading: Smooth dissolve transition towards login page (5.8s)
    const t4 = setTimeout(() => {
      setScene('fading');
    }, 5800);

    // Complete transition to login page (6.4s)
    const t5 = setTimeout(() => {
      onComplete();
    }, 6400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#E8DCC6] overflow-hidden transition-opacity duration-700 select-none ${
        scene === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, #F7F2E8 0%, #E8DCC6 70%, #DACAB0 100%)'
      }}
    >
      {/* Skip to Login Button */}
      <button
        onClick={onComplete}
        className="absolute top-6 right-8 z-50 flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider text-[#1F3B2E]/80 hover:text-[#1F3B2E] bg-[#F7F3EB]/80 hover:bg-[#FFFFFF] border border-[#1F3B2E]/20 rounded-full transition-all duration-200 backdrop-blur-md shadow-sm"
      >
        <span>Skip to Login</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

      {/* Atmospheric Soft Lilac & Pine Green Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div 
          className="w-[800px] h-[800px] rounded-full blur-[140px] transition-all duration-1000 opacity-50"
          style={{
            background: scene === 4
              ? 'radial-gradient(circle, rgba(203,179,232,0.5) 0%, rgba(31,59,46,0.15) 50%, transparent 75%)'
              : 'radial-gradient(circle, rgba(251,235,214,0.7) 0%, rgba(203,179,232,0.2) 55%, transparent 75%)'
          }}
        />
      </div>

      {/* Storyboard Cinematic Viewport */}
      <div className="relative w-full max-w-4xl h-[480px] flex items-center justify-center px-4">
        
        {/* Soft Vignette Mask Wrapper to seamlessly blend scene edges with Oatmeal canvas */}
        <div 
          className="relative w-full max-w-3xl aspect-[504/235] overflow-hidden rounded-3xl shadow-xl border border-[#1F3B2E]/10 bg-[#E8DCC6]"
          style={{
            maskImage: 'radial-gradient(ellipse 96% 90% at 50% 50%, black 75%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 96% 90% at 50% 50%, black 75%, transparent 100%)'
          }}
        >
          {/* Scene 1: Hands Approaching */}
          <div 
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              scene === 1 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-102 pointer-events-none'
            }`}
          >
            <img 
              src="/assets/scene_1_main.png" 
              alt="Hands Approaching" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Scene 2: Hands Getting Closer */}
          <div 
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              scene === 2 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-102 pointer-events-none'
            }`}
          >
            <img 
              src="/assets/scene_2_main.png" 
              alt="Hands Getting Closer" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Scene 3: Natural Professional Handshake */}
          <div 
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              scene === 3 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-102 pointer-events-none'
            }`}
          >
            <img 
              src="/assets/scene_3_main.png" 
              alt="Handshake Clasp" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Scene 4: SAAKHYA Brand Logo Reveal */}
          <div 
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              scene === 4 || scene === 'fading'
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-98 pointer-events-none'
            }`}
          >
            <img 
              src="/assets/scene_4_main.png" 
              alt="SAAKHYA Official Brand Reveal" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>

      {/* Subtle Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1F3B2E]/10">
        <div 
          className="h-full bg-gradient-to-r from-[#1F3B2E] via-[#CBB3E8] to-[#1F3B2E] transition-all duration-[5800ms] ease-linear"
          style={{ width: scene === 'fading' ? '100%' : '85%' }}
        />
      </div>
    </div>
  );
};
