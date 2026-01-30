from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .routers import data
from .routers import users


app = FastAPI()

origins = [
    "http://localhost:5173"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
app.include_router(data.router)
app.include_router(users.router)

@app.get("/")
async def root():
    return {"Hello":"World"}