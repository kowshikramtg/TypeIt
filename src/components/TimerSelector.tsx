import generateWords from "../utils/generateWords";
import codeSnippets from "../data/codeSnippets";

type TimerSelectorProps = {
  testTime: number;
  setTestTime: React.Dispatch<React.SetStateAction<number>>;

  setInput: React.Dispatch<React.SetStateAction<string>>;

  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;

  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;

  setTestCompleted: React.Dispatch<React.SetStateAction<boolean>>;

  setMistakes: React.Dispatch<React.SetStateAction<number>>;

  setWords: React.Dispatch<React.SetStateAction<string>>;

  inputRef: React.RefObject<HTMLInputElement | null>;

  isTyping: boolean;

  useCustomText: boolean;

  customText: string;

  mode: "words" | "code";

  theme: any;
};

const TimerSelector = ({
  testTime,
  setTestTime,
  setInput,
  setIsTyping,
  setTimeLeft,
  setTestCompleted,
  setMistakes,
  setWords,
  inputRef,
  isTyping,
  useCustomText,
  customText,
  mode,
  theme,
}: TimerSelectorProps) => {
  return (
    <div className="flex gap-6 mb-10 font-mono text-sm">
      {[15, 30, 60, 120].map((time) => (
        <button
          key={time}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => {
            if (isTyping) return;

            setTestTime(time);

            setInput("");
            setIsTyping(false);
            setTimeLeft(time);
            setTestCompleted(false);
            setMistakes(0);

            if (useCustomText && customText.trim()) {
              setWords(customText);
            } else if (mode === "code") {
              const randomIndex = Math.floor(
                Math.random() * codeSnippets.length,
              );

              setWords(codeSnippets[randomIndex]);
            } else {
              setWords(generateWords(30));
            }

            inputRef.current?.focus();
          }}
          className={`
            cursor-pointer
            text-lg
            rounded-md
            transition-all
            duration-200
            hover:${theme.accent} hover:text-white
            ${testTime === time ? theme.accent : "text-gray-600"}
          `}
        >
          {time}
        </button>
      ))}
    </div>
  );
};

export default TimerSelector;
