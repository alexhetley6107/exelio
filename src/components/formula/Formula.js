import { ExcelComponent } from '@/core/ExcelComponent';
import { Dom } from '../../core/Dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `;
  }

  init() {
    super.init();

    this.$formula = this.$root.find('#formula');

    this.$on('table:select', ($cell) => this.$formula.text($cell.text()));
    this.$on('table:input', ($cell) => this.$formula.text($cell.text()));

    this.$subscribe((st) => console.log('FormulaState', st));
  }

  onInput(e) {
    this.$emit('formula:input', new Dom(e.target).text());
  }

  onKeydown(e) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(e.key)) {
      e.preventDefault();
      this.$emit('formula:done');
    }
  }
}
