import { useEffect, useState } from "react";

type UseCaretProps = {
  currentIndex: number;

  words: string;

  charRefs: React.MutableRefObject<
    (HTMLSpanElement | null)[]
  >;
};

const useCaret = ({
  currentIndex,
  words,
  charRefs,
}: UseCaretProps) => {
  const [caretPosition, setCaretPosition] =
    useState({
      top: 0,
      left: 0,
    });

  const [scrollOffset, setScrollOffset] = useState(0);

  // CARET POSITION
  useEffect(() => {
    const currentChar =
      charRefs.current[currentIndex];

    if (!currentChar) return;

    queueMicrotask(() => {
      setCaretPosition({
        top: currentChar.offsetTop,
        left: currentChar.offsetLeft,
      });
      // The container is 340px high. Center is around 150px.
      // We keep the active line near the center by translating up once it passes the center.
      setScrollOffset(Math.max(0, currentChar.offsetTop - 150));
    });
  }, [currentIndex, words, charRefs]);

  return {
    caretPosition,
    scrollOffset,
  };
};

export default useCaret;