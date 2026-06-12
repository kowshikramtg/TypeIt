import WpmChart from "./analytics/WpmChart";
import AccuracyChart from "./analytics/AccuracyChart";
import useAnalytics from "../hooks/useAnalytics";
import type { Theme } from "../types/theme";
import { motion } from "framer-motion";

type AnalyticsPageProps = {
  theme: Theme;
};

const AnalyticsPage = ({ theme }: AnalyticsPageProps) => {
  const { history, data, loading, summary } = useAnalytics();
  const hasHistory = history.length > 0;

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
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-8">
          <div>
            <h1 className={`text-4xl font-semibold ${theme.text}`}>
              Typing analytics
            </h1>
            <p className={`mt-2 max-w-2xl text-sm leading-6 ${theme.sub}`}>
              A calm, human-centered summary of your recent typing sessions.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300">
            Live Firebase history
          </div>
        </div>

        {hasHistory ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                className="bg-white/5 rounded-2xl p-8 backdrop-blur-md border border-zinc-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h2 className="text-2xl font-semibold text-zinc-100 mb-6">
                  WPM progress
                </h2>
                <WpmChart data={data} accent={theme.accentHex} />
              </motion.div>

              <motion.div
                className="bg-white/5 rounded-2xl p-8 backdrop-blur-md border border-zinc-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <h2 className="text-2xl font-semibold text-zinc-100 mb-6">
                  Accuracy trend
                </h2>
                <AccuracyChart data={data} accent={theme.accentHex} />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
              {[
                { label: "Total tests", value: summary.tests },
                { label: "Average WPM", value: summary.averageWpm },
                {
                  label: "Average accuracy",
                  value: `${summary.averageAccuracy}%`,
                },
                { label: "Current streak", value: summary.streak },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6"
                >
                  <p
                    className={`text-xs uppercase tracking-[0.22em] ${theme.sub}`}
                  >
                    {stat.label}
                  </p>
                  <p className={`mt-4 text-3xl font-semibold ${theme.accent}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 mt-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className={`text-xl font-semibold ${theme.text}`}>
                    Recent sessions
                  </h2>
                  <p className={`mt-1 text-sm ${theme.sub}`}>
                    Date, mode, duration, speed, accuracy, and mistakes.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-2 text-sm">
                  <thead>
                    <tr className="text-zinc-400 text-[11px] uppercase tracking-[0.22em]">
                      <th className="pb-3 px-4">Date</th>
                      <th className="pb-3 px-4">Mode</th>
                      <th className="pb-3 px-4">Duration</th>
                      <th className="pb-3 px-4">WPM</th>
                      <th className="pb-3 px-4">Accuracy</th>
                      <th className="pb-3 px-4">Mistakes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((session) => (
                      <tr
                        key={`${session.id}-${session.createdAt?.toString()}`}
                        className="cursor-pointer rounded-3xl bg-white/5 transition hover:bg-white/10"
                        onClick={() => {
                          window.alert(
                            `Session ${session.createdAt?.toDate?.().toLocaleString() ?? "Unknown"}\nWPM: ${session.wpm}\nAccuracy: ${session.accuracy}%\nMistakes: ${session.mistakes}`,
                          );
                        }}
                      >
                        <td className="px-4 py-4 text-zinc-200">
                          {session.createdAt?.toDate?.().toLocaleDateString() ??
                            "Unknown"}
                        </td>
                        <td className="px-4 py-4 text-zinc-300 capitalize">
                          {session.mode || "words"}
                        </td>
                        <td className="px-4 py-4 text-zinc-300">
                          {session.duration ?? "-"}s
                        </td>
                        <td
                          className={`px-4 py-4 font-semibold ${theme.accent}`}
                        >
                          {session.wpm}
                        </td>
                        <td className="px-4 py-4 text-zinc-300">
                          {session.accuracy}%
                        </td>
                        <td className="px-4 py-4 text-zinc-300">
                          {session.mistakes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <p className={`text-base font-semibold ${theme.text}`}>
              No typing history yet.
            </p>
            <p
              className={`mt-3 max-w-xl mx-auto text-sm leading-6 ${theme.sub}`}
            >
              Take a typing test to start tracking your metrics and session
              history.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AnalyticsPage;
