import axios from "axios";
import React, { useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { redirect } from "react-router-dom";
import "./Register.css";
import NavBar from "../NavBar/NavBar";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const onSubmit = async (user: FieldValues) => {
    if (user.pwCheck == user.pw) {
      axios
        .post("http://localhost:8000/users/register/", {
          id: null,
          username: user.user,
          password: user.pw,
        })
        .then(() => {
          redirect("/");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log("matcht nicht");
    }
  };
  return (
    <>
      <NavBar></NavBar>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
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
            {...register("pw")}
            type="password"
            name="pw"
            id="pw"
            required
            minLength={8}
          />
        </div>
        <br />
        <div className="inputBundle">
          <label htmlFor="pwCheck">Password wiederholen</label>
          <input
            className="input"
            {...register("pwCheck")}
            type="password"
            name="pwCheck"
            id="pwCheck"
            required
          ></input>
        </div>
        <br />
        <button type="submit" className="btn">
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
