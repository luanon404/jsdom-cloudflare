[Exposed=Window]
interface SharedWorker : EventTarget {
    constructor(USVString scriptURL,
                optional WorkerOptions opts = {});

    readonly attribute MessagePort port;
};

SharedWorker includes AbstractWorker;

dictionary WorkerOptions {
  [Pref="dom.workers.modules.enabled"]
  WorkerType type = "classic";
  [Pref="dom.workers.modules.enabled"]
  RequestCredentials credentials = "same-origin"; // credentials is only used if type is "module"
  DOMString name = "";
};

enum WorkerType { "classic", "module" };