from database import Base
from sqlalchemy import Column, Integer, String, Date, ForeignKey

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String, nullable=False)
    username = Column(String, nullable=False)
    password = Column(String, nullable=False)
    name = Column(String, nullable = True)
    bio = Column(String, nullable = True)


class Applications(Base):
    __tablename__ = "applications"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    company = Column(String, nullable=False)
    role = Column(String, nullable=False)
    salary = Column(Integer, nullable=True)
    date_applied = Column(Date)
    status = Column(String, nullable=True)