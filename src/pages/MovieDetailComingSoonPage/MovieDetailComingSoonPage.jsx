import React, { useEffect } from "react";
import "./MovieDetailComingSoonStyle.scss";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import { useSelector, useDispatch } from "react-redux";
import * as cinemaType from "../../redux/types/cinemaType";
import Aos from "aos";
import BannerComingSoonComponent from "./bannerCs/BannerComingSoonComponent";
import ContentComingSoonComponent from "./contentCs/ContentComingSoonComponent";

export default function MovieDetailComingSoonPage(props) {
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
      <BannerComingSoonComponent movieDetail={showTimesFilm} />
      <ContentComingSoonComponent movieDetail={showTimesFilm} />
    </div>
  );
}
