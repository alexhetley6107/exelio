import { ExcelStateComponent } from '@/core/ExcelStateComponent';
import { createToolbar } from './toolbar.template';
import { Dom } from '../../core/Dom';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options,
    });
  }

  prepare() {
    const initialState = {
      textAlign: 'left',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
    };
    this.initState(initialState);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  onClick(e) {
    const $target = new Dom(e.target);
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);

      this.$emit('toolbar:applyStyle', value);

      const key = Object.keys(value)[0];
      this.setState({ [key]: value[key] });
    }
  }
}
