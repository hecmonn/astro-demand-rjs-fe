import {combineReducers} from 'redux';
import auth from './auth';
import orders from './orders';

const rootReducer=combineReducers({
  auth,
  orders
});

export default rootReducer;
