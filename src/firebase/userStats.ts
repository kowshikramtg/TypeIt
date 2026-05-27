import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "./config";
import { Score } from "../types/score";

export const getUserScores = async (
  uid: string
): Promise<Score[]> => {
  const q = query(
    collection(db, "scores"),
    where("uid", "==", uid)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Score[];
};