from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

#URL SQLite
DATABASE_URL = "sqlite:///./coffeeshop.db"

#Create engine
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

#Create session
sessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

#Create base model
class Base(DeclarativeBase):
    pass

#Dependency to get db
def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()