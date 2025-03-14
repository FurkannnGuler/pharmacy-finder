const express = require('express');
const { getAllPharmacies } = require('../models/pharmacy');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const pharmacies = await getAllPharmacies();
    res.json(pharmacies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;