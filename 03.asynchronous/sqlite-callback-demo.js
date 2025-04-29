#!/usr/bin/env node

import sqlite3 from "sqlite3";
import timers from "timers/promises";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL UNIQUE)",
  function (err) {
    db.run("insert into books(title) values(?)", "title1", function (err) {
      console.log(this.lastID);
      db.get(
        "select * from books where id=(?)",
        this.lastID,
        function (err, row) {
          console.log(row);
          db.run("DROP TABLE books");
        },
      );
    });
  },
);

await timers.setTimeout(100);

db.run(
  "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL UNIQUE)",
  function (err) {
    // エラーを発生させる
    db.run("insert into hoge(title) values(?)", "title1", function (err) {
      if (err) {
        console.error("Error occurred:", err.message);
        return;
      }
      console.log(this.lastID);
      db.get(
        "select * from books where id=(?)",
        this.lastID,
        function (err, row) {
          console.log(row);
          db.run("DROP TABLE books");
        },
      );
    });
  },
);
