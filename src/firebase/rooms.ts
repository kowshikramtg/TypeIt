import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";

import { db } from "./config";
import type { Room, RoomPlayer } from "../types/room";

// Room creation with full configuration
export const createRoom = async (
  host: RoomPlayer,
  name: string,
  duration: 15 | 30 | 60 | 120,
  mode: "words" | "code" | "custom",
  isPublic: boolean
) => {
  const roomCode = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();

  const roomId = Math.random()
    .toString(36)
    .substring(2, 12);

  const room: Room = {
    id: roomId,
    code: roomCode,
    hostId: host.uid,
    name,
    duration,
    mode,
    isPublic,
    players: [{ ...host, isReady: false }],
    raceText: "",
    status: "waiting",
    createdAt:
      serverTimestamp() as ReturnType<typeof serverTimestamp>,
    updatedAt:
      serverTimestamp() as ReturnType<typeof serverTimestamp>,
  };

  await setDoc(doc(collection(db, "rooms"), roomId), room);
  return { roomId, roomCode };
};

// Join room by code
export const joinRoom = async (
  roomCode: string,
  player: RoomPlayer
) => {
  const q = query(
    collection(db, "rooms"),
    where("code", "==", roomCode),
    limit(1)
  );
  const snapshot = await getDocs(q);

  if (snapshot.empty) throw new Error("Room not found");

  const roomDoc = snapshot.docs[0];
  const room = roomDoc.data() as Room;

  if (room.status !== "waiting") {
    throw new Error("Room race has already started");
  }

  const alreadyJoined = room.players.some(
    (p) => p.uid === player.uid
  );

  if (alreadyJoined) {
    return { roomId: room.id, roomCode };
  }

  await updateDoc(doc(collection(db, "rooms"), room.id), {
    players: [
      ...room.players,
      { ...player, isReady: false },
    ],
    updatedAt: serverTimestamp(),
  });

  return { roomId: room.id, roomCode };
};

// Quick join a public room
export const quickJoinRoom = async (player: RoomPlayer) => {
  const q = query(
    collection(db, "rooms"),
    where("status", "==", "waiting"),
    where("isPublic", "==", true),
    limit(5)
  );
  const snapshot = await getDocs(q);

  if (snapshot.empty) throw new Error("No public rooms available");

  // Find a room that isn't full (assuming max 10 players for now)
  const availableRoomDoc = snapshot.docs.find(doc => {
    const data = doc.data() as Room;
    return data.players.length < 10;
  });

  if (!availableRoomDoc) throw new Error("All public rooms are full");

  const room = availableRoomDoc.data() as Room;
  const alreadyJoined = room.players.some((p) => p.uid === player.uid);

  if (!alreadyJoined) {
    await updateDoc(doc(collection(db, "rooms"), room.id), {
      players: [
        ...room.players,
        { ...player, isReady: false },
      ],
      updatedAt: serverTimestamp(),
    });
  }

  return { roomId: room.id, roomCode: room.code };
};

// Leave room
export const leaveRoom = async (
  roomId: string,
  userId: string
) => {
  const roomRef = doc(collection(db, "rooms"), roomId);
  const snapshot = await getDoc(roomRef);

  if (!snapshot.exists()) return;

  const room = snapshot.data() as Room;

  if (room.hostId === userId) {
    // Host leaving - delete room
    await deleteDoc(roomRef);
  } else {
    // Player leaving - remove from players
    const updatedPlayers = room.players.filter(
      (p) => p.uid !== userId
    );

    await updateDoc(roomRef, {
      players: updatedPlayers,
      updatedAt: serverTimestamp(),
    });
  }
};

// Toggle player ready status
export const setPlayerReady = async (
  roomId: string,
  userId: string,
  isReady: boolean
) => {
  const roomRef = doc(collection(db, "rooms"), roomId);
  const snapshot = await getDoc(roomRef);

  if (!snapshot.exists()) return;

  const room = snapshot.data() as Room;
  const updatedPlayers = room.players.map((p) =>
    p.uid === userId ? { ...p, isReady } : p
  );

  await updateDoc(roomRef, {
    players: updatedPlayers,
    updatedAt: serverTimestamp(),
  });
};

