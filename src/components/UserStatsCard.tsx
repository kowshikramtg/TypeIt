import useUserStats from "../hooks/useUserStats";

const UserStatsCard = () => {
  const { stats, loading } = useUserStats();

  if (loading) {
    return (
      <div className="text-zinc-500">
        Loading stats...
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-md">
        <h2 className="text-2xl text-zinc-200 mb-6">
          Your Statistics
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatBox
            label="Tests"
            value={stats.totalTests}
          />

          <StatBox
            label="Best WPM"
            value={stats.bestWpm}
          />

          <StatBox
            label="Avg WPM"
            value={stats.averageWpm}
          />

          <StatBox
            label="Accuracy"
            value={`${stats.averageAccuracy}%`}
          />

          <StatBox
            label="Mistakes"
            value={stats.totalMistakes}
          />
        </div>
      </div>
    </div>
  );
};

type StatBoxProps = {
  label: string;
  value: string | number;
};

const StatBox = ({
  label,
  value,
}: StatBoxProps) => {
  return (
    <div className="bg-black/20 rounded-xl p-4 text-center">
      <p className="text-zinc-500 text-sm">
        {label}
      </p>

      <h3 className="text-2xl text-zinc-100 mt-2">
        {value}
      </h3>
    </div>
  );
};

export default UserStatsCard;