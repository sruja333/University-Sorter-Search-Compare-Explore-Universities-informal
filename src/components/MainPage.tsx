import { useState, useCallback, useEffect } from "react";
import { University, universities as initialUniversities } from "@/data/universities";
import UniversityTable from "./UniversityTable";
import SnakeAnimation from "./SnakeAnimation";
import HeartAnimation from "./HeartAnimation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface MainPageProps {
  username: string;
  onLogout: () => void;
}

const getStorageKey = (username: string) => `universities_${username}`;

const MainPage = ({ username, onLogout }: MainPageProps) => {
  // Load user's saved data from localStorage, or use defaults
  const [universities, setUniversities] = useState<University[]>(() => {
    const saved = localStorage.getItem(getStorageKey(username));
    return saved ? JSON.parse(saved) : initialUniversities;
  });

  // Save to localStorage whenever universities change
  useEffect(() => {
    localStorage.setItem(getStorageKey(username), JSON.stringify(universities));
  }, [universities, username]);
  const [showHeart, setShowHeart] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger fade in
  useState(() => {
    setTimeout(() => setIsVisible(true), 100);
  });

  const handleAddUniversity = useCallback((newUni: Omit<University, "id">) => {
    const id = Date.now().toString();
    setUniversities((prev) => [...prev, { ...newUni, id }]);
  }, []);

  const handleDeleteUniversity = useCallback((id: string) => {
    setUniversities((prev) => prev.filter((uni) => uni.id !== id));
  }, []);

  const handleShowHeart = useCallback(() => {
    setShowHeart(true);
  }, []);

  const handleHeartComplete = useCallback(() => {
    setShowHeart(false);
  }, []);

  return (
    <>
      <div
        className={`min-h-screen gradient-warm transition-opacity duration-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-md border-b border-border shadow-soft">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎓</span>
              <h1 className="text-xl md:text-2xl font-display text-gradient-love">
                University Explorer
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm md:text-base text-muted-foreground">
                Hey, <span className="font-semibold text-foreground">{username}</span>! 💕
              </span>
              <Button
                onClick={onLogout}
                variant="outline"
                size="sm"
                className="rounded-lg border-border hover:bg-accent hover:text-accent-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Find Your Dream University ✨
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore top universities worldwide with scholarships, fees, and admission details all in one place.
            </p>
          </div>

          <UniversityTable
            universities={universities}
            onAddUniversity={handleAddUniversity}
            onDeleteUniversity={handleDeleteUniversity}
          />
        </main>

        {/* Footer spacing for snake */}
        <div className="h-24" />
      </div>

      {/* Snake Animation */}
      <SnakeAnimation onShowHeart={handleShowHeart} />

      {/* Heart Animation Overlay */}
      {showHeart && <HeartAnimation onComplete={handleHeartComplete} />}
    </>
  );
};

export default MainPage;