// Get random typing text based on mode
const getRandomText = (mode: "words" | "code" | "custom") => {
  const wordTexts = [
    "Discipline creates opportunities that motivation alone never can.",
    "Typing consistently improves speed accuracy and concentration over time.",
    "Small daily progress eventually creates extraordinary long term results.",
    "Focused practice builds mastery more effectively than random repetition.",
  ];

  const codeTexts = [
    "const greeting = (name) => `Hello, ${name}!`;",
    "function fibonacci(n) { return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2); }",
    "const sum = (arr) => arr.reduce((a, b) => a + b, 0);",
    "const debounce = (fn, delay) => { let timeout; return (...args) => { clearTimeout(timeout); timeout = setTimeout(() => fn(...args), delay); }; };",
  ];

  const texts = mode === "code" ? codeTexts : wordTexts;
  return texts[Math.floor(Math.random() * texts.length)];
};

// Start race with countdown
export const startRaceCountdown = async (roomId: string) => {
  const roomRef = doc(collection(db, "rooms"), roomId);
  const snapshot = await getDoc(roomRef);

  if (!snapshot.exists()) return;

  const room = snapshot.data() as Room;

  // Reset player progress
  const resetPlayers = room.players.map((p) => ({
    ...p,
    progress: 0,
    wpm: 0,
    accuracy: 100,
    mistakes: 0,
    finishTime: undefined,
  }));

  const raceText = getRandomText(room.mode);

  await updateDoc(roomRef, {
    raceText,
    status: "countdown",
    countdownValue: 3,
    players: resetPlayers,
    updatedAt: serverTimestamp(),
  });
};

// Update countdown
export const updateCountdown = async (
  roomId: string,
  value: number
) => {
  const roomRef = doc(collection(db, "rooms"), roomId);

  if (value <= 0) {
    await updateDoc(roomRef, {
      status: "running",
      startedAt: serverTimestamp(),
      countdownValue: 0,
      updatedAt: serverTimestamp(),
    });
  } else {
    await updateDoc(roomRef, {
      countdownValue: value,
      updatedAt: serverTimestamp(),
    });
  }
};

// Update player progress during race
export const updatePlayerProgress = async (
  roomId: string,
  userId: string,
  progress: number,
  wpm: number,
  accuracy: number,
  mistakes: number,
  finishTime?: number
) => {
  const roomRef = doc(collection(db, "rooms"), roomId);
  const snapshot = await getDoc(roomRef);

  if (!snapshot.exists()) return;

  const room = snapshot.data() as Room;
  const updatedPlayers = room.players.map((p) =>
    p.uid === userId
      ? {
          ...p,
          progress,
          wpm,
          accuracy,
          mistakes,
          ...(finishTime && { finishTime }),
        }
      : p
  );

  await updateDoc(roomRef, {
    players: updatedPlayers,
    updatedAt: serverTimestamp(),
  });
};

// Finish race
export const finishRace = async (roomId: string) => {
  const roomRef = doc(collection(db, "rooms"), roomId);

  await updateDoc(roomRef, {
    status: "finished",
    updatedAt: serverTimestamp(),
  });
};

// Get room by ID
export const getRoom = async (
  roomId: string
): Promise<Room | null> => {
  const snapshot = await getDoc(
    doc(collection(db, "rooms"), roomId)
  );

  if (!snapshot.exists()) return null;

  return snapshot.data() as Room;
};

// Subscribe to room changes
export const subscribeToRoom = (
  roomId: string,
  onUpdate: (room: Room | null) => void
) => {
  const roomRef = doc(collection(db, "rooms"), roomId);

  return onSnapshot(
    roomRef,
    (snapshot) => {
      if (snapshot.exists()) {
        onUpdate(snapshot.data() as Room);
      } else {
        onUpdate(null);
      }
    },
    (error) => {
      console.error("Error subscribing to room:", error);
      onUpdate(null);
    }
  );
};

// Remove player from room (host only)
export const removePlayer = async (
  roomId: string,
  playerUid: string
) => {
  const roomRef = doc(collection(db, "rooms"), roomId);
  const snapshot = await getDoc(roomRef);

  if (!snapshot.exists()) return;

  const room = snapshot.data() as Room;
  const updatedPlayers = room.players.filter(
    (p) => p.uid !== playerUid
  );

  await updateDoc(roomRef, {
    players: updatedPlayers,
    updatedAt: serverTimestamp(),
  });
};

// Save race results
export const saveRaceResults = async (
  roomId: string,
  results: RoomPlayer[]
) => {
  const roomRef = doc(collection(db, "rooms"), roomId);

  await updateDoc(roomRef, {
    players: results,
    status: "finished",
    updatedAt: serverTimestamp(),
  });
};
