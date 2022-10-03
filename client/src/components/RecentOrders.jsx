import { useEffect, useState, useCallback } from "react";
import { getRecentOrders } from "../order-client.js";
import './common.css'

export default function RecentOrders() {
  const [orders, setOrders] = useState([]);

  const updateOrders = useCallback(async () => {
    setOrders(await getRecentOrders());
  },[])

  useEffect(() => {
    updateOrders();
  }, [updateOrders]);

  const orderInfo = (order) => {
    return (
      <div key={order.id}>
        Client: {order.customerName} <br/>
        Sum: ₪{order.totalCost} <br/>
        Time: {order.createdAt.slice(11,16)} {order.createdAt.slice(0,10)} <br/>
        Details: {orderContent(order.orderItems)}
      </div>
    )
  }

  const orderContent = (orderItems) => {
    return (
      <ul>
        { orderItems.map( (orderItem, i) => <ul key={i}> {orderItem.itemName} ₪{orderItem.itemPrice} </ul>) }
      </ul>
    )
  }

  return (
    <div>
      <ul>
        { orders.map( order => orderInfo(order)) }
      </ul>
    </div>
  )
}
