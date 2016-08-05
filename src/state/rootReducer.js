import { combineReducers } from 'redux-immutable';

const defaultReducer = () => 'Default Initial State';

const rootReducer = combineReducers({
  default: defaultReducer
});

export default rootReducer;
