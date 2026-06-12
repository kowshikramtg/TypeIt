import type { Score } from "../types/score";

export const formatAnalyticsData = (
  scores: Score[]
) => {
  return scores
    .slice()
    .reverse()
    .map((score) => ({
      date: score.createdAt?.toDate
        ? score.createdAt
            .toDate()
            .toLocaleDateString()
        : "Unknown",

      wpm: score.wpm,
      accuracy: score.accuracy,
    }));
};

export const formatAnalyticsOverview = (scores: Score[]) => {
  const tests = scores.length;
  const totalWpm = scores.reduce((sum, item) => sum + item.wpm, 0);
  const totalAccuracy = scores.reduce((sum, item) => sum + item.accuracy, 0);
  const totalMistakes = scores.reduce((sum, item) => sum + item.mistakes, 0);
  const totalDuration = scores.reduce((sum, item) => sum + (item.duration ?? 0), 0);
  const totalWords = scores.reduce((sum, item) => sum + (item.wordCount ?? 0), 0);
  const bestWpm = scores.reduce((max, item) => Math.max(max, item.wpm), 0);

  const averageWpm = tests > 0 ? Math.round(totalWpm / tests) : 0;
  const averageAccuracy = tests > 0 ? Math.round(totalAccuracy / tests) : 0;

  const streak = (() => {
    const sorted = scores
      .slice()
      .sort((a, b) =>
        a.createdAt?.toDate && b.createdAt?.toDate
          ? b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
          : 0,
      );

    let currentStreak = 0;
    let previousDate: Date | null = null;

    for (const item of sorted) {
      const currentDate = item.createdAt?.toDate?.();
      if (!currentDate) break;

      if (!previousDate) {
        currentStreak = 1;
        previousDate = currentDate;
        continue;
      }

      const diffDays = Math.round(
        (previousDate.getTime() - currentDate.getTime()) /
          (1000 * 60 * 60 * 24),
      );

      if (diffDays <= 1) {
        currentStreak += 1;
        previousDate = currentDate;
      } else {
        break;
      }
    }

    return currentStreak;
  })();

  const trend = scores
    .slice()
    .sort((a, b) =>
      a.createdAt?.toDate && b.createdAt?.toDate
        ? a.createdAt.toDate().getTime() - b.createdAt.toDate().getTime()
        : 0,
    )
    .map((item) => item.wpm);

  const bestTrend = (() => {
    const sorted = scores
      .slice()
      .sort((a, b) =>
        b.createdAt?.toDate && a.createdAt?.toDate
          ? b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
          : 0,
      );

    if (sorted.length < 2) {
      return 0;
    }

    return sorted[0].wpm - sorted[1].wpm;
  })();

  return {
    tests,
    bestWpm,
    averageWpm,
    averageAccuracy,
    totalDuration,
    totalWords,
    totalMistakes,
    streak,
    bestTrend,
    trend,
  };
};