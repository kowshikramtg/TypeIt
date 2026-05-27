import { useState } from "react";
import TypingBox from "../components/TypingBox";
import Navigation from "../components/Navigation";
import AnalyticsPage from "../components/AnalyticsPage";
import GroupPlayPage from "../components/GroupPlayPage";

const Home = () => {
  const [currentView, setCurrentView] = useState<
    "typing" | "analytics" | "groupplay"
  >("typing");

  return (
    <div className="w-full min-h-screen bg-zinc-950">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />

      <div className="pt-16">
        {currentView === "typing" && (
          <div className="w-screen min-h-screen bg-gradient-to-b from-zinc-950 via-purple-950/20 to-zinc-950 overflow-hidden">
            <TypingBox />
          </div>
        )}

        {currentView === "analytics" && <AnalyticsPage />}

        {currentView === "groupplay" && <GroupPlayPage />}
      </div>
    </div>
  );
};

export default Home;
