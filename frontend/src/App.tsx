import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import "./App.css";
import Upload from "./components/Upload/Upload";
import Form from "./components/Form/Form";
import Overview from "./components/Overview/Overview";
import NavBar from "./components/NavBar/NavBar";
import UserData from "./components/UserData/UserData";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <UserData></UserData>
      <Overview></Overview>
    </>
  );
}

export default App;
