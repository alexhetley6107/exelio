import { Dom } from '@/core/Dom';
import { ActiveRoute } from './ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router');
    }

    this.$placeholder = new Dom(selector);
    this.routes = routes;

    this.changePageHandler = this.changePageHandler.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  changePageHandler() {
    const path = ActiveRoute.path;
    console.log({ path });

    this.$placeholder.html(`<h2>${path}</h2>`);
  }

  destroy() {
    window.removeEventListener('hashchange');
  }
}
