const ENDPOINTS = {
  RAW: {
    POST: '/v1/raw',
    GET: '/v1/raw',
    PUT: '/v1/raw/:id',
    DELETE: '/v1/raw/:id',
  },
  PRODUCT: {
    POST: '/v1/product',
    GET: '/v1/product',
    PUT: '/v1/product/:id',
    DELETE: '/v1/product/:id',
  },
  TRANSACTION: {
    POST: '/v1/transaction',
    GET: '/v1/transaction',
    GET_DETAIL: '/v1/transaction/:id',
  },
};

export default ENDPOINTS;
