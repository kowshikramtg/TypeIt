import { useState } from "react";
import { createRoom } from "../../firebase/rooms";
import useAuth from "../../hooks/useAuth";
import type { Theme } from "../../types/theme";

type Props = {
  setRoomId: React.Dispatch<React.SetStateAction<string>>;
  theme: Theme;
};

const CreateRoom = ({ setRoomId, theme }: Props) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [duration, setDuration] = useState<15 | 30 | 60 | 120>(60);
  const [mode, setMode] = useState<"words" | "code" | "custom">("words");
  const [isPublic, setIsPublic] = useState(true);

  const handleCreate = async () => {
    if (!user || !roomName.trim()) return;

    setLoading(true);
    try {
      const { roomId } = await createRoom(
        {
          uid: user.uid,
          name: user.displayName || "Player",
          photoURL: user.photoURL || "",
        },
        roomName,
        duration,
        mode,
        isPublic,
      );

      setRoomId(roomId);
    } catch (err) {
      console.error("Failed to create room:", err);
    }
    setLoading(false);
  };

  return (
    <div className={`p-4 ${theme.text}`}>
      <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>
        Create Room
      </h3>

      <div className="space-y-4">
        {/* Room Name */}
        <div>
          <label className={`text-sm ${theme.sub} block mb-2`}>Room Name</label>
          <input
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="My Epic Race"
            className={`w-full px-0 py-2 border-b outline-none transition bg-transparent ${theme.text} border-zinc-700 focus:border-zinc-500`}
          />
        </div>

        {/* Duration */}
        <div>
          <label className={`text-sm ${theme.sub} block mb-2`}>Duration</label>
          <div className="grid grid-cols-4 gap-2">
            {[15, 30, 60, 120].map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d as 15 | 30 | 60 | 120)}
                className={`py-2 rounded-lg text-sm font-medium transition ${
                  duration === d
                    ? `${theme.accent} text-black`
                    : `${theme.sub} border border-white/10`
                }`}
              >
                {d}s
              </button>
            ))}
          </div>
        </div>

        {/* Mode */}
        <div>
          <label className={`text-sm ${theme.sub} block mb-2`}>Mode</label>
          <div className="grid grid-cols-3 gap-2">
            {["words", "code", "custom"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m as "words" | "code" | "custom")}
                className={`py-2 rounded-lg text-sm font-medium transition capitalize ${
                  mode === m
                    ? `${theme.accent} text-black`
                    : `${theme.sub} border border-white/10`
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPublic(!isPublic)}
            className={`w-5 h-5 rounded border transition flex items-center justify-center ${
              isPublic
                ? `${theme.accent} border-zinc-700`
                : `border-zinc-700 bg-transparent`
            }`}
          >
            {isPublic && <span className="text-xs">✓</span>}
          </button>
          <span className={`text-sm ${theme.text}`}>
            Public room (anyone can join)
          </span>
        </div>

        {/* Create Button */}
        <button
          onClick={handleCreate}
          disabled={loading || !roomName.trim()}
          className={`w-full py-3 rounded-lg font-medium transition ${theme.accent} text-black disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90`}
        >
          {loading ? "Creating..." : "Create Room"}
        </button>
      </div>
    </div>
  );
};

export default CreateRoom;
