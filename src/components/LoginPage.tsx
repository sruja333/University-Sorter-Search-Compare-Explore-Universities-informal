import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface LoginPageProps {
  onLogin: (username: string) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animation on mount
  useState(() => {
    setTimeout(() => setIsVisible(true), 100);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      toast.error("Please enter a username 💔");
      return;
    }

    if (password !== "habibi") {
      toast.error("Wrong password! Hint: Think of what I call you 😘");
      return;
    }

    toast.success(`Welcome, ${username}! 💕`);
    onLogin(username);
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-warm p-4">
      <div
        className={`w-full max-w-md transition-all duration-700 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="bg-card rounded-2xl shadow-card p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-display text-gradient-love">
              Hello!
            </h1>
            <p className="text-muted-foreground">
              Enter your details to continue 💕
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="What should I call you?"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 rounded-xl border-border focus:ring-primary focus:border-primary transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter the secret word"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-xl border-border focus:ring-primary focus:border-primary transition-all"
              />
              <p className="text-sm text-muted-foreground italic pl-1">
                Hint: my nickname for you :)
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl gradient-love text-primary-foreground font-semibold text-lg shadow-soft hover:shadow-glow transition-all duration-300 hover:scale-[1.02]"
            >
              Let&apos;s Go! ✨
            </Button>
          </form>

          {/* Decorative hearts */}
          <div className="flex justify-center gap-2 pt-4">
            {["💗", "💖", "💕"].map((heart, i) => (
              <span
                key={i}
                className="text-2xl animate-float"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                {heart}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
