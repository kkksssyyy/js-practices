#!/usr/bin/env node

import sqlite3 from "sqlite3";
import timers from "timers/promises";

const db1 = new sqlite3.Database(":memory:", function (err) {
  db1.run(
    "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL UNIQUE)",
    function (err) {
      db1.run("insert into books(title) values(?)", "title1", function (err) {
        console.log(this.lastID);
        db1.get(
          "select * from books where id=(?)",
          this.lastID,
          function (err, row) {
            console.log(row);
            db1.close();
          },
        );
      });
    },
  );
});

await timers.setTimeout(100);

const db2 = new sqlite3.Database(":memory:", function (err) {
  db2.run(
    "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL UNIQUE)",
    function (err) {
      db2.run("insert into hoge(title) values(?)", "title1", function (err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log(this.lastID);
        db2.get(
          "select * from books where id=(?)",
          this.lastID,
          function (err, row) {
            console.log(row);
            db2.close();
          },
        );
      });
    },
  );
});
