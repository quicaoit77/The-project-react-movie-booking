import React, { Fragment, useState } from "react";
import { Tabs, Menu } from "antd";
import "./ShowTime2Style.scss";
import moment from "moment";
import { NavLink } from "react-router-dom";
import LoadingItemComponent from "../../../components/LoadingItemComponent/LoadingItemComponent";
import shipLogoItem from "../../../assets/img/ship_Logo_Item.jpg";
import _ from "lodash";

const { SubMenu } = Menu;
const { TabPane } = Tabs;

export default function ShowTime2Component(props) {
  const { cinemaList } = props;

  const handleOnErrorImage = (e, className) => {
    e.target.onError = null;
    e.target.style.display = "none";
    const imgError = document.querySelectorAll(`${className}`);
    imgError.forEach((item, index) => {
      item.style.display = "flex";
    });
  };
  const renderShowTimes = (arrayShowTimes) => {
    if (arrayShowTimes) {
      return arrayShowTimes.slice(0, 5)?.map((film, index) => (
        <div className="row showTime__film" key={index}>
          <div className="col-12 col-md-2 col-xl-1 sTfilm__img">
            <img
              src={`${film.hinhAnh}`}
              alt={film.hinhAnh}
              onError={(e) => handleOnErrorImage(e, ".sTfilm__imgError")}
            />
            <div className="sTfilm__imgError">
              <LoadingItemComponent />
            </div>
          </div>
          <div className="col-12 col-md-10 col-xl-11 sTfim__detail">
            <h6>{film.tenPhim}</h6>
            <p>
              <i className="fa fa-clock" />
              <span>VIEWING TIMES</span>
            </p>
            <div>
              {film.lstLichChieuTheoPhim?.map((time, index) => (
                <NavLink to={`/check-out/${time.maLichChieu}`} key={index}>
                  <span>
                    {moment(time.ngayChieuGioChieu).format(
                      "DD/MM/YYYY - hh:mm A"
                    )}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      ));
    } else {
      return (
        <div className="row">
          <div className="col-1"></div>
          <div className="col-11">
            <h6 className="text-center">
              Sorry there is no showtime on this day.
            </h6>
          </div>
        </div>
      );
    }
  };
  const renderShowTimesMobi = (arrayShowTimes) => {
    if (arrayShowTimes) {
      return arrayShowTimes.slice(0, 5)?.map((film, index) => (
        <div className="row showTime__film" key={index}>
          <div className="col-12 col-md-2 col-xl-1 sTfilm__img">
            <img
              src={`${film.hinhAnh}`}
              alt={film.hinhAnh}
              onError={(e) => handleOnErrorImage(e, ".sTfilm__imgError")}
            />
            <div className="sTfilm__imgError">
              <LoadingItemComponent />
            </div>
            <div className="sTfilm__nameFilm">
              <h6>{film.tenPhim}</h6>
            </div>
          </div>
          <div className="col-12 col-md-10 col-xl-11 sTfim__detail">
            <p>
              <i className="fa fa-clock" />
              <span>VIEWING TIMES</span>
            </p>
            <div>
              {film.lstLichChieuTheoPhim?.map((time, index) => (
                <NavLink to={`/check-out/${time.maLichChieu}`} key={index}>
                  <span>
                    {moment(time.ngayChieuGioChieu).format(
                      "DD/MM/YYYY - hh:mm A"
                    )}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      ));
    } else {
      return (
        <div className="row">
          <div className="col-1"></div>
          <div className="col-11">
            <h6 className="text-center">
              Sorry there is no showtime on this day.
            </h6>
          </div>
        </div>
      );
    }
  };
  const renderCinemaName = (cinemaName) => {
    const index = cinemaName.indexOf("-");
    let newCinemaName = "";
    let systemCinema = "";
    if (index !== -1) {
      newCinemaName = cinemaName?.slice(index);
      systemCinema = cinemaName?.slice(0, index);
    }
    return (
      <>
        <p>{systemCinema}</p>
        <p>{newCinemaName}</p>
      </>
    );
  };
  const renderCinemaList = () =>
    cinemaList?.map((item, index) => (
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
        <Tabs defaultActiveKey="0" tabPosition="left" onChange={callback}>
          {item.lstCumRap?.map((itemChild, index) => {
            if (!_.isEmpty(itemChild.danhSachPhim)) {
              return (
                <TabPane
                  tab={
                    <div>
                      <div>
                        <img
                          src={`${item.logo}`}
                          alt={item.logo}
                          onError={(e) => {
                            e.target.onError = null;
                            e.target.src = shipLogoItem;
                          }}
                        />
                      </div>

                      {renderCinemaName(itemChild.tenCumRap)}
                    </div>
                  }
                  key={index}
                >
                  {renderShowTimes(itemChild.danhSachPhim)}
                </TabPane>
              );
            }
          })}
        </Tabs>
      </TabPane>
    ));

  const renderCinemaListMobi = () =>
    cinemaList?.map((item, index) => (
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
        <Menu mode="inline" style={{ width: 256 }}>
          {item.lstCumRap?.map((itemChild, index) => {
            if (!_.isEmpty(itemChild.danhSachPhim)) {
              return (
                <SubMenu key={`sub${index}`} title={itemChild.tenCumRap}>
                  {renderShowTimesMobi(itemChild.danhSachPhim)}
                </SubMenu>
              );
            }
          })}
        </Menu>
      </TabPane>
    ));
  function callback(key) {
    console.log(key);
  }
  return (
    <section className="showTime" id="showTimeId">
      <div
        className="showTime__content"
        // data-aos="fade-down"
        // data-aos-once="true"
      >
        <div className="showTime__title">
          <h2>ALL CINEMAS</h2>
        </div>
        <Tabs defaultActiveKey="0" onChange={callback}>
          {renderCinemaList()}
        </Tabs>
      </div>
      <div
        className="showTime__contentMobi"
        // data-aos="fade-down"
        // data-aos-once="true"
      >
        <div className="showTime__title">
          <h2>ALL CINEMAS</h2>
        </div>
        <Tabs defaultActiveKey="0" onChange={callback} tabPosition="left">
          {renderCinemaListMobi()}
        </Tabs>
      </div>
    </section>
  );
}
