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

export {
  getRecentOrders
}
