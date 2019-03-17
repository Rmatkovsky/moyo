import LanguagesService from './services/languages';
import Obsarvable from './services/Observable';
import './styles/init.sass';

const languages = new LanguagesService();
const Store = new Obsarvable();
const $el = document.querySelector('#app');

const init = () => {
  languages
    .then( async (dictionary) => {
      await import('./components/item/item');
      await import('./components/basket/basket');

      const basketComponent = document.createElement('basket-component');

      basketComponent.dictionary = dictionary;
      basketComponent.store = Store;

      $el.appendChild(basketComponent);
    });
}

init();

