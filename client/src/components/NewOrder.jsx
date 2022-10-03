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

  const menu = <div>
                  <button onClick={(e) => addOrderItem (e.target.innerText)}>Cola,10</button>
                  <button onClick={(e) => addOrderItem (e.target.innerText)}>Pizza,50</button>
                  <button onClick={(e) => addOrderItem (e.target.innerText)}>Water,5</button>
                  <button onClick={(e) => addOrderItem (e.target.innerText)}>Salad,40</button>
              </div>

  const orderForm = <form onSubmit={onOrderFormSubmitted}>
                      <label>
                        Name:  <input type="text" value={custName}
                                  onChange={(e) => setCustName(e.target.value)}
                                  required />
                      </label> <br/>

                      <label>
                        Phone: <input type="text" value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  required />
                      </label> <br/>
                      <label>
                        Address: <input type="text" value={address}
                                  onChange={(e) => setAddress(e.target.value)} />
                      </label> <br/>
                      Order Items: { orderItems.map( (orderItem, i) => <ul key={i}> {orderItem.itemName} ₪{orderItem.itemPrice} </ul>) }

                      <br/>
                      <input type="submit" value="Submit" />
                    </form>
  return (
    <div>
      { orderForm }
      { menu }
    </div>
  )
}
