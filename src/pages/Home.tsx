import { useState } from "react";
import TypingBox from "../components/TypingBox";
import Navigation from "../components/Navigation";
import AnalyticsPage from "../components/AnalyticsPage";
import GroupPlayPage from "../components/GroupPlayPage";
import themes from "../data/theme";
import type { Theme } from "../types/theme";
import useLocalStorage from "../hooks/useLocalStorage";

const Home = () => {
  const [currentView, setCurrentView] = useState<
    "typing" | "analytics" | "groupplay"
  >("typing");
  const [isFocusMode, setIsFocusMode] = useState(false);

  const [themeName, setThemeName] = useLocalStorage("typeit-theme", "default");
  const [theme, setTheme] = useState<Theme>(
    themes[themeName as keyof typeof themes],
  );

  return (
    <div
      className={`min-h-screen overflow-x-hidden ${theme.background} ${theme.text}`}
    >
      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
        theme={theme}
        isFocusMode={isFocusMode}
      />

      <div className="pt-14">
        {currentView === "typing" && (
          <TypingBox
            theme={theme}
            themeName={themeName}
            setThemeName={setThemeName}
            setTheme={setTheme}
            setIsFocusMode={setIsFocusMode}
          />
        )}

        {currentView === "analytics" && <AnalyticsPage theme={theme} />}

        {currentView === "groupplay" && <GroupPlayPage theme={theme} />}
      </div>
    </div>
  );
};

export default Home;
