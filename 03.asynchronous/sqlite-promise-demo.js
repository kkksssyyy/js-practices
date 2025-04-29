#!/usr/bin/env node

import sqlite3 from "sqlite3";
import timers from "timers/promises";

function runPromise(db, sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ row: this, db: db });
      }
    });
  });
}

function getPromise(db, sql, params) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, function (err, row) {
      if (err) {
        reject(err);
      } else {
        resolve({ row: row, db: db });
      }
    });
  });
}

const db = new sqlite3.Database(":memory:");

runPromise(
  db,
  "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    return runPromise(db, "insert into books(title) values(?)", ["title1"]);
  })
  .then((result) => {
    console.log(result.row.lastID);
    return getPromise(result.db, "select * from books where id=(?)", [
      result.row.lastID,
    ]);
  })
  .then((result) => {
    console.log(result.row);
    return result;
  })
  .then((result) => {
    return runPromise(result.db, "DROP TABLE books");
  });

await timers.setTimeout(100);

runPromise(
  db,
  "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    return runPromise(db, "insert into hoge(title) values(?)", ["title1"]);
  })
  .then((result) => {
    console.log(result.row.lastID);
    return getPromise(result.db, "select * from books where id=(?)", [
      result.row.lastID,
    ]);
  })
  .then((result) => {
    console.log(result.row);
    return result;
  })
  .then((result) => {
    return runPromise(result.db, "DROP TABLE books");
  })
  .catch((err) => {
    console.error("Error occurred:", err.message);
  });
