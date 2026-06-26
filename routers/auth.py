from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import get_db
from models import User
from schemas import UserCreate, UserResponse, LoginRequest
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta, timezone
import os

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
ALGORITHM = "HS256"

def create_token(user_id):
    payload = {
        "sub": str(user_id),
        "exp": datetime.now(timezone.utc) + timedelta(hours=1)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token

@router.post("/signup", response_model=UserResponse)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    hashed_pass = pwd_context.hash(user.password)
    new_user = User(email=user.email, username=user.username, password=hashed_pass, name=user.name, bio=user.bio)
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login")
def login(user: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    find_username = db.query(User).filter(User.username == user.username).first()
    if find_username == None:
        raise HTTPException(status_code=404, detail="Item not found")
    
    if pwd_context.verify(user.password, find_username.password) != True:
        raise HTTPException(status_code=404, detail="Incorrect Password")

    access_token = create_token(find_username.id)
    return {"access_token": access_token, "token_type": "bearer"}
