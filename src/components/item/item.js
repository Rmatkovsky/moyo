import template from './item.html';
import BaseComponent from '../Base';

export default class ItemComponent extends BaseComponent {
  constructor() {
    super();
    this._shadowRoot = this;
    this._dictionary = null;
    this._item = null;
    this._store = null;
  }

  connectedCallback() {
    this._setTemplate(template);

    this._shadowRoot.innerHTML = this._template;
    this.setBehavior();
  }

  setBehavior() {
    this._shadowRoot
      .querySelector('.decrement')
      .addEventListener('click', () => {
        const value =
          +this._shadowRoot.querySelector('.count').value ? +this._shadowRoot.querySelector('.count').value - 1 : 0;
        this._shadowRoot.querySelector('.count').value = value;
        this._item.count = value;

        this._render();
        this.storeChangeItem();
      });

    this._shadowRoot
      .querySelector('.increment')
      .addEventListener('click', () => {
        const value = +this._shadowRoot.querySelector('.count').value + 1;
        this._shadowRoot.querySelector('.count').value = value ;
        this._item.count = value;

        this._render();
        this.storeChangeItem();
      });

    this._shadowRoot
      .querySelector('.delete')
      .addEventListener('click', () => {
        this.storeRemoveItem();
        this._destroy();
      })

  }

  storeChangeItem() {
    this._store.broadcast('change_item', this._item);
  }

  storeRemoveItem() {
    this._store.broadcast('delete_item', this._item.id);
  }

  _destroy() {
    this._shadowRoot.parentNode.removeChild(this._shadowRoot);
    this._item = null;
    this._store = null;
    this._shadowRoot = null;
  }

  _render() {
    const item = this._item;
    this._shadowRoot.querySelector('.title').innerHTML = item.title;
    this._shadowRoot.querySelector('.count').value = item.count;
    this._shadowRoot.querySelector('.price').innerHTML = `x ${item.price} ${this._dictionary.currency}`;
    this._shadowRoot.querySelector('.sum').innerHTML = `${item.price * item.count} ${this._dictionary.currency}`;
    this._shadowRoot.querySelector('.img').src = this._item.img;
  }

  get item () {
    return this._item;
  }

  set item (item = {}) {
    this._item = item;

    this._render(item);
  }
}

window.customElements.define('item-component', ItemComponent);
