import { call, takeLatest, put, delay } from "@redux-saga/core/effects";
import { userManagerService } from "../../services/UserManagerService";
import * as userType from "../types/userType";
import {
  DISLAY_LOADING,
  DISLAY_LOADING_MODAL,
  HIDE_LOADING,
  HIDE_LOADING_MODAL,
} from "../types/lazyLoadingType";
import { notification } from "antd";

// USER_LOGIN
function* postUserLoginAction(action) {
  try {
    const { data } = yield call(() =>
      userManagerService.postUserLoginApi(action.userLogin)
    );
    if (action.bossLogin) {
      yield put({
        type: userType.POST_USER_BOSS,
        data,
      });
    } else {
      yield put({
        type: userType.POST_USER_LOGIN,
        data,
      });
    }
    if (action.notifi) {
      notification.open({
        message: "Notification",
        description: "Login Successfully",
        onClick: () => {
          console.log("Notification Clicked!");
        },
        duration: 1.5,
      });
    }
    action.history.push("/home");
  } catch (err) {
    if (action.notifi) {
      notification.open({
        message: "Notification",
        description: err.response?.data,
        onClick: () => {
          console.log("Notification Clicked!");
        },
        duration: 1.5,
      });
    }
  }
}
export function* postUserLoginApiAcionSaga() {
  yield takeLatest(userType.POST_USER_LOGIN_SAGA, postUserLoginAction);
}
// INFO_USER_LOGIN
function* postUserLoginInfoApiAction(action) {
  try {
    if (action.loading) {
      yield put({
        type: DISLAY_LOADING,
      });
    }
    if (action.loadingModal) {
      yield put({
        type: DISLAY_LOADING_MODAL,
      });
    }
    const { data } = yield call(() =>
      userManagerService.postInfoUserLoginApi(action.userAccount)
    );

    yield put({
      type: userType.POST_USER_INFO,
      data,
    });
    if (action.loading) {
      yield delay(1000);
      yield put({
        type: HIDE_LOADING,
      });
    }
    if (action.loadingModal) {
      yield delay(1000);
      yield put({
        type: HIDE_LOADING_MODAL,
      });
    }
  } catch (error) {
    if (action.loading) {
      yield delay(1000);
      yield put({
        type: HIDE_LOADING,
      });
    }
    if (action.loadingModal) {
      yield delay(1000);
      yield put({
        type: HIDE_LOADING_MODAL,
      });
    }
    console.log(error.response?.data);
  }
}
export function* postUserLoginInfoApiActionSaga() {
  yield takeLatest(userType.POST_USER_INFO_SAGA, postUserLoginInfoApiAction);
}
// USER_REGISTER
function* postNewUserApiAction(action) {
  try {
    const res = yield call(() =>
      userManagerService.postNewUserApi(action.newUser)
    );
    notification.open({
      message: "Notification",
      description: "Register Successfully",
      onClick: () => {
        console.log("Notification Clicked!");
      },
      duration: 1.5,
    });
    action.history.push("/home");
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
export function* postNewUserApiActionSaga() {
  yield takeLatest(userType.POST_NEW_USER_SAGA, postNewUserApiAction);
}
// USER_REGISTER_ADMIN
function* postNewUserAdminApiAction(action) {
  try {
    const res = yield call(() =>
      userManagerService.postNewUserAdminApi(action.newUser)
    );

    notification.open({
      message: "Notification",
      description: "Add User Successfully",
      onClick: () => {
        console.log("Notification Clicked!");
      },
      duration: 1.5,
    });
    yield put({
      type: userType.POST_NEW_USER,
      form: action.newUser,
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
export function* postNewUserAdminApiActionSaga() {
  yield takeLatest(
    userType.POST_NEW_USER_ADMIN_SAGA,
    postNewUserAdminApiAction
  );
}
// GET_LIST_USER
function* getListUserApiAction(action) {
  try {
    const { data } = yield call(() =>
      userManagerService.getUserListApi(action.keyWord)
    );
    yield put({
      type: userType.GET_LIST_USER,
      data,
    });
    if (action.sortUserBoss) {
      yield put({
        type: userType.GET_USER_BOSS,
        data,
      });
    }
  } catch (error) {
    console.log(error.response?.data);
  }
}
export function* getListUserApiActionSaga() {
  yield takeLatest(userType.GET_LIST_USER_SAGA, getListUserApiAction);
}
// UPDATE_USER
function* putUpdateUserApiAction(action) {
  try {
    if (action.typeUpdatePassword) {
      const res = yield call(() =>
        userManagerService.putUpdateInfoPasswordUserApi(
          action.form,
          action.accessBoss
        )
      );
    } else {
      const res = yield call(() =>
        userManagerService.putUpdateInfoUserApi(action.form)
      );
    }

    notification.open({
      message: "Notification",
      description: "Update User Successfully",
      onClick: () => {
        console.log("Notification Clicked!");
      },
      duration: 1.5,
    });

    yield put({
      type: userType.POST_UPDATE_USER,
      form: action.form,
    });
    if (action.history) {
      action.history.push("login");
    }
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

export function* putUpdateUserApiActionSaga() {
  yield takeLatest(userType.POST_UPDATE_USER_SAGA, putUpdateUserApiAction);
}

// DELETE_USER

function* deleteInfoUserApiAction(action) {
  try {
    const res = yield call(() =>
      userManagerService.deleteInfoUserApi(action.userName)
    );

    notification.open({
      message: "Notification",
      description: "Delete User Successfully",
      onClick: () => {
        console.log("Notification Clicked!");
      },
      duration: 1.5,
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

export function* deleteInfoUserApiActionSaga() {
  yield takeLatest(userType.DEL_USER_SAGA, deleteInfoUserApiAction);
}
