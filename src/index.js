import '@/scss/index.scss';
import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { rootReducer } from '@/state/rootReducer';
import { Store } from '@/state/Store';
import { browserStorage } from '@/core/utils';

const store = new Store(rootReducer, browserStorage('excel-state'));

store.subscribe((state) => {
  console.log('App', state);
  browserStorage('excel-state', state);
});

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
