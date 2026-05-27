import { useEffect, useState } from "react";
import { getTopScores } from "../firebase/leaderboard";
import { Score } from "../types/score";

const useLeaderboard = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const data = await getTopScores();
        setScores(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  return {
    scores,
    loading,
  };
};

export default useLeaderboard;