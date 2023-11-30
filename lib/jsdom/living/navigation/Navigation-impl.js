"use strict";

const EventTargetImpl = require("../events/EventTarget-impl").implementation;
const NavigationHistoryEntryImpl =
  require("./NavigationHistoryEntry-impl").implementation;
const uuid = require("uuid-v4");
uuid
class NavigationImpl extends EventTargetImpl {
  constructor(globalObject, args, privateData) {
    super(globalObject, args, privateData);
    this._currentEntry = new NavigationHistoryEntryImpl(globalObject, args, {
      id: privateData.id || uuid().toString(),
      index: privateData.index || 0,
      key: privateData.key || uuid().toString(),
      ondispose: privateData.ondispose || null,
      sameDocument: privateData.sameDocument || true,
      url: privateData.url || "chrome://new-tab-page/",
    });
    this._transition = null;
    this._canGoBack = false;
    this._canGoForward = false;
    this._onnavigate = null;
    this._onnavigatesuccess = null;
    this._onnavigateerror = null;
    this._oncurrententrychange = null;
  }

  entries() {}

  updateCurrentEntry(options) {}

  navigate(url, options) {}

  reload(options) {}

  traverseTo(key, options) {}

  back(options) {}

  forward(options) {}

  get currentEntry() {
    return this._currentEntry;
  }

  get transition() {
    return this._transition;
  }

  get canGoBack() {
    return this._canGoBack;
  }

  get canGoForward() {
    return this._canGoForward;
  }

  get onnavigate() {
    return this._onnavigate;
  }

  set onnavigate(V) {
    this._onnavigate = V;
  }

  get onnavigatesuccess() {
    return this._onnavigatesuccess;
  }

  set onnavigatesuccess(V) {
    this._onnavigatesuccess = V;
  }

  get onnavigateerror() {
    return this._onnavigateerror;
  }

  set onnavigateerror(V) {
    this._onnavigateerror = V;
  }

  get oncurrententrychange() {
    return this._oncurrententrychange;
  }

  set oncurrententrychange(V) {
    this._oncurrententrychange = V;
  }
}

exports.implementation = NavigationImpl;
