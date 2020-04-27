import { createStore } from 'redux';
import {
  DispatchAction,
  InitialState,
  mainReducer,
} from './reducers/MainReducer';

export const store = createStore<InitialState, DispatchAction, null, null>(
  mainReducer,
);
