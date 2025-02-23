import * as SQLite from "expo-sqlite";

export const migrateDbIfNeeded = async (db: SQLite.SQLiteDatabase) => {
  // current version of the database
  const DATABASE_VERSION = 1;

  const response = await db.getFirstAsync<{ user_version: number }>("PRAGMA user_version");
  let currentDbVersion = response?.user_version || 0;
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await db.execAsync(version1);
    await db.execAsync(`PRAGMA user_version = 1`);
    currentDbVersion = 1;
  }
};

const version1 = `
    PRAGMA journal_mode = 'wal';
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
    );
    CREATE TABLE IF NOT EXISTS fields (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      unit TEXT,
      options TEXT,
      created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      FOREIGN KEY (item_id) REFERENCES items(id)
    );
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item_id INTEGER NOT NULL,
      timestamp INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      FOREIGN KEY (item_id) REFERENCES items(id)
    );
    CREATE TABLE IF NOT EXISTS event_values (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER NOT NULL,
      field_id INTEGER NOT NULL,
      value TEXT,
      created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      FOREIGN KEY (event_id) REFERENCES events(id),
      FOREIGN KEY (field_id) REFERENCES fields(id)
    );
    `;
