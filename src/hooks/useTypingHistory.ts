import { useEffect, useState } from "react";

import type { Score } from "../types/score";
import useAuth from "./useAuth";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/config";

const useTypingHistory = () => {
  const { user, loading: authLoading } = useAuth();

  const [history, setHistory] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      queueMicrotask(() => {
        setHistory([]);
        setLoading(false);
      });
      return;
    }

    const q = query(
      collection(db, "scores"),
      where("uid", "==", user.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt || null,
        })) as Score[];
        
        // Sort locally since we removed orderBy to avoid missing composite index
        data.sort((a, b) => {
          const timeA = a.createdAt?.toMillis?.() || 0;
          const timeB = b.createdAt?.toMillis?.() || 0;
          return timeB - timeA;
        });

        setHistory(data);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching history:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, authLoading]);

  return {
    history,
    loading,
  };
};

export default useTypingHistory;