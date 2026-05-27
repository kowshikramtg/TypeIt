import useAnalytics from "../../hooks/useAnalytics";

import WpmChart from "./WpmChart";
import AccuracyChart from "./AccuracyChart";

const AnalyticsCard = () => {
  const { data, loading } =
    useAnalytics();

  if (loading) {
    return (
      <div className="text-zinc-500">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-10">
      <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-md">
        <h2 className="text-2xl text-zinc-200 mb-8">
          Analytics
        </h2>

        <div className="space-y-10">
          <div>
            <h3 className="text-zinc-400 mb-4">
              WPM Progress
            </h3>

            <WpmChart data={data} />
          </div>

          <div>
            <h3 className="text-zinc-400 mb-4">
              Accuracy Trend
            </h3>

            <AccuracyChart data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;