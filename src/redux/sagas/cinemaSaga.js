import { notification } from "antd";
import { call, put, takeLatest, delay } from "redux-saga/effects";
import { cinemaManagerService } from "../../services/CinemaManagerService";
import * as cinemaType from "../types/cinemaType";
import { DISLAY_LOADING, HIDE_LOADING } from "../types/lazyLoadingType";
// GET_LIST_CINEMA
function* getCinemaListApiAction(action) {
  try {
    const { data } = yield call(() => cinemaManagerService.getCinemaListApi());

    yield put({
      type: cinemaType.GET_CINEMA_LIST,
      data,
    });
  } catch (error) {
    console.log(error.response?.data);
  }
}

export function* getCinemaListApiActionSaga() {
  yield takeLatest(cinemaType.GET_CINEMA_LIST_SAGA, getCinemaListApiAction);
}

// GET_SHOWTIME_FILM
function* getShowTimeFilmApiAction(action) {
  try {
    if (action.loading) {
      yield put({
        type: DISLAY_LOADING,
      });
    }
    const { data } = yield call(() =>
      cinemaManagerService.getShowTimesFilmApi(action.id)
    );
    yield put({
      type: cinemaType.GET_SHOWTIMES_FILM,
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
      yield delay(2000);
      yield put({
        type: HIDE_LOADING,
      });
    }
    console.log(error.response?.data);
  }
}

export function* getShowTimesFilmActionSaga() {
  yield takeLatest(
    cinemaType.GET_SHOWTIMES_FILM_SAGA,
    getShowTimeFilmApiAction
  );
}

// GET_SHOWTIME_FILM_CINEMA
function* getShowTimesFilmCinemaAction(action) {
  try {
    const res = yield call(() =>
      cinemaManagerService.getShowTimesFilmCinemaApi(action.idCinema)
    );
    yield put({
      type: cinemaType.GET_SHOWTIMES_FILM_CINEMA,
    });
  } catch (error) {
    console.log(error.response?.data);
  }
}

export function* getShowTimesFilmCinemaActionSaga() {
  yield takeLatest(
    cinemaType.GET_SHOWTIMES_FILM_CINEMA_SAGA,
    getShowTimesFilmCinemaAction
  );
}

// POST_NEW_SHOWTIME
function* postNewShowTimesApiAction(action) {
  try {
    const res = yield call(() =>
      cinemaManagerService.postNewShowTimesApi(action.form)
    );
    notification.open({
      message: "Notification",
      description: "Add Showtimes Successfully",
      onClick: () => {
        console.log("Notification Clicked!");
      },
      duration: 1.5,
    });
    yield put({
      type: cinemaType.POST_NEW_SHOWTIME,
      form: action.form,
    });
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
}

export function* postNewShowTimesApiActionSaga() {
  yield takeLatest(
    cinemaType.POST_NEW_SHOWTIME_SAGA,
    postNewShowTimesApiAction
  );
}
