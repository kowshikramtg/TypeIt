import type { Timestamp } from "firebase/firestore";

export interface Score {
  id: string;

  uid: string;
  name: string;
  photoURL: string;

  wpm: number;
  accuracy: number;
  mistakes: number;
  mode?: "words" | "code" | "daily";
  duration?: number;
  wordCount?: number;

  createdAt: Timestamp | null;
}
// export interface Score