import React, { useEffect } from "react";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import "./MovieDetailStyle.scss";
import BannerComponent from "./banner/BannerComponent";
import Aos from "aos";
import ContentFilmComponent from "./contentFilm/ContentFilmComponent";
import { useSelector, useDispatch } from "react-redux";
import * as cinemaType from "../../redux/types/cinemaType";
export default function MovieDetailPage(props) {
  const { id } = props.match.params;
  const { showTimesFilm } = useSelector((state) => state.cinemaReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
    dispatch({
      type: cinemaType.GET_SHOWTIMES_FILM_SAGA,
      id,
      loading: true,
    });
  }, []);
  return (
    <div>
      <BannerComponent movieDetail={showTimesFilm} />
      <ContentFilmComponent movieDetail={showTimesFilm} />
    </div>
  );
}
