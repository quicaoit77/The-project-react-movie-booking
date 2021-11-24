import React, { useState, useEffect, useRef } from "react";
import { settingCarousel, settingsSliderNav } from "./ComingSoonSlickSetting";
import "./ComingSoonStyle.scss";
import Slider from "react-slick";
import moment from "moment";
import bn from "../../../assets/img/slide-5.jpg";
import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import PlayTrailerComponent from "../../../components/PlayTrailerComponent/PlayTrailerComponent";
import { NavLink } from "react-router-dom";
import LoadingItemComponent from "../../../components/LoadingItemComponent/LoadingItemComponent";

const ComingSoonComponent = (props) => {
  const { movieList } = props;

  const [state, setState] = useState({
    nav1: null,
    nav2: null,
  });

  const slider1 = useRef();
  const slider2 = useRef();

  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, []);
  const handleOnErrorImage = (e, classError) => {
    e.target.onError = null;
    e.target.style.display = "none";
    const imgError = document.querySelectorAll(`${classError}`);
    imgError.forEach((item, index) => {
      item.style.display = "flex";
    });
  };
  const renderMovieListComingSoon = () => {
    const slideArray = [];
    const bannerArray = [];
    movieList?.forEach((item, index) => {
      slideArray.push(
        <div className="comingSoon__item" key={index}>
          <div className="item__img">
            <img
              src={`${item.hinhAnh}`}
              alt={item.tenPhim}
              onError={(e) =>
                handleOnErrorImage(e, ".comingSoon__itemImgError")
              }
            />
            <div className="comingSoon__itemImgError">
              <LoadingItemComponent />
            </div>
          </div>
          <div className="item__text">
            <h5>{item.tenPhim}</h5>
            <p>{moment(item.ngayKhoiChieu).format("DD/MM/YYYY")}</p>
            <NavLink to={`/movie-comingSoon-detail/${item.maPhim}`}>
              MORE INFO <i className="fa fa-angle-right" />
            </NavLink>
          </div>
        </div>
      );
      bannerArray.push(
        <div className="comingSoon__Slider " key={index}>
          <div className="comingSoon__bg">
            <img src={bn} alt={bn} />
          </div>
          <div className="comingSoon__banner ">
            <h2>COMING SOON</h2>
            <div className="row mt-5 ">
              <div className=" col-12 col-md-6 comingSoon__text">
                <p>DRAMA, THRILLER</p>
                <h3>{item.tenPhim}</h3>
                <div className="comingSoon__time">
                  <span>
                    <i className="fa fa-calendar-alt" />
                    {moment(item.ngayKhoiChieu).format("DD/MM/YYYY")}
                  </span>
                </div>
                <p>
                  {item.moTa.length > 300
                    ? item.moTa.slice(0, 300) + "..."
                    : item.moTa}
                </p>
                {/* <NavLink to={`/movie-comingSoon-detail/${item.maPhim}`}>
                  MORE INFO <i className="fa fa-angle-right" />
                </NavLink> */}
              </div>
              <div className="col-12 col-md-6 comingSoon__img">
                <img
                  className="img-fluid"
                  src={`${item.hinhAnh}`}
                  alt={item.tenPhim}
                  onError={(e) =>
                    handleOnErrorImage(e, ".comingSoon__bannerImgError")
                  }
                />
                <div className="comingSoon__bannerImgError">
                  <LoadingItemComponent />
                </div>
                <div className="comingSoon__play">
                  <ModalComponent
                    textShowModal={<i className="fa fa-play showFilm__play" />}
                    Component={PlayTrailerComponent}
                    functionOk={() => {}}
                    trailerFilm={item.trailer}
                    classModal="modal__black"
                    titleModal="Trailer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="comingSoon__content">
        <div
          className="comingSoon__detail"
          //   data-aos="zoom-out"
          //   data-aos-once="true"
          id="comingSoon__detailId"
        >
          <Slider
            asNavFor={state.nav2}
            ref={(slider) => (slider1.current = slider)}
            {...settingCarousel}
          >
            {bannerArray}
          </Slider>
        </div>
        <div className="comingSoon__carousel container">
          <div
            className="comingSoon__slick"
            // data-aos="fade-down"
            // data-aos-once="true"
            // data-aos-anchor="#comingSoon__detailId"
            // data-aos-delay="500"
          >
            <Slider
              asNavFor={state.nav1}
              ref={(slider) => (slider2.current = slider)}
              {...settingsSliderNav}
            >
              {slideArray}
            </Slider>
          </div>
        </div>
      </div>
    );
  };
  return (
    <section className="comingSoon " id="comingSoonId">
      {renderMovieListComingSoon()}
    </section>
  );
};

export default ComingSoonComponent;
