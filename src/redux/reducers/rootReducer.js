import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
import cinemaReducer from "./cinemaReducer";
import userReducer from "./userReducer";
import bookingReducer from "./bookingReducer";
import lazyLoadingReducer from "./lazyLoadingReducer";
const rootReducer = combineReducers({
  movieReducer,
  cinemaReducer,
  userReducer,
  bookingReducer,
  lazyLoadingReducer,
});
export default rootReducer;
