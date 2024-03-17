import { APPLY_STYLE, CHANGE_STYLES, CHANGE_TEXT, CHANGE_TITLE, TABLE_RESIZE, UPDATE_DATE } from './types';

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
    case APPLY_STYLE: {
      const value = state['stylesState'] || {};
      action.data.ids.forEach((id) => {
        value[id] = { ...value[id], ...action.data.value };
      });
      return { ...state, stylesState: value, currentStyles: { ...state.currentStyles, ...action.data.value } };
    }
    case CHANGE_TITLE: {
      return { ...state, title: action.data };
    }
    case UPDATE_DATE: {
      return { ...state, openedDate: new Date().toJSON() };
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
