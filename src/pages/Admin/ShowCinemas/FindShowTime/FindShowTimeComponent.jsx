import React, { useState } from "react";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import "./FindShowTimeStyle.scss";
import * as cinemaType from "../../../../redux/types/cinemaType";
const { Option } = Select;
export default function FindShowTimeComponent(props) {
  const { movieList, handleDataSearch } = props;
  const dispatch = useDispatch();
  const [state, setState] = useState({
    listCinemaOption: [],
    choiceListCinema: [],
    choiceCinema: [],
  });
  const [valueMovie, setValueMovie] = useState(undefined);
  const [valueSysTemCinema, setValueSystemCinema] = useState(undefined);
  const [valueCinema, setValueCinema] = useState(undefined);

  const { showTimesFilm, showTimesCinemaFilm } = useSelector(
    (state) => state.cinemaReducer
  );
  //   console.log("showTimesCinemaFilm", showTimesCinemaFilm);
  //   console.log("listCinemaOption", state.listCinemaOption);
  const handleChangeMovie = (value) => {
    if (value) {
      dispatch({
        type: cinemaType.GET_SHOWTIMES_FILM_SAGA,
        id: value,
      });
    }
    setValueSystemCinema(undefined);
    setValueCinema(undefined);
    handleDataSearch([]);
    setState({ ...state, choiceListCinema: [], choiceCinema: [] });
    setValueMovie(value);
  };
  const handleChangeSystemCinema = (value) => {
    const systemcinemaChoose = showTimesFilm.heThongRapChieu?.find(
      (item) => item.maHeThongRap === value
    );
    const lstCumRapClone = systemcinemaChoose.cumRapChieu?.map(
      (item, index) => ({
        maCumRap: item.maCumRap,
        tenCumRap: item.tenCumRap,
        danhSachPhim: [
          {
            tenPhim: showTimesFilm.tenPhim,
            maPhim: showTimesFilm.maPhim,
            hinhAnh: showTimesFilm.hinhAnh,
            lstLichChieuTheoPhim: item.lichChieuPhim,
          },
        ],
      })
    );
    setState({
      ...state,
      listCinemaOption: systemcinemaChoose.cumRapChieu,
      choiceListCinema: [
        {
          lstCumRap: lstCumRapClone,
          logo: systemcinemaChoose.logo,
          maHeThongRap: systemcinemaChoose.maHeThongRap,
          tenHeThongRap: systemcinemaChoose.tenHeThongRap,
        },
      ],
      choiceCinema: [],
    });
    setValueSystemCinema(value);
    setValueCinema(undefined);
  };
  const handleChangeCinema = (value) => {
    const newLstCinema = [];
    const cinema = state.choiceListCinema[0].lstCumRap.find(
      (item) => item.maCumRap === value
    );
    newLstCinema.push(cinema);
    setState({
      ...state,
      choiceCinema: [{ ...state.choiceListCinema[0], lstCumRap: newLstCinema }],
    });
    setValueCinema(value);
  };

  const renderMovieListOption = () =>
    movieList.map((item, index) => (
      <Option value={item.maPhim} key={index}>
        {item.tenPhim}
      </Option>
    ));
  const renderSystemCinemaOption = () => {
    if (valueMovie) {
      return showTimesFilm.heThongRapChieu?.map((item, index) => (
        <Option value={item.maHeThongRap} key={index}>
          {item.tenHeThongRap}
        </Option>
      ));
    }
  };

  const renderCinemaOption = () => {
    if (valueSysTemCinema) {
      return state.listCinemaOption?.map((item, index) => (
        <Option value={item.maCumRap} key={index}>
          {item.tenCumRap}
        </Option>
      ));
    }
  };

  const handleSearchShowTime = () => {
    if (valueMovie) {
      if (_.isEmpty(state.choiceCinema) && _.isEmpty(state.choiceListCinema)) {
        handleDataSearch(showTimesCinemaFilm);
      } else if (_.isEmpty(state.choiceCinema)) {
        handleDataSearch(state.choiceListCinema);
      } else {
        handleDataSearch(state.choiceCinema);
      }
    }
  };
  return (
    <div className="findShowTimeAdmin">
      <form>
        <div className="row">
          <div className="col-12  col-lg-3">
            <div className="findShowTimeAdmin__item">
              <div className="form-group">
                <label>MOVIES</label>
                <Select
                  value={valueMovie}
                  allowClear
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                  onChange={handleChangeMovie}
                >
                  {renderMovieListOption()}
                </Select>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-3">
            <div className="findShowTimeAdmin__item">
              <div className="form-group">
                <label>SYSTEM CINEMAS</label>
                <Select
                  disabled={valueMovie ? false : true}
                  value={valueSysTemCinema}
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                  onChange={handleChangeSystemCinema}
                >
                  {renderSystemCinemaOption()}
                </Select>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-3">
            <div className="findShowTimeAdmin__item">
              <div className="form-group">
                <label>CINEMAS</label>
                <Select
                  disabled={valueSysTemCinema ? false : true}
                  value={valueCinema}
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                  onChange={handleChangeCinema}
                >
                  {renderCinemaOption()}
                </Select>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="findShowTimeAdmin__item">
              <button type="button" onClick={() => handleSearchShowTime()}>
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
