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
  return (
    <div className="absolute top-20 right-20">
      {!showCustomTextBox ? (
        <button
          onClick={() => setShowCustomTextBox(true)}
          className="
            px-5
            py-2
            rounded-lg
            font-mono
            border
            border-white/10
            text-gray-400
            transition-all
            cursor-pointer
          "
        >
          custom text
        </button>
      ) : (
        <div className="w-[350px]">
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
              rounded-xl
              resize-none
              outline-none
              font-mono
              text-sm
              bg-black/20
              border
              border-white/10
              backdrop-blur
              ${theme.text}
            `}
          />

          <div className="flex gap-3 mt-4">
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
              apply
            </button>

            <button
              onClick={() => {
                setUseCustomText(false);

                setInput("");
                setIsTyping(false);
                setTimeLeft(testTime);
                setTestCompleted(false);
                setMistakes(0);

                setShowCustomTextBox(false);
              }}
              className="
                px-4
                py-2
                rounded-lg
                font-mono
                text-gray-500
                border
                border-white/10
                cursor-pointer
              "
            >
              close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomTextBox;
