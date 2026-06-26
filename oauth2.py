from jose import jwt
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
import os
from sqlalchemy.orm import Session
from database import get_db

SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print("PAYLOAD:", payload)
        user_id = int(payload.get("sub"))
        print("USER ID:", user_id)
        if user_id == None:
            raise HTTPException(status_code=401, detail="Invalid token.")
        return user_id
    except Exception as e:
        print("ERROR", e)
        raise HTTPException(status_code=401, detail="Invalid token.")
    