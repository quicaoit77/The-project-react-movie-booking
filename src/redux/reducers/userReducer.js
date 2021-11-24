import * as userType from "../types/userType";
import { USER_LOGIN, TOKEN, BOSS_ACCOUNT } from "../../util/settings/config";
import { UserLoginInfo } from "../../core/models/UserModel";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin: user,
  userLoginInfo: new UserLoginInfo(),
  listUser: [],
  userUpdate: "",
  newUser: "",
  userBoss: {},
  bossLogin: {},
};

const userReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case userType.POST_USER_LOGIN: {
      localStorage.setItem(USER_LOGIN, JSON.stringify(action.data));
      localStorage.setItem(TOKEN, JSON.stringify(action.data.accessToken));
      return { ...state, userLogin: action.data };
    }
    case userType.POST_USER_INFO: {
      return { ...state, userLoginInfo: action.data };
    }
    case userType.DEL_USER_LOGIN: {
      localStorage.removeItem(USER_LOGIN);
      localStorage.removeItem(TOKEN);
      return { ...state, userLogin: {} };
    }
    case userType.GET_LIST_USER: {
      return { ...state, listUser: action.data };
    }
    case userType.POST_NEW_USER: {
      return { ...state, newUser: action.form };
    }
    case userType.POST_UPDATE_USER: {
      return { ...state, userUpdate: action.form };
    }
    case userType.DEL_LIST_USER: {
      return { ...state, listUser: [], bossLogin: {} };
    }
    //
    case userType.GET_USER_BOSS: {
      return {
        ...state,
        userBoss: action.data.find((item) => item.taiKhoan === BOSS_ACCOUNT),
      };
    }
    case userType.POST_USER_BOSS: {
      return { ...state, bossLogin: action.data };
    }
    default:
      return { ...state };
  }
};
export default userReducer;
