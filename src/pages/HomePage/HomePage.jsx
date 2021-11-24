import React, { useEffect } from "react";
import CarouselComponent from "./carousel/CarouselComponent";
import ComingSoonComponent from "./comingSoon/ComingSoonComponent";
import ShowFilmComponent from "./showFilm/ShowFilmComponent";
import ShowTime2Component from "./showTime/ShowTime2Component";
import { useDispatch, useSelector } from "react-redux";
import Aos from "aos";
import * as movieType from "../../redux/types/movieType";
import * as cinemaType from "../../redux/types/cinemaType";

import FindShowTimeComponent from "./findShowTime/FindShowTimeComponent";

export default function HomePage() {
  const { movieListNowShowing, movieListComingSoon } = useSelector(
    (state) => state.movieReducer
  );
  const { cinemaList } = useSelector((state) => state.cinemaReducer);

  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
    dispatch({
      type: movieType.GET_MOVIE_LIST_SAGA,
      loading: true,
    });
    dispatch({
      type: cinemaType.GET_CINEMA_LIST_SAGA,
      loading: true,
    });
  }, []);
  const listIdFilmNowShowing = movieListNowShowing.map(
    (film, index) => film.maPhim
  );
  const cinemaListNowShowing = cinemaList.map((systemCinema, index) => {
    const newListCinema = systemCinema.lstCumRap.map((cinema, index) => {
      const newListFilm = [];
      cinema.danhSachPhim.forEach((film, index) => {
        if (listIdFilmNowShowing.includes(film.maPhim)) {
          newListFilm.push(film);
        }
      });

      return { ...cinema, danhSachPhim: newListFilm };
    });
    return { ...systemCinema, lstCumRap: newListCinema };
  });
  const dispatch = useDispatch();

  return (
    <div>
      <CarouselComponent />
      <FindShowTimeComponent movieList={movieListNowShowing} />
      <ShowFilmComponent movieList={movieListNowShowing} />
      <ShowTime2Component cinemaList={cinemaListNowShowing} />
      <ComingSoonComponent movieList={movieListComingSoon} />
    </div>
  );
}
