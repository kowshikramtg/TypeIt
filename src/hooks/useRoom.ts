import { useEffect, useState } from "react";

import {
  collection,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase/config";

import useAuth from "./useAuth";

import type { Room } from "../types/room";

const useRoom = (roomId: string) => {
  const { user } = useAuth();

  const [room, setRoom] =
    useState<Room | null>(null);

  useEffect(() => {
    if (!roomId) {
      queueMicrotask(() => setRoom(null));
      return;
    }

    const roomRef = doc(
      collection(db, "rooms"),
      roomId
    );

    const unsubscribe = onSnapshot(
      roomRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          queueMicrotask(() => setRoom(null));
          return;
        }

        setRoom(
          snapshot.data() as Room
        );
      }
    );

    return () => unsubscribe();
  }, [roomId]);


  useEffect(() => {
    if (!room || !user) return;

    if (room.hostId !== user.uid) return;

    if (room.status !== "countdown") return;

    if (room.countdown === null || room.countdown <= 0) return;

    const countdown = room.countdown;

    const timer = setTimeout(async () => {
      const roomRef = doc(
        collection(db, "rooms"),
        room.id
      );

      await updateDoc(roomRef, {
        countdown: countdown - 1,
        status:
          countdown - 1 <= 0
            ? "running"
            : "countdown",
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [room, user]);

  return room;
};

export default useRoom;