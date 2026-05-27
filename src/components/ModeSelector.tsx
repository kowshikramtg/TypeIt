import type { Theme } from "../types/theme";

type ModeSelectorProps = {
  mode: "words" | "code";

  setMode: React.Dispatch<React.SetStateAction<"words" | "code">>;

  theme: Theme;
};

const ModeSelector = ({ mode, setMode, theme }: ModeSelectorProps) => {
  return (
    <div className="flex gap-6 mb-10 font-mono text-lg">
      <button
        onClick={() => setMode("words")}
        className={`
          transition-colors
          duration-200
          cursor-pointer
          ${mode === "words" ? theme.accent : "text-gray-600"}
        `}
      >
        words
      </button>

      <button
        onClick={() => setMode("code")}
        className={`
          transition-colors
          duration-200
          cursor-pointer
          ${mode === "code" ? theme.accent : "text-gray-600"}
        `}
      >
        code
      </button>
    </div>
  );
};

export default ModeSelector;
