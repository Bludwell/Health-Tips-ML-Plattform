import datetime
from fastapi import APIRouter, HTTPException, File, UploadFile, FastAPI
from pydantic import BaseModel
from typing import Annotated
from sqlmodel import Field, Session, SQLModel, create_engine,select,UniqueConstraint
import pandas as pd
from ..models import Data
import joblib
from pathlib import Path

router = APIRouter(prefix="/data",tags=["data"])



# engine = create_engine("sqlite:///health.db",echo=True)
# SQLModel.metadata.create_all(engine)

# class data_object(BaseModel):
#     value: int


# @router.get("/")
# def get_data():
#     with Session(engine) as session:
#         statement = select(Data)
#         results = session.exec(statement).all()
#         return results

# @router.get("/{index}")
# def get_specific_data(index:int):
#     if index >= 0 and index < len(data):
#         return{"data_value":data[index]}
#     else:
#         raise HTTPException(404,"not found")
    


# @router.delete("/{id}")
# def delete_data(id):
#     with Session(engine) as session:
#         statement = select(Data).where(Data.id == id)
#         results = session.exec(statement)
#         data = results.one()
#         session.delete(data)
#         session.commit()
