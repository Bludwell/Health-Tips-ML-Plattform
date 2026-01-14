from fastapi import APIRouter, HTTPException, File, UploadFile, FastAPI
from pydantic import BaseModel
from typing import Annotated
import pandas as pd

router = APIRouter(prefix="/data",tags=["data"])

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
def create_data(payload:data_object):
    data.append(payload.value)
    #Router for CSV Upload
@router.post("/csv/")
async def create_file(file: UploadFile):
    return {"filename":file.filename}
    # DELETE /data 
@router.delete("/{index}",status_code=204) 
def delete_data(index:int): 
    if index >= 0 and index < len(data): 
        data.pop(index)
    else:
        raise HTTPException(404,"not found")
