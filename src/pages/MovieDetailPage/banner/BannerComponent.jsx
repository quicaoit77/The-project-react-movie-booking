import React from "react";
import "./BannerStyle.scss";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import PlayTrailerComponent from "../../../components/PlayTrailerComponent/PlayTrailerComponent";

export default function BannerComponent(props) {
  const { movieDetail } = props;
  return (
    <section className="myBanner">
      <div
        // data-aos="zoom-out"
        className="myBanner__img"
        style={{ backgroundImage: `url(${movieDetail.hinhAnh})` }}
      >
        <CustomCard effectColor="#000" blur={10} className="myBanner__banner">
          <div className="myBanner__content">
            <h5>{movieDetail?.tenPhim}</h5>
            <p>
              {movieDetail.moTa?.length > 250
                ? movieDetail.moTa.slice(0, 250) + "..."
                : movieDetail.moTa}
            </p>
            <div className="myBanner__btn">
              <ModalComponent
                textShowModal={
                  <span>
                    <i className="fa fa-play" />
                    PLAY TRAILER
                  </span>
                }
                Component={PlayTrailerComponent}
                functionOk={() => {}}
                trailerFilm={movieDetail.trailer}
                classModal="modal__black"
                titleModal="Trailer"
              />
              <span className="myBanner__score">{`${movieDetail.danhGia}/10`}</span>
            </div>
          </div>
        </CustomCard>
      </div>
    </section>
  );
}
