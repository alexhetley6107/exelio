import { ExcelComponent } from '@/core/ExcelComponent';

export class Table extends ExcelComponent {
  toHTML() {
    return '<h2>Table</h2>';
  }
}
