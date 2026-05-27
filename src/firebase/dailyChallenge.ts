import {
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "./config";

const challenges = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing consistently improves both speed and focus.",
  "Discipline compounds into remarkable results over time.",
  "Every expert was once a complete beginner.",
  "Small progress each day creates huge long term growth.",
];

const getTodayId = () => {
  const today = new Date();

  return `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
};

export const getDailyChallenge =
  async () => {
    const id = getTodayId();

    const ref = doc(
      collection(db, "dailyChallenges"),
      id
    );

    const snapshot = await getDoc(ref);

    if (snapshot.exists()) {
      return {
        id,
        ...snapshot.data(),
      };
    }

    const randomText =
      challenges[
        Math.floor(
          Math.random() * challenges.length
        )
      ];

    const challenge = {
      text: randomText,
      createdAt: new Date(),
    };

    await setDoc(ref, challenge);

    return {
      id,
      ...challenge,
    };
  };