import { useState, useCallback } from "react";
import IntroAnimation from "@/components/IntroAnimation";
import LoginPage from "@/components/LoginPage";
import MainPage from "@/components/MainPage";

type AppState = "intro" | "login" | "main";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("intro");
  const [username, setUsername] = useState("");

  const handleIntroComplete = useCallback(() => {
    setAppState("login");
  }, []);

  const handleLogin = useCallback((user: string) => {
    setUsername(user);
    setAppState("main");
  }, []);

  const handleLogout = useCallback(() => {
    setUsername("");
    setAppState("login");
  }, []);

  return (
    <>
      {appState === "intro" && (
        <IntroAnimation onComplete={handleIntroComplete} />
      )}
      
      {appState === "login" && (
        <LoginPage onLogin={handleLogin} />
      )}
      
      {appState === "main" && (
        <MainPage username={username} onLogout={handleLogout} />
      )}
    </>
  );
};

export default Index;
