import { createStore, combineReducers, applyMiddleware } from "redux";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";

import Post from "./modules/post";
import PostNum from "./modules/postNum";

export const history = createBrowserHistory();

const middlewares = [thunk];

const enhancer = applyMiddleware(...middlewares);
const rootReducer = combineReducers({
  post: Post,
  postNum: PostNum,
});

const store = createStore(rootReducer, enhancer);

export default store;
