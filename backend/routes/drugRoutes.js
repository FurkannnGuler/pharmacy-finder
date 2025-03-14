

const express = require('express');
const { searchDrugByName, searchDrugByBarcode } = require('../models/drug');
const { getStocksByDrugId } = require('../models/stock');
const router = express.Router();

router.get('/search', async (req, res) => {
  const { name, barcode } = req.query;
  try {
    if (name) {
      const drugs = await searchDrugByName(name);
      res.json(drugs);
    } else if (barcode) {
      const drug = await searchDrugByBarcode(barcode);
      res.json(drug);
    } else {
      res.status(400).json({ error: 'Name or barcode required' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/stocks', async (req, res) => {
    const { drugId, lat, lng } = req.query;
    console.log('Stocks endpoint hit with:', { drugId, lat, lng });
    try {
      const pharmacies = await getStocksByDrugId(drugId, parseFloat(lat), parseFloat(lng));
      console.log('Returning pharmacies:', pharmacies);
      res.json(pharmacies);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;