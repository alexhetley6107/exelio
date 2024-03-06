import { Dom } from '../../core/Dom';
import { Emitter } from '../../core/Emitter';

export class Excel {
  constructor(selector, options) {
    this.$el = new Dom(selector);
    this.components = options.components || [];
    this.emitter = new Emitter();
  }

  getRoot() {
    const $root = Dom.create('div', 'excel');

    const componentOptions = { emitter: this.emitter };

    this.components = this.components.map((Component) => {
      const $el = Dom.create('div', Component.className);
      const component = new Component($el, componentOptions);

      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());

    this.components.forEach((component) => component.init());
  }
}
