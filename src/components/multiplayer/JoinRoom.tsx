import { useState } from "react";
import { joinRoom, quickJoinRoom } from "../../firebase/rooms";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "../../firebase/config";
import useAuth from "../../hooks/useAuth";
import type { Theme } from "../../types/theme";
import type { Room } from "../../types/room";

type Props = {
  setRoomId: React.Dispatch<React.SetStateAction<string>>;
  theme: Theme;
};

const JoinRoom = ({ setRoomId, theme }: Props) => {
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [roomPreview, setRoomPreview] = useState<Room | null>(null);

  const handlePreview = async () => {
    if (!input.trim()) {
      setError("Enter a room code");
      return;
    }

    setLoading(true);
    setError("");
    setRoomPreview(null);

    try {
      const q = query(
        collection(db, "rooms"),
        where("code", "==", input.toUpperCase()),
        limit(1)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setError("Room not found");
        return;
      }

      setRoomPreview(snapshot.docs[0].data() as Room);
    } catch (err) {
      setError("Failed to find room");
    }
    setLoading(false);
  };

  const handleJoin = async () => {
    if (!user || !roomPreview) return;

    setLoading(true);
    try {
      const result = await joinRoom(input.toUpperCase(), {
        uid: user.uid,
        name: user.displayName || "Player",
        photoURL: user.photoURL || "",
      });

      setRoomId(result.roomId);
    } catch (err: any) {
      setError(err.message || "Failed to join room");
    }
    setLoading(false);
  };

  const handleQuickJoin = async () => {
    if (!user) return;

    setLoading(true);
    setError("");
    try {
      const result = await quickJoinRoom({
        uid: user.uid,
        name: user.displayName || "Player",
        photoURL: user.photoURL || "",
      });

      setRoomId(result.roomId);
    } catch (err: any) {
      setError(err.message || "Failed to quick join room");
    }
    setLoading(false);
  };

  return (
    <div className={`p-4 ${theme.text}`}>
      <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>Join Room</h3>

      <div className="space-y-4">
        {/* Code Input */}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value.toUpperCase());
              setRoomPreview(null);
              setError("");
            }}
            placeholder="Room code"
            maxLength={6}
            className={`flex-1 px-0 py-2 border-b outline-none transition bg-transparent ${theme.text} border-zinc-700 focus:border-zinc-500`}
          />
          <button
            onClick={handlePreview}
            disabled={loading || !input.trim()}
            className={`px-4 py-2 rounded-lg font-medium transition border border-zinc-700 hover:border-zinc-500 disabled:opacity-50 ${theme.sub}`}
          >
            {loading ? "..." : "Find"}
          </button>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Room Preview */}
        {roomPreview && (
          <div className={`p-4 rounded-lg border border-zinc-800 bg-transparent mt-4`}>
            <div className="space-y-2 mb-4">
              <p className={`font-semibold ${theme.text}`}>
                {roomPreview.name}
              </p>
              <div className={`text-sm ${theme.sub} space-y-1`}>
                <p>
                  Host:{" "}
                  {roomPreview.players.find((p) => p.uid === roomPreview.hostId)
                    ?.name || "Unknown"}
                </p>
                <p>Players: {roomPreview.players.length}</p>
                <p>
                  Duration: {roomPreview.duration}s • Mode: {roomPreview.mode}
                </p>
              </div>
            </div>

            <button
              onClick={handleJoin}
              disabled={loading}
              className={`w-full py-2 rounded-lg font-medium transition ${theme.accent} text-black disabled:opacity-50 hover:opacity-90`}
            >
              {loading ? "Joining..." : "Join Room"}
            </button>
          </div>
        )}

        {/* Quick Join Button */}
        {!roomPreview && (
          <div className="pt-2 border-t border-white/10 mt-4">
            <button
              onClick={handleQuickJoin}
              disabled={loading}
              className={`w-full py-3 rounded-lg font-medium transition ${theme.accent} text-black disabled:opacity-50 hover:opacity-90`}
            >
              {loading ? "Searching..." : "Quick Join Public Room"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinRoom;
