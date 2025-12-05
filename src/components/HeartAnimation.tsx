import { useEffect, useState } from "react";

interface HeartAnimationProps {
  onComplete: () => void;
}

const HeartAnimation = ({ onComplete }: HeartAnimationProps) => {
  const [show, setShow] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start showing
    setTimeout(() => setShow(true), 100);

    // Start fade out after 3s
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3000);

    // Complete after 3.5s
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl md:text-4xl animate-float opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            💕
          </div>
        ))}
      </div>

      {/* Main heart */}
      <div
        className={`relative transition-all duration-600 ${
          show ? "animate-heart-explode" : "opacity-0 scale-0"
        }`}
      >
        {/* Heart SVG */}
        <div className="relative">
          <svg
            viewBox="0 0 200 180"
            className="w-64 h-56 md:w-96 md:h-80 drop-shadow-2xl"
          >
            <defs>
              <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(0, 85%, 45%)" />
                <stop offset="50%" stopColor="hsl(355, 80%, 40%)" />
                <stop offset="100%" stopColor="hsl(0, 90%, 35%)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M100 175 C35 120 0 75 0 45 C0 15 25 0 50 0 C75 0 90 15 100 35 C110 15 125 0 150 0 C175 0 200 15 200 45 C200 75 165 120 100 175Z"
              fill="url(#heartGradient)"
              filter="url(#glow)"
              className="animate-heart-pulse"
            />
          </svg>

          {/* Text on heart */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-8 md:px-12">
              <p className="font-display text-lg md:text-2xl lg:text-3xl text-primary-foreground leading-relaxed drop-shadow-lg">
                nenu ninnu
              </p>
              <p className="font-display text-lg md:text-2xl lg:text-3xl text-primary-foreground leading-relaxed drop-shadow-lg">
                premistunaanu
              </p>
              <p className="text-3xl md:text-4xl mt-2">💕</p>
            </div>
          </div>
        </div>

        {/* Sparkles around heart */}
        {show && (
          <>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 md:w-4 md:h-4 bg-warm-orange rounded-full animate-sparkle"
                style={{
                  left: `${50 + 60 * Math.cos((i * Math.PI) / 4)}%`,
                  top: `${50 + 60 * Math.sin((i * Math.PI) / 4)}%`,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default HeartAnimation;
