import { call, takeLatest, put, delay } from "redux-saga/effects";
import * as movieType from "../types/movieType";
import { movieManagerService } from "../../services/MovieManagerService";
import { notification } from "antd";
import { DISLAY_LOADING, HIDE_LOADING } from "../types/lazyLoadingType";
/*
GET MOVIE LIST*/
function* getMovieListApiAction(action) {
  try {
    if (action.loading) {
      yield put({
        type: DISLAY_LOADING,
      });
    }
    const { data } = yield call(() =>
      movieManagerService.getMovieListApi(action.film)
    );
    yield put({
      type: movieType.GET_MOVIE_LIST,
      data,
    });
    if (action.loading) {
      yield delay(2000);
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

export function* getMovieListApiActionSaga() {
  yield takeLatest(movieType.GET_MOVIE_LIST_SAGA, getMovieListApiAction);
}

/*
GET MOVIE DETAIL*/
function* getMovieDetailAction(action) {
  try {
    if (action.loading) {
      yield put({
        type: DISLAY_LOADING,
      });
    }
    const { data } = yield call(() =>
      movieManagerService.getMovieDetailApi(action.id)
    );
    yield put({
      type: movieType.GET_MOVIE_DETAIL,
      data,
    });
    if (action.loading) {
      yield delay(2000);
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
export function* getMovieDetailApiActionSaga() {
  yield takeLatest(movieType.GET_MOVIE_DETAIL_SAGA, getMovieDetailAction);
}

/*
POST NEW MOVIE*/
function* postNewMovieApiAction(action) {
  try {
    const res = yield call(() =>
      movieManagerService.postNewMovieApi(action.formData)
    );
    notification.open({
      message: "Notification",
      description: "Add Film Successfully",
      onClick: () => {
        console.log("Notification Clicked!");
      },
      duration: 1.5,
    });
    yield put({
      type: movieType.POST_NEW_MOVIE,
      form: action.formData,
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

export function* postNewMovieApiActionSaga() {
  yield takeLatest(movieType.POST_NEW_MOVIE_SAGA, postNewMovieApiAction);
}

/*
POST UPDATE MOVIE*/
function* postUpdateMovieApiAction(action) {
  try {
    const res = yield call(() =>
      movieManagerService.postUpdateMovieApi(action.formData)
    );

    notification.open({
      message: "Notification",
      description: "Update Film Successfully!",
      onClick: () => {
        console.log("Notification Clicked!");
      },
      duration: 1.5,
    });
    yield put({
      type: movieType.POST_UPDATE_MOVIE,
      form: action.formData,
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
export function* postUpdateMovieApiActionSaga() {
  yield takeLatest(movieType.POST_UPDATE_MOVIE_SAGA, postUpdateMovieApiAction);
}
/*
DELETE MOVIE
*/
function* deleteMovieApiAction(action) {
  try {
    const res = yield call(() => movieManagerService.deleteMovieApi(action.id));
    notification.open({
      message: "Notification",
      description: "Delete Film Successfully!",
      onClick: () => {
        console.log("Notification Clicked!");
      },
      duration: 1.5,
    });
    // yield put({
    //   type: movieType.DELETE_MOVIE,
    //   id: action.id,
    // });
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
export function* deleteMovieApiActionSaga() {
  yield takeLatest(movieType.DELETE_MOVIE_SAGA, deleteMovieApiAction);
}
