import { browserStorage } from '@/core/utils';
import { defaultStyles } from '@/constants';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {}, // {"0:1": 'text'}
  currentText: '',
  currentStyles: defaultStyles,
};

export const initialState = browserStorage('excel-state') ?? defaultState;
