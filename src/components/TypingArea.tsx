type TypingAreaProps = {
  words: string;
  input: string;
  theme: any;

  testCompleted: boolean;

  caretPosition: {
    top: number;
    left: number;
  };

  containerRef: React.RefObject<HTMLDivElement | null>;

  charRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>;
};

const TypingArea = ({
  words,
  input,
  theme,
  testCompleted,
  caretPosition,
  containerRef,
  charRefs,
}: TypingAreaProps) => {
  return (
    <div
      ref={containerRef}
      className="
        w-full
        max-w-5xl
        h-[260px]
        overflow-hidden
        relative
      "
    >
      <div
        className="
          relative
          pt-6
          pb-2
          text-3xl
          md:text-4xl
          font-mono
          leading-[1.8]
          whitespace-pre-wrap
          break-words
          select-none
        "
      >
        {!testCompleted && (
          <span
            className={`
              absolute
              w-[3px]
              h-[42px]
              rounded-full
              animate-caret
              transition-all
              duration-75
              shadow-[0_0_8px]
              z-10
              ${theme.caret}
            `}
            style={{
              top: caretPosition.top,
              left: caretPosition.left,
            }}
          />
        )}

        {words.split("").map((char, index) => {
          let color = theme.sub;

          if (index < input.length) {
            const typedChar = input[index];

            if (char === " " && typedChar === " ") {
              color = theme.sub;
            } else {
              color = typedChar === char ? theme.text : "text-red-500";
            }
          }

          return (
            <span
              ref={(el) => {
                charRefs.current[index] = el;
              }}
              key={index}
              className={`
                relative
                inline
                transition-colors
                duration-150
                ${color}
              `}
              style={{
                whiteSpace: char === "\n" ? "pre" : "normal",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default TypingArea;
