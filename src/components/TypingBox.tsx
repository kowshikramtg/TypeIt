import { useEffect, useRef, useState } from "react";
import generateWords from "../utils/generateWords";
import themes from "../data/theme";
import { motion } from "framer-motion";

const TypingBox = () => {
  const [words, setWords] = useState("");
  const [input, setInput] = useState("");
  const [testTime, setTestTime] = useState(30);
  const [timeLeft, setTimeLeft] = useState(testTime);
  const [isTyping, setIsTyping] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [theme, setTheme] = useState(themes.default);
  const [bestWpm, setBestWpm] = useState(0);
  const [caretPosition, setCaretPosition] = useState({ top: 0, left: 0 });

  const inputRef = useRef<HTMLInputElement>(null);

  // CURRENT CHARACTER INDEX
  const currentIndex = input.length;

  const charactersTyped = input.length;

  // CURRENT WORD INDEX
  const currentWordIndex =
    words.substring(0, currentIndex).split(" ").length - 1;

  // CHAR Referecnce
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // STATS
  const correctChars = input
    .split("")
    .filter((char, index) => char === words[index]).length;

  const wordsTyped = correctChars / 5;

  const timeSpent = testTime - timeLeft || 1;
  const wpm = Math.round(wordsTyped * (60 / timeSpent));

  const accuracy =
    input.length === 0 ? 100 : Math.round((correctChars / input.length) * 100);

  const wordsArray = words.split(" ");
  const inputWords = input.split(" ");

  const currentWord = wordsArray[inputWords.length - 1];

  // RESTART TEST
  const restartTest = () => {
    setInput("");
    setIsTyping(false);
    setTimeLeft(testTime);
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

  //   load saved WPN
  useEffect(() => {
    const savedBest = localStorage.getItem("best-wpm");
    if (savedBest) {
      setBestWpm(Number(savedBest));
    }
  }, []);

  // save new best Score
  useEffect(() => {
    if (!testCompleted) return;

    if (wpm > bestWpm) {
      setBestWpm(wpm);
      localStorage.setItem("best-wpm", String(wpm));
    }
  }, [testCompleted]);

  //   TRACK ACTIVE CHARACTER POSITION
  useEffect(() => {
    const currentChar = charRefs.current[currentIndex];
    if (currentChar) {
      setCaretPosition({
        top: currentChar.offsetTop,
        left: currentChar.offsetLeft,
      });
    }
  }, [currentIndex]);

  return (
    <motion.div
      className={`min-h-screen ${theme.background} ${theme.text} flex flex-col items-center justify-center px-6`}
      onClick={() => inputRef.current?.focus()}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
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
      <div className="flex gap-6 mb-10 font-mono text-sm">
        {[15, 30, 60, 120].map((time) => (
          <button
            key={time}
            onClick={() => {
              if (isTyping) return;

              setTestTime(time);
              setTimeLeft(time);
              restartTest();
            }}
            className={` cursor-pointer
                text-lg
        transition-colors
        duration-200
        ${testTime === time ? theme.accent : "text-gray-600"}`}
          >
            {time}{" "}
          </button>
        ))}
      </div>

      {/* TIMER */}
      <div className="w-full max-w-5xl mb-12">
        <div className="flex items-center gap-6">
          <div className={`text-3xl font-mono font-bold ${theme.accent}`}>
            {timeLeft}
          </div>

          <div className="text-gray-600 font-mono text-lg">best: {bestWpm}</div>
        </div>
      </div>

      {/* TYPING AREA */}
      <div className="w-full max-w-5xl">
        <div className="relative text-4xl font-mono leading-relaxed break-words select-none">
          {!testCompleted && (
            <span
              className={`
      absolute
      w-[3px]
      h-[55px]
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

            const wordIndex = words.substring(0, index).split(" ").length - 1;

            const isCurrentWord =
              inputWords.length - 1 === wordIndex && char !== " ";

            // DYNAMIC CARET
            return (
              <span
                ref={(el) => {
                  charRefs.current[index] = el;
                }}
                key={index}
                className={`
  relative
  inline
  transition-colors duration-150
  ${color}
  ${isCurrentWord ? `${theme.active} rounded` : ""}
`}
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>

      {/* RESULTS */}
      {/* RESULTS */}
      {testCompleted && (
        <div
          className={`
      w-full
      max-w-5xl
      mt-24
      p-10
      rounded-2xl
      bg-zinc-950/40
      backdrop-blur
      flex
      gap-20
      font-mono
    `}
        >
          <div>
            <p className="text-gray-500 text-sm mb-3 uppercase tracking-widest">
              WPM
            </p>

            <h2 className={`text-7xl font-bold ${theme.accent}`}>{wpm}</h2>
          </div>

          <div>
            <p className="text-gray-500 text-sm mb-3 uppercase tracking-widest">
              Accuracy
            </p>

            <h2 className={`text-7xl font-bold ${theme.accent}`}>
              {accuracy}%
            </h2>
          </div>

          <div>
            <p className="text-gray-500 text-sm mb-3 uppercase tracking-widest">
              Mistakes
            </p>

            <h2 className={`text-7xl font-bold ${theme.accent}`}>{mistakes}</h2>
          </div>
        </div>
      )}
      {testCompleted && (
        <p className="mt-8 text-gray-500 font-mono">
          {wpm > 80
            ? "insane speed ⚡"
            : wpm > 40
              ? "great typing 🔥"
              : "keep practicing 🚀"}
        </p>
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
          //   if (value.endsWith(" ")) return;
          setInput(value);

          if (!isTyping) {
            setIsTyping(true);
          }
        }}
      />
    </motion.div>
  );
};

export default TypingBox;
