from fastapi import FastAPI
from database import engine
import models
from routers import applications, auth

models.Base.metadata.create_all(bind=engine)
app = FastAPI()
app.include_router(applications.router)
app.include_router(auth.router)

@app.get("/")
def root():
    return {"message" : "Job Tracker API"}

