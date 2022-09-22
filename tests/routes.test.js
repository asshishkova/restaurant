const request = require('supertest')
const app = require('../app')

describe('Orders endpoints', () => {
  const newOrder = {
    customerName: 'Nick Cave',
    customerPhone: '053-1234567',
    customerAddress: 'Rothschild 24/3, Tel Aviv',
    orderItems: [
      {
        itemName: 'Hamburger',
        itemPrice: 50
      },
      {
        itemName: 'Coca cola',
        itemPrice: 10
      }
    ]
  };

  const expectPropertyError = (res, property, errorMessage) => {
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors[property].msg).toEqual(errorMessage);
  }

  const notCreateWithoutProperty = async (property, errorMessage) => {
    const badNewOrder = {...newOrder};
    delete badNewOrder[property];
    const res = await request(app)
      .post('/api/orders')
      .send(badNewOrder);
    expectPropertyError(res, property, errorMessage);
  }

  it('should get orders from the last 24 hours (from seeds: 5 orders with ids 6-10)', async () => {
    const res = await request(app)
      .get('/api/orders');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(5);
    res.body.forEach(order => {
      expect(order.id).toBeGreaterThanOrEqual(6);
      expect(order.id).toBeLessThanOrEqual(10);
    });
  });

  it('should get orders ordered by createdAt descendingly', async () => {
    const res = await request(app)
      .get('/api/orders');
    expect(res.statusCode).toEqual(200);

    for (let i = 0; i < res.body.length - 1; i++)  {
      expect(res.body[i].createdAt >= res.body[i + 1].createdAt).toBe(true);
    }
  });

  it('should create a new order', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send(newOrder);
    expect(res.statusCode).toEqual(201);
    expect(res.body.totalCost).toEqual(60);
  })

  it('should not create an order without a customerName', async () => {
    await notCreateWithoutProperty('customerName', 'A customer name should be a string');
  });

  it('should not create an order with a wrong type of customerName', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({...newOrder, customerName: 123});
    expectPropertyError(res, 'customerName', 'A customer name should be a string');
  });

  it('should not create an order with a short customerName', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({...newOrder, customerName: 'N'});
    expectPropertyError(res, 'customerName', 'A customer name should be at least 2 characters long');
  });

  it('should not create an order without a customerPhone', async () => {
    await notCreateWithoutProperty('customerPhone', 'A customer phone should be a string');
  });

  it('should not create an order with a short customerPhone', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({...newOrder, customerPhone: '123'});
    expectPropertyError(res, 'customerPhone', 'A customer phone should be at least 4 characters long');
  });

  it('should not create an order with a wrong type of customerPhone', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({...newOrder, customerPhone: 123456});
    expectPropertyError(res, 'customerPhone', 'A customer phone should be a string');
  });

  it('should create an order without a customerAddress', async () => {
    const noAddressOrder = {...newOrder};
    delete noAddressOrder.customerAddress;
    const res = await request(app)
    .post('/api/orders')
    .send(newOrder);
    expect(res.statusCode).toEqual(201);
  });

  it('should not create an order with a wrong type of customerAddress', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({...newOrder, customerAddress: 25});
    expectPropertyError(res, 'customerAddress', 'A customer address should be a string');
  });

  it('should not create an order without orderItems', async () => {
    await notCreateWithoutProperty('orderItems', 'Order items should be an array');
  });

  it('should not create an order with a wrong type of orderItems', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({...newOrder, orderItems: 'items'});
    expectPropertyError(res, 'orderItems', 'Order items should be an array');
  });

  it('should not create an order with an empty orderItems array', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({...newOrder, orderItems: []});
    expectPropertyError(res, 'orderItems', 'Order items should contain at least 1 order item');
  });

  it('should not create an order item without an itemName', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({...newOrder, orderItems: [
        {
          itemPrice: 50
        }
      ]});
    expectPropertyError(res, 'orderItems[0].itemName', 'An item name should be a string');
  });

  it('should not create an order item with a wrong type of itemName', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({...newOrder, orderItems: [
        {
          itemName: 123,
          itemPrice: 50
        }
      ]});
    expectPropertyError(res, 'orderItems[0].itemName', 'An item name should be a string');
  });

  it('should not create an order with a short itemName', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({...newOrder, orderItems: [
        {
          itemName: "Te",
          itemPrice: 50
        }
      ]});
    expectPropertyError(res, 'orderItems[0].itemName', 'An item name should be at least 2 characters long');
  });

  it('should not create an order item without an itemPrice', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({...newOrder, orderItems: [
        {
          itemName: "Pizza"
        }
      ]});
    expectPropertyError(res, 'orderItems[0].itemPrice', 'An item price should be an integer between 0 and 1000');
  });

  it('should not create an order item with a wrong type of itemPrice', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({...newOrder, orderItems: [
        {
          itemName: "Pizza",
          itemPrice: "expensive"
        }
      ]});
    expectPropertyError(res, 'orderItems[0].itemPrice', 'An item price should be an integer between 0 and 1000');
  });

  it('should create an order item with a string type of itemPrice if it can be converted to integer', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({...newOrder, orderItems: [
        {
          itemName: "Pizza",
          itemPrice: "70"
        },
        {
          itemName: "Sprite",
          itemPrice: 10
        }
      ]});
    expect(res.statusCode).toEqual(201);
    expect(res.body.totalCost).toEqual(80);
  });

  it('should not create an order item  with a wrong value of itemPrice', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({...newOrder, orderItems: [
        {
          itemName: "Pizza",
          itemPrice: 9999
        }
      ]});
    expectPropertyError(res, 'orderItems[0].itemPrice', 'An item price should be an integer between 0 and 1000');
  });

  it('should create an order ignoring extra fields in the body', async () => {
    const res = await request(app)
    .post('/api/orders')
    .send({...newOrder, extraProperty: 'something'});
    expect(res.statusCode).toEqual(201);
    expect(res.body).not.toHaveProperty('extraProperty');
  });

  it('should create an order ignoring extra fields in the orderItems object', async () => {
    const res = await request(app)
    .post('/api/orders')
    .send({...newOrder, orderItems: [
      {
        itemName: 'Hamburger',
        itemPrice: 50,
        extraProperty: "something"
      }
    ]});
    expect(res.statusCode).toEqual(201);
    expect(res.body.orderItems[0]).not.toHaveProperty('extraProperty');
  });

})
