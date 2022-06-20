const express = require('express');
const router = express.Router();
const Product = require('../models/products.models');

router.get('/products', async (req, res) => {
  try {
    res.json(await Product.find());
  } catch(err) {
    res.status(500).json({ message: err });
  };
});

router.get('/products/random', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const pro = await Product.findOne().skip(rand);
    if(!pro) res.status(404).json({ message: 'Not found...' });
    else res.json(pro)
  } catch(err) {
    res.status(500).json({ message: err });
  };
});

router.get('/products/:id', async (req, res) => {
  try {
    const pro = await Product.findById(req.params.id);
    if(!pro) res.status(404).json({ message: 'Not found...' });
    else res.json(pro);
  } catch(err) {
    res.status(500).json({ message: err });
  }
});

router.post('/products', async (req, res) => {
  try {
    const { name, client } = req.body;
    const newProduct = new Product({ name: name, client: client });
    await newProduct.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
});

router.put('/products/:id', async (req, res) => {
  const { name, client } = req.body;
  try {
    const pro = await Product.findById(req.params.id);
    if(pro) {
      await Product.updateOne({ _id: req.params.id }, { $set: { name: name, client: client } });
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/products/:id', async(req, res) => {
  try {
    const pro = await Product.findById(req.params.id);
    if(pro) {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
