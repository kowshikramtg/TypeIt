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
    return <div className={theme.sub}>Loading challenge...</div>;
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => {
          setDailyMode((prev) => !prev);
        }}
        className={`
          transition-all
          duration-200
          rounded-full
          px-4
          py-2
          font-semibold
          ${dailyMode ? `${theme.active} ${theme.accent}` : theme.sub}
          hover:brightness-110
        `}
      >
        daily
      </button>

      {dailyMode && (
        <div
          className={`font-mono text-xs tracking-widest uppercase ${theme.accent}`}
        >
          {challenge?.text}
        </div>
      )}
    </div>
  );
};

export default DailyChallenge;
