import { useEffect, useState } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [showLetters, setShowLetters] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const letters = "wassup!".split("");

  useEffect(() => {
    // Start letter animation after a short delay
    const letterTimer = setTimeout(() => {
      setShowLetters(true);
    }, 300);

    // Fade out and transition after animation completes
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(letterTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center gradient-love transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background sparkles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary-foreground/40 rounded-full animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main text */}
      <div className="relative flex items-center justify-center">
        {showLetters &&
          letters.map((letter, index) => (
            <span
              key={index}
              className="font-display text-7xl md:text-9xl text-primary-foreground animate-wassup-bounce opacity-0"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "forwards",
              }}
            >
              {letter}
            </span>
          ))}
      </div>

      {/* Floating hearts */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        {showLetters && (
          <div className="flex gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="text-4xl animate-float opacity-0"
                style={{
                  animationDelay: `${1 + i * 0.2}s`,
                  animationFillMode: "forwards",
                }}
              >
                💕
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroAnimation;
