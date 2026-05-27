import type { Score } from "../types/score";

type Props = {
  score: Score;
};

const HistoryRow = ({ score }: Props) => {
  const date = score.createdAt?.toDate
    ? score.createdAt.toDate()
    : new Date();

  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5">
      <div>
        <p className="text-zinc-200">
          {score.wpm} WPM
        </p>

        <p className="text-zinc-500 text-sm">
          {date.toLocaleDateString()}
        </p>
      </div>

      <div className="flex items-center gap-6">
        <span className="text-zinc-400">
          {score.accuracy}%
        </span>

        <span className="text-red-400">
          {score.mistakes} mistakes
        </span>
      </div>
    </div>
  );
};

export default HistoryRow;