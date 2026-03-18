from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.db.database import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    customer_email = Column(String, nullable=False)
    status = Column(String, default="pending")
    # pending → paid → delivered
    total = Column(Float, nullable=False)
    stripe_session_id = Column(String, nullable=True)
    # Lo llenará Stripe cuando se cree la sesión de pago
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Relación con los items — una orden tiene muchos items
    items = relationship("OrderItem", back_populates="order")


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    # ForeignKey conecta este item con su orden padre
    product_name = Column(String, nullable=False)
    product_price = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False)

    # Relación inversa — cada item conoce su orden padre
    order = relationship("Order", back_populates="items")
