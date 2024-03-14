import { browserStorage } from '@/core/utils';

const defaultState = {
  colState: {},
  rowState: {},
};

export const initialState = browserStorage('excel-state') ?? defaultState;
