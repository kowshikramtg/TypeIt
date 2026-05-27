import type { Score } from "../types/score";
import { motion } from "framer-motion";

type Props = {
  score: Score;
  rank: number;
};

const LeaderboardRow = ({ score, rank }: Props) => {
  return (
    <motion.div
    layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-center justify-between py-3 border-b border-white/5"
    >
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
    </motion.div>
  );
};

export default LeaderboardRow;