"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");

const NavigationOptions = require("./NavigationOptions.js");

exports._convertInherit = (globalObject, obj, ret, { context = "The provided value" } = {}) => {
  NavigationOptions._convertInherit(globalObject, obj, ret, { context });

  {
    const key = "history";
    let value = obj === undefined || obj === null ? undefined : obj[key];
    if (value !== undefined) {
      value = utils.tryImplForWrapper(value);

      ret[key] = value;
    } else {
      ret[key] = "auto";
    }
  }

  {
    const key = "state";
    let value = obj === undefined || obj === null ? undefined : obj[key];
    if (value !== undefined) {
      value = conversions["any"](value, { context: context + " has member 'state' that", globals: globalObject });

      ret[key] = value;
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
