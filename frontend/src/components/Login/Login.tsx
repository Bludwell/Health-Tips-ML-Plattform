import React from "react";
import NavBar from "../NavBar/NavBar";
import { useForm, type FieldValues } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();
  return (
    <>
      <NavBar></NavBar>
      <form className="form">
        <div className="inputBundle">
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
        <div className="inputBundle">
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
