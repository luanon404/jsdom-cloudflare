
"use strict";
const _$$object = {};

function setData(id, data) {
  _$$object[id] = data;
}

function getData(id) {
  if (Object.keys(_$$object).includes(id)) {
    return _$$object[id];
  }
  return "";
}

function removeData(id) {
  if (Object.keys(_$$object).includes(id)) {
    delete _$$object[id];
  }
}

module.exports = { setData, getData, removeData };
