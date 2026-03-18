from pydantic import BaseModel, EmailStr
from datetime import datetime


# Schema de un item individual — lo que llega desde el frontend
class OrderItemCreate(BaseModel):
    product_name: str
    product_price: float
    quantity: int


# Schema para crear una orden — lo que el frontend manda al endpoint POST /orders
class OrderCreate(BaseModel):
    customer_email: EmailStr
    # EmailStr valida automáticamente que sea un email real, no cualquier string
    items: list[OrderItemCreate]


# Schema de un item para respuestas — lo que la API devuelve
class OrderItemResponse(BaseModel):
    id: int
    product_name: str
    product_price: float
    quantity: int

    class Config:
        from_attributes = True
        # Le dice a Pydantic que puede leer datos desde objetos SQLAlchemy
        # sin esto, Pydantic solo lee diccionarios


# Schema de una orden para respuestas
class OrderResponse(BaseModel):
    id: int
    customer_email: str
    status: str
    total: float
    stripe_session_id: str | None
    created_at: datetime
    items: list[OrderItemResponse]

    class Config:
        from_attributes = True
