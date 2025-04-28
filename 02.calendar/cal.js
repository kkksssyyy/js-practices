#!/usr/bin/env node

import minimist from "minimist";

function createFirstDay(year, month) {
  const firstDay = new Date();
  if (year !== undefined) {
    firstDay.setFullYear(year);
  }
  if (month !== undefined) {
    firstDay.setMonth(month - 1);
  }
  firstDay.setDate(1);
  return firstDay;
}

const args = minimist(process.argv.slice(2));

const year = args.y;
const month = args.m;

const firstDay = createFirstDay(year, month);

const headerString = `      ${firstDay.getMonth() + 1}月 ${firstDay.getFullYear()}\n日 月 火 水 木 金 土`;
console.log(headerString);

let bodyString = "";
bodyString += firstDay.getDay() !== 7 ? "   ".repeat(firstDay.getDay()) : "";

let targetDay = new Date(firstDay);

while (targetDay.getMonth() === firstDay.getMonth()) {
  bodyString += String(targetDay.getDate()).padStart(2, " ");
  if (targetDay.getDay() === 6) {
    bodyString += "\n";
  } else {
    bodyString += " ";
  }
  targetDay.setDate(targetDay.getDate() + 1);
}

console.log(bodyString);
