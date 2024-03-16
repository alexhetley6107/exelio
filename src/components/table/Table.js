import { ExcelComponent } from '@/core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { shouldResize, isCell, getMatrix, getNextSelector } from './table.functions';
import { TableSelection } from './TableSelection';
import { Dom } from '../../core/Dom';
import * as actions from '@/state/actions';
import { defaultStyles } from '../../constants';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  toHTML() {
    return createTable(20, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selectCell($cell);

    this.$on('formula:input', (text) => {
      this.selection.current.text(text);
      this.updateTextInStore(text);
    });

    this.$on('formula:done', () => this.selection.current.focus());

    this.$on('toolbar:applyStyle', (value) => {
      this.selection.applyStyle(value);
      this.$dispatch(
        actions.applyStyle({
          value,
          ids: this.selection.selectedIds,
        })
      );
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);

    const styles = $cell.getStyles(Object.keys(defaultStyles));
    console.log('STYLES to dispatch');
    this.$dispatch(actions.changeStyles(styles));
  }

  async resizeTable(e) {
    try {
      const data = await resizeHandler(e, this.$root);
      this.$dispatch(actions.tableResize(data));
    } catch (error) {
      console.warn('Resize error ', error.message);
    }
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      this.resizeTable(e);
    } else if (isCell(e)) {
      const $target = new Dom(e.target);

      if (e.shiftKey) {
        const $cells = getMatrix($target, this.selection.current).map((id) => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
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
      this.selectCell($next);
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({ id: this.selection.current.id(), value }));
  }

  onInput(e) {
    const value = new Dom(e.target).text();
    this.updateTextInStore(value);
  }
}
