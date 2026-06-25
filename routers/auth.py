from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import User
from schemas import UserCreate, UserResponse
from passlib.context import CryptContext

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/signup", response_model=UserResponse)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    hashed_pass = pwd_context.hash(user.password)
    new_user = User(email=user.email, username=user.username, password=hashed_pass, name=user.name, bio=user.bio)
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


