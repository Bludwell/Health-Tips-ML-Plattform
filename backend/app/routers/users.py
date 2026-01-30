
from fastapi import APIRouter, HTTPException, File, UploadFile, FastAPI
from pydantic import BaseModel
from typing import Annotated
from sqlmodel import Field, Session, SQLModel, create_engine,select,UniqueConstraint
from passlib.hash import pbkdf2_sha256

router = APIRouter(prefix="/users",tags=["users"])

def hash_password(password):
    return pbkdf2_sha256.hash(password)

class UsersBase(SQLModel):
    id: int | None = Field(default=None, primary_key=True)
    username: str = Field()

class Users(UsersBase, table = True):
    __table_args__ = (
    UniqueConstraint("username", name="no_two_usernames"),
    )
    id: int | None = Field(default=None, primary_key=True)
    username: str
    password_hashed: str = Field()

class CreateUsers(UsersBase):
    password: str
    

engine = create_engine("sqlite:///health.db",echo=True)
SQLModel.metadata.create_all(engine)

@router.post("/")
def create_user(user : CreateUsers):
    print("gestartet")
    hashed_pw = hash_password(user.password)
    with Session(engine) as session:
        extra_data = {"password_hashed": hashed_pw}
        db_user = Users.model_validate(user,update=extra_data)
        print(db_user)
        session.add(db_user)
        session.commit()
        session.refresh(db_user)
        return db_user
