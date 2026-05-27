import { useEffect, useState } from "react";

import useAuth from "./useAuth";
import { getUserActivity } from "../firebase/streak";

import {
  differenceInDays,
  isSameDay,
} from "../utils/streakUtils";

const useStreak = () => {
  const { user } = useAuth();

  const [currentStreak, setCurrentStreak] =
    useState(0);

  const [longestStreak, setLongestStreak] =
    useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchStreak = async () => {
      try {
        const activity = await getUserActivity(
          user.uid
        );

        if (activity.length === 0) return;

        const uniqueDays: Date[] = [];

        activity.forEach((score) => {
          const date =
            score.createdAt?.toDate();

          const alreadyExists =
            uniqueDays.some((d) =>
              isSameDay(d, date)
            );

          if (!alreadyExists) {
            uniqueDays.push(date);
          }
        });

        let streak = 1;
        let longest = 1;

        for (
          let i = 1;
          i < uniqueDays.length;
          i++
        ) {
          const diff = differenceInDays(
            uniqueDays[i],
            uniqueDays[i - 1]
          );

          if (diff === 1) {
            streak++;
          } else {
            streak = 1;
          }

          longest = Math.max(
            longest,
            streak
          );
        }

        const today = new Date();

        const lastDay =
          uniqueDays[uniqueDays.length - 1];

        const latestDiff =
          differenceInDays(today, lastDay);

        if (latestDiff > 1) {
          streak = 0;
        }

        setCurrentStreak(streak);
        setLongestStreak(longest);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStreak();
  }, [user]);

  return {
    currentStreak,
    longestStreak,
  };
};

export default useStreak;