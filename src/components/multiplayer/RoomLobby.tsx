import useRoom from "../../hooks/useRoom";

import PlayerCard from "./PlayerCard";
import { startRace } from "../../firebase/rooms";

type Props = {
  roomId: string;
};

const RoomLobby = ({ roomId }: Props) => {
  const room = useRoom(roomId);

  if (!room) {
    return <div className="text-zinc-500">Loading room...</div>;
  }

  return (
    <div
      className="
        w-full
        max-w-2xl
        mx-auto
        mt-10
      "
    >
      <div
        className="
          bg-white/5
          rounded-2xl
          p-6
        "
      >
        <h2 className="text-2xl text-white mb-2">Room Lobby</h2>

        <p className="text-zinc-400 mb-6">Room Code: {room.id}</p>
        {room.status === "countdown" && (
          <div
            className="
      text-6xl
      font-bold
      text-yellow-400
      mb-6
      text-center
    "
          >
            {room.countdown}
          </div>
        )}
        {room.status === "running" && (
          <div
            className="
      bg-black/20
      p-5
      rounded-xl
      text-zinc-300
      leading-relaxed
      mb-6
    "
          >
            {room.raceText}
          </div>
        )}

        <div className="space-y-3">
          {room.players.map((player) => (
            <PlayerCard key={player.uid} player={player} />
          ))}
        </div>
        <button
          onClick={() => startRace(room.id)}
          disabled={room.status !== "waiting"}
          className={`
    mt-6
    px-5
    py-3
    rounded-xl
    font-semibold
    ${
      room.status === "waiting"
        ? "bg-green-500 text-black"
        : "bg-gray-600 text-gray-300 cursor-not-allowed"
    }
  `}
        >
          Start Match
        </button>
      </div>
    </div>
  );
};

export default RoomLobby;
