import React from "react";
import "./ContentComingSoonStyle.scss";
import moment from "moment";
import LoadingItemComponent from "../../../components/LoadingItemComponent/LoadingItemComponent";

export default function ContentComingSoonComponent(props) {
  const { movieDetail } = props;
  const handleOnErrorImage = (e, className) => {
    e.target.onError = null;
    e.target.style.display = "none";
    const imgError = document.querySelectorAll(`${className}`);
    imgError.forEach((item, index) => {
      item.style.display = "flex";
    });
  };
  return (
    <section className="contentFilmCs">
      <div className="contentFilmCs__content">
        <div className="row">
          <div
            // data-aos="fade-right"
            // data-aos-once="true"
            className="col-12 col-lg-7 contentFilmCs__Synopsis"
          >
            <div className="contentFilmCs__title">
              <h2>SYNOPSIS</h2>
            </div>
            <div className="contentFilmCs__detail">
              <div className="row">
                <div className="col-12 col-lg-4 contentFilmCs__img">
                  <img
                    src={`${movieDetail.hinhAnh}`}
                    alt={movieDetail.tenPhim}
                    onError={(e) =>
                      handleOnErrorImage(e, ".contentFilmCs__errorImg")
                    }
                  />
                  <div className="contentFilmCs__errorImg">
                    <LoadingItemComponent />
                  </div>
                </div>
                <div className="col-12 col-lg-8 contentFilmCs__text">
                  <h6>{movieDetail.tenPhim}</h6>
                  <p>{movieDetail.moTa}</p>
                  <table className="table">
                    <tbody>
                      <tr>
                        <td style={{ width: "30%" }}>DIRECTOR</td>
                        <td>Anthony Russo</td>
                      </tr>
                      <tr>
                        <td>STARRING</td>
                        <td>Benedict Cumberbatch, Chris Hemsworth, ...</td>
                      </tr>
                      <tr>
                        <td>GENRES</td>
                        <td>Action, Thriller, Crime</td>
                      </tr>
                      <tr>
                        <td>RELEASE DATE</td>
                        <td>
                          {moment(movieDetail.ngayKhoiChieu).format(
                            "DD/MM/yyyy"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>RUNNING TIME</td>
                        <td> 114 mins</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div
            // data-aos="fade-left"
            // data-aos-once="true"
            className="col-12 col-lg-5 contentFilmCs__viewingTimes"
          >
            <div className="contentFilmCs__title">
              <h2>VIEWING TIMES</h2>
            </div>
            <div className="contentFilmCs__detail">
              <h2>ComingSoon...</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
