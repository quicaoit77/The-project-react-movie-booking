import * as movieType from "../types/movieType";
import { MovieDetail } from "../../core/models/MovieModel";

const stateDefault = {
  movieList: [],
  movieDetail: new MovieDetail(),
  newMovie: "",
  updateMovie: "",
  idDeleteMovie: "",
  movieListNowShowing: [],
  movieListComingSoon: [],
};

const movieReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case movieType.GET_MOVIE_LIST: {
      let movieListNowShowingUpdate = [];
      let movieListComingSoonUpdate = [];

      action.data?.forEach((item, index) => {
        const i = item.ngayKhoiChieu.indexOf("T");
        let newReleaseDay = "";
        if (i !== -1) {
          newReleaseDay = item.ngayKhoiChieu.slice(0, i);
        }
        // console.log("newReleaseDay", newReleaseDay);
        if (newReleaseDay === "2021-09-30") {
          movieListComingSoonUpdate.push(item);
        } else if (newReleaseDay === "2021-09-29") {
          movieListNowShowingUpdate.push(item);
        }
      });

      return {
        ...state,
        movieList: action.data,
        movieListNowShowing: movieListNowShowingUpdate,
        movieListComingSoon: movieListComingSoonUpdate,
      };
    }
    case movieType.GET_MOVIE_DETAIL: {
      return { ...state, movieDetail: action.data };
    }
    case movieType.POST_NEW_MOVIE: {
      return { ...state, newMovie: action.form };
    }
    case movieType.POST_UPDATE_MOVIE: {
      return { ...state, updateMovie: action.form };
    }
    // case movieType.DELETE_MOVIE: {
    //   return { ...state, idDeleteMovie: action.id };
    // }
    default:
      return { ...state };
  }
};
export default movieReducer;
