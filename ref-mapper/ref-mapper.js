const program = require("commander");
const chalk = require("chalk");
const fs = require("fs-promise");
const { forOwn } = require("lodash");

const refMap = content => {
  const map = {};
  const lines = content.split("\r\n");
  const pattern = /(\S+)\s*(\S+)\s*(\d+)(,(\d+))?/i;
  let sum = 0;

  lines.forEach(line => {
    const item = line.match(pattern);
    if (!item) return;
    const decimalPart = item[5] || 0;

    const size = parseInt(item[3]) + parseInt(decimalPart);
    map[item[1]] = [sum, sum + size, size];
    sum = sum + size;
  });

  return map;
};

const txtElement = (ref, line) => {
  forOwn(ref, ([begin, end, size], key) => {
    console.log(key, line.substring(begin, end));
  });
};

const txtMap = (ref, txtContent, limit) => {
  const lines = txtContent.split("\r\n");
  let counter = 1;
  lines.every(line => {
    if (limit && counter > limit) {
      return false;
    }
    txtElement(ref, line);
    counter++;
    return true;
  });
};

module.exports = { refMap, txtMap };
