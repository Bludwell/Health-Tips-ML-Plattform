import axios from "axios";
import { useForm, type FieldValues } from "react-hook-form";
import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./Form.css";

const Form = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const onSubmit = async (data: FieldValues) => {
    axios
      .post("http://localhost:8000/data/", {
        user_id: 1, //ERSETZEN!
        text: data.health_text,
      })
      .then(() => window.location.reload())
      .catch((err) => setError(err));
  };
  return (
    <>
      <NavBar></NavBar>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action={"#"}
        className="form-container"
      >
        <div>
          <label htmlFor="health_text">
            Welche Probleme siehst du aktuell?
          </label>
          <input
            className="input"
            {...register("health_text")}
            type="text"
            id="health_text"
            required
            size={1}
          />
        </div>

        <br />
        <button className="btn" type="submit">
          submit
        </button>
        {error && <p>{error.toString()}</p>}
      </form>
    </>
  );
};

export default Form;
