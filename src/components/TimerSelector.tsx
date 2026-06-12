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
  theme,
}: TimerSelectorProps) => {
  return (
    <div className="flex gap-2 font-mono text-xs">
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
            rounded-xl
            transition-all
            duration-200
            font-semibold
            select-none
            ${testTime === time ? `${theme.active} ${theme.accent}` : theme.sub}
            ${isTyping ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:brightness-110"}
          `}
        >
          {time}
        </button>
      ))}
    </div>
  );
};

export default TimerSelector;
