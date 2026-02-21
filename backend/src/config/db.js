const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(path.join(dataDir, 'lms.db'));

module.exports = {
    query: (text, params = []) => {
        const sqliteQuery = text.replace(/\$\d+/g, '?');
        const stmt = db.prepare(sqliteQuery);

        const normalized = sqliteQuery.trim().toLowerCase();
        if (normalized.startsWith('select') || normalized.includes('returning')) {
            const rows = stmt.all(params);
            return { rows };
        } else {
            const info = stmt.run(params);
            return { rows: [], lastInsertRowid: info.lastInsertRowid, changes: info.changes };
        }
    },
    db
};

