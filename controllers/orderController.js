import { orders } from '../data/orders.js';

export function getOrder(req, res) {
  const { id } = req.params;
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return res.status(404).json({
      status: 'fail',
      message: `Couldn't find order #${id}`,
    });
  }

  res.json({
    status: 'success',
    data: order,
  });
}

export function createOrder(req, res) {
  const newOrder = {
    id: crypto.randomUUID(),
    status: 'preparing',
    createdAt: new Date().toISOString(),
    ...req.body,
  };

  orders.push(newOrder);

  res.status(201).json({
    status: 'success',
    data: newOrder,
  });
}

export function updateOrder(req, res) {
  const { id } = req.params;
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return res.status(404).json({
      status: 'fail',
      message: `Couldn't find order #${id}`,
    });
  }

  Object.assign(order, req.body);

  res.json({
    status: 'success',
    data: order,
  });
}
