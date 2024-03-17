import { defaultStyles, defaultTitle } from '@/constants';
import { getClone } from '@/core/utils';

const defaultState = {
  title: defaultTitle,

  colState: {},
  rowState: {},
  dataState: {}, // {"0:1": 'text'}
  stylesState: {},

  currentText: '',
  currentStyles: defaultStyles,
  openedDate: new Date().toJSON(),
};

function normalize(state) {
  return { ...state, currentText: '', currentStyles: defaultStyles };
}

export function normalizeInitialState(state) {
  return state ? normalize(state) : getClone(defaultState);
}
