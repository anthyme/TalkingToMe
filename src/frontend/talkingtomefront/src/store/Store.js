import { createStore, combineReducers } from "redux";
import { mainreducer } from "./reducers/MainReducer";

const rootReducer = combineReducers({
  main: mainreducer
});

export const store = createStore(mainreducer);