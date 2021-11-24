import * as cinemaType from "../types/cinemaType";

const stateDefault = {
  cinemaList: [],
  showTimesFilm: {},
  showTimesCinemaFilm: [],
  newShowTime: "",
};

const cinemaReducer = (state = stateDefault, action) => {
  //   console.log(action.type);
  switch (action.type) {
    case cinemaType.GET_CINEMA_LIST: {
      return { ...state, cinemaList: action.data };
    }
    case cinemaType.GET_SHOWTIMES_FILM: {
      const showTimesCinemaFilmUpdate = action.data.heThongRapChieu.map(
        (item, index) => ({
          ...item,
          lstCumRap: item.cumRapChieu.map((itemChild, index) => ({
            ...itemChild,
            danhSachPhim: [
              {
                maPhim: action.data.maPhim,
                tenPhim: action.data.tenPhim,
                hinhAnh: action.data.hinhAnh,
                lstLichChieuTheoPhim: itemChild.lichChieuPhim,
              },
            ],
            lichChieuPhim: "",
          })),
          cumRapChieu: "",
        })
      );
      return {
        ...state,
        showTimesFilm: action.data,
        showTimesCinemaFilm: showTimesCinemaFilmUpdate,
      };
    }
    case cinemaType.POST_NEW_SHOWTIME: {
      return { ...state, newShowTime: action.form };
    }
    default:
      return { ...state };
  }
};
export default cinemaReducer;
