"use strict";

const EventTargetImpl = require("../events/EventTarget-impl").implementation;

class NavigationHistoryEntryImpl extends EventTargetImpl {
  constructor(globalObject, args, privateData) {
    super(globalObject, args, privateData);
    this._url = privateData.url;
    this._key = privateData.key;
    this._id = privateData.id;
    this._index = privateData.index;
    this._sameDocument = privateData.sameDocument;
    this._ondispose = privateData.ondispose;
  }

  getState() {}

  get url() {
    return this._url;
  }

  get key() {
    return this._key;
  }

  get id() {
    return this._id;
  }

  get index() {
    return this._index;
  }

  get sameDocument() {
    return this._sameDocument;
  }

  get ondispose() {
    return this._ondispose;
  }

  set ondispose(V) {
    this._ondispose = V;
  }
}

exports.implementation = NavigationHistoryEntryImpl;
