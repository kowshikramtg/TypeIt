import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { subscribeToRoom, leaveRoom } from "../../firebase/rooms";
import useAuth from "../../hooks/useAuth";
import type { Theme } from "../../types/theme";
import type { Room, RoomPlayer } from "../../types/room";

type Props = {
  roomId: string;
  onLeave: () => void;
  theme: Theme;
};

const Results = ({ roomId, onLeave, theme }: Props) => {
  const { user } = useAuth();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [rankings, setRankings] = useState<RoomPlayer[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToRoom(roomId, (updatedRoom) => {
      setRoom(updatedRoom);
      setLoading(false);

      if (updatedRoom?.players) {
        // Sort by finish time (ascending), then by WPM (descending)
        const sorted = [...updatedRoom.players].sort((a, b) => {
          if (a.finishTime && b.finishTime) {
            return a.finishTime - b.finishTime;
          } else if (a.finishTime) {
            return -1;
          } else if (b.finishTime) {
            return 1;
          }
          return (b.wpm || 0) - (a.wpm || 0);
        });
        setRankings(sorted);
      }
    });

    return () => unsubscribe();
  }, [roomId]);

  const handleLeave = async () => {
    if (!user) return;

    try {
      await leaveRoom(roomId, user.uid);
      onLeave();
    } catch (err) {
      console.error("Failed to leave room:", err);
    }
  };

  if (loading) {
    return (
      <motion.div
        className="flex items-center justify-center py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className={`text-sm ${theme.sub}`}>Loading results...</div>
      </motion.div>
    );
  }

  if (!room) {
    return <div className={theme.text}>Results not found</div>;
  }

  const podium = rankings.slice(0, 3);
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={`p-4 ${theme.sub}`}>
        <h2 className={`text-3xl font-bold ${theme.text} text-center`}>
          Race Results
        </h2>
        <p className={`text-center ${theme.sub} mt-2`}>{room.name}</p>
      </div>

      {/* Podium */}
      {podium.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {podium.map((player, idx) => {
            const medal = medals[idx];

            return (
              <motion.div
                key={player.uid}
                className={`p-6 rounded-2xl border bg-transparent ${theme.sub}`}
                style={{ borderColor: `${theme.accentHex}30` }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{medal}</div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {player.photoURL && (
                      <img
                        src={player.photoURL}
                        alt={player.name}
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    <h3 className={`font-semibold ${theme.text}`}>
                      {player.name}
                    </h3>
                  </div>
                  <p
                    className={`text-2xl font-bold`}
                    style={{ color: theme.accentHex }}
                  >
                    {player.finishTime || "—"}s
                  </p>
                </div>

                <div className={`space-y-2 border-t border-white/10 pt-4`}>
                  <div className="flex justify-between">
                    <span className={theme.sub}>WPM</span>
                    <span className={`font-mono ${theme.text}`}>
                      {player.wpm || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme.sub}>Accuracy</span>
                    <span className={`font-mono ${theme.text}`}>
                      {Math.round(player.accuracy || 0)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme.sub}>Mistakes</span>
                    <span className={`font-mono ${theme.text}`}>
                      {player.mistakes || 0}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Full Rankings */}
      {rankings.length > 3 && (
        <div className={`p-4 mt-8 ${theme.sub}`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>
            Full Rankings
          </h3>

          <div className="space-y-2">
            {rankings.slice(3).map((player, idx) => (
              <motion.div
                key={player.uid}
                className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (idx + 3) * 0.05 }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-sm font-semibold ${theme.sub} w-6 text-center`}
                  >
                    #{idx + 4}
                  </span>
                  {player.photoURL && (
                    <img
                      src={player.photoURL}
                      alt={player.name}
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <span className={`font-medium ${theme.text}`}>
                    {player.name}
                  </span>
                </div>

                <div className="flex gap-6 text-sm">
                  <div className="text-right">
                    <p className={theme.sub}>WPM</p>
                    <p className={`font-mono font-semibold ${theme.text}`}>
                      {player.wpm || 0}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={theme.sub}>Acc</p>
                    <p className={`font-mono font-semibold ${theme.text}`}>
                      {Math.round(player.accuracy || 0)}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={theme.sub}>Time</p>
                    <p className={`font-mono font-semibold ${theme.text}`}>
                      {player.finishTime || "—"}s
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Summary */}
      <div className={`p-4 mt-8 ${theme.sub}`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Stats</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className={`text-sm ${theme.sub}`}>Total Players</p>
            <p className={`text-2xl font-bold ${theme.text}`}>
              {room.players.length}
            </p>
          </div>
          <div>
            <p className={`text-sm ${theme.sub}`}>Best WPM</p>
            <p
              className={`text-2xl font-bold`}
              style={{ color: theme.accentHex }}
            >
              {Math.max(...room.players.map((p) => p.wpm || 0))}
            </p>
          </div>
          <div>
            <p className={`text-sm ${theme.sub}`}>Avg Accuracy</p>
            <p
              className={`text-2xl font-bold`}
              style={{ color: theme.accentHex }}
            >
              {Math.round(
                room.players.reduce((sum, p) => sum + (p.accuracy || 0), 0) /
                  room.players.length,
              )}
              %
            </p>
          </div>
          <div>
            <p className={`text-sm ${theme.sub}`}>Winners</p>
            <p
              className={`text-2xl font-bold`}
              style={{ color: theme.accentHex }}
            >
              {room.players.filter((p) => p.finishTime).length}
            </p>
          </div>
        </div>
      </div>

      {/* Action */}
      <button
        onClick={handleLeave}
        className={`w-full py-3 rounded-lg font-medium transition ${theme.accent} text-black hover:opacity-90 mt-8`}
      >
        Return to Group Play
      </button>
    </motion.div>
  );
};

export default Results;
