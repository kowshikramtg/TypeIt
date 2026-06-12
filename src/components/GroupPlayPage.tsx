import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import CreateRoom from "./multiplayer/CreateRoom";
import JoinRoom from "./multiplayer/JoinRoom";
import RoomLobby from "./multiplayer/RoomLobby";
import Race from "./multiplayer/Race";
import Results from "./multiplayer/Results";
import Leaderboard from "./Leaderboard";
import type { Theme } from "../types/theme";

type Props = {
  theme: Theme;
};

const GroupPlayPage = ({ theme }: Props) => {
  const [roomId, setRoomId] = useState("");
  const [stage, setStage] = useState<"select" | "lobby" | "race" | "results">("select");

  useEffect(() => {
    if (roomId && stage === "select") {
      setStage("lobby");
    }
  }, [roomId, stage]);

  const handleRaceStart = () => {
    setStage("race");
  };

  const handleRaceEnd = () => {
    setStage("results");
  };

  const handleLeave = () => {
    setRoomId("");
    setStage("select");
  };

  return (
    <motion.div
      className={`min-h-screen pt-24 px-6 pb-10 ${theme.background}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className={`text-4xl font-bold mb-2 ${theme.text}`}>Group Play</h1>
          <p className={`${theme.sub}`}>Compete with others in real-time typing races</p>
        </div>

        {stage === "select" && (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CreateRoom setRoomId={setRoomId} theme={theme} />
            <JoinRoom setRoomId={setRoomId} theme={theme} />
          </motion.div>
        )}

        {stage === "lobby" && roomId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <RoomLobby
              roomId={roomId}
              onRaceStart={handleRaceStart}
              onLeave={handleLeave}
              theme={theme}
            />
          </motion.div>
        )}

        {stage === "race" && roomId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Race
              roomId={roomId}
              onRaceEnd={handleRaceEnd}
              theme={theme}
            />
          </motion.div>
        )}

        {stage === "results" && roomId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Results
              roomId={roomId}
              onLeave={handleLeave}
              theme={theme}
            />
          </motion.div>
        )}

        {/* Leaderboards Section */}
        {stage === "select" && (
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Leaderboard />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default GroupPlayPage;
