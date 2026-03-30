import React, { useRef, useState, useEffect, useContext } from "react";
import NavBar from "../NavBar/NavBar";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import "./Login.css";
import AuthContext from "../../context/AuthProvider";
import axios from "axios";
import { SnippetFolder } from "@mui/icons-material";

interface ResponseData {
  detail: string;
}

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const [status, setStatus] = useState<ResponseData>({ detail: "" });
  const [error, setError] = useState("");
  const { register, handleSubmit, setFocus } = useForm();
  useEffect(() => {
    setFocus("user");
  }, [setFocus]);
  const onLogin: SubmitHandler<FieldValues> = (data, e) => {
    e?.preventDefault;
    axios
      .post("http://localhost:8000/users/login/", {
        username: data.user,
        password: data.pw,
      })
      .then((res) => {
        setStatus(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  };
  return (
    <>
      <NavBar></NavBar>
      <form className="form-container" onSubmit={handleSubmit(onLogin)}>
        <div>
          <label htmlFor="user">Username</label>
          <input
            className="input"
            {...register("user")}
            type="text"
            name="user"
            id="user"
            required
            minLength={3}
          />
        </div>
        <br />
        <div>
          <label htmlFor="pw">Password</label>
          <input
            className="input"
            {...register("pw")}
            type="password"
            name="pw"
            id="pw"
            required
          />
        </div>
        <br />
        {status.detail == "invalid credentials" && (
          <p>Username und Passwort überprüfen</p>
        )}
        {status.detail}
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
