import type { Theme } from "../types/theme";

type CustomTextBoxProps = {
  showCustomTextBox: boolean;

  setShowCustomTextBox: React.Dispatch<React.SetStateAction<boolean>>;

  customText: string;

  setCustomText: React.Dispatch<React.SetStateAction<string>>;

  setIsCustomInputFocused: React.Dispatch<React.SetStateAction<boolean>>;

  setInput: React.Dispatch<React.SetStateAction<string>>;

  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;

  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;

  setTestCompleted: React.Dispatch<React.SetStateAction<boolean>>;

  setMistakes: React.Dispatch<React.SetStateAction<number>>;

  setWords: React.Dispatch<React.SetStateAction<string>>;

  setUseCustomText: React.Dispatch<React.SetStateAction<boolean>>;

  testTime: number;

  inputRef: React.RefObject<HTMLInputElement | null>;

  theme: Theme;
};

const CustomTextBox = ({
  showCustomTextBox,
  setShowCustomTextBox,
  customText,
  setCustomText,
  setIsCustomInputFocused,
  setInput,
  setIsTyping,
  setTimeLeft,
  setTestCompleted,
  setMistakes,
  setWords,
  setUseCustomText,
  testTime,
  inputRef,
  theme,
}: CustomTextBoxProps) => {
  if (showCustomTextBox) {
    return (
      <div className="w-full max-w-sm mx-auto mt-4">
        <textarea
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          onFocus={() => setIsCustomInputFocused(true)}
          onBlur={() => setIsCustomInputFocused(false)}
          placeholder="paste your custom text or code here..."
          className={`
            w-full
            h-32
            p-4
            rounded-2xl
            resize-none
            outline-none
            font-mono
            text-sm
            bg-white/5
            border
            border-white/10
            ${theme.text}
          `}
        />

        <div className="flex gap-3 mt-3">
          <button
            onClick={() => {
              setInput("");
              setIsTyping(false);
              setTimeLeft(testTime);
              setTestCompleted(false);
              setMistakes(0);

              setWords(customText);

              setUseCustomText(true);

              inputRef.current?.focus();
            }}
            className={`
              px-4
              py-2
              rounded-lg
              font-mono
              border
              border-white/10
              cursor-pointer
              ${theme.accent}
            `}
          >
            start
          </button>

          <button
            onClick={() => {
              setShowCustomTextBox(false);
              setCustomText("");
              setUseCustomText(false);
            }}
            className={`
              px-4
              py-2
              rounded-lg
              font-mono
              border
              border-white/10
              cursor-pointer
              ${theme.sub}
              hover:brightness-110
            `}
          >
            cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowCustomTextBox(true)}
      className={`
        px-3
        py-2
        rounded-lg
        font-mono
        text-sm
        border
        border-white/10
        transition-all
        whitespace-nowrap
        ${theme.sub}
        hover:brightness-110
      `}
    >
      custom
    </button>
  );
};

export default CustomTextBox;
