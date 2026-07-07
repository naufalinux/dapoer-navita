import Database from 'better-sqlite3';
const db = new Database('src/db/sqlite.db');
db.exec('DROP TABLE IF EXISTS settings;');
console.log('Settings table dropped.');
