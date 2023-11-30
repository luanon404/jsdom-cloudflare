"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");

const WorkerType = require("./WorkerType.js");

exports._convertInherit = (globalObject, obj, ret, { context = "The provided value" } = {}) => {
  {
    const key = "credentials";
    let value = obj === undefined || obj === null ? undefined : obj[key];
    if (value !== undefined) {
      value = utils.tryImplForWrapper(value);

      ret[key] = value;
    } else {
      ret[key] = "same-origin";
    }
  }

  {
    const key = "name";
    let value = obj === undefined || obj === null ? undefined : obj[key];
    if (value !== undefined) {
      value = conversions["DOMString"](value, { context: context + " has member 'name' that", globals: globalObject });

      ret[key] = value;
    } else {
      ret[key] = "";
    }
  }

  {
    const key = "type";
    let value = obj === undefined || obj === null ? undefined : obj[key];
    if (value !== undefined) {
      value = WorkerType.convert(globalObject, value, { context: context + " has member 'type' that" });

      ret[key] = value;
    } else {
      ret[key] = "classic";
    }
  }
};

exports.convert = (globalObject, obj, { context = "The provided value" } = {}) => {
  if (obj !== undefined && typeof obj !== "object" && typeof obj !== "function") {
    throw new globalObject.TypeError(`${context} is not an object.`);
  }

  const ret = Object.create(null);
  exports._convertInherit(globalObject, obj, ret, { context });
  return ret;
};
