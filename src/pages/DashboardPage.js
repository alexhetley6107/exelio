import { Page } from '@/core/routing/Page';
import { Dom } from '@/core/Dom';
import { createRecordsTable } from '@/components/dashboard/dashboard.functions';

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString();

    return Dom.create('div', 'db').html(
      `
      <div class="db__header">
          <h1>EXELIO. Панель управления</h1>
        </div>

        <div class="db__new">
          <div class="db__view">
            <a href="#excel/${now}" class="db__create">
              Новая <br />
              Таблица
            </a>
          </div>
        </div>

        <div class="db__table db__view">               
          ${createRecordsTable()}
        </div>
      `
    );
  }
}
