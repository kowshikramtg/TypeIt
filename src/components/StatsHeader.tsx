import type { Theme } from "../types/theme";

type StatsHeaderProps = {
  timeLeft: number;
  bestWpm: number;
  mode: "words" | "code";
  theme: Theme;
};

const StatsHeader = ({ timeLeft, bestWpm, mode, theme }: StatsHeaderProps) => {
  return (
    <div className="w-full max-w-5xl mb-12">
      <div className="flex items-center gap-16">
        <div
          className={`
            text-3xl
            font-mono
            font-bold
            ${theme.accent}
          `}
        >
          {timeLeft}
        </div>

        <div className="text-gray-600 font-mono text-lg">best: {bestWpm}</div>

        <div className="text-gray-600 font-mono text-lg capitalize">
          mode: {mode}
        </div>
      </div>
    </div>
  );
};

export default StatsHeader;
