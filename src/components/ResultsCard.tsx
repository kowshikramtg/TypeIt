type ResultsCardProps = {
  wpm: number;
  accuracy: number;
  mistakes: number;
  theme: any;
};

const ResultsCard = ({ wpm, accuracy, mistakes, theme }: ResultsCardProps) => {
  return (
    <div
      className="
        w-full
        max-w-5xl
        mt-24
        p-10
        rounded-2xl
        backdrop-blur
        flex
        gap-20
        font-mono
      "
    >
      <div>
        <p className="text-gray-500 text-sm mb-1 uppercase tracking-widest">
          WPM
        </p>

        <h2 className={`text-7xl font-bold ${theme.accent}`}>{wpm}</h2>
      </div>

      <div>
        <p className="text-gray-500 text-sm mb-1 uppercase tracking-widest">
          Accuracy
        </p>

        <h2 className={`text-7xl font-bold ${theme.accent}`}>{accuracy}%</h2>
      </div>

      <div>
        <p className="text-gray-500 text-sm mb-1 uppercase tracking-widest">
          Mistakes
        </p>

        <h2 className={`text-7xl font-bold ${theme.accent}`}>{mistakes}</h2>
      </div>
    </div>
  );
};

export default ResultsCard;
