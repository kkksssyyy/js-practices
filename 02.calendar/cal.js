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

const year = getYearNumber(args.y, today);
const month = getMonthNumber(args.m, today);

const firstDay = createFirstDay(year, month);

const headerString = `      ${month}月 ${year}\n日 月 火 水 木 金 土`;
console.log(headerString);

let bodyString = "";
bodyString += firstDay.weekday !== 7 ? "   ".repeat(firstDay.weekday) : "";

let targetDay = firstDay;

while (targetDay.month === firstDay.month) {
  bodyString += String(targetDay.day).padStart(2, " ");
  if (targetDay.weekday === 6) {
    bodyString += "\n";
  } else {
    bodyString += " ";
  }
  targetDay = targetDay.plus({ days: 1 });
}

console.log(bodyString);
