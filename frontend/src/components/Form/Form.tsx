import axios from "axios";
import React, { useEffect } from "react";
import { useForm, type FieldValues } from "react-hook-form";

const Form = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/data/", {
        sleep: Number(data.sleep_hours),
        steps: Number(data.steps),
        date: data.date,
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="sleep_hours">Schlaf in Stunden </label>
        <input
          {...register("sleep_hours")}
          type="number"
          step="0.05"
          id="sleep_hours"
          min="0"
          required
        />
      </div>
      <div>
        <label htmlFor="steps">Anzahl Schritte </label>
        <input
          {...register("steps")}
          type="number"
          id="steps"
          min="0"
          required
        />
      </div>
      <div>
        <label htmlFor="date">Datum </label>
        <input {...register("date")} type="date" id="date" required />
      </div>
      <button type="submit">submit</button>
    </form>
  );
};

export default Form;
