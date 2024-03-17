import { Page } from '@/core/routing/Page';
import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { rootReducer } from '@/state/rootReducer';
import { Store } from '@/state/Store';
import { browserStorage } from '@/core/utils';
import { debounce, getStorageName } from '@/core/utils';
import { normalizeInitialState } from '@/state/initialState';

export class ExcelPage extends Page {
  getRoot() {
    const state = browserStorage(getStorageName(this.params));
    const store = new Store(rootReducer, normalizeInitialState(state));

    const stateListener = debounce((state) => {
      browserStorage(getStorageName(this.params), state);
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
