import "./App.css";
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
      <Form></Form>
    </>
  );
}

export default App;
