const pool = require('../config/db');

const createDrug = async (name, barcode) => {
  const query = `
    INSERT INTO drugs (name, barcode)
    VALUES ($1, $2) RETURNING *;
  `;
  const values = [name, barcode];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const searchDrugByName = async (name) => {
  const query = 'SELECT * FROM drugs WHERE name ILIKE $1';
  const values = [`%${name}%`];
  const result = await pool.query(query, values);
  return result.rows;
};

const searchDrugByBarcode = async (barcode) => {
  const query = 'SELECT * FROM drugs WHERE barcode = $1';
  const values = [barcode];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { createDrug, searchDrugByName, searchDrugByBarcode };