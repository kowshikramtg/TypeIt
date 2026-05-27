import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import db from "./db";

type SaveScoreProps = {
  uid: string;

  name: string;

  photoURL: string;

  wpm: number;

  accuracy: number;

  mistakes: number;
};

const saveScore = async ({
  uid,
  name,
  photoURL,
  wpm,
  accuracy,
  mistakes,
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

        createdAt:
          serverTimestamp(),
      }
    );
  } catch (error) {
    console.error(
      "Error saving score:",
      error
    );
  }
};

export default saveScore;