#!/usr/bin/env node

import minimist from "minimist";
import { DateTime as LuxonDateTime } from "luxon";

function createYear(y) {
  if (y === undefined) {
    const today = LuxonDateTime.now().setZone("Asia/Tokyo");
    return today.year;
  } else {
    return y;
  }
}
function createMonth(m) {
  if (m === undefined) {
    const today = LuxonDateTime.now().setZone("Asia/Tokyo");
    return today.month;
  } else {
    return m;
  }
}

const args = minimist(process.argv.slice(2));

const y = createYear(args["y"]);
const m = createMonth(args["m"]);
const m_padded = String(m).padStart(2, "0");

// 指定された年月の最初の日を生成
const dateString = `${y}-${m_padded}-01`;
const firstDay = LuxonDateTime.fromISO(dateString, { zone: "Asia/Tokyo" });

let targetDay = firstDay;
let bodyString = "";

// 最初の週が右詰めになるようにスペースを追加します
if (targetDay.weekday !== 7) {
  for (let i = 1; i <= targetDay.weekday; i++) {
    bodyString += "   ";
  }
}

do {
  bodyString += String(targetDay.day).padStart(2, " ");
  // 見やすくするためのスペースを追加
  bodyString += " ";
  // 土曜の場合は改行を追加
  if (targetDay.weekday === 6) {
    bodyString += "\n";
  }
  targetDay = targetDay.plus({ days: 1 });
} while (targetDay.month === firstDay.month);

const hedderString = `      ${m}月 ${y}        
日 月 火 水 木 金 土  `;
console.log(hedderString);
console.log(bodyString);
