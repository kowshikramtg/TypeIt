import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";

type Props = {
  data: any[];
};

const WpmChart = ({ data }: Props) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <LineChart data={data}>
          <XAxis dataKey="date" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="wpm"
            stroke="#eab308"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WpmChart;