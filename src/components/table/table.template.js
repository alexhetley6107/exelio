import { parseCell, toInlineStyles } from '@/core/utils';
import { defaultStyles } from '@/constants';

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function getWidth(state, index) {
  return (state?.[index] || DEFAULT_WIDTH) + 'px';
}
function getHeight(state, index) {
  return (state?.[index] || DEFAULT_HEIGHT) + 'px';
}

function withWidthFrom(state) {
  return (col, index) => {
    return { col, index, width: getWidth(state.colState, index) };
  };
}

function createCell(state, row) {
  return (_, col) => {
    const id = `${row}:${col}`;
    const width = getWidth(state.colState, col);
    const data = state.dataState[id];

    const styles = toInlineStyles({ ...defaultStyles, ...state.stylesState[id] });

    return `
      <div 
        class="cell" 
        contenteditable="" 
        style="${styles}; width: ${width}"
        data-type="cell"
        data-col="${col}" 
        data-id="${id}"
        data-value="${data || ''}"
      >${parseCell(data) || ''}</div>
    `;
  };
}

function createCol({ col, index, width }) {
  return `
    <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}
function createRow(index, content, state) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';
  const height = getHeight(state, index);

  return `
    <div class="row" data-type="resizable" data-row="${index}" style="height: ${height}">
      <div class="row-info">
        ${index ?? ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

export function createTable(rowsCount = 20, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount).fill('').map(toChar).map(withWidthFrom(state)).map(createCol).join('');

  rows.push(createRow(null, cols, {}));

  for (let row = 0; row < rowsCount; row++) {
    const rowContent = new Array(colsCount).fill('').map(createCell(state, row)).join('');

    rows.push(createRow(row + 1, rowContent, state.rowState));
  }

  return rows.join('');
}
