import axios from "axios";
import { useForm, type FieldValues } from "react-hook-form";
import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";

const Form = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const onSubmit = async (data: FieldValues) => {
    axios
      .post("http://localhost:8000/data/", {
        user_id: 1, //ERSETZEN!
        sleep: Number(data.sleep_hours),
        steps: Number(data.steps),
        date: data.date,
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
          <label htmlFor="sleep_hours">Schlaf in Stunden </label>
          <input
            className="input"
            {...register("sleep_hours")}
            type="number"
            step="0.05"
            id="sleep_hours"
            min="0"
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="steps">Anzahl Schritte </label>
          <input
            className="input"
            {...register("steps")}
            type="number"
            id="steps"
            min="0"
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="date">Datum </label>
          <input
            className="input"
            {...register("date")}
            type="date"
            id="date"
            required
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
