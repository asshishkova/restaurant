const { validationResult, checkSchema } = require('express-validator');

function validateCreateOrderSchema() {
  return validateSchema(createOrderSchema);
}

function validateSchema(schema) {
  const validationMiddleware = checkSchema(schema);
  return async (req, res, next) => {
    await validationMiddleware.run(req);
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const errorsMessages = Error(errors.array().map(value => value.msg).join(', '));
      return res.status(400).json({ errors: errors.mapped() })
    }
    next();
  };
}

const createOrderSchema = {
  customerName: {
    isString: {
      errorMessage: 'A customer name should be a string'
    },
    isLength: {
      errorMessage: 'A customer name should be at least 3 characters long',
      options: { min: 3 },
    },
    in: ['body']
  },
  customerPhone: {
    isString: {
      errorMessage: 'A customer phone should be a string'
    },
    isLength: {
      errorMessage: 'A customer phone should be at least 4 characters long',
      options: { min: 4 },
    },
    in: ['body']
  },
  customerAddress: {
    isString: {
      errorMessage: 'A customer address should be a string'
    },
    optional: {
      options: {
        nullable: true
      }
    },
    in: ['body']
  },
  orderItems: {
    isArray: {
      errorMessage: 'Order items should be an array'
    },
    notEmpty: {
      errorMessage: 'Order items should contain at least 1 order item'
    },
  },
  'orderItems.*.itemName': {
    isString: {
      errorMessage: 'An item name should be a string'
    },
    isLength: {
      errorMessage: 'An item name should be at least 2 characters long',
      options: { min: 2 },
    },
    in: ['body']
  },
  'orderItems.*.itemPrice': {
    isInt: {
      options: {
        min: 0,
        max: 1000
      },
      errorMessage: 'An item price should be an integer between 0 and 1000'
    },
    toInt: true,
    in: ['body']
  }
};

module.exports = {
  validateCreateOrderSchema
};
