import type { RoomPlayer } from "../../types/room";

type Props = {
  player: RoomPlayer;
};

const PlayerCard = ({ player }: Props) => {
  return (
    <div
      className="
        flex
        items-center
        gap-3
        bg-white/5
        rounded-xl
        p-3
      "
    >
      <img
        src={player.photoURL}
        alt={player.name}
        className="
          w-10
          h-10
          rounded-full
        "
      />

      <span className="text-zinc-200">{player.name}</span>
      <div
        className="
    w-full
    h-2
    bg-black/30
    rounded-full
    overflow-hidden
    mt-2
  "
      >
        <div
          className="
      h-full
      bg-green-400
      transition-all
      duration-300
    "
          style={{
            width: `${player.progress || 0}%`,
          }}
        />
      </div>
    </div>
  );
};

export default PlayerCard;
