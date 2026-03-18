from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import engine, Base
from app.routers import orders

# Crear todas las tablas definidas en los modelos si no existen
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Coffee Shop API")

# CORS permite que tu frontend en Vercel hable con este backend
# Sin esto el navegador bloquea las requests por seguridad
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4321", "https://coffeeshop-woad.vercel.app"],
    # Actualiza la URL de Vercel cuando hagas deploy
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar el router de orders
app.include_router(orders.router)


@app.get("/")
def root():
    return {"status": "Coffee Shop API running"}
