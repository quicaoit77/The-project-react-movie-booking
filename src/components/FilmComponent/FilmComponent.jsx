import React, { useState } from "react";
import "./FilmStyle.scss";
import moment from "moment";
import { NavLink } from "react-router-dom";
import ModalComponent from "../ModalComponent/ModalComponent";
import PlayTrailerComponent from "../PlayTrailerComponent/PlayTrailerComponent";
import LoadingItemComponent from "../LoadingItemComponent/LoadingItemComponent";

export default function FilmComponent(props) {
  const { item, index } = props;
  const handleOnErrorImage = (e) => {
    e.target.onError = null;
    e.target.style.display = "none";
    const imgError = document.querySelectorAll(`.showFilm__imgError`);
    imgError.forEach((item, index) => {
      item.style.display = "flex";
    });
  };
  return (
    <div className="showFilm__item">
      <div className="showFilm__img">
        <div className="showFilm__overlay">
          <ModalComponent
            textShowModal={<i className="fa fa-play showFilm__play" />}
            Component={PlayTrailerComponent}
            functionOk={() => {}}
            trailerFilm={item.trailer}
            classModal="modal__black"
            titleModal="Trailer"
          />
          <NavLink to={`/movie-detail/${item.maPhim}`}>VIEW DETAILS</NavLink>
          <p>{moment(item.ngayKhoiChieu).format("dddd-DD/MM/yyyy")}</p>
          <div className="showFilm__star">
            <i className="fa fa-star star__check" />
            <i className="fa fa-star star__check" />
            <i className="fa fa-star star__check" />
            <i className="fa fa-star star__check" />
            <i className="fa fa-star " />
          </div>
        </div>
        <img
          src={`${item.hinhAnh}`}
          alt={item.tenPhim}
          onError={(e) => handleOnErrorImage(e)}
        />
        <div className={`showFilm__imgError`}>
          <LoadingItemComponent />
        </div>
      </div>
      <div className="showFilm__text">
        <p>{item.tenPhim}</p>
        <div className="showFilm__booking">
          <NavLink to={`/movie-detail/${item.maPhim}`}>
            <span>BOOKING</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
