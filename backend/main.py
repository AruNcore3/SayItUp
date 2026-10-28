from fastapi import FastAPI
from services import feedback_service

# 1. Import your Base, engine, and models
from db.database import Base, engine
from db import models

app = FastAPI(
    title="SayItUp",
    description="SayItUp.ai is an AI-powered feedback management SaaS..."
)

# 2. Create the tables automatically
Base.metadata.create_all(bind=engine)

@app.post("/home")
def home():
    return {"message": "welcome you're in 🌚"}

app.include_router(feedback_service.router)