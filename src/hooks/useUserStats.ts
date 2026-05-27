import { useEffect, useState } from "react";

import { getUserScores } from "../firebase/userStats";
import useAuth from "./useAuth";

const useUserStats = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalTests: 0,
    bestWpm: 0,
    averageWpm: 0,
    averageAccuracy: 0,
    totalMistakes: 0,
  });

  useEffect(() => {
    if (!user) {
      queueMicrotask(() => {
        setStats({
          totalTests: 0,
          bestWpm: 0,
          averageWpm: 0,
          averageAccuracy: 0,
          totalMistakes: 0,
        });
        setLoading(false);
      });
      return;
    }

    const fetchStats = async () => {
      try {
        const scores = await getUserScores(user.uid);

        if (scores.length === 0) {
          setLoading(false);
          return;
        }

        const totalTests = scores.length;

        const bestWpm = Math.max(
          ...scores.map((s) => s.wpm)
        );

        const averageWpm = Math.round(
          scores.reduce((acc, s) => acc + s.wpm, 0) /
            totalTests
        );

        const averageAccuracy = Math.round(
          scores.reduce(
            (acc, s) => acc + s.accuracy,
            0
          ) / totalTests
        );

        const totalMistakes = scores.reduce(
          (acc, s) => acc + s.mistakes,
          0
        );

        setStats({
          totalTests,
          bestWpm,
          averageWpm,
          averageAccuracy,
          totalMistakes,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  return {
    stats,
    loading,
  };
};

export default useUserStats;