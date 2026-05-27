import { useState } from "react";


type UseTypingProps = {};

const useTyping = ({}: UseTypingProps) => {
  const [input, setInput] = useState("");
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

    mistakes,
    setMistakes,

    accuracy,
  };
};

export default useTyping;