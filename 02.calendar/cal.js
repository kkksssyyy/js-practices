#!/usr/bin/env node

import minimist from "minimist";
import { DateTime as LuxonDateTime } from "luxon";

function getYearString(year, today) {
  if (year === undefined) {
    return today.year.toString();
  } else {
    return String(year);
  }
}
function getMonthString(month, today) {
  if (month === undefined) {
    return today.month.toString();
  } else {
    return String(month);
  }
}

const args = minimist(process.argv.slice(2));

const today = LuxonDateTime.now().setZone("Asia/Tokyo");

const year = getYearString(args["y"], today);
const month = getMonthString(args["m"], today);
const mPadded = String(month).padStart(2, "0");

// 指定された年月の最初の日を生成
const dateString = `${year}-${mPadded}-01`;
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

const hedderString = `      ${month}月 ${year}        
日 月 火 水 木 金 土  `;
console.log(hedderString);
console.log(bodyString);
