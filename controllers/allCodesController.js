const db = require('../config/db');

exports.getAllCodes = (req, res) => {
  const query = 'SELECT * FROM allcodes';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
