import { useState } from "react";


const useTyping = () => {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] =
    useState(false);
  const [mistakes, setMistakes] =
    useState(0);

  const accuracy =
    input.length > 0
      ? Math.max(
          0,
          Math.round(
            ((input.length -
              mistakes) /
              input.length) *
              100
          )
        )
      : 100;

  return {
    input,
    setInput,

    isTyping,
    setIsTyping,

    mistakes,
    setMistakes,

    accuracy,
  };
};

export default useTyping;