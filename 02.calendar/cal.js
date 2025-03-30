#!/usr/bin/env node

import minimist from "minimist";
import { DateTime as LuxonDateTime } from "luxon";

function getYearNumber(year, today) {
  if (year === undefined) {
    return today.year;
  } else {
    return parseInt(year);
  }
}
function getMonthNumber(month, today) {
  if (month === undefined) {
    return today.month;
  } else {
    return parseInt(month);
  }
}

function createFirstDay(year, month) {
  const firstDay = LuxonDateTime.fromObject(
    {
      year: parseInt(year),
      month: parseInt(month),
      day: 1,
    },
    {
      zone: "Asia/Tokyo",
    },
  );
  return firstDay;
}

const args = minimist(process.argv.slice(2));

const today = LuxonDateTime.now().setZone("Asia/Tokyo");

const year = getYearNumber(args["y"], today);
const month = getMonthNumber(args["m"], today);

const firstDay = createFirstDay(year, month);

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
