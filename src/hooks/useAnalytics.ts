import { useMemo } from "react";

import useTypingHistory from "./useTypingHistory";

import {
  formatAnalyticsData,
  formatAnalyticsOverview,
} from "../utils/analytics";

const useAnalytics = () => {
  const { history, loading } =
    useTypingHistory();

  const data = useMemo(() => {
    return formatAnalyticsData(history);
  }, [history]);

  const summary = useMemo(() => {
    return formatAnalyticsOverview(history);
  }, [history]);

  return {
    history,
    data,
    loading,
    summary,
  };
};

export default useAnalytics;