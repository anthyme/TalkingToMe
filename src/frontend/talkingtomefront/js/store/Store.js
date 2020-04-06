"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var MainReducer_1 = require("./reducers/MainReducer");
var rootReducer = redux_1.combineReducers({
    main: MainReducer_1.mainreducer,
});
exports.store = redux_1.createStore(rootReducer);
