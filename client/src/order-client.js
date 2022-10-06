import axios from "axios";

async function getRecentOrders() {
  try {
    const response = await axios.get(`/api/orders`);
    return response.data;
  }
  catch (error) {
    console.error(error);
  }
}

async function postNewOrder(custName, phone, address, orderItems) {
  try {
    await axios.post(`/api/orders`,
                      {
                        customerName: custName,
                        customerPhone: phone,
                        customerAddress: address,
                        orderItems: orderItems
                      }
                    );
  }
  catch (error) {
    // console.error(error);
    throw(error);
  }
}

export {
  getRecentOrders,
  postNewOrder
}
