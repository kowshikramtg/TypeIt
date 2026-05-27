import { useEffect, useState } from "react";

import type { Score } from "../types/score";

import { subscribeToLeaderboard } from "../firebase/leaderboard";

const useLeaderboard = () => {
  const [scores, setScores] = useState<
    Score[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const unsubscribe =
      subscribeToLeaderboard((data) => {
        setScores(data);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  return {
    scores,
    loading,
  };
};

export default useLeaderboard;