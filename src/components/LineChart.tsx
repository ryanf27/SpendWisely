import React, { memo } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { LineChartComponentProps } from "@/types";

const LineChartComponent: React.FC<LineChartComponentProps> = ({ data }) => {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="allMonths"
          tickFormatter={(value) => (value ? value : "")}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="income"
          stroke="#0933ff"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="expense" stroke="#ff0000" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default memo(LineChartComponent);
