import json
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlmodel import Session, select

from ..models import Data, engine
from ..recommendation import generate_recommendations

router = APIRouter(prefix="/confirm", tags=["confirm"])


class ConfirmPayload(BaseModel):
    entry_id: int
    user_id: int
    confirmed_labels: dict[str, bool]


@router.post("/")
def confirm_prediction(payload: ConfirmPayload):
    try:
        with Session(engine) as session:
            statement = select(Data).where(Data.id == payload.entry_id)
            db_entry = session.exec(statement).first()

            if not db_entry:
                raise HTTPException(status_code=404, detail="Data entry not found")

            active_labels = [
                label for label, is_checked in payload.confirmed_labels.items()
                if is_checked
            ]

            db_entry.confirmed_label = json.dumps(
                {"labels": active_labels},
                ensure_ascii=False
            )

            recommendations = generate_recommendations(
                user_id=payload.user_id,
                confirmed_labels=active_labels
            )

            session.add(db_entry)
            session.commit()
            session.refresh(db_entry)

        return {
            "message": "Confirmed labels saved successfully",
            "entry_id": db_entry.id,
            "confirmed_labels": active_labels,
            "recommendations": recommendations,
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error while saving confirmed labels: {str(e)}"
        )