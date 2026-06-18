from pydantic import BaseModel
from datetime import date

class ApplicationCreate(BaseModel):
    company: str
    title: str
    salary: int = None
    date_applied: date
    status: str
    notes: str = None

class ApplicationResponse(ApplicationCreate):
    id: int
    user_id: int

    class Config:
        from_attributes = True

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    name: str = None
    bio: str = None

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    name: str = None
    bio: str = None

    class Config:
        from_attributes = True