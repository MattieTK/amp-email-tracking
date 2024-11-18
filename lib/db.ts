import Database from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid';

const db = new Database('tracking.db');

// Initialize database with required tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS sends (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS tracking_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    send_id TEXT,
    user_id TEXT,
    seconds_viewed INTEGER,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (send_id) REFERENCES sends(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

export const createUser = () => {
  const userId = uuidv4();
  db.prepare('INSERT INTO users (id) VALUES (?)').run(userId);
  return userId;
};

export const createSend = (userId: string) => {
  const sendId = uuidv4();
  db.prepare('INSERT INTO sends (id, user_id) VALUES (?, ?)').run(sendId, userId);
  return sendId;
};

export const recordView = (sendId: string, userId: string, secondsViewed: number) => {
  db.prepare(
    'INSERT INTO tracking_events (send_id, user_id, seconds_viewed) VALUES (?, ?, ?)'
  ).run(sendId, userId, secondsViewed);
};

export const getViewingStats = (sendId: string) => {
  return db
    .prepare(
      `SELECT user_id, MAX(seconds_viewed) as max_seconds_viewed
       FROM tracking_events
       WHERE send_id = ?
       GROUP BY user_id`
    )
    .all(sendId);
};