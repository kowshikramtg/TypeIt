import useStreak from "../hooks/useStreak";

const StreakCard = () => {
  const {
    currentStreak,
    longestStreak,
  } = useStreak();

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-md">
        <h2 className="text-2xl text-zinc-200 mb-6">
          Typing Streak
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/20 rounded-xl p-5 text-center">
            <p className="text-zinc-500">
              Current Streak
            </p>

            <h3 className="text-4xl text-yellow-400 mt-2">
              {currentStreak}
            </h3>

            <p className="text-zinc-500 mt-1">
              days
            </p>
          </div>

          <div className="bg-black/20 rounded-xl p-5 text-center">
            <p className="text-zinc-500">
              Longest Streak
            </p>

            <h3 className="text-4xl text-cyan-400 mt-2">
              {longestStreak}
            </h3>

            <p className="text-zinc-500 mt-1">
              days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakCard;