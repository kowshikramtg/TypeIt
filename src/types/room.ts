import type { Timestamp } from "firebase/firestore";
import type { serverTimestamp } from "firebase/firestore";

export interface RoomPlayer {
  uid: string;
  name: string;
  photoURL: string;
  progress?: number;
}

export interface Room {
  id: string;

  hostId: string;

  players: RoomPlayer[];

  createdAt: Timestamp | null | ReturnType<typeof serverTimestamp>;

  raceText: string;

  countdown: number | null;

  status: "waiting" | "countdown" | "running" | "finished";
}