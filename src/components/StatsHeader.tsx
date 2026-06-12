import type { Theme } from "../types/theme";

type StatsHeaderProps = {
  timeLeft: number;
  bestWpm: number;
  mode: "words" | "code";
  theme: Theme;
};

const StatsHeader = ({ timeLeft, bestWpm, mode, theme }: StatsHeaderProps) => {
  return (
    <div className="w-full max-w-5xl">
      <div className="flex items-center gap-12">
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

        <div className={`${theme.sub} font-mono text-lg`}>best: {bestWpm}</div>

        <div className={`${theme.sub} font-mono text-lg capitalize`}>
          mode: {mode}
        </div>
      </div>
    </div>
  );
};

export default StatsHeader;
