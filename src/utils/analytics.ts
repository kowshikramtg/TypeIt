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