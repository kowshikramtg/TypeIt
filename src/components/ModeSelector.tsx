import type { Theme } from "../types/theme";

type ModeSelectorProps = {
  mode: "words" | "code";

  setMode: React.Dispatch<React.SetStateAction<"words" | "code">>;

  theme: Theme;
};

const ModeSelector = ({ mode, setMode, theme }: ModeSelectorProps) => {
  return (
    <div className="flex gap-2 text-sm">
      {(["words", "code"] as const).map((item) => (
        <button
          key={item}
          onClick={() => setMode(item)}
          className={`
            transition-all
            duration-200
            rounded-full
            px-4
            py-2
            font-semibold
            ${mode === item ? `${theme.active} ${theme.accent}` : theme.sub}
            hover:brightness-110
          `}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default ModeSelector;
