import { combineReducers } from "redux";
import globalReducer from "./globalReducer";
import homeReducer from "./homeReducer";
import createBlogReducer from "./createBlogReducer";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import myBlogReducer from "./myBlogReducer";

const reducer = combineReducers({
  globalReducer,
  homeReducer,
  createBlogReducer,
  loginReducer,
  registerReducer,
  myBlogReducer,
});

export default reducer;
