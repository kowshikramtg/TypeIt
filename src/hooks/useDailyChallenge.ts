import { useEffect, useState } from "react";

import { getDailyChallenge } from "../firebase/dailyChallenge";

import type { Challenge } from "../types/challenge";

const useDailyChallenge = () => {
  const [challenge, setChallenge] =
    useState<Challenge | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const data =
          await getDailyChallenge();

        setChallenge(data as Challenge);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, []);

  return {
    challenge,
    loading,
  };
};

export default useDailyChallenge;