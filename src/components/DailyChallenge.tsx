type DailyChallengeProps = {
  dailyMode: boolean;
  setDailyMode: React.Dispatch<React.SetStateAction<boolean>>;
  theme: any;
  dailyChallengeTitle: string;
};

const DailyChallenge = ({
  dailyMode,
  setDailyMode,
  theme,
  dailyChallengeTitle,
}: DailyChallengeProps) => {
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
          daily challenge: {dailyChallengeTitle}
        </div>
      )}
    </div>
  );
};

export default DailyChallenge;
