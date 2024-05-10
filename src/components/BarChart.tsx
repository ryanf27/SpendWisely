import { FC } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { BarChartComponentProps } from "@/types";

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
      <Bar dataKey="amount" fill="#0933ff" barSize={20} />
    </BarChart>
  );
};

export default BarChartComponent;
