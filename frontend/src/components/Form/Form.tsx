import axios from "axios";
import { useForm, type FieldValues } from "react-hook-form";
import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./Form.css";

type PredictionResponse = {
  entry_id: number;
  labels: Record<string, number>;
};

type Recommendation = {
  text: string;
  score?: number;
};

type ConfirmResponse = {
  message: string;
  entry_id: number;
  confirmed_labels: string[];
  recommendations: Array<string | Recommendation>;
};

const THRESHOLD = 0.5;

const Form = () => {
  const { register, handleSubmit, reset } = useForm();
  const [view, setView] = useState<"form" | "result" | "recommendations">(
    "form",
  );
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [editedLabels, setEditedLabels] = useState<Record<string, boolean>>({});
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [submittedText, setSubmittedText] = useState("");

  const labelNames: Record<string, string> = {
    schlaf: "Schlaf",
    stress: "Stress",
    bewegung: "Bewegung",
    ernaehrung: "Ernährung",
  };

  const normalizeRecommendations = (
    recs: Array<string | Recommendation> | undefined,
  ): Recommendation[] => {
    if (!recs) return [];

    return recs.map((rec) => {
      if (typeof rec === "string") {
        return { text: rec };
      }

      return {
        text: rec.text,
        score: rec.score,
      };
    });
  };

  const onSubmit = async (data: FieldValues) => {
    setError("");
    setSuccessMessage("");
    setResult(null);
    setEditedLabels({});
    setRecommendations([]);
    setIsAnalyzing(true);

    try {
      const response = await axios.post<PredictionResponse>(
        "http://localhost:8000/predict/",
        {
          user_id: 1,
          text: data.health_text,
        },
      );

      const predictionData = response.data;

      setResult(predictionData);
      setSubmittedText(data.health_text);

      const initialCheckboxValues = Object.fromEntries(
        Object.entries(predictionData.labels).map(([label, probability]) => [
          label,
          probability >= THRESHOLD,
        ]),
      );

      setEditedLabels(initialCheckboxValues);
      setView("result");
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Fehler bei der Analyse");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCheckboxChange = (label: string, checked: boolean) => {
    setEditedLabels((prev) => ({
      ...prev,
      [label]: checked,
    }));
  };

  const confirmPrediction = async () => {
    if (!result) return;

    setError("");
    setSuccessMessage("");
    setIsConfirming(true);

    try {
      const response = await axios.post<ConfirmResponse>(
        "http://localhost:8000/confirm/",
        {
          entry_id: result.entry_id,
          user_id: 1,
          confirmed_labels: editedLabels,
        },
      );

      setRecommendations(
        normalizeRecommendations(response.data.recommendations),
      );
      setSuccessMessage("Die Auswahl wurde erfolgreich bestätigt.");
      reset();
      setResult(null);
      setEditedLabels({});
      setSubmittedText("");
      setView("recommendations");
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Fehler beim Bestätigen");
    } finally {
      setIsConfirming(false);
    }
  };

  const startNewAnalysis = () => {
    reset();
    setError("");
    setSuccessMessage("");
    setResult(null);
    setEditedLabels({});
    setRecommendations([]);
    setSubmittedText("");
    setView("form");
  };

  return (
    <>
      <NavBar />
      <div className="form-wrapper">
        <div className="form-container">
          {view === "form" && (
            <form onSubmit={handleSubmit(onSubmit)}>
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

              <button className="btn" type="submit" disabled={isAnalyzing}>
                {isAnalyzing ? "Analyse läuft..." : "Analyse starten"}
              </button>
            </form>
          )}

          {view === "result" && result && (
            <div className="result-section">
              <h2>Analyseergebnis</h2>

              <p>
                <strong>Text:</strong> {submittedText}
              </p>

              <h3>Geschätzte Problembereiche</h3>

              <div className="checkbox-list">
                {Object.entries(editedLabels).map(([label, checked]) => (
                  <label key={label} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) =>
                        handleCheckboxChange(label, e.target.checked)
                      }
                    />
                    <span>
                      {labelNames[label] || label} (
                      {((result.labels[label] ?? 0) * 100).toFixed(1)}%)
                    </span>
                  </label>
                ))}
              </div>

              <button
                className="btn"
                type="button"
                onClick={confirmPrediction}
                disabled={isConfirming}
              >
                {isConfirming
                  ? "Bestätigung läuft..."
                  : "Empfehlungen bestätigen"}
              </button>
            </div>
          )}

          {view === "recommendations" && (
            <div className="result-section">
              <h2>Empfehlungen</h2>

              <ul className="recommendation-list">
                {recommendations.map((tip, index) => (
                  <li key={index}>
                    <p>{tip.text}</p>
                  </li>
                ))}
              </ul>

              <button className="btn" type="button" onClick={startNewAnalysis}>
                Neue Analyse starten
              </button>
            </div>
          )}

          {error && <p className="message error-message">{error}</p>}
          {successMessage && view !== "recommendations" && (
            <p className="message success-message">{successMessage}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Form;
