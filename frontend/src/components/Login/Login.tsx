import axios from "axios";
import React, { useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { redirect } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const onSubmit = async (user: FieldValues) => {
    axios
      .post("http://localhost:8000/users/", {
        id: null,
        username: user.user,
        password: user.password,
      })
      .then(() => {
        redirect("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="user">Username: </label>
      <input {...register("user")} type="text" name="user" id="user" />
      <br />
      <label htmlFor="pw">Password: </label>
      <input {...register("password")} type="password" name="pw" id="pw" />
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
