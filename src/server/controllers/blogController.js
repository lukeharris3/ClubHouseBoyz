const pool = require('../db');

const getAllBlogs = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM blogs');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getBlogById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM blogs WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createBlog = async (req, res) => {
    const { title, author, image_url, content } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO blogs (title, author, image_url, content) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, author, image_url, content]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog
};
