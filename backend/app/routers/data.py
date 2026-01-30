from fastapi import APIRouter, HTTPException, File, UploadFile, FastAPI
from pydantic import BaseModel
from typing import Annotated
from sqlmodel import Field, Session, SQLModel, create_engine,select,UniqueConstraint
import pandas as pd

router = APIRouter(prefix="/data",tags=["data"])

class Data(SQLModel, table = True):
    __table_args__ = (
    UniqueConstraint("user_id", "date", name="no_two_dates_per_id"),
    )
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = 1 #HIER PLATZHALTER ERSETZEN!
    sleep: float | None = None
    steps: int | None = None
    date: str | None = None

engine = create_engine("sqlite:///health.db",echo=True)
SQLModel.metadata.create_all(engine)

#List
#data = [1,2,3]
#WICHTIG: BASEMODEL
class data_object(BaseModel):
    value: int


@router.get("/")
def get_data():
    with Session(engine) as session:
        statement = select(Data)
        results = session.exec(statement).all()
        return results

@router.get("/{index}")
def get_specific_data(index:int):
    if index >= 0 and index < len(data):
        return{"data_value":data[index]}
    else:
        raise HTTPException(404,"not found")
    
@router.post("/")
def create_data(payload:Data):
    with Session(engine) as session:
        #HIER LOGIK NOCH FIXEN!
        try:
            session.add(payload)
            session.commit()
        except:
            raise HTTPException(409,"Conflict")

@router.delete("/{id}")
def delete_data(id):
    with Session(engine) as session:
        statement = select(Data).where(Data.id == id)
        results = session.exec(statement)
        data = results.one()
        session.delete(data)
        session.commit()

    #Router for CSV Upload
@router.post("/csv/")
async def create_file(file: UploadFile):
    df = pd.read_csv(file.file)
    print(df.head())
    return {"filename":file.filename, "file_type":file.content_type}
