"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");

const NavigationNavigateOptions = require("./NavigationNavigateOptions.js");
const NavigationReloadOptions = require("./NavigationReloadOptions.js");
const NavigationOptions = require("./NavigationOptions.js");
const EventHandlerNonNull = require("./EventHandlerNonNull.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const EventTarget = require("./EventTarget.js");

const interfaceName = "Navigation";

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
  throw new globalObject.TypeError(`${context} is not of type 'Navigation'.`);
};

function makeWrapper(globalObject, newTarget) {
  let proto;
  if (newTarget !== undefined) {
    proto = newTarget.prototype;
  }

  if (!utils.isObject(proto)) {
    proto = globalObject[ctorRegistrySymbol]["Navigation"].prototype;
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
  class Navigation extends globalObject.EventTarget {
    constructor() {
      throw new globalObject.TypeError("Illegal constructor");
    }

    entries() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'entries' called on an object that is not a valid instance of Navigation.");
      }

      return utils.tryWrapperForImpl(esValue[implSymbol].entries());
    }

    updateCurrentEntry(options) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'updateCurrentEntry' called on an object that is not a valid instance of Navigation."
        );
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'updateCurrentEntry' on 'Navigation': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = utils.tryImplForWrapper(curArg);
        args.push(curArg);
      }
      return esValue[implSymbol].updateCurrentEntry(...args);
    }

    navigate(url) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'navigate' called on an object that is not a valid instance of Navigation.");
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'navigate' on 'Navigation': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions["USVString"](curArg, {
          context: "Failed to execute 'navigate' on 'Navigation': parameter 1",
          globals: globalObject
        });
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        curArg = NavigationNavigateOptions.convert(globalObject, curArg, {
          context: "Failed to execute 'navigate' on 'Navigation': parameter 2"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].navigate(...args));
    }

    reload() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'reload' called on an object that is not a valid instance of Navigation.");
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = NavigationReloadOptions.convert(globalObject, curArg, {
          context: "Failed to execute 'reload' on 'Navigation': parameter 1"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].reload(...args));
    }

    traverseTo(key) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'traverseTo' called on an object that is not a valid instance of Navigation."
        );
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'traverseTo' on 'Navigation': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions["DOMString"](curArg, {
          context: "Failed to execute 'traverseTo' on 'Navigation': parameter 1",
          globals: globalObject
        });
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        curArg = NavigationOptions.convert(globalObject, curArg, {
          context: "Failed to execute 'traverseTo' on 'Navigation': parameter 2"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].traverseTo(...args));
    }

    back() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'back' called on an object that is not a valid instance of Navigation.");
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = NavigationOptions.convert(globalObject, curArg, {
          context: "Failed to execute 'back' on 'Navigation': parameter 1"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].back(...args));
    }

    forward() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'forward' called on an object that is not a valid instance of Navigation.");
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = NavigationOptions.convert(globalObject, curArg, {
          context: "Failed to execute 'forward' on 'Navigation': parameter 1"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].forward(...args));
    }

    get currentEntry() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get currentEntry' called on an object that is not a valid instance of Navigation."
        );
      }

      return utils.tryWrapperForImpl(esValue[implSymbol]["currentEntry"]);
    }

    get transition() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get transition' called on an object that is not a valid instance of Navigation."
        );
      }

      return utils.tryWrapperForImpl(esValue[implSymbol]["transition"]);
    }

    get canGoBack() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get canGoBack' called on an object that is not a valid instance of Navigation."
        );
      }

      return esValue[implSymbol]["canGoBack"];
    }

    get canGoForward() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get canGoForward' called on an object that is not a valid instance of Navigation."
        );
      }

      return esValue[implSymbol]["canGoForward"];
    }

    get onnavigate() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get onnavigate' called on an object that is not a valid instance of Navigation."
        );
      }

      return utils.tryWrapperForImpl(esValue[implSymbol]["onnavigate"]);
    }

    set onnavigate(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'set onnavigate' called on an object that is not a valid instance of Navigation."
        );
      }

      if (!utils.isObject(V)) {
        V = null;
      } else {
        V = EventHandlerNonNull.convert(globalObject, V, {
          context: "Failed to set the 'onnavigate' property on 'Navigation': The provided value"
        });
      }
      esValue[implSymbol]["onnavigate"] = V;
    }

    get onnavigatesuccess() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get onnavigatesuccess' called on an object that is not a valid instance of Navigation."
        );
      }

      return utils.tryWrapperForImpl(esValue[implSymbol]["onnavigatesuccess"]);
    }

    set onnavigatesuccess(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'set onnavigatesuccess' called on an object that is not a valid instance of Navigation."
        );
      }

      if (!utils.isObject(V)) {
        V = null;
      } else {
        V = EventHandlerNonNull.convert(globalObject, V, {
          context: "Failed to set the 'onnavigatesuccess' property on 'Navigation': The provided value"
        });
      }
      esValue[implSymbol]["onnavigatesuccess"] = V;
    }

    get onnavigateerror() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get onnavigateerror' called on an object that is not a valid instance of Navigation."
        );
      }

      return utils.tryWrapperForImpl(esValue[implSymbol]["onnavigateerror"]);
    }

    set onnavigateerror(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'set onnavigateerror' called on an object that is not a valid instance of Navigation."
        );
      }

      if (!utils.isObject(V)) {
        V = null;
      } else {
        V = EventHandlerNonNull.convert(globalObject, V, {
          context: "Failed to set the 'onnavigateerror' property on 'Navigation': The provided value"
        });
      }
      esValue[implSymbol]["onnavigateerror"] = V;
    }

    get oncurrententrychange() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get oncurrententrychange' called on an object that is not a valid instance of Navigation."
        );
      }

      return utils.tryWrapperForImpl(esValue[implSymbol]["oncurrententrychange"]);
    }

    set oncurrententrychange(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'set oncurrententrychange' called on an object that is not a valid instance of Navigation."
        );
      }

      if (!utils.isObject(V)) {
        V = null;
      } else {
        V = EventHandlerNonNull.convert(globalObject, V, {
          context: "Failed to set the 'oncurrententrychange' property on 'Navigation': The provided value"
        });
      }
      esValue[implSymbol]["oncurrententrychange"] = V;
    }
  }
  Object.defineProperties(Navigation.prototype, {
    entries: { enumerable: true },
    updateCurrentEntry: { enumerable: true },
    navigate: { enumerable: true },
    reload: { enumerable: true },
    traverseTo: { enumerable: true },
    back: { enumerable: true },
    forward: { enumerable: true },
    currentEntry: { enumerable: true },
    transition: { enumerable: true },
    canGoBack: { enumerable: true },
    canGoForward: { enumerable: true },
    onnavigate: { enumerable: true },
    onnavigatesuccess: { enumerable: true },
    onnavigateerror: { enumerable: true },
    oncurrententrychange: { enumerable: true },
    [Symbol.toStringTag]: { value: "Navigation", configurable: true }
  });
  ctorRegistry[interfaceName] = Navigation;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: Navigation
  });
};

const Impl = require("../navigation/Navigation-impl.js");
