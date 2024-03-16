import { ExcelStateComponent } from '@/core/ExcelStateComponent';
import { createToolbar } from './toolbar.template';
import { Dom } from '../../core/Dom';
import { defaultStyles } from '../../constants';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  onClick(e) {
    const $target = new Dom(e.target);
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);

      this.$emit('toolbar:applyStyle', value);
    }
  }
}
