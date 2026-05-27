import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "./config";
import type { Score } from "../types/score";

export const subscribeToLeaderboard = (
  callback: (scores: Score[]) => void
) => {
  const q = query(
    collection(db, "scores"),
    orderBy("wpm", "desc"),
    limit(20)
  );

  return onSnapshot(q, (snapshot) => {
    const scores = snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    ) as Score[];

    callback(scores);
  });
};