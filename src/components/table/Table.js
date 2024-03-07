import { ExcelComponent } from '@/core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { shouldResize, isCell, getMatrix, getNextSelector } from './table.functions';
import { TableSelection } from './TableSelection';
import { Dom } from '../../core/Dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options,
    });
  }

  toHTML() {
    return createTable(20);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);

    this.$on('formula:input', (text) => this.selection.current.text(text));
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      resizeHandler(e, this.$root);
    } else if (isCell(e)) {
      const $target = new Dom(e.target);

      if (e.shiftKey) {
        const $cells = getMatrix($target, this.selection.current).map((id) => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(e) {
    const keys = ['Enter', 'Tab', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];

    if (keys.includes(e.key) && !e.shiftKey) {
      e.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(getNextSelector(e.key, id));
      this.selection.select($next);
    }
  }
}
