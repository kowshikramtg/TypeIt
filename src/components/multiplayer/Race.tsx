import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  subscribeToRoom,
  updatePlayerProgress,
  finishRace,
} from "../../firebase/rooms";
import { savePlayerStats } from "../../firebase/leaderboard";
import useAuth from "../../hooks/useAuth";
import type { Theme } from "../../types/theme";
import type { Room } from "../../types/room";

type Props = {
  roomId: string;
  onRaceEnd: () => void;
  theme: Theme;
};

const Race = ({ roomId, onRaceEnd, theme }: Props) => {
  const { user } = useAuth();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [isRunning, setIsRunning] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [finished, setFinished] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Subscribe to room changes
  useEffect(() => {
    const unsubscribe = subscribeToRoom(roomId, (updatedRoom) => {
      if (!updatedRoom) return;

      setRoom(updatedRoom);
      setLoading(false);

      if (updatedRoom.status === "countdown") {
        setCountdown(updatedRoom.countdownValue || 3);
      } else if (updatedRoom.status === "running") {
        setIsRunning(true);
      } else if (updatedRoom.status === "finished") {
        setFinished(true);
      }
    });

    return () => unsubscribe();
  }, [roomId]);

  // Countdown timer
  useEffect(() => {
    if (!isRunning && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, isRunning]);

  // Race timer
  useEffect(() => {
    if (!isRunning || finished) return;

    const timer = setInterval(() => {
      setElapsedTime((prev) => {
        if (room && prev >= room.duration) {
          return room.duration;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, finished, room]);

  // Calculate progress and accuracy
  useEffect(() => {
    if (!isRunning || !room || !user) return;

    const raceText = room.raceText;
    const typed = userInput;
    const progress = Math.min((typed.length / raceText.length) * 100, 100);

    // Count mistakes
    let mistakes = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] !== raceText[i]) {
        mistakes++;
      }
    }

    const accuracy = typed.length
      ? Math.round(((typed.length - mistakes) / typed.length) * 100)
      : 100;

    const wpm =
      elapsedTime > 0
        ? Math.round((typed.split(/\s+/).length / elapsedTime) * 60)
        : 0;

    const isFinished = typed.length === raceText.length || elapsedTime >= room.duration;

    // Update progress in Firebase
    updatePlayerProgress(
      roomId,
      user.uid,
      progress,
      wpm,
      accuracy,
      mistakes,
      isFinished ? elapsedTime : undefined,
    );

    if (isFinished && !finished) {
      setFinished(true);
      const isWinner = !room.players.some(p => p.finishTime && p.uid !== user.uid);
      savePlayerStats(
        user.uid,
        user.displayName || "Player",
        user.photoURL || "",
        wpm,
        accuracy,
        isWinner
      ).catch(console.error);
    }
  }, [userInput, elapsedTime, isRunning, room, user, roomId, finished]);

  const handleFinishRace = async () => {
    try {
      await finishRace(roomId);
      onRaceEnd();
    } catch (err) {
      console.error("Failed to finish race:", err);
    }
  };

  if (loading) {
    return (
      <motion.div
        className="flex items-center justify-center py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className={`text-sm ${theme.sub}`}>Loading race...</div>
      </motion.div>
    );
  }

  if (!room) {
    return <div className={theme.text}>Race not found</div>;
  }

  return (
    <div className="space-y-6">
      {/* Countdown */}
      <AnimatePresence>
        {countdown > 0 && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-9xl font-black"
              style={{ color: theme.accentHex }}
              key={countdown}
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {countdown === 0 ? "GO!" : countdown}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className={`p-4 ${theme.sub}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm ${theme.sub}`}>{room.name}</p>
            <p className={`text-2xl font-bold ${theme.text}`}>{elapsedTime}s</p>
          </div>
          <div className="text-right">
            <p className={`text-sm ${theme.sub}`}>Progress</p>
            <p
              className={`text-2xl font-bold`}
              style={{ color: theme.accentHex }}
            >
              {Math.round((userInput.length / room.raceText.length) * 100)}%
            </p>
          </div>
        </div>
      </div>

      {/* Race Text */}
      <div className={`p-4 mt-8 ${theme.sub}`}>
        <div className={`leading-relaxed text-lg ${theme.text} select-none`}>
          {room.raceText.split("").map((char, i) => {
            const typed = userInput[i];
            let color = theme.sub;

            if (i < userInput.length) {
              color = typed === char ? theme.accent : "text-red-500";
            }

            return (
              <span
                key={i}
                className={`${
                  i === userInput.length ? `bg-white/20 ${theme.text}` : color
                }`}
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>

      {/* Live Players */}
      <div className={`p-4 mt-8 ${theme.sub}`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>
          Live Progress
        </h3>

        <div className="space-y-3">
          {room.players.map((player) => (
            <motion.div
              key={player.uid}
              className="p-3 rounded-lg bg-white/5 border border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
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
                <span className={`text-sm ${theme.sub}`}>
                  {player.wpm || 0} WPM
                </span>
              </div>

              <div className="flex gap-2 items-center">
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: theme.accentHex }}
                    animate={{ width: `${player.progress || 0}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className={`text-xs ${theme.sub} font-mono`}>
                  {Math.round(player.progress || 0)}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="space-y-2">
        <textarea
          ref={(el) => {
            if (isRunning && countdown <= 0 && el) el.focus();
          }}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={countdown > 0 || finished}
          placeholder="Start typing..."
          className={`w-full h-24 p-4 rounded-lg outline-none transition resize-none ${theme.text} bg-transparent border-b border-zinc-700 focus:border-zinc-500`}
        />

        {finished && (
          <button
            onClick={handleFinishRace}
            className={`w-full py-3 rounded-lg font-medium transition ${theme.accent} text-black hover:opacity-90 mt-4`}
          >
            View Results
          </button>
        )}
      </div>
    </div>
  );
};

export default Race;
