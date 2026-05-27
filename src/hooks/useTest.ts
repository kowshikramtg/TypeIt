import generateWords from "../utils/generateWords";
import codeSnippets from "../data/codeSnippets";
import dailyChallenges from "../data/dailyChallenges";

type UseTestProps = {
  customText: string;

  useCustomText: boolean;

  mode: "words" | "code";

  dailyMode: boolean;
};

const useTest = ({
  customText,
  useCustomText,
  mode,
  dailyMode,
}: UseTestProps) => {
  const generateContent = () => {
    if (
      useCustomText &&
      customText.trim().length > 0
    ) {
      return customText;
    }

    if (mode === "code") {
      const randomIndex = Math.floor(
        Math.random() *
          codeSnippets.length
      );

      return codeSnippets[randomIndex];
    }

    return generateWords(30);
  };

  const generateDailyChallenge = () => {
    const dayIndex =
      new Date().getDate() %
      dailyChallenges.length;

    return dailyChallenges[dayIndex];
  };

  const getTestContent = () => {
    if (dailyMode) {
      return generateDailyChallenge();
    }

    return {
      title: "",
      content: generateContent(),
    };
  };

  return {
    getTestContent,
  };
};

export default useTest;