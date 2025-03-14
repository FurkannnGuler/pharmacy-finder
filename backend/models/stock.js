const pool = require('../config/db');
const { getDistance } = require('../utils/distance');

const getStocksByDrugId = async (drugId, userLat, userLng) => {
    const query = `
      SELECT p.*, s.stock_count
      FROM pharmacies p
      JOIN stocks s ON p.id = s.pharmacy_id
      WHERE s.drug_id = $1 AND s.stock_count > 0;
    `;
    console.log('Running query:', query, 'with drugId:', drugId);
    const result = await pool.query(query, [drugId]);
    console.log('Query result:', result.rows);
  
    const pharmacies = result.rows.map((pharmacy) => ({
      ...pharmacy,
      distance: getDistance(userLat, userLng, pharmacy.latitude, pharmacy.longitude),
    }));
  
    return pharmacies.sort((a, b) => a.distance - b.distance);
  };

module.exports = { getStocksByDrugId };