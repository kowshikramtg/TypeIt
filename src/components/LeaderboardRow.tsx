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
        {score.effectiveWpm !== undefined && (
          <span className="text-yellow-400 font-bold w-20 text-right">
            {score.effectiveWpm} <span className="text-sm opacity-80">ewpm</span>
          </span>
        )}
        
        <span className="text-zinc-500 w-16 text-right">
          {score.wpm} <span className="text-xs opacity-70">raw</span>
        </span>

        <span className="text-zinc-400 w-16 text-right">
          {score.accuracy}% <span className="text-xs opacity-70">acc</span>
        </span>
      </div>
    </motion.div>
  );
};

export default LeaderboardRow;