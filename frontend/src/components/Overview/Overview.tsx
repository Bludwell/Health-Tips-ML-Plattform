import { BarChart, LineChart } from "@mui/x-charts";
import useGames from "../../hooks/useActivityData";
import "./Overview.css";
import NavBar from "../NavBar/NavBar";
const Overview = () => {
  const { data, error } = useGames();
  console.log(data);
  return (
    <>
      <NavBar></NavBar>
      <div className="main">
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
          series={[{ curve: "monotoneX", data: data.map((d) => d.steps) }]}
          xAxis={[
            {
              id: "days",
              data: data.map((d) => d.date),
              scaleType: "band",
            },
          ]}
          yAxis={[{ min: 0 }]}
          height={300}
          colors={["orange"]}
        />
      </div>
    </>
  );
};

export default Overview;
