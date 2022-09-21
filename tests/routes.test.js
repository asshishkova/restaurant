const request = require('supertest')
const app = require('../app')

describe('Orders endpoints', () => {
  let server, agent;

  beforeEach((done) => {
      server = app.listen(4000, (err) => {
        if (err) return done(err);

         agent = request.agent(server);
         done();
      });
  });

  afterEach((done) => {
    return server && server.close(done);
  });

  it('should show orders from the last 24 hours', async () => {
    const res = await agent
      .get('/api/orders');
    expect(res.statusCode).toEqual(200);

  });

  it('should create a new order', async () => {
    const res = await agent
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
    const res = await agent
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
  });
})
