export function runPromise(db, sql, params) {
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

export function getPromise(db, sql, params) {
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
