import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { db } from "./config";
import { Score } from "../types/score";

export const getUserActivity = async (
  uid: string
): Promise<Score[]> => {
  const q = query(
    collection(db, "scores"),
    where("uid", "==", uid),
    orderBy("createdAt", "asc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Score[];
};