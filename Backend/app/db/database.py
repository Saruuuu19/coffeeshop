from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

# URL de conexión a SQLite
# El archivo coffee.db se crea automáticamente en la raíz del proyecto
DATABASE_URL = "sqlite:///./coffee.db"

# El engine es el punto de conexión entre SQLAlchemy y SQLite
# check_same_thread=False es necesario solo para SQLite
# porque por defecto SQLite solo permite un hilo, y FastAPI usa varios
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# SessionLocal es la fábrica de sesiones
# Cada request HTTP obtendrá su propia sesión para hablar con la DB
# autocommit=False → los cambios no se guardan hasta que tú lo confirmes con .commit()
# autoflush=False → SQLAlchemy no envía cambios a la DB automáticamente antes de cada query
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Base es la clase de la que heredarán todos los modelos
# SQLAlchemy la usa para saber qué clases son tablas
class Base(DeclarativeBase):
    pass


# Función generadora que provee una sesión de DB a cada endpoint
# yield en lugar de return permite cerrar la sesión al terminar la request
# aunque haya ocurrido un error — esto evita conexiones abiertas
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
