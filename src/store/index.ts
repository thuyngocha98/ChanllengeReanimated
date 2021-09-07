import {applyMiddleware, createStore} from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';
import {API_URL} from 'react-native-dotenv';

export * from './actions';

const client = axios.create({
  baseURL: API_URL,
  responseType: 'json',
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, axiosMiddleware(client), logger),
);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
