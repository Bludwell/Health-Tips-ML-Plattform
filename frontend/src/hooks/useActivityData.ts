import { useEffect, useState } from "react";
import axios from "axios";

export type ActivityData = {
  id: number;
  user_id: number;
  timestamp: string;
  text: string;
  predicted_label: string | null;
  confirmed_label: string | null;
};

const useActivityData = () => {
  const [data, setData] = useState<ActivityData[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/entries", {
        params: { user_id: 1 },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.response?.data?.detail || "Fehler beim Laden der Einträge");
        setLoading(false);
      });
  }, []);

  return { data, error, loading };
};

export default useActivityData;