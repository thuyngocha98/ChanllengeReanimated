import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';

const rootReducer = combineReducers({
  form,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
