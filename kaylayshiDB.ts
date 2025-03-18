import sql from "better-sqlite3";

const db = sql("kaylayshiDB.sqlite"); // Initialize database

// Create Educations Table
db.prepare(`
  CREATE TABLE IF NOT EXISTS educations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      course TEXT NOT NUll,
      school TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      date TEXT NOT NULL
  )
`).run();

// Create Experiences Table
db.prepare(`
  CREATE TABLE IF NOT EXISTS experiences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company TEXT NOT NULL,
      position TEXT NOT NULL,
      start_date TEXT NOT NULL,
      end_date TEXT,
      description TEXT NOT NULL
  )
`).run();

// Create Projects Table
// db.prepare(`
//   CREATE TABLE IF NOT EXISTS projects (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       slug TEXT NOT NULL UNIQUE,
//       title TEXT NOT NULL,
//       description TEXT NOT NULL,
//       image TEXT NOT NULL,
//       url TEXT NOT NULL,
//       created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
//   )
// `).run();

export default db;




