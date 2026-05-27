import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./config";

import type {
  Room,
  RoomPlayer,
} from "../types/room";

export const createRoom = async (
  roomId: string,
  host: RoomPlayer
) => {
  const room: Room = {
    id: roomId,

    hostId: host.uid,

    players: [host],

    createdAt: serverTimestamp() as ReturnType<typeof serverTimestamp>,

    raceText: "",

    countdown: null,

    status: "waiting",
  };

  await setDoc(
    doc(collection(db, "rooms"), roomId),
    room
  );
};

export const joinRoom = async (
  roomId: string,
  player: RoomPlayer
) => {
  const roomRef = doc(
    collection(db, "rooms"),
    roomId
  );

  const snapshot = await getDoc(roomRef);

  if (!snapshot.exists()) return;

  const data = snapshot.data() as Room;

  const alreadyJoined =
    data.players.some(
      (p) => p.uid === player.uid
    );

  if (alreadyJoined) return;

  await updateDoc(roomRef, {
    players: [...data.players, player],
  });
};

const raceTexts = [
  "Discipline creates opportunities that motivation alone never can.",

  "Typing consistently improves speed accuracy and concentration over time.",

  "Small daily progress eventually creates extraordinary long term results.",

  "Focused practice builds mastery more effectively than random repetition.",
];

export const startRace = async (
  roomId: string
) => {
  const roomRef = doc(
    collection(db, "rooms"),
    roomId
  );

  const snapshot = await getDoc(roomRef);

  if (!snapshot.exists()) return;

  const room = snapshot.data() as Room;

  const randomText =
    raceTexts[
      Math.floor(
        Math.random() * raceTexts.length
      )
    ];

  await updateDoc(roomRef, {
    status: "countdown",

    raceText: randomText,

    countdown: 5,

    players: room.players.map((player) => ({
      ...player,
      progress: 0,
    })),
  });
};

export const updatePlayerProgress =
  async (
    roomId: string,
    uid: string,
    progress: number
  ) => {
    const roomRef = doc(
      collection(db, "rooms"),
      roomId
    );

    const snapshot =
      await getDoc(roomRef);

    if (!snapshot.exists()) return;

    const room =
      snapshot.data() as Room;

    const updatedPlayers =
      room.players.map((player) => {
        if (player.uid === uid) {
          return {
            ...player,
            progress,
          };
        }

        return player;
      });

    await updateDoc(roomRef, {
      players: updatedPlayers,
    });
  };