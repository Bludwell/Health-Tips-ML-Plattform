import { BarChart, LineChart } from "@mui/x-charts";
import useGames from "../../hooks/useActivityData";

const Overview = () => {
  const { data, error } = useGames();
  console.log(data);
  return (
    <>
      {error && <p>{error}</p>}
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
