import { useState } from "react";


type UseTypingProps = {
  words: string;
  testTime: number;
  timeLeft: number;
};

const useTyping = ({
  words,
  testTime,
  timeLeft,
}: UseTypingProps) => {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] =
    useState(false);

  const [mistakes, setMistakes] =
    useState(0);

  const correctChars = input
    .split("")
    .filter(
      (char, index) =>
        char === words[index]
    ).length;

  const wordsTyped = correctChars / 5;

  const timeSpent =
    testTime - timeLeft || 1;

  const wpm = Math.round(
    wordsTyped * (60 / timeSpent)
  );

  const accuracy =
    input.length === 0
      ? 100
      : Math.round(
          (correctChars / input.length) *
            100
        );

  return {
    input,
    setInput,

    isTyping,
    setIsTyping,

    mistakes,
    setMistakes,

    wpm,
    accuracy,
  };
};

export default useTyping;