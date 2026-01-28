import axios from "axios";
import { useEffect, useState } from "react";

interface ActivityData {
  id: number;
  sleep: number;
  date: string;
  steps: number;
}
function compare(a: ActivityData, b: ActivityData) {
  if (a.date < b.date) {
    return -1;
  }
  if (a.date > b.date) {
    return 1;
  }
  return 0;
}
const useActivityData = () => {
const [data, setData] = useState<ActivityData[]>([]);
const [error, setError] = useState("")
  useEffect(() => {
    axios.get<ActivityData[]>("http://localhost:8000/data/").then((res) => {
      console.log("API RESPONSE:", res.data);
      setData(res.data);
    }).catch((err) => {setError(err)});
  }, []);
  data.sort(compare);
  return {data,error};
  };


export default useActivityData;