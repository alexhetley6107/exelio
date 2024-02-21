import { ExcelComponent } from '@/core/ExcelComponent';
import { createTable } from './table.template';
import { Dom } from '../../core/Dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable(24);
  }

  onMousedown(e) {
    if (e.target.dataset.resize) {
      const $resizer = new Dom(e.target);
      const $parent = $resizer.closest('[data-type="resizable"]');

      const coords = $parent.getCoords();
      console.log($parent.getCoords());

      document.onmousemove = (event) => {
        const value = coords.width + event.pageX - coords.right;

        $parent.$el.style.width = value + 'px';
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }
}
