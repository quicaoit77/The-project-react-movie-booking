import { baseService } from "./baseService";
import { GROUPID } from "../util/settings/config";

class UserManagerService extends baseService {
  constructor() {
    super();
  }
  postUserLoginApi = (userLogin) =>
    this.post(`/api/QuanLyNguoiDung/DangNhap`, userLogin);
  postInfoUserLoginApi = (userAccount) =>
    this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`, userAccount);
  postNewUserApi = (newUser) =>
    this.post(`/api/QuanLyNguoiDung/DangKy`, newUser);
  postNewUserAdminApi = (newUser) =>
    this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, newUser);
  getUserListApi = (keyWord = "") => {
    if (keyWord.trim() !== "") {
      return this.get(
        `api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${keyWord}`
      );
    }
    return this.get(
      `api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`
    );
  };
  putUpdateInfoUserApi = (form) =>
    this.put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, form);
  //
  putUpdateInfoPasswordUserApi = (form, token) =>
    this.putPasswordHome(
      `/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      form,
      token
    );
  //
  deleteInfoUserApi = (userName) =>
    this.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${userName}`);
}

export const userManagerService = new UserManagerService();
