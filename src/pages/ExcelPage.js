import { Page } from '@/core/routing/Page';
import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { rootReducer } from '@/state/rootReducer';
import { Store } from '@/state/Store';
import { initialState } from '@/state/initialState';
import { browserStorage } from '@/core/utils';
import { debounce } from '@/core/utils';

export class ExcelPage extends Page {
  getRoot() {
    const store = new Store(rootReducer, initialState);

    const stateListener = debounce((state) => {
      browserStorage('excel-state', state);
    }, 300);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }
  destroy() {
    this.excel.destroy();
  }
}
