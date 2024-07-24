const pool = require('../db');

const getUser = async (req, res) => {
  const { userId } = req.user; // Extract userId from the token payload
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching user details:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getUser,
};
