import { getRange } from '../../core/utils';

export function shouldResize(e) {
  return e.target.dataset.resize;
}
export function isCell(e) {
  return e.target.dataset.type === 'cell';
}
export function getMatrix($target, $current) {
  const target = $target.id(true);
  const current = $current.id(true);

  const cols = getRange(target.col, current.col);
  const rows = getRange(target.row, current.row);

  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

export function getNextSelector(key, { col, row }) {
  const MIN_VALUE = 0;

  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : --row;
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : --col;

      break;
  }

  return `[data-id="${row}:${col}"]`;
}
