const pool = require('../config/db');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    // TODO: Add hashing
    try {
        const result = await pool.query(
            'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, role',
            [username, email, password]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Registration error detail:', err);
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

        const user = result.rows[0];
        if (password !== user.password_hash) { // TODO: Check hash
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful', user: { id: user.id, username: user.username, role: user.role } });
    } catch (err) {
        console.error('Login error detail:', err);
        res.status(500).json({ error: err.message });
    }
};
