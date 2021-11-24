import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ShowCinemasAdminStyle.scss";
import { Tabs, Table, Menu } from "antd";
import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import ModalShowTimesComponent from "./ModalShowTimes/ModalShowTimesComponent";
import AddShowTimesComponent from "./AddShowTimes/AddShowTimesComponent";
import _ from "lodash";
import FindShowTimeComponent from "./FindShowTime/FindShowTimeComponent";
import shipLogoError from "../../../assets/img/ship_Logo_Item.jpg";
import * as movieType from "../../../redux/types/movieType";
import * as cinemaType from "../../../redux/types/cinemaType";

const { TabPane } = Tabs;
const { SubMenu } = Menu;
function callback(key) {
  console.log(key);
}

export default function ShowCinemaAdminComponent(props) {
  const { cinemaList, newShowTime } = useSelector(
    (state) => state.cinemaReducer
  );
  const { movieList } = useSelector((state) => state.movieReducer);
  const [state, setState] = useState({
    dataSearch: [],
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: movieType.GET_MOVIE_LIST_SAGA,
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: cinemaType.GET_CINEMA_LIST_SAGA,
    });
  }, [newShowTime]);

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }
  const columns = [
    {
      title: "ID",
      dataIndex: "maPhim",
    },
    {
      title: "Name",
      dataIndex: "tenPhim",
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => {
        const tenPhimA = a.tenPhim.toLowerCase().trim();
        const tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
    },
    {
      title: "",
      dataIndex: "",
      render: (text, film) => {
        return (
          <div>
            <ModalComponent
              textShowModal="View Show Times"
              Component={ModalShowTimesComponent}
              showTimeList={film.lstLichChieuTheoPhim}
              titleModal="Show Times"
              functionOk={() => {}}
            />
          </div>
        );
      },
    },
  ];

  const renderDataTable = (listFilm) => {
    const data = listFilm.map((film, index) => ({
      key: index,
      maPhim: film.maPhim,
      tenPhim: film.tenPhim,
      lstLichChieuTheoPhim: film.lstLichChieuTheoPhim,
    }));
    return data;
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
  const renderCinemas = () => {
    let listCinemaRender = [];
    if (_.isEmpty(state.dataSearch)) {
      listCinemaRender = cinemaList;
    } else {
      listCinemaRender = state.dataSearch;
    }

    return listCinemaRender.map((item, index) => (
      <TabPane
        tab={
          <div>
            <div>
              <img
                src={`${item.logo}`}
                alt={item.logo}
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = shipLogoError;
                }}
              />
            </div>
            <p>{item.tenHeThongRap}</p>
          </div>
        }
        key={index}
      >
        <Tabs defaultActiveKey="0" tabPosition="left" onChange={callback}>
          {item.lstCumRap.map((itemChild, index) => (
            <TabPane
              tab={
                <div>
                  <div>
                    <img
                      src={`${item.logo}`}
                      alt={item.logo}
                      onError={(e) => {
                        e.target.onError = null;
                        e.target.src = shipLogoError;
                      }}
                    />
                  </div>
                  {renderCinemaName(itemChild.tenCumRap)}
                </div>
              }
              key={index}
            >
              <Table
                columns={columns}
                dataSource={renderDataTable(itemChild.danhSachPhim)}
                onChange={onChange}
              />
            </TabPane>
          ))}
        </Tabs>
      </TabPane>
    ));
  };
  const renderShowTimesMobi = (arrayShowTimes) =>
    arrayShowTimes?.map((film, index) => (
      <div className="row showCinemaAm__film" key={index}>
        <div className="col-12 col-md-10 col-xl-11 showCinemaAm__detail">
          <div className="showCinemaAm__nameFilm">
            <h6>
              {film.maPhim} - {film.tenPhim}
            </h6>
          </div>

          <div className="showCinemaAm__btn">
            <ModalComponent
              textShowModal="View Show Times"
              Component={ModalShowTimesComponent}
              showTimeList={film.lstLichChieuTheoPhim}
              titleModal="Show Times"
              functionOk={() => {}}
            />
          </div>
        </div>
      </div>
    ));
  const renderCinemaListMobi = () => {
    let listCinemaRender = [];
    if (_.isEmpty(state.dataSearch)) {
      listCinemaRender = cinemaList;
    } else {
      listCinemaRender = state.dataSearch;
    }
    return listCinemaRender?.map((item, index) => (
      <TabPane
        tab={
          <img
            src={`${item.logo}`}
            alt={item.logo}
            onError={(e) => {
              e.target.onError = null;
              e.target.src = shipLogoError;
            }}
          />
        }
        key={index}
      >
        <Menu mode="inline" style={{ width: 256 }}>
          {item.lstCumRap?.map((itemChild, index) => (
            <SubMenu key={`sub${index}`} title={itemChild.tenCumRap}>
              {renderShowTimesMobi(itemChild.danhSachPhim)}
            </SubMenu>
          ))}
        </Menu>
      </TabPane>
    ));
  };

  const handleDataSearch = (data) => {
    setState({
      ...state,
      dataSearch: data,
    });
  };

  return (
    <section className="showCinemaAm">
      <div className="showCinemaAm__Title">
        <h3>ShowTimes Management</h3>
      </div>
      <div className="showCinemaAm__FindSt">
        <FindShowTimeComponent
          movieList={movieList}
          handleDataSearch={handleDataSearch}
        />
      </div>
      <div className="showCinemaAm__Add">
        <AddShowTimesComponent movieList={movieList} />
      </div>
      <div className="showCinemaAm__content">
        <Tabs defaultActiveKey="0" onChange={callback}>
          {renderCinemas()}
        </Tabs>
      </div>
      <div className="showCinemaAm__contentMobi">
        <Tabs defaultActiveKey="0" onChange={callback} tabPosition="left">
          {renderCinemaListMobi()}
        </Tabs>
      </div>
    </section>
  );
}
