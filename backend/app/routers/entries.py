from fastapi import APIRouter, HTTPException
from sqlmodel import Session, select

from ..models import Data, engine

router = APIRouter(prefix="/entries", tags=["entries"])


@router.get("/")
def get_entries(user_id: int):
    try:
        with Session(engine) as session:
            statement = select(Data).where(Data.user_id == user_id)
            entries = session.exec(statement).all()
            return entries
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))