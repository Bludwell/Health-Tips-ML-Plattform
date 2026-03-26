import json
import joblib
from pathlib import Path

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlmodel import Session

from ..models import Data, engine

router = APIRouter(prefix="/predict", tags=["predict"])

labels = ["schlaf", "stress", "bewegung", "ernaehrung"]

BASE_DIR = Path(__file__).resolve().parent.parent
model_path = BASE_DIR / "model.joblib"

loaded_model = joblib.load(model_path)


class PredictPayload(BaseModel):
    user_id: int
    text: str


class PredictResponse(BaseModel):
    entry_id: int
    labels: dict[str, float]


@router.post("/", response_model=PredictResponse)
def predict_labels(payload: PredictPayload):
    texts = [payload.text]

    try:
        probabilities = loaded_model.predict_proba(texts)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )

    probability_result = {}

    if isinstance(probabilities, list):
        for label, prob in zip(labels, probabilities):
            probability_result[label] = float(prob[0][1])
    else:
        for label, prob in zip(labels, probabilities[0]):
            probability_result[label] = float(prob)

    predicted_json = json.dumps(
        {"labels": probability_result},
        ensure_ascii=False
    )

    db_entry = Data(
        user_id=payload.user_id,
        text=payload.text,
        predicted_label=predicted_json,
        confirmed_label=None
    )

    with Session(engine) as session:
        try:
            session.add(db_entry)
            session.commit()
            session.refresh(db_entry)
        except Exception as e:
            raise HTTPException(
                status_code=409,
                detail=f"Database conflict: {str(e)}"
            )

    return PredictResponse(
        entry_id=db_entry.id,
        labels=probability_result
    )