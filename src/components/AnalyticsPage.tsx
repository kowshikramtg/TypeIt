import WpmChart from "./analytics/WpmChart";
import AccuracyChart from "./analytics/AccuracyChart";
import useAnalytics from "../hooks/useAnalytics";
import { motion } from "framer-motion";

const AnalyticsPage = () => {
  const { data, loading } = useAnalytics();

  if (loading) {
    return (
      <motion.div
        className="min-h-screen bg-zinc-950 pt-24 px-6 pb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-zinc-400 text-lg">
            Loading your analytics...
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-zinc-950 pt-24 px-6 pb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-zinc-100 mb-2">
          Your Analytics
        </h1>
        <p className="text-zinc-400 mb-10">
          Track your typing progress and improvement over time
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* WPM Chart */}
          <motion.div
            className="bg-white/5 rounded-2xl p-8 backdrop-blur-md border border-zinc-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h2 className="text-2xl font-semibold text-zinc-100 mb-6">
              WPM Progress
            </h2>
            <WpmChart data={data} />
          </motion.div>

          {/* Accuracy Chart */}
          <motion.div
            className="bg-white/5 rounded-2xl p-8 backdrop-blur-md border border-zinc-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-zinc-100 mb-6">
              Accuracy Trend
            </h2>
            <AccuracyChart data={data} />
          </motion.div>
        </div>

        {/* Stats Summary */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {[
            {
              label: "Total Tests",
              value: data.length,
              color: "from-purple-500 to-purple-600",
            },
            {
              label: "Avg WPM",
              value:
                data.length > 0
                  ? Math.round(
                      data.reduce((sum, d) => sum + d.wpm, 0) / data.length,
                    )
                  : 0,
              color: "from-blue-500 to-blue-600",
            },
            {
              label: "Best WPM",
              value: data.length > 0 ? Math.max(...data.map((d) => d.wpm)) : 0,
              color: "from-green-500 to-green-600",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white`}
            >
              <p className="text-zinc-200 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnalyticsPage;
