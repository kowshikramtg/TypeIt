import { motion } from "framer-motion";
import { useState } from "react";
import CreateRoom from "./multiplayer/CreateRoom";
import JoinRoom from "./multiplayer/JoinRoom";
import RoomLobby from "./multiplayer/RoomLobby";
import Leaderboard from "./Leaderboard";

const GroupPlayPage = () => {
  const [roomId, setRoomId] = useState("");

  return (
    <motion.div
      className="min-h-screen bg-zinc-950 pt-24 px-6 pb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-zinc-100 mb-2">Group Play</h1>
        <p className="text-zinc-400 mb-10">
          Compete with others in real-time typing races
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Multiplayer Section */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {!roomId ? (
              <div className="space-y-4">
                <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-md border border-zinc-800">
                  <h2 className="text-2xl font-semibold text-zinc-100 mb-6">
                    Start or Join a Race
                  </h2>

                  <div className="space-y-4">
                    <CreateRoom setRoomId={setRoomId} />
                    <JoinRoom setRoomId={setRoomId} />
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-md border border-zinc-800">
                  <h3 className="text-lg font-semibold text-zinc-100 mb-4">
                    How to Play
                  </h3>
                  <ul className="space-y-2 text-zinc-300 text-sm">
                    <li className="flex gap-3">
                      <span className="text-purple-400 font-bold">1.</span>
                      <span>
                        Create a new race room or join an existing one
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-400 font-bold">2.</span>
                      <span>Invite friends by sharing the room code</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-400 font-bold">3.</span>
                      <span>Wait for all players to be ready</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-400 font-bold">4.</span>
                      <span>Type as fast as you can to win the race</span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <motion.div
                className="bg-white/5 rounded-2xl p-8 backdrop-blur-md border border-zinc-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <RoomLobby roomId={roomId} />
                <button
                  onClick={() => setRoomId("")}
                  className="mt-6 px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-all"
                >
                  Exit Room
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Leaderboard Section */}
          <motion.div
            className="bg-white/5 rounded-2xl p-8 backdrop-blur-md border border-zinc-800 h-fit"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-zinc-100 mb-6">
              Global Leaderboard
            </h2>
            <div className="max-h-96 overflow-y-auto">
              <Leaderboard />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default GroupPlayPage;
