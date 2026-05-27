import { useEffect, useState } from "react";

type UseCaretProps = {
  currentIndex: number;

  words: string;

  charRefs: React.MutableRefObject<
    (HTMLSpanElement | null)[]
  >;

  containerRef: React.RefObject<HTMLDivElement | null>;
};

const useCaret = ({
  currentIndex,
  words,
  charRefs,
  containerRef,
}: UseCaretProps) => {
  const [caretPosition, setCaretPosition] =
    useState({
      top: 0,
      left: 0,
    });

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
    });
  }, [currentIndex, words, charRefs]);

  // AUTO SCROLL
  useEffect(() => {
    const currentChar =
      charRefs.current[currentIndex];

    const container =
      containerRef.current;

    if (!currentChar || !container)
      return;

    const scrollPosition =
      currentChar.offsetTop - 120;

    container.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
  }, [currentIndex, charRefs, containerRef]);

  return {
    caretPosition,
  };
};

export default useCaret;