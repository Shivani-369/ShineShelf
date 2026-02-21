const pool = require('../config/db');

// Get all clubs
exports.getAllClubs = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM clubs ORDER BY name ASC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new club
exports.createClub = async (req, res) => {
    const { name, topic, description } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO clubs (name, topic, description) VALUES ($1, $2, $3) RETURNING *',
            [name, topic, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Join a club
exports.joinClub = async (req, res) => {
    const { clubId, userId } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO club_memberships (club_id, user_id) VALUES ($1, $2) RETURNING *',
            [clubId, userId]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get discussion posts for a club
exports.getClubPosts = async (req, res) => {
    const { clubId } = req.params;
    try {
        const result = await pool.query(
            `SELECT p.id, p.content, p.created_at, u.username 
             FROM discussion_posts p 
             JOIN users u ON p.user_id = u.id 
             WHERE p.club_id = $1 
             ORDER BY p.created_at DESC`,
            [clubId]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a post
exports.createPost = async (req, res) => {
    const { clubId, userId, content } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO discussion_posts (club_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
            [clubId, userId, content]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
