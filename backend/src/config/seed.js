const { query } = require('./db');

const SAMPLE_BOOKS = [
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
        isbn: "978-0743273565",
        publication_year: 1925,
        description: "A story of ambition, wealth, and the darker side of the American Dream.",
        cover_image_url: "https://m.media-amazon.com/images/I/71FT9Qv-fEL._SL1500_.jpg",
        price: 15.00
    },
    {
        title: "Project Hail Mary",
        author: "Andy Weir",
        genre: "Sci-Fi",
        isbn: "978-0593135204",
        publication_year: 2021,
        description: "A lone survivor must save humanity with science and logic in deep space.",
        cover_image_url: "https://m.media-amazon.com/images/I/81S8lXp7pXL._SL1500_.jpg",
        price: 28.00
    },
    {
        title: "Atomic Habits",
        author: "James Clear",
        genre: "Self-Help",
        isbn: "978-0735211292",
        publication_year: 2018,
        description: "Small changes, remarkable results. Build better habits easily.",
        cover_image_url: "https://m.media-amazon.com/images/I/91bYsX41DVL._SL1500_.jpg",
        price: 22.00
    },
    {
        title: "Dune",
        author: "Frank Herbert",
        genre: "Sci-Fi",
        isbn: "978-0441172719",
        publication_year: 1965,
        description: "The epic tale of Paul Atreides and the desert planet Arrakis.",
        cover_image_url: "https://m.media-amazon.com/images/I/81Bv3L96G+L._SL1500_.jpg",
        price: 25.00
    },
    {
        title: "The Art of War",
        author: "Sun Tzu",
        genre: "Philosophical",
        isbn: "978-1599869773",
        publication_year: -500,
        description: "Ancient Chinese military treatise on strategy and tactics.",
        cover_image_url: null, // Testing calligraphy fallback
        price: 12.00
    }
];

async function seedDb() {
    console.log('--- Starting SQLite Seeding ---');
    try {
        for (const book of SAMPLE_BOOKS) {
            console.log(`Seeding book: ${book.title}...`);

            // Insert Book with conflict resolution
            const bookResult = await query(
                `INSERT INTO books (title, author, genre, isbn, publication_year, description, cover_image_url, price) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
                 ON CONFLICT (isbn) DO UPDATE SET title = EXCLUDED.title
                 RETURNING id`,
                [book.title, book.author, book.genre, book.isbn, book.publication_year, book.description, book.cover_image_url, book.price]
            );

            const bookId = bookResult.rows[0].id;

            // Check existing inventory count
            const inventoryCheck = await query(
                'SELECT COUNT(*) as count FROM inventory WHERE book_id = $1',
                [bookId]
            );

            const currentStock = parseInt(inventoryCheck.rows[0].count || 0);
            const needed = 5 - currentStock;

            if (needed > 0) {
                console.log(`Adding ${needed} copies to inventory for ${book.title}...`);
                for (let i = 0; i < needed; i++) {
                    await query(
                        "INSERT INTO inventory (book_id, status) VALUES ($1, 'available')",
                        [bookId]
                    );
                }
            } else {
                console.log(`Stock for ${book.title} is already sufficient (Current: ${currentStock}).`);
            }
        }
        console.log('✅ SQLite Seeding completed successfully.');
    } catch (err) {
        console.error('❌ Seeding failed:', err.message);
    }
}

module.exports = seedDb;
