import { FC } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface DataItem {
  category: string;
  amount: number;
}

interface BarChartComponentProps {
  data: DataItem[] | undefined;
}

const BarChartComponent: FC<BarChartComponentProps> = ({ data }) => {
  return (
    <BarChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis
        width={80}
        tickFormatter={(value) => `$${value.toLocaleString("us-US")}`}
      />
      <Tooltip
        formatter={(value) => `$${(value as number).toLocaleString("us-US")}`}
      />
      <Bar dataKey="amount" fill="#8884d8" barSize={20} />
    </BarChart>
  );
};

export default BarChartComponent;
