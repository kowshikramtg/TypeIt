import { useEffect, useRef, useState } from "react";
import generateWords from "../utils/generateWords";
import themes from "../data/theme";

const TypingBox = () => {
  const [words, setWords] = useState("");
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTyping, setIsTyping] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [theme, setTheme] = useState(themes.default);

  const inputRef = useRef<HTMLInputElement>(null);

  // CURRENT CHARACTER INDEX
  const currentIndex = input.length;

  const charactersTyped = input.length;

  // CURRENT WORD INDEX
  const currentWordIndex =
    words.substring(0, currentIndex).split(" ").length - 1;

  // STATS
  const correctChars = input
    .split("")
    .filter((char, index) => char === words[index]).length;

  const wordsTyped = correctChars / 5;

  const wpm = Math.round(wordsTyped * (60 / (30 - timeLeft || 1)));

  const accuracy =
    input.length === 0 ? 100 : Math.round((correctChars / input.length) * 100);

  const wordsArray = words.split(" ");
  const inputWords = input.split(" ");

  const currentWord = wordsArray[inputWords.length - 1];

  // RESTART TEST
  const restartTest = () => {
    setInput("");
    setIsTyping(false);
    setTimeLeft(30);
    setTestCompleted(false);
    setMistakes(0);

    const newWords = generateWords(30);
    setWords(newWords);

    inputRef.current?.focus();
  };

  // INITIAL WORD GENERATION
  useEffect(() => {
    const generated = generateWords(30);
    setWords(generated);
  }, []);

  // TIMER
  useEffect(() => {
    if (!isTyping) return;

    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTyping(false);
          setTestCompleted(true);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTyping, timeLeft]);

  // AUTO END WHEN TEXT COMPLETES
  useEffect(() => {
    if (!words.length) return;

    if (input.length === words.length) {
      setTimeLeft(0);
      setIsTyping(false);
      setTestCompleted(true);
    }
  }, [input, words]);

  // RESTART WITH TAB
  useEffect(() => {
    const handleRestart = (e: KeyboardEvent) => {
      if (e.key === "Tab" && timeLeft === 0) {
        e.preventDefault();
        restartTest();
      }
    };

    window.addEventListener("keydown", handleRestart);

    return () => {
      window.removeEventListener("keydown", handleRestart);
    };
  }, [timeLeft]);

  return (
    <div
      className={`min-h-screen ${theme.background} ${theme.text} flex flex-col items-center justify-center px-6`}
      onClick={() => inputRef.current?.focus()}
    >
      {/* THEME SELECTOR */}
      <div className="flex gap-4 mb-10">
        <button
          onClick={() => setTheme(themes.default)}
          className="w-5 h-5 rounded-full bg-yellow-400"
        />

        <button
          onClick={() => setTheme(themes.ocean)}
          className="w-5 h-5 rounded-full bg-cyan-400"
        />

        <button
          onClick={() => setTheme(themes.forest)}
          className="w-5 h-5 rounded-full bg-green-400"
        />
      </div>

      {/* TIMER */}
      <div className="w-full max-w-5xl mb-12">
        <div className="text-yellow-400 text-3xl font-mono font-bold">
          {timeLeft}
        </div>
      </div>

      {/* TYPING AREA */}
      <div className="w-full max-w-5xl">
        <div className="text-4xl font-mono leading-relaxed break-words select-none">
          {words.split("").map((char, index) => {
            let color = theme.sub;

            if (index < input.length) {
              color = input[index] === char ? theme.text : "text-red-500";
            }

            const wordIndex = words.substring(0, index).split(" ").length - 1;

            const isCurrentWord =
              inputWords.length - 1 === wordIndex && char !== " ";

            // DYNAMIC CARET
            return (
              <span
                key={index}
                className={`
  relative
  inline
  transition-colors duration-150
  ${color}
  ${isCurrentWord ? `${theme.active} rounded` : ""}
`}
              >
                {index === currentIndex && !testCompleted && (
                  <span
                    className={`
    absolute
    left-0
    top-1
    w-[3px]
    h-[55px]
    rounded-full
    animate-caret
    transition-all
    duration-75
    shadow-[0_0_8px]
    ${theme.caret}
  `}
                  />
                )}

                {char}
              </span>
            );
          })}
        </div>
      </div>

      {/* RESULTS */}
      {timeLeft === 0 && testCompleted && (
        <div className="w-full max-w-5xl mt-20 flex gap-20 font-mono">
          <div>
            <p className="text-gray-500 text-sm mb-2 uppercase tracking-widest">
              WPM
            </p>

            <h2 className="text-yellow-400 text-6xl font-bold">{wpm}</h2>
          </div>

          <div>
            <p className="text-gray-500 text-sm mb-2 uppercase tracking-widest">
              Accuracy
            </p>

            <h2 className="text-yellow-400 text-6xl font-bold">{accuracy}%</h2>
          </div>
          <div>
            <p className="text-gray-500 text-sm mb-2 uppercase tracking-widest">
              Mistakes
            </p>

            <h2 className="text-yellow-400 text-6xl font-bold">{mistakes}</h2>
          </div>
          <div>
            <p className="text-gray-500 text-sm mb-2 uppercase tracking-widest">
              Characters
            </p>

            <h2 className="text-yellow-400 text-6xl font-bold">
              {charactersTyped}
            </h2>
          </div>
        </div>
      )}

      {/* RESTART MESSAGE */}
      {testCompleted && (
        <p className="text-gray-600 mt-10 font-mono text-base tracking-wide">
          press TAB to restart
        </p>
      )}

      {/* HIDDEN INPUT */}
      <input
        ref={inputRef}
        type="text"
        value={input}
        className="opacity-0 absolute outline-none"
        autoFocus
        disabled={testCompleted}
        onPaste={(e) => e.preventDefault()}
        onChange={(e) => {
          const value = e.target.value;

          if (value.length > words.length) return;

          const lastCharIndex = value.length - 1;

          if (value[lastCharIndex] !== words[lastCharIndex])
            setMistakes((prev) => prev + 1);
          if (value.endsWith(" ")) return;
          setInput(value);

          if (!isTyping) {
            setIsTyping(true);
          }
        }}
      />
    </div>
  );
};

export default TypingBox;
