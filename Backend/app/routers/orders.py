from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.order import Order, OrderItem
from app.schemas.order import OrderCreate, OrderResponse

router = APIRouter(prefix="/orders", tags=["orders"])


@router.post("/", response_model=OrderResponse, status_code=201)
def create_order(order_data: OrderCreate, db: Session = Depends(get_db)):

    total = sum(item.product_price * item.quantity for item in order_data.items)

    new_order = Order(
        customer_email=order_data.customer_email, total=total, status="pending"
    )

    db.add(new_order)

    db.flush()

    for item in order_data.items:
        order_item = OrderItem(
            order_id=new_order.id,
            product_name=item.product_name,
            product_price=item.product_price,
            quantity=item.quantity,
        )
        db.add(order_item)

    db.commit()
    db.refresh(new_order)

    return new_order


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order
