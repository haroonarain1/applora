from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import User
from schemas import UserCreate, UserResponse, LoginRequest
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import os

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
ALGORITHM = "HS256"

def create_token(user_id):
    payload = {
        "sub": user_id,
        "exp": datetime.now() + timedelta(hours=1)
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
def login(user: LoginRequest, db: Session = Depends(get_db)):
    find_email = db.query(User).filter(User.email == user.email).first()
    if find_email == None:
        raise HTTPException(status_code=404, detail="Item not found")
    
    if pwd_context.verify(user.password, find_email.password) != True:
        raise HTTPException(status_code=404, detail="Incorrect Password")

    access_token = create_token(find_email.id)
    return {"access_token": access_token, "token_type": "bearer"}
