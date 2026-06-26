from fastapi import APIRouter, Depends
from database import get_db
from models import Applications
from schemas import ApplicationCreate, ApplicationResponse
from sqlalchemy.orm import Session
from oauth2 import get_current_user

router = APIRouter()


@router.post("/applications", response_model=ApplicationResponse)
def create_application(application: ApplicationCreate, db: Session = Depends(get_db), current_user: int = Depends(get_current_user)):
    new_application = Applications(company=application.company, role=application.role, 
    salary=application.salary, date_applied=application.date_applied, status=application.status, 
    notes=application.notes, user_id=current_user)

    db.add(new_application)
    db.commit()
    db.refresh(new_application)

    return new_application

@router.get("/applications", response_model=list[ApplicationResponse])
def get_applications(db: Session = Depends(get_db), current_user: int = Depends(get_current_user)):
    receive_app = db.query(Applications).all()
    return receive_app

@router.put("/applications/{id}", response_model=ApplicationResponse)
def update_applications(id: int, application: ApplicationCreate, db: Session = Depends(get_db), current_user: int = Depends(get_current_user)):
    put_app = db.query(Applications).filter(Applications.id == id).first()
    put_app.company = application.company
    put_app.role = application.role
    put_app.salary = application.salary
    put_app.date_applied = application.date_applied
    put_app.status = application.status
    put_app.notes = application.notes
 

    db.commit()
    db.refresh(put_app)
    return put_app

@router.delete("/applications/{id}", response_model=ApplicationResponse)
def delete_application(id: int, db: Session = Depends(get_db),current_user: int = Depends(get_current_user)):
    remove_app = db.query(Applications).filter(Applications.id == id).first()
    db.delete(remove_app)

    db.commit()
    return remove_app