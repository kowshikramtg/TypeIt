import { Score } from "../types/score";

type Props = {
  score: Score;
  rank: number;
};

const LeaderboardRow = ({ score, rank }: Props) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5">
      <div className="flex items-center gap-3">
        <span className="text-zinc-500 w-6">
          #{rank}
        </span>

        <img
          src={score.photoURL}
          alt={score.name}
          className="w-8 h-8 rounded-full"
        />

        <span className="text-zinc-200">
          {score.name}
        </span>
      </div>

      <div className="flex items-center gap-6">
        <span className="text-yellow-400">
          {score.wpm} wpm
        </span>

        <span className="text-zinc-400">
          {score.accuracy}%
        </span>
      </div>
    </div>
  );
};

export default LeaderboardRow;