import { browserStorage } from '@/core/utils';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {}, // {"0:1": 'text'}
  currentText: '',
};

export const initialState = browserStorage('excel-state') ?? defaultState;
