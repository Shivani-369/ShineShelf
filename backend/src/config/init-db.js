const { query } = require('./db');

function initDb() {
    console.log('Initializing SQLite Database...');

    // Users Table
    query(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT DEFAULT 'member',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Books Table
    query(`
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            genre TEXT,
            isbn TEXT UNIQUE,
            publication_year INTEGER,
            description TEXT,
            cover_image_url TEXT,
            price DECIMAL(10, 2) DEFAULT 19.99
        )
    `);

    // Inventory Table
    query(`
        CREATE TABLE IF NOT EXISTS inventory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
            status TEXT DEFAULT 'available'
        )
    `);

    // Transactions Table
    query(`
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER REFERENCES users(id),
            inventory_id INTEGER REFERENCES inventory(id),
            issue_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            due_date DATETIME NOT NULL,
            return_date DATETIME,
            fine_amount DECIMAL(10, 2) DEFAULT 0.00
        )
    `);

    // Clubs Table
    query(`
        CREATE TABLE IF NOT EXISTS clubs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            topic TEXT,
            description TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Club Memberships
    query(`
        CREATE TABLE IF NOT EXISTS club_memberships (
            club_id INTEGER REFERENCES clubs(id) ON DELETE CASCADE,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (club_id, user_id)
        )
    `);

    // Discussion Posts
    query(`
        CREATE TABLE IF NOT EXISTS discussion_posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            club_id INTEGER REFERENCES clubs(id) ON DELETE CASCADE,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            content TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    console.log('✅ SQLite Database schema initialized.');
}

module.exports = initDb;
