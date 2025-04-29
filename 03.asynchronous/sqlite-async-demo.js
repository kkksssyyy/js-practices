#!/usr/bin/env node

import sqlite3 from "sqlite3";
import timers from "timers/promises";
import { runPromise, getPromise } from "./db-utils.js";

const db = new sqlite3.Database(":memory:");

try {
  await runPromise(
    db,
    "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL UNIQUE)",
  );

  const result = await runPromise(db, "insert into books(title) values(?)", [
    "title1",
  ]);

  console.log(result.row.lastID);

  const row = await getPromise(result.db, "select * from books where id=(?)", [
    result.row.lastID,
  ]);

  console.log(row.row);

  await runPromise(row.db, "DROP TABLE books");
} catch (err) {
  console.error("Error occurred:", err.message);
}

await timers.setTimeout(100);

try {
  await runPromise(
    db,
    "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL UNIQUE)",
  );

  const result = await runPromise(db, "insert into hoge(title) values(?)", [
    "title1",
  ]);

  console.log(result.row.lastID);

  const row = await getPromise(result.db, "select * from books where id=(?)", [
    result.row.lastID,
  ]);

  console.log(row.row);

  await runPromise(row.db, "DROP TABLE books");
} catch (err) {
  if (err.code === "SQLITE_ERROR") {
    console.error("SQLエラーが発生しました:", err.message);
  } else {
    throw err;
  }
}
