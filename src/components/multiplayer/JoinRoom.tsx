import { useState } from "react";

import { joinRoom } from "../../firebase/rooms";

import useAuth from "../../hooks/useAuth";

type Props = {
  setRoomId: React.Dispatch<
    React.SetStateAction<string>
  >;
};

const JoinRoom = ({
  setRoomId,
}: Props) => {
  const { user } = useAuth();

  const [input, setInput] =
    useState("");

  const handleJoin = async () => {
    if (!user || !input) return;

    await joinRoom(input, {
      uid: user.uid,
      name: user.displayName || "Player",
      photoURL: user.photoURL || "",
    });

    setRoomId(input);
  };

  return (
    <div className="flex gap-3">
      <input
        value={input}
        onChange={(e) =>
          setInput(e.target.value)
        }
        placeholder="Room code"
        className="
          px-4
          py-3
          rounded-xl
          bg-white/5
          text-white
          outline-none
        "
      />

      <button
        onClick={handleJoin}
        className="
          px-5
          py-3
          rounded-xl
          bg-cyan-500
          text-black
          font-semibold
        "
      >
        Join
      </button>
    </div>
  );
};

export default JoinRoom;