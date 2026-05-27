import { useEffect, useState } from "react";

import { Score } from "../types/score";
import { useAuth } from "./useAuth";
import { getTypingHistory } from "../firebase/history";

const useTypingHistory = () => {
  const { user } = useAuth();

  const [history, setHistory] = useState<Score[]>(
    []
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchHistory = async () => {
      try {
        const data = await getTypingHistory(
          user.uid
        );

        setHistory(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  return {
    history,
    loading,
  };
};

export default useTypingHistory;