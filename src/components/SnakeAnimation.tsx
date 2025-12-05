import { useState } from "react";

interface SnakeAnimationProps {
  onShowHeart: () => void;
}

const SnakeAnimation = ({ onShowHeart }: SnakeAnimationProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="fixed bottom-6 left-6 z-40 cursor-pointer"
      onClick={onShowHeart}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={`relative transition-transform duration-300 ${isHovering ? "scale-110" : ""}`}>
        {/* Snake body */}
        <div className={`${isHovering ? "animate-snake-wiggle" : "animate-float"}`}>
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            className="drop-shadow-xl"
          >
            {/* Snake body curve */}
            <path
              d="M20 70 Q35 50 30 35 Q25 20 45 15 Q65 10 70 30 Q75 50 65 60"
              fill="none"
              stroke="hsl(120, 50%, 45%)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Snake head */}
            <circle cx="65" cy="60" r="12" fill="hsl(120, 50%, 45%)" />
            {/* Snake eyes */}
            <circle cx="62" cy="56" r="3" fill="hsl(0, 0%, 100%)" />
            <circle cx="70" cy="56" r="3" fill="hsl(0, 0%, 100%)" />
            <circle cx="62" cy="56" r="1.5" fill="hsl(0, 0%, 10%)" />
            <circle cx="70" cy="56" r="1.5" fill="hsl(0, 0%, 10%)" />
            {/* Snake tongue */}
            <path
              d="M72 65 L80 68 M80 68 L85 65 M80 68 L85 71"
              stroke="hsl(0, 70%, 50%)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Snake spots */}
            <circle cx="30" cy="35" r="3" fill="hsl(120, 60%, 35%)" />
            <circle cx="45" cy="18" r="3" fill="hsl(120, 60%, 35%)" />
            <circle cx="62" cy="28" r="3" fill="hsl(120, 60%, 35%)" />
            {/* Blush */}
            <ellipse cx="58" cy="62" rx="4" ry="2" fill="hsl(350, 70%, 75%)" opacity="0.6" />
            <ellipse cx="74" cy="62" rx="4" ry="2" fill="hsl(350, 70%, 75%)" opacity="0.6" />
          </svg>
        </div>

        {/* Speech bubble */}
        <div
          className={`absolute -top-12 left-1/2 transform -translate-x-1/2 bg-card px-3 py-2 rounded-xl shadow-soft border border-border whitespace-nowrap transition-all duration-300 ${
            isHovering ? "opacity-100 scale-100" : "opacity-80 scale-95"
          }`}
        >
          <span className="text-sm font-semibold text-foreground">click me! 💕</span>
          {/* Bubble arrow */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-card border-r border-b border-border rotate-45" />
        </div>
      </div>
    </div>
  );
};

export default SnakeAnimation;
