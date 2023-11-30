"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");

const EventHandlerNonNull = require("./EventHandlerNonNull.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const EventTarget = require("./EventTarget.js");

const interfaceName = "NavigationHistoryEntry";

exports.is = value => {
  return utils.isObject(value) && utils.hasOwn(value, implSymbol) && value[implSymbol] instanceof Impl.implementation;
};
exports.isImpl = value => {
  return utils.isObject(value) && value instanceof Impl.implementation;
};
exports.convert = (globalObject, value, { context = "The provided value" } = {}) => {
  if (exports.is(value)) {
    return utils.implForWrapper(value);
  }
  throw new globalObject.TypeError(`${context} is not of type 'NavigationHistoryEntry'.`);
};

function makeWrapper(globalObject, newTarget) {
  let proto;
  if (newTarget !== undefined) {
    proto = newTarget.prototype;
  }

  if (!utils.isObject(proto)) {
    proto = globalObject[ctorRegistrySymbol]["NavigationHistoryEntry"].prototype;
  }

  return Object.create(proto);
}

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = makeWrapper(globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  EventTarget._internalSetup(wrapper, globalObject);
};

exports.setup = (wrapper, globalObject, constructorArgs = [], privateData = {}) => {
  privateData.wrapper = wrapper;

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: new Impl.implementation(globalObject, constructorArgs, privateData),
    configurable: true
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper;
};

exports.new = (globalObject, newTarget) => {
  const wrapper = makeWrapper(globalObject, newTarget);

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: Object.create(Impl.implementation.prototype),
    configurable: true
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper[implSymbol];
};

const exposed = new Set(["Window"]);

exports.install = (globalObject, globalNames) => {
  if (!globalNames.some(globalName => exposed.has(globalName))) {
    return;
  }

  const ctorRegistry = utils.initCtorRegistry(globalObject);
  class NavigationHistoryEntry extends globalObject.EventTarget {
    constructor() {
      throw new globalObject.TypeError("Illegal constructor");
    }

    getState() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'getState' called on an object that is not a valid instance of NavigationHistoryEntry."
        );
      }

      return esValue[implSymbol].getState();
    }

    get url() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get url' called on an object that is not a valid instance of NavigationHistoryEntry."
        );
      }

      return esValue[implSymbol]["url"];
    }

    get key() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get key' called on an object that is not a valid instance of NavigationHistoryEntry."
        );
      }

      return esValue[implSymbol]["key"];
    }

    get id() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get id' called on an object that is not a valid instance of NavigationHistoryEntry."
        );
      }

      return esValue[implSymbol]["id"];
    }

    get index() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get index' called on an object that is not a valid instance of NavigationHistoryEntry."
        );
      }

      return esValue[implSymbol]["index"];
    }

    get sameDocument() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get sameDocument' called on an object that is not a valid instance of NavigationHistoryEntry."
        );
      }

      return esValue[implSymbol]["sameDocument"];
    }

    get ondispose() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get ondispose' called on an object that is not a valid instance of NavigationHistoryEntry."
        );
      }

      return utils.tryWrapperForImpl(esValue[implSymbol]["ondispose"]);
    }

    set ondispose(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'set ondispose' called on an object that is not a valid instance of NavigationHistoryEntry."
        );
      }

      if (!utils.isObject(V)) {
        V = null;
      } else {
        V = EventHandlerNonNull.convert(globalObject, V, {
          context: "Failed to set the 'ondispose' property on 'NavigationHistoryEntry': The provided value"
        });
      }
      esValue[implSymbol]["ondispose"] = V;
    }
  }
  Object.defineProperties(NavigationHistoryEntry.prototype, {
    getState: { enumerable: true },
    url: { enumerable: true },
    key: { enumerable: true },
    id: { enumerable: true },
    index: { enumerable: true },
    sameDocument: { enumerable: true },
    ondispose: { enumerable: true },
    [Symbol.toStringTag]: { value: "NavigationHistoryEntry", configurable: true }
  });
  ctorRegistry[interfaceName] = NavigationHistoryEntry;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: NavigationHistoryEntry
  });
};

const Impl = require("../navigation/NavigationHistoryEntry-impl.js");
