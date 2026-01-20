import { BarChart } from "@mui/x-charts";
import React from "react";

const Overview = () => {
  return (
    <BarChart
      xAxis={[
        {
          id: "barCategories",
          data: ["bar A", "bar B", "bar C"],
          height: 28,
        },
      ]}
      series={[
        {
          data: [2, 5, 3],
        },
      ]}
      height={300}
    />
  );
};

export default Overview;
