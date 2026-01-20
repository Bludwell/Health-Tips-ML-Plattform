from fastapi import APIRouter, HTTPException, File, UploadFile, FastAPI
from pydantic import BaseModel
from typing import Annotated
from sqlmodel import Field, Session, SQLModel, create_engine
import pandas as pd
import datetime

router = APIRouter(prefix="/data",tags=["data"])

class Data(SQLModel, table = True):
    id: int | None = Field(default=None, primary_key=True)
    sleep: float | None = None
    steps: int | None = None
    date: str | None = None

engine = create_engine("sqlite:///health.db")
SQLModel.metadata.create_all(engine)

#List
data = [1,2,3]
#WICHTIG: BASEMODEL
class data_object(BaseModel):
    value: int


@router.get("/")
def get_data():
    return({"data":data})

@router.get("/{index}")
def get_specific_data(index:int):
    if index >= 0 and index < len(data):
        return{"data_value":data[index]}
    else:
        raise HTTPException(404,"not found")
    
@router.post("/")
def create_data(payload:Data):
    with Session(engine) as session:
        session.add(payload)
        session.commit()
    #Router for CSV Upload
@router.post("/csv/")
async def create_file(file: UploadFile):
    df = pd.read_csv(file.file)
    print(df.head())
    return {"filename":file.filename, "file_type":file.content_type}
    # DELETE /data 
@router.delete("/{index}",status_code=204) 
def delete_data(index:int): 
    if index >= 0 and index < len(data): 
        data.pop(index)
    else:
        raise HTTPException(404,"not found")
