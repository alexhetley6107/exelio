import { ExcelComponent } from '@/core/ExcelComponent';
import { Dom } from '@/core/Dom';
import { defaultTitle } from '@/constants';
import * as actions from '@/state/actions';
import { debounce } from '../../core/utils';
import { ActiveRoute } from '../../core/routing/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;

    return `
     <input type="text" class="input" value="${title}" />
      <div>
        <div class="button" data-button="remove">
          <i class="material-icons" data-button="remove">delete</i>
        </div>

        <div class="button" data-button="exit">
          <i class="material-icons" data-button="exit">exit_to_app</i>
        </div>
      </div>
    `;
  }

  onInput(e) {
    const $target = new Dom(e.target);
    this.$dispatch(actions.changeTitle($target.text()));
  }

  onClick(e) {
    const $target = new Dom(e.target);

    if ($target.data.button === 'remove') {
      const decision = confirm('Вы действительно хотите удалить таблицу?');
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param);
        ActiveRoute.navigate('');
      }
    }

    if ($target.data.button === 'exit') {
      ActiveRoute.navigate('');
    }
  }
}
