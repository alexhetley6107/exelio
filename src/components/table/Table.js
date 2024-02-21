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
      const type = $resizer.data.resize;

      const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`);

      document.onmousemove = (event) => {
        if (type === 'col') {
          const value = coords.width + event.pageX - coords.right;

          $parent.css({ width: value + 'px' });
          cells.forEach((el) => (el.style.width = value + 'px'));
        } else {
          const value = coords.height + event.pageY - coords.bottom;

          $parent.css({ height: value + 'px' });

          cells.forEach((el) => (el.style.height = value + 'px'));
        }
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }
}
