const CODES = {
  A: 65,
  Z: 90,
};

function createCell() {
  return `
    <div class="cell" contenteditable=""></div>
  `;
}

function createCol(col) {
  return `
    <div class="column">
      ${col}
    </div>
  `;
}
function createRow(content) {
  return `
    <div class="row">
      <div class="row-info"></div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 20) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount).fill('').map(toChar).map(createCol).join('');

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    const rowContent = new Array(colsCount).fill('').map(createCell).join('');

    rows.push(createRow(rowContent));
  }

  return rows.join('');
}