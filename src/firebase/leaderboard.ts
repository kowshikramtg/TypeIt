import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./config";
import type { Score } from "../types/score";

export const subscribeToLeaderboard = (
  callback: (scores: Score[]) => void,
  sortBy: "bestEffectiveWpm" | "bestWpm" | "avgWpm" | "wins" = "bestEffectiveWpm"
) => {
  const q = query(
    collection(db, "leaderboardStats"),
    orderBy(sortBy, "desc"),
    limit(20)
  );

  return onSnapshot(q, (snapshot) => {
    const scores = snapshot.docs.map(
      (doc) => {
        const data = doc.data();
        const acc = data.avgAccuracy || 100;
        const wpm = data.bestWpm || 0;
        const fallbackEwpm = Math.round(wpm * (acc / 100));
        
        return {
          id: doc.id,
          ...data,
          wpm: wpm,
          accuracy: acc,
          effectiveWpm: data.bestEffectiveWpm || fallbackEwpm,
        };
      }
    ) as Score[];

    callback(scores);
  });
};

export const savePlayerStats = async (
  uid: string,
  name: string,
  photoURL: string,
  wpm: number,
  accuracy: number,
  isWinner: boolean
) => {
  const statRef = doc(db, "leaderboardStats", uid);
  const snapshot = await getDoc(statRef);

  const currentEffectiveWpm = Math.round(wpm * (accuracy / 100));

  if (snapshot.exists()) {
    const data = snapshot.data();
    const totalRaces = (data.totalRaces || 0) + 1;
    const wins = (data.wins || 0) + (isWinner ? 1 : 0);
    const bestWpm = Math.max(data.bestWpm || 0, wpm);
    
    // Calculate old fallback effective wpm to ensure compatibility
    const oldFallbackEwpm = Math.round((data.bestWpm || 0) * ((data.avgAccuracy || 100) / 100));
    const bestEffectiveWpm = Math.max(
      data.bestEffectiveWpm || oldFallbackEwpm,
      currentEffectiveWpm
    );

    const avgWpm = Math.round(((data.avgWpm || 0) * (totalRaces - 1) + wpm) / totalRaces);
    const avgAccuracy = Math.round(((data.avgAccuracy || 100) * (totalRaces - 1) + accuracy) / totalRaces);

    await updateDoc(statRef, {
      name,
      photoURL,
      bestWpm,
      bestEffectiveWpm,
      avgWpm,
      avgAccuracy,
      wins,
      totalRaces,
      updatedAt: serverTimestamp(),
    });
  } else {
    await setDoc(statRef, {
      uid,
      name,
      photoURL,
      bestWpm: wpm,
      bestEffectiveWpm: currentEffectiveWpm,
      avgWpm: wpm,
      avgAccuracy: accuracy,
      wins: isWinner ? 1 : 0,
      totalRaces: 1,
      updatedAt: serverTimestamp(),
    });
  }
};