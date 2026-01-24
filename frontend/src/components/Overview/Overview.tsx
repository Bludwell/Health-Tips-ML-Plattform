import { BarChart, LineChart } from "@mui/x-charts";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface ActivityData {
  id: number;
  sleep: number;
  date: string;
  steps: number;
}

const Overview = () => {
  const [data, setData] = useState<ActivityData[]>([]);
  useEffect(() => {
    axios.get<ActivityData[]>("http://127.0.0.1:8000/data/").then((res) => {
      console.log("API RESPONSE:", res.data);
      setData(res.data);
    });
  }, []);
  console.log(data);
  return (
    <>
      <BarChart
        xAxis={[
          {
            id: "days",
            data: data.map((d) => d.date),
            scaleType: "band",
          },
        ]}
        series={[
          {
            label: "sleep hours",
            data: data.map((d) => d.sleep),
          },
        ]}
        height={300}
      />
      <LineChart
        series={[{ curve: "linear", data: data.map((d) => d.steps) }]}
        xAxis={[
          {
            id: "days",
            data: data.map((d) => d.date),
            scaleType: "band",
          },
        ]}
      />
    </>
  );
};

export default Overview;
