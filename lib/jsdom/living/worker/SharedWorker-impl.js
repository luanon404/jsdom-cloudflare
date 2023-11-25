const EventTargetImpl = require("../events/EventTarget-impl").implementation;

exports.implementation = class SharedWorkerImpl extends EventTargetImpl {
  constructor(globalObject, constructorArgs) {
    super(globalObject);
    this._url = constructorArgs[0];
    this._option = constructorArgs[1];
  }

  get port() {
    return {
      start() { },
      addEventListener: this.addEventListener,
      dispatchEvent: this.dispatchEvent,
      removeEventListener: this.removeEventListener,
      close() { }
    };
  }
};
