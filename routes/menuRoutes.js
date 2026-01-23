import express from 'express';
import { menu } from '../data/menu.js';

const router = express.Router();

// GET all menu items
router.get('/', (req, res) => {
  res.json({ status: 'success', data: menu });
});

// GET single menu item
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const item = menu.find((m) => m.id === id);

  if (!item) {
    return res.status(404).json({
      status: 'fail',
      message: `Couldn't find menu item #${id}`,
    });
  }

  res.json({ status: 'success', data: item });
});

// POST create new menu item
router.post('/', (req, res) => {
  const newItem = {
    id: req.body.id || `item-${Date.now()}`,
    available: true,
    ...req.body,
  };

  menu.push(newItem);

  res.status(201).json({
    status: 'success',
    data: newItem,
  });
});

// PATCH update menu item
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const itemIndex = menu.findIndex((m) => m.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: `Couldn't find menu item #${id}`,
    });
  }

  // Update the item with new data
  menu[itemIndex] = { ...menu[itemIndex], ...req.body };

  res.json({
    status: 'success',
    data: menu[itemIndex],
  });
});

// DELETE menu item
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const itemIndex = menu.findIndex((m) => m.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: `Couldn't find menu item #${id}`,
    });
  }

  const deleted = menu.splice(itemIndex, 1)[0];

  res.json({
    status: 'success',
    data: deleted,
  });
});

export default router;
