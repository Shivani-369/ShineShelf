const pool = require('../config/db');

exports.getAllBooks = async (req, res) => {
    try {
        // Fetch all books and join with inventory to check for available copies
        const query = `
            SELECT b.*, 
            (SELECT COUNT(*) FROM inventory i WHERE i.book_id = b.id AND i.status = 'available') as available_count
            FROM books b 
            ORDER BY b.title ASC
        `;
        const result = await pool.query(query);

        // Map data to match frontend expectations
        const books = result.rows.map(book => ({
            id: book.id,
            title: book.title,
            author: book.author,
            category: book.genre,
            rating: 4.8, // Fallback rating
            available: book.available_count > 0,
            cover: book.cover_image_url
        }));

        res.json(books);
    } catch (err) {
        console.error('Fetch books error:', err);
        res.status(500).json({ error: err.message });
    }
};
