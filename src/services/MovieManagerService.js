import { baseService } from "../services/baseService";
import { GROUPID } from "../util/settings/config";

export class MovieManagerService extends baseService {
  constructor() {
    super();
  }

  getMovieListApi = (film = "") => {
    if (film.trim() !== "") {
      return this.get(
        `api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${film}`
      );
    }
    return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`);
  };

  getMovieDetailApi = (idFilm) =>
    this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${idFilm}`);
  postNewMovieApi = (formData) =>
    this.post(`api/QuanLyPhim/ThemPhimUploadHinh`, formData);
  postUpdateMovieApi = (formData) =>
    this.post(`/api/QuanLyPhim/CapNhatPhimUpload`, formData);
  deleteMovieApi = (idFilm) =>
    this.delete(`api/QuanLyPhim/XoaPhim?MaPhim=${idFilm}`);
}

export const movieManagerService = new MovieManagerService();
