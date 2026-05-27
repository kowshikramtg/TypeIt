import { useEffect } from "react";

import { updatePlayerProgress } from "../firebase/rooms";

import useAuth from "./useAuth";

type Props = {
  roomId: string;

  currentIndex: number;

  totalChars: number;
};

const useMultiplayerProgress = ({
  roomId,
  currentIndex,
  totalChars,
}: Props) => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    if (!roomId) return;

    if (totalChars <= 0) return;

    const progress = Math.min(
      100,
      Math.max(
        0,
        Math.floor((currentIndex / totalChars) * 100)
      )
    );

    const timeout = setTimeout(() => {
      updatePlayerProgress(
        roomId,
        user.uid,
        progress
      );
    }, 300);

    return () =>
      clearTimeout(timeout);
  }, [
    currentIndex,
    totalChars,
    roomId,
    user,
  ]);
};

export default useMultiplayerProgress;