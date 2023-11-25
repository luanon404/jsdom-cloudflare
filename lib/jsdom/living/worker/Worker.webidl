[Exposed=(Window,DedicatedWorker,SharedWorker)]
interface Worker : EventTarget {
  [Throws]
  constructor(USVString scriptURL, optional WorkerOptions options = {});

  undefined terminate();

  [Throws]
  undefined postMessage(any message, sequence<object> transfer);
  [Throws]
  undefined postMessage(any message, optional StructuredSerializeOptions aOptions = {});

  attribute EventHandler onmessage;
  attribute EventHandler onmessageerror;
};

Worker includes AbstractWorker;

dictionary WorkerOptions {
  [Pref="dom.workers.modules.enabled"]
  WorkerType type = "classic";
  [Pref="dom.workers.modules.enabled"]
  RequestCredentials credentials = "same-origin"; // credentials is only used if type is "module"
  DOMString name = "";
};

enum WorkerType { "classic", "module" };
