import { createStore, applyMiddleware } from "redux";
// import rootReducer from "./reducers";
import userReducer from "./reducers/currentUser";
import thunk from "redux-thunk";

var store = createStore(userReducer, {}, applyMiddleware(thunk));

export default store;
