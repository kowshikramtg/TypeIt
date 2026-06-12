import type { Timestamp } from "firebase/firestore";
import type { serverTimestamp } from "firebase/firestore";

export interface RoomPlayer {
  uid: string;
  name: string;
  photoURL: string;
  progress?: number;
  wpm?: number;
  accuracy?: number;
  mistakes?: number;
  finishTime?: number;
  isReady?: boolean;
}

export interface Room {
  id: string;
  code: string;
  hostId: string;
  name: string;
  
  // Settings
  duration: 15 | 30 | 60 | 120;
  mode: "words" | "code" | "custom";
  isPublic: boolean;
  
  // Players
  players: RoomPlayer[];
  
  // Race
  raceText: string;
  status: "waiting" | "countdown" | "running" | "finished";
  countdownValue?: number;
  startedAt?: Timestamp | number;
  
  // Meta
  createdAt: Timestamp | null | ReturnType<typeof serverTimestamp>;
  updatedAt: Timestamp | null | ReturnType<typeof serverTimestamp>;
}