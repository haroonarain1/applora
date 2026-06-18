from fastapi import APIRouter, Depends
from database import get_db
from models import Applications
from schemas import ApplicationCreate, ApplicationResponse
from sqlalchemy.orm import Session

router = APIRouter()

@router.post("/applications", response_model=ApplicationResponse)
def create_application(application: ApplicationCreate, db: Session = Depends(get_db)):
    new_application = Applications(company=application.company, role=application.role, 
    salary=application.salary, date_applied=application.date_applied, status=application.status, 
    notes=application.notes, user_id=1)

    db.add(new_application)
    db.commit()
    db.refresh(new_application)

    return new_application