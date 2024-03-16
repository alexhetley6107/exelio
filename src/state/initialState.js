import { browserStorage } from '@/core/utils';
import { defaultStyles, defaultTitle } from '@/constants';

const defaultState = {
  tittle: defaultTitle,

  colState: {},
  rowState: {},
  dataState: {}, // {"0:1": 'text'}
  stylesState: {},

  currentText: '',
  currentStyles: defaultStyles,
};

export const initialState = browserStorage('excel-state') ? normalize(browserStorage('excel-state')) : defaultState;

function normalize(styles) {
  return { ...styles, currentText: '', currentStyles: defaultStyles };
}
