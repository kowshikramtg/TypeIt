import type { Theme } from "../types/theme";

type ResultsCardProps = {
  wpm: number;
  accuracy: number;
  mistakes: number;
  theme: Theme;
};

const ResultsCard = ({ wpm, accuracy, mistakes, theme }: ResultsCardProps) => {
  return (
    <div
      className="
        w-full
        max-w-5xl
        mt-4
        p-8
        rounded-2xl
        backdrop-blur
        flex
        gap-10
        font-mono
        text-center
      "
    >
      <div className="flex-1">
        <p className={`${theme.sub} text-xs mb-1 uppercase tracking-widest`}>
          WPM
        </p>
        <h2 className={`text-5xl font-bold ${theme.accent}`}>{wpm}</h2>
      </div>
      <div className="flex-1">
        <p className={`${theme.sub} text-xs mb-1 uppercase tracking-widest`}>
          Accuracy
        </p>
        <h2 className={`text-5xl font-bold ${theme.accent}`}>{accuracy}%</h2>
      </div>
      <div className="flex-1">
        <p className={`${theme.sub} text-xs mb-1 uppercase tracking-widest`}>
          Mistakes
        </p>
        <h2 className={`text-5xl font-bold ${theme.accent}`}>{mistakes}</h2>
      </div>
    </div>
  );
};

export default ResultsCard;
