import * as bookingType from "../types/bookingType";

export const choiceChairAction = (chair) => ({
  type: bookingType.CHOICE_CHAIR,
  chair,
});
