from sqlmodel import Field, SQLModel, create_engine,UniqueConstraint
import datetime

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

class ClearUsers(UsersBase):
    password: str
    
class Data(SQLModel, table = True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(default=1, foreign_key="users.id")
    timestamp: str | None = Field(default_factory=datetime.datetime.now)
    text: str | None = None
    predicted_label: str | None = None
    confirmed_label: str | None = None


engine = create_engine("sqlite:///health.db",echo=True)
SQLModel.metadata.create_all(engine)