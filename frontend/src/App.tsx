import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import "./App.css";
import Upload from "./components/Upload/Upload";

interface Data {
  data: [];
}

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    axios.get<Data>("http://127.0.0.1:8000/data").then((res) => {
      console.log(res.data.data);
    });
  }, []);

  return (
    <>
      <Upload></Upload>
    </>
  );
}

export default App;
