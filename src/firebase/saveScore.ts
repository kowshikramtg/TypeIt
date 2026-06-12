import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import db from "./db";
import { savePlayerStats } from "./leaderboard";

type SaveScoreProps = {
  uid: string;

  name: string;

  photoURL: string;

  wpm: number;

  accuracy: number;

  mistakes: number;
  mode?: "words" | "code" | "daily";
  duration?: number;
  wordCount?: number;
};

const saveScore = async ({
  uid,
  name,
  photoURL,
  wpm,
  accuracy,
  mistakes,
  mode,
  duration,
  wordCount,
}: SaveScoreProps) => {
  try {
    await addDoc(
      collection(db, "scores"),
      {
        uid,
        name,
        photoURL,

        wpm,
        accuracy,
        mistakes,
        mode,
        duration,
        wordCount,

        createdAt:
          serverTimestamp(),
      }
    );

    await savePlayerStats(
      uid,
      name,
      photoURL,
      wpm,
      accuracy,
      false
    );
  } catch (error) {
    console.error(
      "Error saving score:",
      error
    );
  }
};

export default saveScore;