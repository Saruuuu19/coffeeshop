from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.order import Order, OrderItem
from app.schemas.order import OrderCreate, OrderResponse

# APIRouter es un mini-app de FastAPI
# prefix="/orders" significa que todas las rutas aquí empiezan con /orders
# tags=["orders"] agrupa los endpoints en la documentación automática
router = APIRouter(prefix="/orders", tags=["orders"])


@router.post("/", response_model=OrderResponse, status_code=201)
def create_order(order_data: OrderCreate, db: Session = Depends(get_db)):
    # Depends(get_db) es la dependency injection — FastAPI llama a get_db()
    # y le pasa la sesión automáticamente a este endpoint

    # Calcular el total sumando precio * cantidad de cada item
    total = sum(item.product_price * item.quantity for item in order_data.items)

    # Crear el objeto Order — todavía no está en la DB
    new_order = Order(
        customer_email=order_data.customer_email,
        total=total,
        status="pending",
    )

    # add() lo agrega a la sesión (como staging en git)
    db.add(new_order)

    # flush() envía el INSERT a la DB pero sin confirmar
    # necesario para obtener el id generado antes del commit
    db.flush()

    # Crear los items asociados a la orden
    for item in order_data.items:
        order_item = OrderItem(
            order_id=new_order.id,
            product_name=item.product_name,
            product_price=item.product_price,
            quantity=item.quantity,
        )
        db.add(order_item)

    # commit() confirma todos los cambios — si algo falla antes de aquí
    # nada se guarda, lo que garantiza consistencia
    db.commit()

    # refresh() recarga el objeto desde la DB con todos los datos finales
    # incluyendo los items y campos generados como created_at
    db.refresh(new_order)

    return new_order


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()

    if not order:
        # HTTPException devuelve automáticamente una respuesta de error con el status code correcto
        raise HTTPException(status_code=404, detail="Order not found")

    return order
