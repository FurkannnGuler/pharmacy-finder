const pool = require('../config/db');

const createPharmacy = async (name, address, latitude, longitude) => {
  const query = `
    INSERT INTO pharmacies (name, address, latitude, longitude)
    VALUES ($1, $2, $3, $4) RETURNING *;
  `;
  const values = [name, address, latitude, longitude];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getAllPharmacies = async () => {
  const result = await pool.query('SELECT * FROM pharmacies');
  return result.rows;
};

module.exports = { createPharmacy, getAllPharmacies };