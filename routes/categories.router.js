const express = require('express');
const router = express.Router();

const CategoriesService = require('../services/categories.service');
const service = new CategoriesService();

// GET
router.get('/', (req, res) => {
  const category = service.generate();
  res.json(category);
});

router.get('/:categoryId/products/:productId', (req, res) => {
  console.log(req.params);
  const { categoryId, productId } = req.params;

  res.json(
    {
      categoryId,
      productId,
    }
  );
});

// POST
router.post('/', (req, res) => {
  const body = req.body;

  res.json({
    message: 'created',
    data: body,
  });
});

// PATCH
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  res.json({
    message: 'Updated',
    data: body,
  });
});

// DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    message: 'DELETED',
    id,
  });
});

module.exports = router;
