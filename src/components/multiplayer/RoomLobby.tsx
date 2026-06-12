import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  leaveRoom,
  setPlayerReady,
  startRaceCountdown,
  removePlayer,
  subscribeToRoom,
} from "../../firebase/rooms";
import useAuth from "../../hooks/useAuth";
import type { Theme } from "../../types/theme";
import type { Room } from "../../types/room";

type Props = {
  roomId: string;
  onRaceStart: () => void;
  onLeave: () => void;
  theme: Theme;
};

const RoomLobby = ({ roomId, onRaceStart, onLeave, theme }: Props) => {
  const { user } = useAuth();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPlayerReady, setCurrentPlayerReady] = useState(false);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToRoom(roomId, (updatedRoom) => {
      setRoom(updatedRoom);
      setLoading(false);

      if (updatedRoom?.status === "countdown") {
        onRaceStart();
      }
    });

    return () => unsubscribe();
  }, [roomId, onRaceStart]);

  const isHost = user?.uid === room?.hostId;
  const allReady =
    room && room.players.length > 1 && room.players.every((p) => p.isReady);

  const handleToggleReady = async () => {
    if (!user || !room) return;

    const newReady = !currentPlayerReady;
    setCurrentPlayerReady(newReady);

    try {
      await setPlayerReady(roomId, user.uid, newReady);
    } catch (err) {
      console.error("Failed to update ready status:", err);
      setCurrentPlayerReady(!newReady);
    }
  };

  const handleStartRace = async () => {
    if (!isHost || !room || starting) return;

    setStarting(true);
    try {
      await startRaceCountdown(roomId);
    } catch (err) {
      console.error("Failed to start race:", err);
      setStarting(false);
    }
  };

  const handleLeave = async () => {
    if (!user) return;

    try {
      await leaveRoom(roomId, user.uid);
      onLeave();
    } catch (err) {
      console.error("Failed to leave room:", err);
    }
  };

  const handleRemovePlayer = async (playerUid: string) => {
    try {
      await removePlayer(roomId, playerUid);
    } catch (err) {
      console.error("Failed to remove player:", err);
    }
  };

  if (loading) {
    return (
      <motion.div
        className="flex items-center justify-center py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className={`text-sm ${theme.sub}`}>Loading room...</div>
      </motion.div>
    );
  }

  if (!room) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-20 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className={`${theme.text}`}>Room not found</p>
        <button
          onClick={onLeave}
          className={`px-4 py-2 rounded-lg border border-white/10 hover:border-white/30 ${theme.sub}`}
        >
          Back
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Room Header */}
      <div className={`p-4 ${theme.sub}`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className={`text-2xl font-bold ${theme.text}`}>{room.name}</h2>
            <div className={`flex items-center gap-2 mt-1`}>
              <p className={`text-sm ${theme.sub}`}>Code: <span className={`font-mono font-bold ${theme.text}`}>{room.code}</span></p>
              <button
                onClick={() => navigator.clipboard.writeText(room.code)}
                className={`px-2 py-1 text-xs rounded transition bg-white/5 border border-white/10 hover:border-white/30 ${theme.text}`}
              >
                Copy
              </button>
            </div>
          </div>
          <div className={`text-right text-sm ${theme.sub}`}>
            <p className="font-mono text-xs mb-1">
              {room.duration}s • {room.mode}
            </p>
            <p>{room.isPublic ? "🌐 Public" : "🔒 Private"}</p>
          </div>
        </div>

        <div className="flex gap-2">
          {isHost && (
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-semibold"
              style={{
                backgroundColor: `${theme.accentHex}20`,
                color: theme.accentHex,
              }}
            >
              👑 Host
            </div>
          )}
        </div>
      </div>

      {/* Player List */}
      <div className={`p-4 ${theme.sub}`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>
          Players ({room.players.length})
        </h3>

        <div className="space-y-2">
          {room.players.map((player) => {
            const isCurrentUser = player.uid === user?.uid;
            const isPlayerHost = player.uid === room.hostId;

            return (
              <motion.div
                key={player.uid}
                className={`p-4 rounded-lg border-b transition flex items-center justify-between bg-transparent ${
                  player.isReady
                    ? `border-zinc-700`
                    : "border-zinc-800"
                }`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center gap-3 flex-1">
                  {player.photoURL && (
                    <img
                      src={player.photoURL}
                      alt={player.name}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div>
                    <p className={`font-medium ${theme.text}`}>
                      {player.name}
                      {isPlayerHost && " 👑"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {player.isReady ? (
                    <span
                      className={`text-sm font-medium`}
                      style={{ color: theme.accentHex }}
                    >
                      ✓ Ready
                    </span>
                  ) : (
                    <span className={`text-sm ${theme.sub}`}>Waiting...</span>
                  )}

                  {isCurrentUser ? (
                    <button
                      onClick={handleToggleReady}
                      className={`px-3 py-1 rounded text-sm font-medium transition ${
                        currentPlayerReady
                          ? `${theme.accent} text-black`
                          : `border border-white/10 ${theme.sub} hover:border-white/30`
                      }`}
                    >
                      {currentPlayerReady ? "Not Ready" : "Ready"}
                    </button>
                  ) : isHost ? (
                    <button
                      onClick={() => handleRemovePlayer(player.uid)}
                      className="px-3 py-1 rounded text-sm font-medium border border-red-500/20 text-red-500 hover:bg-red-500/10 transition"
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        {isHost && (
          <button
            onClick={handleStartRace}
            disabled={!allReady || starting || room.players.length < 2}
            className={`flex-1 py-3 rounded-lg font-medium transition ${theme.accent} text-black disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90`}
          >
            {starting ? "Starting..." : "Start Race"}
          </button>
        )}

        <button
          onClick={handleLeave}
          className={`px-6 py-3 rounded-lg font-medium border border-zinc-700 ${theme.sub} hover:border-zinc-500 transition`}
        >
          Leave
        </button>
      </div>

      {/* Info */}
      {isHost && !allReady && room.players.length > 1 && (
        <p className={`text-sm ${theme.sub} text-center`}>
          Waiting for all players to be ready...
        </p>
      )}

      {isHost && room.players.length < 2 && (
        <p className={`text-sm ${theme.sub} text-center`}>
          Need at least 2 players to start
        </p>
      )}
    </motion.div>
  );
};

export default RoomLobby;
