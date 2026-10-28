from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

# Replace 'postgres', 'password', and 'your_db_name' with your actual PostgreSQL credentials
SQLALCHEMY_DATABASE_URL = "postgresql+psycopg2://postgres:arun8088@localhost:5432/SayItUp"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Base(DeclarativeBase):
    pass

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()