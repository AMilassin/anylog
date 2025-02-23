import * as SQLite from "expo-sqlite";

import { migrateDbIfNeeded } from "../dbInit";

const tableExists = async (
  db: SQLite.SQLiteDatabase,
  tableName: string
): Promise<boolean> => {
  const result = await db.getFirstAsync<{ name: string }>(
    `SELECT name FROM sqlite_master WHERE type='table' AND name=?`,
    [tableName]
  );
  return !!result;
};

const getUserVersion = async (db: SQLite.SQLiteDatabase): Promise<number> => {
  const result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version"
  );
  return result?.user_version || 0;
};

describe("migrateDbIfNeeded", () => {
  let db: SQLite.SQLiteDatabase;

  beforeEach(async () => {
    // Create a live database instance and reset user_version
    db = await SQLite.openDatabaseAsync("test.db");
    await db.execAsync("PRAGMA user_version = 0");
  });

  afterEach(async () => {
    await db.closeAsync();
  })

  it("should create tables if user_version is 0", async () => {
    await migrateDbIfNeeded(db);
    expect(await getUserVersion(db)).toBe(1);
    expect(await tableExists(db, "items")).toBe(true);
    expect(await tableExists(db, "fields")).toBe(true);
    expect(await tableExists(db, "events")).toBe(true);
    expect(await tableExists(db, "event_values")).toBe(true);
  });

  it("should not create tables if user_version is already 1", async () => {
    // First, run migration to set up tables and version
    await migrateDbIfNeeded(db);
    const initialVersion = await getUserVersion(db);

    // Then, run migration again
    await migrateDbIfNeeded(db);

    // Check that version and tables are unchanged
    expect(await getUserVersion(db)).toBe(initialVersion);
    expect(await tableExists(db, "items")).toBe(true);
    expect(await tableExists(db, "fields")).toBe(true);
    expect(await tableExists(db, "events")).toBe(true);
    expect(await tableExists(db, "event_values")).toBe(true);
  });
});
