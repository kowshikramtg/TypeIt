import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "./config";
import { Score } from "../types/score";

export const getTopScores = async (): Promise<Score[]> => {
  const q = query(
    collection(db, "scores"),
    orderBy("wpm", "desc"),
    limit(20)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Score[];
};