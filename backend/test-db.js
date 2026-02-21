const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function testConnection() {
    console.log('Attempting to connect to PostgreSQL with:');
    console.log(`User: ${process.env.DB_USER}`);
    console.log(`Database: ${process.env.DB_NAME}`);
    console.log(`Host: ${process.env.DB_HOST}`);
    console.log(`Port: ${process.env.DB_PORT}`);

    try {
        const client = await pool.connect();
        console.log('✅ Connection successful!');
        constres = await client.query('SELECT version()');
        console.log('PostgreSQL version:', res.rows[0].version);
        client.release();
        process.exit(0);
    } catch (err) {
        console.error('❌ Connection failed:');
        console.error(err.message);
        if (err.code === '28P01') {
            console.error('Hint: Password authentication failed. Check your DB_PASSWORD in .env');
        } else if (err.code === '3D000') {
            console.error(`Hint: Database "${process.env.DB_NAME}" does not exist. You may need to create it.`);
        } else if (err.code === 'ECONNREFUSED') {
            console.error('Hint: The database server is not running or port is incorrect.');
        }
        process.exit(1);
    }
}

testConnection();
