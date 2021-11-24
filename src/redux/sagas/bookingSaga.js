import * as bookingType from "../types/bookingType";
import { DISLAY_LOADING, HIDE_LOADING } from "../types/lazyLoadingType";
import { call, put, takeLatest, delay } from "redux-saga/effects";
import { bookingService } from "../../services/BookingService";
import { notification } from "antd";

// GET_LIST_CHAIR
function* getListChairApiAction(action) {
  try {
    if (action.loading) {
      yield put({
        type: DISLAY_LOADING,
      });
    }
    const { data } = yield call(() =>
      bookingService.getListChairCinemaApi(action.idShowtimes)
    );
    yield put({
      type: bookingType.GET_LIST_CHAIR_CINEMA,
      data,
    });
    if (action.loading) {
      yield delay(1000);
      yield put({
        type: HIDE_LOADING,
      });
    }
  } catch (error) {
    if (action.loading) {
      yield delay(1000);
      yield put({
        type: HIDE_LOADING,
      });
    }
    console.log(error.response?.data);
  }
}
export function* getListChairApiActionSaga() {
  yield takeLatest(
    bookingType.GET_LIST_CHAIR_CINEMA_SAGA,
    getListChairApiAction
  );
}

// BOOKING_CHAIR
function* bookingTicketApiAction(action) {
  //   yield put({
  //     type: lazyLoadingType.DISLAY_LOADING,
  //   });
  try {
    const { data } = yield call(() =>
      bookingService.bookingTicketApi(action.infoBooking)
    );
    yield put({
      type: bookingType.BOOKING_TICKET,
    });
    notification.open({
      message: "Notification",
      description: "Book Ticket Successfully",
      onClick: () => {
        console.log("Notification Clicked!");
      },
      duration: 1.5,
    });
    action.history.push("/profile");
  } catch (error) {
    notification.open({
      message: "Notification",
      description: error.response?.data,
      onClick: () => {
        console.log("Notification Clicked!");
      },
      duration: 1.5,
    });
  }
  //   yield delay(2000);
  //   yield put({
  //     type: lazyLoadingType.HIDE_LOADING,
  //   });
}
export function* bookingTicketApiActionSaga() {
  yield takeLatest(bookingType.BOOKING_TICKET_SAGA, bookingTicketApiAction);
}
