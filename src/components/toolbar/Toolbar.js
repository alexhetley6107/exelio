import { ExcelComponent } from '@/core/ExcelComponent';
import { createToolbar } from './toolbar.template';
import { Dom } from '../../core/Dom';

export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options,
    });
  }

  toHTML() {
    return createToolbar();
  }

  onClick(e) {
    const $target = new Dom(e.target);
    if ($target.data.type === 'button') {
      console.log($target.data.value);
    }
  }
}
