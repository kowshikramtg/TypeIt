import useTypingHistory from "../hooks/useTypingHistory";
import HistoryRow from "./HistoryRow";

const HistoryList = () => {
  const { history, loading } =
    useTypingHistory();

  if (loading) {
    return (
      <div className="text-zinc-500">
        Loading history...
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-md">
        <h2 className="text-2xl text-zinc-200 mb-6">
          Recent Tests
        </h2>

        {history.length === 0 ? (
          <p className="text-zinc-500">
            No tests completed yet.
          </p>
        ) : (
          history.map((score) => (
            <HistoryRow
              key={score.id}
              score={score}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryList;