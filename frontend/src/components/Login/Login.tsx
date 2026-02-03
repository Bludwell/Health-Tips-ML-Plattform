import React from "react";
import NavBar from "../NavBar/NavBar";
import { useForm, type FieldValues } from "react-hook-form";
import "./Login.css";

const Login = () => {
  const { register, handleSubmit } = useForm();
  return (
    <>
      <NavBar></NavBar>
      <form className="form-container">
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
            {...register("password")}
            type="password"
            name="pw"
            id="pw"
            required
          />
        </div>
        <br />
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
