import React from "react";
import "./BannerComingSoonStyle.scss";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import PlayTrailerComponent from "../../../components/PlayTrailerComponent/PlayTrailerComponent";
export default function BannerComingSoonComponent(props) {
  const { movieDetail } = props;
  return (
    <section className="myBannerCs">
      <div
        // data-aos="zoom-out"
        className="myBannerCs__img"
        style={{ backgroundImage: `url(${movieDetail.hinhAnh})` }}
      >
        <CustomCard effectColor="#000" blur={10} className="myBannerCs__banner">
          <div className="myBannerCs__content">
            <h5>{movieDetail?.tenPhim}</h5>
            <p>
              {movieDetail.moTa?.length > 250
                ? movieDetail.moTa.slice(0, 250) + "..."
                : movieDetail.moTa}
            </p>
            <div className="myBannerCs__btn">
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
              <span className="myBannerCs__score">{`${movieDetail.danhGia}/10`}</span>
            </div>
          </div>
        </CustomCard>
      </div>
    </section>
  );
}
