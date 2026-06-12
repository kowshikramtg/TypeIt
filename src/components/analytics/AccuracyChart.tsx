import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from "recharts";

type ChartData = {
  date: string;
  wpm: number;
  accuracy: number;
};

type Props = {
  data: ChartData[];
  accent?: string;
};

const AccuracyChart = ({ data, accent = "#f5c2e7" }: Props) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="accuracy"
            stroke={accent}
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AccuracyChart;
