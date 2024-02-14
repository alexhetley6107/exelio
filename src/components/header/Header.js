import { ExcelComponent } from '@/core/ExcelComponent';

export class Header extends ExcelComponent {
  toHTML() {
    return '<h2>Header</h2>';
  }
}
