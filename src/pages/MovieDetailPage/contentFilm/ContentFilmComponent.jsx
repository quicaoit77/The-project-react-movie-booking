import React from "react";
import "./ContentFilmStyle.scss";
import { Tabs } from "antd";
import moment from "moment";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import LoadingItemComponent from "../../../components/LoadingItemComponent/LoadingItemComponent";
import shipLogoItem from "../../../assets/img/ship_Logo_Item.jpg";

const { TabPane } = Tabs;
export default function ContentFilmComponent(props) {
  const { movieDetail } = props;

  const renderShowTimes = (arrayShowTimes) =>
    arrayShowTimes.lichChieuPhim.slice(0, 4).map((times, index) => {
      const date = new Date(times.ngayChieuGioChieu);
      const [day, month, year, hour, minutes] = [
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear(),
        date.getHours(),
        date.getMinutes(),
      ];

      const showTimesDate = {
        date: `${day}/${month}/${year}`,
        time: times.ngayChieuGioChieu,
        malichChieu: times.maLichChieu,
      };
      return showTimesDate;
    });
  const renderCinemaList = () =>
    movieDetail.heThongRapChieu?.map((item, index) => (
      <TabPane
        tab={
          <img
            src={`${item.logo}`}
            alt={item.logo}
            onError={(e) => {
              e.target.onError = null;
              e.target.src = shipLogoItem;
            }}
          />
        }
        key={index}
      >
        <Tabs defaultActiveKey="0">
          {item.cumRapChieu.map((itemChild) => {
            const arrayShowTimesDate = renderShowTimes(itemChild);
            const arrayShowTimsUpdate = _.chain(arrayShowTimesDate)
              .groupBy("date")
              .map((value, key) => ({ date: key, times: value }))
              .value();
            // console.table(arrayShowTimsUpdate);
            return arrayShowTimsUpdate.map((timeItem, indexF) => {
              const i = Math.random() * arrayShowTimsUpdate.length;
              return (
                <TabPane tab={<span>{timeItem.date}</span>} key={i}>
                  <div className="viewingTimes">
                    <div className="viewingTimes__Cinema">
                      <h6>{itemChild.tenCumRap}</h6>
                    </div>
                    <div className="viewingTimes__item">
                      <div className="viewingTimes__Detail">
                        {timeItem.times.map((hour, index) => (
                          <NavLink
                            to={`/check-out/${hour.malichChieu}`}
                            key={index}
                          >
                            {moment(hour.time).format("hh: mm A")}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabPane>
              );
            });
          })}
        </Tabs>
      </TabPane>
    ));
  const handleOnErrorImage = (e, className) => {
    e.target.onError = null;
    e.target.style.display = "none";
    const imgError = document.querySelectorAll(`${className}`);
    imgError.forEach((item, index) => {
      item.style.display = "flex";
    });
  };
  return (
    <section className="contentFilm">
      <div className="contentFilm__content">
        <div className="row">
          <div
            // data-aos="fade-right"
            // data-aos-once="true"
            className="col-12 col-lg-7 contentFilm__Synopsis"
          >
            <div className="contentFilm__title">
              <h2>SYNOPSIS</h2>
            </div>
            <div className="contentFilm__detail">
              <div className="row">
                <div className="col-12 col-lg-4 contentFilm__img">
                  <img
                    src={`${movieDetail.hinhAnh}`}
                    alt={movieDetail.tenPhim}
                    onError={(e) =>
                      handleOnErrorImage(e, ".contentFilm__errorImg")
                    }
                  />
                  <div className="contentFilm__errorImg">
                    <LoadingItemComponent />
                  </div>
                </div>
                <div className="col-12 col-lg-8 contentFilm__text">
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
            className="col-12 col-lg-5 contentFilm__viewingTimes"
          >
            <div className="contentFilm__title">
              <h2>VIEWING TIMES</h2>
            </div>
            <div className="contentFilm__detail">
              <Tabs defaultActiveKey="0">{renderCinemaList()}</Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
