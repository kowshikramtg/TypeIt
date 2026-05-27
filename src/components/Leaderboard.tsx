import useLeaderboard from "../hooks/useLeaderboard";
import LeaderboardRow from "./LeaderboardRow";

const Leaderboard = () => {
  const { scores, loading } = useLeaderboard();

  if (loading) {
    return (
      <div className="text-zinc-500">
        Loading leaderboard...
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl text-zinc-200 mb-6">
        Global Leaderboard
      </h2>

      <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-md">
        {scores.map((score, index) => (
          <LeaderboardRow
            key={score.id}
            score={score}
            rank={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;