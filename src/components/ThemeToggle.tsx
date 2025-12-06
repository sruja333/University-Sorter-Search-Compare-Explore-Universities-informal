import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Default to dark mode
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className="rounded-full border-border hover:bg-accent hover:text-accent-foreground transition-all"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-love-pink" />
      ) : (
        <Moon className="w-4 h-4 text-love-pink" />
      )}
    </Button>
  );
};

export default ThemeToggle;
