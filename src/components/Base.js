import template from "./basket/basket.html";

export default class BaseComponent extends HTMLElement {
  constructor() {
    super();

    this._template = null;
    this._dictionary = null;
    this._store = null;
  }

  _setTemplate(template) {
    this._template = template;

    if (this._dictionary) {
      Object.keys(this._dictionary).forEach((key) => {
        this._template = this._template.replace(`{${key}}`, this._dictionary[key]);
      });
    }
  }

  get dictionary() {
    return this._dictionary;
  }

  set dictionary(data = {}) {
    this._dictionary = data;
  }

  get store() {
    return this._store;
  }

  set store(store) {
    this._store = store;
  }
}
