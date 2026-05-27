import { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";

import themes from "../data/theme";

import ThemeSelector from "./ThemeSelector";
import TimerSelector from "./TimerSelector";
import ModeSelector from "./ModeSelector";
import CustomTextBox from "./CustomTextBox";
import DailyChallenge from "./DailyChallenge";
import StatsHeader from "./StatsHeader";
import TypingArea from "./TypingArea";
import ResultsCard from "./ResultsCard";

import useTyping from "../hooks/useTyping";
import useTimer from "../hooks/useTimer";
import useCaret from "../hooks/useCaret";
import useLocalStorage from "../hooks/useLocalStorage";
import useTest from "../hooks/useTest";

import AuthButton from "./AuthButton";
import useAuth from "../hooks/useAuth";
import saveScore from "../firebase/saveScore";

const TypingBox = () => {
  // THEME
  const [themeName, setThemeName] = useLocalStorage("typeit-theme", "default");

  const [theme, setTheme] = useState(themes[themeName as keyof typeof themes]);

  // WORDS
  const [words, setWords] = useState("");

  // TEST
  const [testCompleted, setTestCompleted] = useState(false);

  // BEST WPM
  const [bestWpm, setBestWpm] = useLocalStorage("best-wpm", 0);

  // CUSTOM TEXT
  const [customText, setCustomText] = useState("");

  const [useCustomText, setUseCustomText] = useState(false);

  const [isCustomInputFocused, setIsCustomInputFocused] = useState(false);

  const [showCustomTextBox, setShowCustomTextBox] = useState(false);

  // MODE
  const [mode, setMode] = useState<"words" | "code">("words");

  // DAILY
  const [dailyMode, setDailyMode] = useState(false);

  const [dailyChallengeTitle, setDailyChallengeTitle] = useState("");

  //   const [isTyping, setIsTyping] = useState(false);

  // INPUT REF
  const inputRef = useRef<HTMLInputElement>(null);

  // CHAR REFS
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // CONTAINER REF
  const containerRef = useRef<HTMLDivElement>(null);

  const [isTyping, setIsTyping] = useState(false);

  // TYPING
  const {
    input,
    setInput,

    mistakes,
    setMistakes,

    accuracy,
  } = useTyping({});

  // TIMER
  const {
    testTime,
    setTestTime,

    timeLeft,
    setTimeLeft,
  } = useTimer({
    running: isTyping,

    onComplete: () => {
      setIsTyping(false);
      setTestCompleted(true);
    },
  });

  const wordsTyped =
    input.trim().length > 0 ? input.trim().split(/\s+/).length : 0;

  const timeSpent = (testTime - timeLeft) / 60;

  const wpm = timeSpent > 0 ? Math.round(wordsTyped / timeSpent) : 0;

  // CURRENT INDEX
  const currentIndex = input.length;

  // CARET
  const { caretPosition } = useCaret({
    currentIndex,
    words,
    charRefs,
    containerRef,
  });

  // TEST CONTENT
  const { getTestContent } = useTest({
    customText,
    useCustomText,
    mode,
    dailyMode,
  });

  // RESTART
  const restartTest = () => {
    setInput("");
    setIsTyping(false);
    setTimeLeft(testTime);
    setTestCompleted(false);
    setMistakes(0);

    const testData = getTestContent();

    setWords(testData.content);

    setDailyChallengeTitle(testData.title);

    inputRef.current?.focus();
  };

  // AUTH
  const { user } = useAuth();

  // INITIAL LOAD
  useEffect(() => {
    restartTest();
  }, []);

  // AUTO COMPLETE
  useEffect(() => {
    if (!words.length) return;

    if (input.length === words.length) {
      setTimeLeft(0);

      setIsTyping(false);

      setTestCompleted(true);
    }
  }, [input, words]);

  // TAB RESTART
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

  // MODE CHANGE
  useEffect(() => {
    restartTest();
  }, [mode]);

  // DAILY CHANGE
  useEffect(() => {
    restartTest();
  }, [dailyMode]);

  // SAVE BEST WPM
  useEffect(() => {
    if (!testCompleted) return;

    if (wpm > bestWpm) {
      setBestWpm(wpm);
    }

    if (user) {
      saveScore({
        uid: user.uid,

        name: user.displayName || "anonymous",

        photoURL: user.photoURL || "",

        wpm,
        accuracy,
        mistakes,
      });
    }
  }, [testCompleted]);

  return (
    <motion.div
      className={`
        min-h-screen
        overflow-hidden
        ${theme.background}
        ${theme.text}
        flex
        flex-col
        items-center
        px-6
        pt-20
        pb-20
      `}
      onClick={() => {
        if (!isCustomInputFocused) {
          inputRef.current?.focus();
        }
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <AuthButton user={user} />
      {/* TOP CONTROLS */}
      <div className="flex flex-row gap-20 items-center mb-6">
        <ThemeSelector
          themeName={themeName}
          setThemeName={setThemeName}
          setTheme={setTheme}
        />

        <TimerSelector
          testTime={testTime}
          setTestTime={setTestTime}
          setInput={setInput}
          setIsTyping={setIsTyping}
          setTimeLeft={setTimeLeft}
          setTestCompleted={setTestCompleted}
          setMistakes={setMistakes}
          setWords={setWords}
          inputRef={inputRef}
          isTyping={isTyping}
          useCustomText={useCustomText}
          customText={customText}
          mode={mode}
          theme={theme}
        />

        <ModeSelector mode={mode} setMode={setMode} theme={theme} />

        <DailyChallenge
          dailyMode={dailyMode}
          setDailyMode={setDailyMode}
          theme={theme}
          dailyChallengeTitle={dailyChallengeTitle}
        />

        <CustomTextBox
          showCustomTextBox={showCustomTextBox}
          setShowCustomTextBox={setShowCustomTextBox}
          customText={customText}
          setCustomText={setCustomText}
          setIsCustomInputFocused={setIsCustomInputFocused}
          setInput={setInput}
          setIsTyping={setIsTyping}
          setTimeLeft={setTimeLeft}
          setTestCompleted={setTestCompleted}
          setMistakes={setMistakes}
          setWords={setWords}
          setUseCustomText={setUseCustomText}
          testTime={testTime}
          inputRef={inputRef}
          theme={theme}
        />
      </div>

      {/* STATS */}
      <StatsHeader
        timeLeft={timeLeft}
        bestWpm={bestWpm}
        mode={mode}
        theme={theme}
      />

      {/* TYPING AREA */}
      <TypingArea
        words={words}
        input={input}
        theme={theme}
        testCompleted={testCompleted}
        caretPosition={caretPosition}
        containerRef={containerRef}
        charRefs={charRefs}
      />

      {/* RESULTS */}
      {testCompleted && (
        <ResultsCard
          wpm={wpm}
          accuracy={accuracy}
          mistakes={mistakes}
          theme={theme}
        />
      )}

      {/* MESSAGE */}
      {testCompleted && (
        <p className="mt-8 text-gray-500 font-mono">
          {wpm > 80
            ? "insane speed ⚡"
            : wpm > 40
              ? "great typing 🔥"
              : "keep practicing 🚀"}
        </p>
      )}

      {/* RESTART */}
      {testCompleted && (
        <p className="text-gray-600 mt-8 font-mono text-base tracking-wide">
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
        onPaste={(e) => e.preventDefault()}
        onChange={(e) => {
          if (testCompleted) return;

          const value = e.target.value;

          if (value.length > words.length) return;

          const lastCharIndex = value.length - 1;

          if (value[lastCharIndex] !== words[lastCharIndex]) {
            setMistakes((prev) => prev + 1);
          }

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
