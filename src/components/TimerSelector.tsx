import type { Theme } from "../types/theme";

type TimerSelectorProps = {
  testTime: number;
  onTimeSelect: (time: number) => void;
  isTyping: boolean;
  theme: Theme;
};

const TimerSelector = ({
  testTime,
  onTimeSelect,
  isTyping,
}: TimerSelectorProps) => {
  return (
    <div className="flex gap-4 mb-10 font-mono text-sm">
      {[15, 30, 60, 120].map((time) => (
        <button
          key={time}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => {
            if (isTyping) return;
            onTimeSelect(time);
          }}
          className={`
            px-4
            py-2
            rounded-md
            transition-all
            duration-200
            font-semibold
            select-none
            ${
              testTime === time
                ? "bg-purple-500 text-white shadow-lg"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
            }
            ${isTyping ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
        >
          {time}
        </button>
      ))}
    </div>
  );
};

export default TimerSelector;
