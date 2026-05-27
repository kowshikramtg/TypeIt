import TypingBox from "../components/TypingBox";

import Leaderboard from "../components/Leaderboard";
import UserStatsCard from "../components/UserStatsCard";
import HistoryList from "../components/HistoryList";
import StreakCard from "../components/StreakCard";

import AnalyticsCard from "../components/analytics/AnalyticsCard";

const Home = () => {
  return (
    <main className="min-h-screen bg-black px-6 py-10">
      <div className="space-y-12">
        <TypingBox />

        <StreakCard />

        <UserStatsCard />

        <AnalyticsCard />

        <Leaderboard />

        <HistoryList />
      </div>
    </main>
  );
};

export default Home;