import type { Timestamp } from "firebase/firestore";

export interface Challenge {
  id: string;

  text: string;

  createdAt: Timestamp | null;
}
// export interface Challenge