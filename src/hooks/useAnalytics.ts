import { useMemo } from "react";

import useTypingHistory from "./useTypingHistory";

import { formatAnalyticsData } from "../utils/analytics";

const useAnalytics = () => {
  const { history, loading } =
    useTypingHistory();

  const data = useMemo(() => {
    return formatAnalyticsData(history);
  }, [history]);

  return {
    data,
    loading,
  };
};

export default useAnalytics;