import { combineReducers } from "redux";
import userReducer from "./currentUser";

const rootReducer = combineReducers({
  userReducer
});

export default rootReducer;
