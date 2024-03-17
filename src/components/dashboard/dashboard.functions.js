import { browserStorage } from '@/core/utils';

function toHTML(key) {
  const table = browserStorage(key);
  const id = key.split(':')[1];

  const date = new Date(table.openedDate);

  return `
    <li class="db__record">
      <a href="#excel/${id}">${table.title}</a>
      <strong>${date.toLocaleDateString()} ${date.toLocaleTimeString()}</strong>
    </li>
  `;
}

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) {
      continue;
    }
    keys.push(key);
  }
  return keys;
}

export function createRecordsTable() {
  const keys = getAllKeys();

  if (!keys.length) {
    return `<p>Вы пока не создали ни одной таблицы</p>`;
  }

  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>

    <ul class="db__list">
      ${keys.map(toHTML).join('')}
    </ul>
  `;
}
