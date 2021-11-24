import React from "react";
import Slider from "react-slick";
import "./ShowFilmStyle.scss";
import { settings } from "./ShowFilmSettingSlick";
import FilmComponent from "../../../components/FilmComponent/FilmComponent";

export default function ShowFilmComponent(props) {
  const { movieList } = props;

  const renderMovieList = () =>
    movieList?.map((item, index) => (
      <div key={index}>
        <FilmComponent item={item} index={index} />
      </div>
    ));

  return (
    <section className="showFilm" id="showFilmId">
      <div
        // data-aos="fade-down"
        // data-aos-once="true"
        className="showFilm__content "
      >
        <div className="showFilm__title">
          <h2>NOW SHOWING</h2>
        </div>
        <div className="showFilm__carousel">
          <Slider {...settings}>{renderMovieList()}</Slider>
        </div>
      </div>
    </section>
  );
}
