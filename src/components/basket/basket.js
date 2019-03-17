import template from './basket.html';
import BaseComponent from '../Base';

export default class BasketComponent extends BaseComponent {
  constructor() {
    super();

    this.api = '/api/items.json';
    this._shadowRoot = this;
    this._dictionary = null;
    this._store = null;
    this._items = null;
    this.$total = null;
    this.$items = null;
  }

  connectedCallback () {
    this._setTemplate(template);

    this._shadowRoot.innerHTML = this._template;
    this.$items = this._shadowRoot.querySelector('.items');
    this.$total = this._shadowRoot.querySelector('.total');

    this.setStoreActions();
    this._getItems();
  }

  async _getItems() {
    const items = await fetch(this.api)
      .then(res => res.json())
      .then(res => res.items);

    this._items = items;
    this._render();
  }

  setStoreActions() {
    this._store.subscribe('items', (data) => {
      this._items = data;
      this._render();
    });

    this._store.subscribe('delete_item', (itemId) => {
      const index = this._items.findIndex((item) => item.id === itemId);

      this._items.splice(index, 1);
      this._renderTotal();
    });

    this._store.subscribe('change_item', (data) => {
      const index = this._items.findIndex((item) => item.id === data.id);

      this._items[index] = data;
      this._renderTotal();
    })
  }

  _render() {
    this._items.forEach((item) => {
      const itemComponent = document.createElement('item-component');
      itemComponent.dictionary = this._dictionary;
      itemComponent.store = this._store;
      this.$items.appendChild(itemComponent);
      itemComponent.item = item;
    });

    this._renderTotal();
  }

  _renderTotal() {
    this._renderItems();
    this._renderSum();
  }

  _renderItems() {
    const value = this._items.reduce((sum, current) => sum + (+current.count), 0);
    this.$total.querySelector('.count .value').innerHTML = value;
  }

  _renderSum() {
    const value = this._items.reduce((sum, current) => sum + (+current.price * +current.count), 0);
    this.$total.querySelector('.sum .value').innerHTML = `${value} ${this._dictionary.currency}`;
  }
}

window.customElements.define('basket-component', BasketComponent);

