import { combineReducers } from "redux";
import user from "./user";
// import chatRoom from './chatRoom_reducer'

const rootReducers = combineReducers({
  user,
});

export default rootReducers;
