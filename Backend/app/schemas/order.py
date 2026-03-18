from pydantic import BaseModel, EmailStr
from datetime import datetime


# Schemas for individual items
class OrderItemCreate(BaseModel):
    product_name: str
    product_price: float
    quantity: int


# Schema for creating an order - what the frontend sends to endpoint POST /orders
class OrderCreate(BaseModel):
    customer_email: EmailStr
    # EmailStr validates the email format, not any string
    items: list[OrderItemCreate]


# Schema of an item to answer (API sends back to frontend)
class OrderItemResponse(BaseModel):
    id: int
    order_id: int
    product_name: str
    product_price: float
    quantity: int

    class Config:
        from_attributes = True
        # Tells pydantic to map the fields from SQLAlchemy ORM objects
        # Without this, the API would return empty objects {}


# Schema of an order to answer (API sends back to frontend)
class OrderResponse(BaseModel):
    id: int
    customer_email: EmailStr
    status: str
    total: float
    stripe_session_id: str | None
    created_at: datetime
    items: list[OrderItemResponse]

    class Config:
        from_attributes = True
