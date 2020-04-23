import { createStore } from 'redux';
import {DispatchAction, InitialState, mainReducer} from "./reducers/MainReducer";

//const rootReducer = combineReducers({
//  main: mainreducer,
//});

//export type AppState = ReturnType<typeof rootReducer>

export const store = createStore<InitialState, DispatchAction, null, null>(mainReducer);
