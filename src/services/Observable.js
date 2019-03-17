export default class EventObserver {
  constructor () {
    this.observers = {};
  }

  subscribe (name, fn) {
    this.observers[name] = fn;
  }

  unsubscribe (name) {
    delete this.observers[name];
  }

  broadcast (name, data) {
    this.observers[name](data);
  }
}
