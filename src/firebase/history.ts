import {
  collection,
  getDocs,
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
    where("uid", "==", uid)
  );

  const snapshot = await getDocs(q);

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt || null,
  })) as Score[];

  data.sort((a, b) => {
    const timeA = a.createdAt?.toMillis?.() || 0;
    const timeB = b.createdAt?.toMillis?.() || 0;
    return timeB - timeA;
  });

  return data.slice(0, 15);
};