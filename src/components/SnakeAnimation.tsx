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
            width="120"
            height="120"
            viewBox="0 0 100 100"
            className="drop-shadow-xl"
          >
            {/* Snake body curve - dark purple/maroon */}
            <path
              d="M20 70 Q35 50 30 35 Q25 20 45 15 Q65 10 70 30 Q75 50 65 60"
              fill="none"
              stroke="hsl(340, 50%, 35%)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Snake head */}
            <circle cx="65" cy="60" r="12" fill="hsl(340, 50%, 35%)" />
            {/* Snake pattern/spots - darker shade */}
            <path
              d="M20 70 Q35 50 30 35 Q25 20 45 15 Q65 10 70 30 Q75 50 65 60"
              fill="none"
              stroke="hsl(350, 60%, 25%)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="8 12"
            />
            {/* Snake eyes */}
            <circle cx="62" cy="56" r="3.5" fill="hsl(0, 0%, 95%)" />
            <circle cx="70" cy="56" r="3.5" fill="hsl(0, 0%, 95%)" />
            <circle cx="62" cy="56" r="2" fill="hsl(0, 0%, 10%)" />
            <circle cx="70" cy="56" r="2" fill="hsl(0, 0%, 10%)" />
            {/* Eye shine */}
            <circle cx="63" cy="55" r="1" fill="hsl(0, 0%, 100%)" />
            <circle cx="71" cy="55" r="1" fill="hsl(0, 0%, 100%)" />
            {/* Snake tongue - red */}
            <path
              d="M72 65 L82 68 M82 68 L88 64 M82 68 L88 72"
              stroke="hsl(350, 70%, 50%)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Blush - pink */}
            <ellipse cx="58" cy="63" rx="4" ry="2.5" fill="hsl(350, 70%, 60%)" opacity="0.5" />
            <ellipse cx="74" cy="63" rx="4" ry="2.5" fill="hsl(350, 70%, 60%)" opacity="0.5" />
            {/* Small heart on head */}
            <path
              d="M66 48 C64 46 60 46 60 50 C60 52 66 56 66 56 C66 56 72 52 72 50 C72 46 68 46 66 48"
              fill="hsl(350, 70%, 50%)"
            />
          </svg>
        </div>

        {/* Speech bubble */}
        <div
          className={`absolute -top-14 left-1/2 transform -translate-x-1/2 bg-card px-4 py-2 rounded-xl shadow-soft border border-border whitespace-nowrap transition-all duration-300 ${
            isHovering ? "opacity-100 scale-100" : "opacity-90 scale-95"
          }`}
        >
          <span className="text-base font-semibold text-foreground">click me! 🖤</span>
          {/* Bubble arrow */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-card border-r border-b border-border rotate-45" />
        </div>
      </div>
    </div>
  );
};

export default SnakeAnimation;
