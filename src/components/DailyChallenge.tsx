import useDailyChallenge from "../hooks/useDailyChallenge";

import type { Theme } from "../types/theme";

type DailyChallengeProps = {
  dailyMode: boolean;
  setDailyMode: React.Dispatch<React.SetStateAction<boolean>>;
  theme: Theme;
};

const DailyChallenge = ({
  dailyMode,
  setDailyMode,
  theme,
}: DailyChallengeProps) => {
  const { challenge, loading } = useDailyChallenge();

  if (loading) {
    return <div className="text-zinc-500">Loading challenge...</div>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={() => {
          setDailyMode((prev) => !prev);
        }}
        className={`
          transition-colors
          duration-200
          cursor-pointer
          font-mono
          text-lg
          ${dailyMode ? theme.accent : "text-gray-600"}
        `}
      >
        daily
      </button>

      {dailyMode && (
        <div
          className={`
            font-mono
            text-sm
            tracking-widest
            uppercase
            ${theme.accent}
          `}
        >
          daily challenge: {challenge?.text}
        </div>
      )}
    </div>
  );
};

export default DailyChallenge;
