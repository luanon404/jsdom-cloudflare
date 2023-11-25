"use strict";
const mitt = require("mitt");
const fetch = require("node-fetch-commonjs");
const { Response } = fetch;
const FileReader = require("../generated/FileReader");
const MessageEventImpl = require("../events/MessageEvent-impl").implementation;
const EventTargetImpl = require("../events/EventTarget-impl").implementation;

const { getData } = require("../../local-storage");

const oldFetch = fetch;

exports.implementation = class WorkerImpl extends EventTargetImpl {
  constructor(globalObject, constructorArgs) {
    super(globalObject);
    this._globalObject = globalObject;
    this._url = constructorArgs[0];
    this._options = constructorArgs[1];

    this._onmessage = null;
    this._onerror = null;
    this._getScopeVar = null;
    this._messageQueue = [];
    const _inside = mitt();
    const _outside = mitt();
    const _nameEvent = { name: "message" };
    this._inside = _inside;
    this._outside = _outside;
    this._nameEvent = _nameEvent;
    this._terminated = false;
    this._timeStamp = Date.now();
    this._scope = {
      ...globalObject,
      onmessage: null,
      fetch: this.fetch,
      importScripts() { }


    };
    globalObject.addEventListener = new Proxy(globalObject.addEventListener, {
      apply(target, self, args) {
        _nameEvent.name = args[0];
        return _inside.on(...args);
      }
    });
    globalObject.dispatchEvent = new Proxy(globalObject.dispatchEvent, {
      apply(target, self, args) {
        return _inside.emit(...args);
      }
    });
    globalObject.removeEventListener = new Proxy(globalObject.removeEventListener, {
      apply(target, self, args) {
        return _inside.off(...args);
      }
    });
    globalObject.postMessage = new Proxy(globalObject.postMessage, {
      apply(target, self, args) {
        return _outside.emit("messageWorker", ...args);
      }
    });
    this.runWorker();
  }

  set onmessage(data) {
    this.addEventListener("message", data);
  }
  get onmessage() {
    return this._onmessage;
  }

  set onerror(data) {
    this._onerror = data;
  }
  get onerror() {
    return this._onerror;
  }

  async fetch(url, opts) {
    const _url = typeof url === "object" ? url.url || url.href : url;
    if (_url.match(/^blob:/)) {
      return new Promise((resolve, reject) => {
        const fr = FileReader.createImpl(this._globalObject, [], {});
        fr.onload = () => {
          resolve(new Response(fr.result, { status: 200, statusText: "OK" }));
        };
        fr.onerror = () => {
          reject(fr.error);
        };
        const id = _url.match(/[^/]+$/)[0];
        fr.readAsText(getData(id));
      });
    }
    return oldFetch.call(this, url, opts);
  }

  _addEvent(type, data) {
    const event = new MessageEventImpl({}, [type], {});
    const dataInit = {
      type,
      bubbles: false,
      cancelable: false,
      data,
      origin: "",
      lastEventId: "",
      source: null,
      ports: [],
      timeStamp: Date.now() - this._timeStamp
    };
    event.initMessageEvent(...Object.values(dataInit));
    return event;
  }

  runWorker() {
    this._inside.on("messageRun", e => {
      if (this._terminated) {
        return;
      }
      const f = this._scope.onmessage || this._getScopeVar("onmessage");

      if (f) {
        f.call(this._scope, e);
      } else if (f === null) {
        this._inside.emit("message", this._addEvent("message", e));
      }
    });

    this._outside.on("messageWorker", e => {
      const event = this._addEvent(this._nameEvent.name, e);
      this.dispatchEvent(event);
    });


    this.fetch(this._url)
      .then(r => r.text()).then(code => {
        let vars = "var self=this,global=self";
        for (const k in this._scope) {
          vars += `,${k}=self.${k}`;
        }
        this._getScopeVar = Function(
          vars +
          ";\n" +
          code +
          '\nreturn function(n){return n=="onmessage"?onmessage:null;}'
        ).call(this._scope);
        const q = this._messageQueue;
        this._messageQueue = null;
        if (q) {
          q.forEach(function (value) {
            this.postMessage(value);
          }, this);
        }
      })
      .catch(e => {
        this._outside.emit("error", e);
        console.error(e);
      });
  }

  postMessage(data, options) {
    if (this._terminated) {
      return;
    }
    if (this._messageQueue !== null) {
      this._messageQueue.push(data);
    } else {
      this._inside.emit("messageRun", data);
    }
  }

  terminate() {
    // console.warn('Worker.prototype.terminate() not supported in jsdom-worker.');
    this._terminated = true;
    this._messageQueue = null;
  }
};
