import { createStore, combineReducers, applyMiddleware } from "redux";
import post from "./modules/post";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";

export const history = createBrowserHistory();

const middlewares = [thunk];

const enhancer = applyMiddleware(...middlewares);
const rootReducer = combineReducers({ post });

const store = createStore(rootReducer, enhancer);

export default store;
