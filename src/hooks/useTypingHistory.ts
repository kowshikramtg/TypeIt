import { useEffect, useState } from "react";

import type { Score } from "../types/score";
import useAuth from "./useAuth";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/config";

const useTypingHistory = () => {
  const { user } = useAuth();

  const [history, setHistory] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      queueMicrotask(() => {
        setHistory([]);
        setLoading(false);
      });
      return;
    }

    const q = query(
      collection(db, "scores"),
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt || null,
        })) as Score[];
        setHistory(data);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching history:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return {
    history,
    loading,
  };
};

export default useTypingHistory;