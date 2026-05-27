import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from "recharts";

type ChartData = {
  date: string;
  wpm: number;
  accuracy: number;
};

type Props = {
  data: ChartData[];
};

const AccuracyChart = ({ data }: Props) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="#06b6d4"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AccuracyChart;
