const request = require('supertest')
const app = require('../server')

describe('Order Endpoints', () => {
  it('should create a new order', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({
        customerName: "Nick Cave",
        customerPhone: "053-1234567",
        customerAddress: "Rothschild 24/3, Tel Aviv",
        orderItems: [
          {
            itemName: "Hamburger",
            itemPrice: 50
          },
          {
            itemName: "Coca cola",
            itemPrice: 10
          }
        ]
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.totalCost).toEqual(60);
  })
  it('should not create an order with wrong parameters', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({
        customerName: "N",
        customerAddress: "Rothschild 24/3, Tel Aviv",
        orderItems: [
          {
            itemName: "Hamburger",
            itemPrice: 5000000
          }
        ]
      });
    expect(res.statusCode).toEqual(400);
    expect(JSON.parse(res.text)).toHaveProperty("errors");
  })
})
