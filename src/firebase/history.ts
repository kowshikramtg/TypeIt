import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { db } from "./config";
import type { Score } from "../types/score";

export const getTypingHistory = async (
  uid: string
): Promise<Score[]> => {
  const q = query(
    collection(db, "scores"),
    where("uid", "==", uid),
    orderBy("createdAt", "desc"),
    limit(15)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Score[];
};