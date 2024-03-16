import { CHANGE_STYLES, CHANGE_TEXT, TABLE_RESIZE } from './types';

export function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE: {
      const field = action.data.type === 'col' ? 'colState' : 'rowState';
      return { ...state, [field]: setActionValue(state, field, action) };
    }
    case CHANGE_TEXT: {
      return { ...state, currentText: action.data.value, dataState: setActionValue(state, 'dataState', action) };
    }
    case CHANGE_STYLES: {
      return { ...state, currentStyles: action.data };
    }
    default:
      return state;
  }
}

function setActionValue(state, field, action) {
  const value = state[field] || {};
  value[action.data.id] = action.data.value;
  return value;
}
