
from fastapi import APIRouter, HTTPException, File, UploadFile, FastAPI
from pydantic import BaseModel
from typing import Annotated
from sqlmodel import Field, Session, SQLModel, create_engine,select,UniqueConstraint
from passlib.hash import pbkdf2_sha256
from ..models import Users, ClearUsers,engine

router = APIRouter(prefix="/users",tags=["users"])



def hash_password(password):
    return pbkdf2_sha256.hash(password)



@router.post("/register/")
def create_user(user : ClearUsers):
    hashed_pw = hash_password(user.password)
    with Session(engine) as session:
        extra_data = {"password_hashed": hashed_pw}
        db_user = Users.model_validate(user,update=extra_data)
        print(db_user)
        session.add(db_user)
        session.commit()
        session.refresh(db_user)
        return db_user
@router.post("/login/")
def check_user(user: ClearUsers):
    with Session(engine) as session:
        statement = select(Users).where(Users.username == user.username)
        results = session.exec(statement)
        if results:
            for x in results:
                print(x.password_hashed)
                if pbkdf2_sha256.verify(user.password,x.password_hashed):
                    print("success!")
                else:
                    raise HTTPException(status_code=401, detail="invalid credentials")
        else:
            raise HTTPException(status_code=401, detail="invalid credentials")
            