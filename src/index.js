import '@/scss/index.scss';
import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { rootReducer } from '@/state/rootReducer';
import { Store } from '@/state/Store';
import { initialState } from '@/state/initialState';
import { browserStorage } from '@/core/utils';

const store = new Store(rootReducer, initialState);

store.subscribe((state) => {
  browserStorage('excel-state', state);
});

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
