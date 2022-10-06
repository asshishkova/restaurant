import React, { useCallback, useState } from "react";
import { postNewOrder } from "../order-client.js";
import './common.css'

export default function NewOrder() {

  const [custName, setCustName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orderItems, setOrderItems] = useState([]);


  const onOrderFormSubmitted = useCallback(async () => {
    await postNewOrder(custName, phone, address, orderItems);
  },[custName, phone, address, orderItems]);

  const addOrderItem = useCallback(async (item) => {
    const orderItem = item.split(",");
    setOrderItems([...orderItems, {itemName: orderItem[0], itemPrice: orderItem[1]}])
  },[orderItems]);

  const mainMenu = <div className="menu">
                      Choose main dish: <br />
                      <button onClick={(e) => addOrderItem (e.target.innerText)}>Pizza,40</button>
                      <button onClick={(e) => addOrderItem (e.target.innerText)}>Pasta,45</button>
                      <button onClick={(e) => addOrderItem (e.target.innerText)}>Big Salad,39</button>
                  </div>

  const sideMenu = <div className="menu">
                      Choose side dish: <br />
                      <button onClick={(e) => addOrderItem (e.target.innerText)}>Rice,12</button>
                      <button onClick={(e) => addOrderItem (e.target.innerText)}>Green beans,14</button>
                      <button onClick={(e) => addOrderItem (e.target.innerText)}>Small Salad,10</button>
                  </div>

  const drinkMenu = <div className="menu">
                      Choose drink: <br />
                      <button onClick={(e) => addOrderItem (e.target.innerText)}>Water,8</button>
                      <button onClick={(e) => addOrderItem (e.target.innerText)}>Soda,9</button>
                      <button onClick={(e) => addOrderItem (e.target.innerText)}>Coke,10</button>
                  </div>



  const orderForm = <form onSubmit={onOrderFormSubmitted}>
                      <br />
                      <label className="orderForm">
                        Name:  <input type="text" value={custName}
                                  onChange={(e) => setCustName(e.target.value)}
                                  required />
                      </label> <br/>

                      <label className="orderForm">
                        Phone: <input type="text" value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  required />
                      </label> <br/>
                      <label className="orderForm">
                        Address: <input type="text" value={address}
                                  onChange={(e) => setAddress(e.target.value)} />
                      </label> <br/> <br />
                      Order: { orderItems.map( (orderItem, i) => <ul key={i}> {orderItem.itemName} ₪{orderItem.itemPrice} </ul>) }
                      <br />
                      {
                        orderItems.length >= 3 &&
                        <button type="submit">Send the order</button>
                      }
                    </form>
  return (
    <div>
      <h1>Welcome to the Restaurant</h1>
      <h2>Make your order</h2>
      <div className="order">
        { orderForm }
        <div>
          { mainMenu }
          { sideMenu }
          { drinkMenu }
        </div>
      </div>
    </div>

  )
}
