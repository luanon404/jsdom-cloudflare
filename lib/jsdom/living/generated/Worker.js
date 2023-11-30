"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");

const WorkerOptions = require("./WorkerOptions.js");
const EventHandlerNonNull = require("./EventHandlerNonNull.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const EventTarget = require("./EventTarget.js");

const interfaceName = "Worker";

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
  throw new globalObject.TypeError(`${context} is not of type 'Worker'.`);
};

function makeWrapper(globalObject, newTarget) {
  let proto;
  if (newTarget !== undefined) {
    proto = newTarget.prototype;
  }

  if (!utils.isObject(proto)) {
    proto = globalObject[ctorRegistrySymbol]["Worker"].prototype;
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

const exposed = new Set(["Window", "DedicatedWorker", "SharedWorker"]);

exports.install = (globalObject, globalNames) => {
  if (!globalNames.some(globalName => exposed.has(globalName))) {
    return;
  }

  const ctorRegistry = utils.initCtorRegistry(globalObject);
  class Worker extends globalObject.EventTarget {
    constructor(scriptURL) {
      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to construct 'Worker': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions["USVString"](curArg, {
          context: "Failed to construct 'Worker': parameter 1",
          globals: globalObject
        });
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        curArg = WorkerOptions.convert(globalObject, curArg, { context: "Failed to construct 'Worker': parameter 2" });
        args.push(curArg);
      }
      return exports.setup(Object.create(new.target.prototype), globalObject, args);
    }

    terminate() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'terminate' called on an object that is not a valid instance of Worker.");
      }

      return esValue[implSymbol].terminate();
    }

    postMessage(message) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'postMessage' called on an object that is not a valid instance of Worker.");
      }

      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to execute 'postMessage' on 'Worker': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      switch (arguments.length) {
        case 1:
          {
            let curArg = arguments[0];
            curArg = conversions["any"](curArg, {
              context: "Failed to execute 'postMessage' on 'Worker': parameter 1",
              globals: globalObject
            });
            args.push(curArg);
          }
          break;
        default: {
          let curArg = arguments[0];
          {
            {
              let curArg = arguments[0];
              curArg = conversions["any"](curArg, {
                context: "Failed to execute 'postMessage' on 'Worker': parameter 1",
                globals: globalObject
              });
              args.push(curArg);
            }
            {
              let curArg = arguments[1];
              if (!utils.isObject(curArg)) {
                throw new globalObject.TypeError(
                  "Failed to execute 'postMessage' on 'Worker': parameter 2" + " is not an iterable object."
                );
              } else {
                const V = [];
                const tmp = curArg;
                for (let nextItem of tmp) {
                  nextItem = conversions["object"](nextItem, {
                    context: "Failed to execute 'postMessage' on 'Worker': parameter 2" + "'s element",
                    globals: globalObject
                  });

                  V.push(nextItem);
                }
                curArg = V;
              }
              args.push(curArg);
            }
          }
        }
      }
      return esValue[implSymbol].postMessage(...args);
    }

    get onmessage() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'get onmessage' called on an object that is not a valid instance of Worker.");
      }

      return utils.tryWrapperForImpl(esValue[implSymbol]["onmessage"]);
    }

    set onmessage(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError("'set onmessage' called on an object that is not a valid instance of Worker.");
      }

      if (!utils.isObject(V)) {
        V = null;
      } else {
        V = EventHandlerNonNull.convert(globalObject, V, {
          context: "Failed to set the 'onmessage' property on 'Worker': The provided value"
        });
      }
      esValue[implSymbol]["onmessage"] = V;
    }

    get onmessageerror() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get onmessageerror' called on an object that is not a valid instance of Worker."
        );
      }

      return utils.tryWrapperForImpl(esValue[implSymbol]["onmessageerror"]);
    }

    set onmessageerror(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'set onmessageerror' called on an object that is not a valid instance of Worker."
        );
      }

      if (!utils.isObject(V)) {
        V = null;
      } else {
        V = EventHandlerNonNull.convert(globalObject, V, {
          context: "Failed to set the 'onmessageerror' property on 'Worker': The provided value"
        });
      }
      esValue[implSymbol]["onmessageerror"] = V;
    }
  }
  Object.defineProperties(Worker.prototype, {
    terminate: { enumerable: true },
    postMessage: { enumerable: true },
    onmessage: { enumerable: true },
    onmessageerror: { enumerable: true },
    [Symbol.toStringTag]: { value: "Worker", configurable: true }
  });
  ctorRegistry[interfaceName] = Worker;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: Worker
  });
};

const Impl = require("../worker/Worker-impl.js");
