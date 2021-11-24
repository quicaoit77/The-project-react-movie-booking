import * as bookingType from "../types/bookingType";
import { InfoBookingCinema } from "../../core/models/BookingModel";
const stateDefault = {
  listChair: new InfoBookingCinema(),
  listChoiceChair: [],
};

const bookingReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case bookingType.GET_LIST_CHAIR_CINEMA: {
      return { ...state, listChair: action.data };
    }
    case bookingType.CHOICE_CHAIR: {
      const listChoiceChairUpdate = [...state.listChoiceChair];
      const index = listChoiceChairUpdate.findIndex(
        (item) => item.maGhe === action.chair.maGhe
      );
      if (index === -1) {
        listChoiceChairUpdate.push(action.chair);
      } else {
        listChoiceChairUpdate.splice(index, 1);
      }
      return { ...state, listChoiceChair: listChoiceChairUpdate };
    }
    case bookingType.BOOKING_TICKET: {
      //   action.history.push("/profile");
      return { ...state, listChoiceChair: [] };
    }

    default:
      return { ...state };
  }
};
export default bookingReducer;
