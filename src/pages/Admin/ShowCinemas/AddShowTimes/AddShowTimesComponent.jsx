import React, { useState, useEffect } from "react";
import "./AddShowTimesStyle.scss";
import { DatePicker, Modal, Button, Select, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { cinemaManagerService } from "../../../../services/CinemaManagerService";
import { useFormik } from "formik";
import moment from "moment";
import * as cinemaType from "../../../../redux/types/cinemaType";
const { Option } = Select;
export default function AddShowTimesComponent(props) {
  const [state, setState] = useState({
    cinemaSystem: [],
    cinemas: [],
    listTheater: [],
  });

  const { movieList } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      maPhim: "",
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
      maHethongRap: "",
      maCumRap: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.maPhim) {
        errors.maPhim = "required";
      }
      if (!values.ngayChieuGioChieu) {
        errors.ngayChieuGioChieu = "required";
      }
      if (!values.maRap) {
        errors.maRap = "required";
      }
      if (!values.giaVe) {
        errors.giaVe = "required";
      }

      return errors;
    },
  });
  //   console.log(formik.values);
  const dispatch = useDispatch();
  useEffect(() => {
    const getCinemasystem = async () => {
      try {
        const res = await cinemaManagerService.getCinemaSystemListApi();

        setState({
          ...state,
          cinemaSystem: res.data,
        });
      } catch (error) {
        console.log(error.response?.data);
      }
    };
    getCinemasystem();
  }, []);

  const renderOptionListFilm = () =>
    movieList.map((item, index) => (
      <Option key={index} value={item.maPhim}>
        {item.tenPhim}
      </Option>
    ));
  const renderOptionListCinemaSystem = () =>
    state.cinemaSystem.map((item, index) => (
      <Option key={index} value={item.maHeThongRap}>
        {item.tenHeThongRap}
      </Option>
    ));
  const renderOptionListCinema = () =>
    state.cinemas.map((item, index) => (
      <Option key={index} value={item.maCumRap}>
        {item.tenCumRap}
      </Option>
    ));
  const renderOptionListTheather = () =>
    state.listTheater.map((item, index) => (
      <Option key={index} value={item.maRap}>
        {item.tenRap}
      </Option>
    ));
  function onChangeDate(value, dateString) {
    // console.log("Selected Time: ", value);
    // console.log("Formatted Selected Time: ", dateString);
    formik.setFieldValue("ngayChieuGioChieu", dateString);
  }
  function onChangeNumber(value) {
    formik.setFieldValue("giaVe", value);
  }
  function onOk(value) {
    // console.log("onOk: ", value);
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    formik.resetForm();
    dispatch({
      type: cinemaType.POST_NEW_SHOWTIME_SAGA,
      form: formik.values,
    });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    formik.resetForm();
    setIsModalVisible(false);
  };

  const handleChangeCinemaSystem = (value) => {
    formik.setFieldValue("maHethongRap", value);
    formik.setFieldValue("maCumRap", "");
    formik.setFieldValue("maRap", "");

    const getCinemaList = async () => {
      try {
        const res = await cinemaManagerService.getCinemaListWithCinemaSystemApi(
          value
        );
        setState({
          ...state,
          cinemas: res.data,
        });
      } catch (error) {
        console.log(error.response?.data);
      }
    };
    getCinemaList();
  };
  const handleChangeCinema = (value) => {
    formik.setFieldValue("maCumRap", value);
    formik.setFieldValue("maRap", "");
    const cinema = state.cinemas.find((item) => item.maCumRap === value);
    setState({
      ...state,
      listTheater: cinema.danhSachRap,
    });
  };

  const handleChangeFilm = (value) => {
    // console.log("film", value);
    formik.setFieldValue("maPhim", value);
  };
  const handleChangeTheather = (value) => {
    formik.setFieldValue("maRap", value);
  };
  function onBlur() {
    // console.log("blur");
  }

  function onFocus() {
    // console.log("focus");
  }

  function onSearch(val) {
    // console.log("search:", val);
  }
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Show Times
      </Button>
      <Modal
        title="Create New Show Times"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Add Show Times"
        okButtonProps={{ disabled: !(formik.dirty && formik.isValid) }}
      >
        <div className="addShowTimes">
          <div className="addShowTimes__Content">
            <form>
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="form-group">
                    <label>Film:</label>
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Select film"
                      optionFilterProp="children"
                      onChange={handleChangeFilm}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      value={
                        formik.values.maPhim !== "" ? formik.values.maPhim : ""
                      }
                    >
                      {renderOptionListFilm()}
                    </Select>
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <div className="form-group">
                    <label>Cinema System:</label>
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Select film"
                      optionFilterProp="children"
                      onChange={handleChangeCinemaSystem}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      value={
                        formik.values.maHethongRap !== ""
                          ? formik.values.maHethongRap
                          : ""
                      }
                    >
                      {renderOptionListCinemaSystem()}
                    </Select>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="form-group">
                    <label>Cinema:</label>
                    <Select
                      disabled={
                        formik.values.maHethongRap === "" ? true : false
                      }
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Select film"
                      optionFilterProp="children"
                      onChange={handleChangeCinema}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      value={
                        formik.values.maCumRap !== ""
                          ? formik.values.maCumRap
                          : ""
                      }
                    >
                      {renderOptionListCinema()}
                    </Select>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="form-group">
                    <label>Theater:</label>
                    <Select
                      disabled={formik.values.maCumRap === "" ? true : false}
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Select film"
                      optionFilterProp="children"
                      onChange={handleChangeTheather}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      value={
                        formik.values.maRap !== "" ? formik.values.maRap : ""
                      }
                    >
                      {renderOptionListTheather()}
                    </Select>
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <div className="form-group">
                    <label>Times:</label>
                    <span className="addShowTimes__validate">
                      {formik.errors.ngayChieuGioChieu
                        ? "*" + formik.errors.ngayChieuGioChieu
                        : ""}
                    </span>
                    <DatePicker
                      format="DD/MM/YYYY hh:mm:ss"
                      placeholder="DD/MM/YYYY hh:mm:ss"
                      showTime
                      onChange={onChangeDate}
                      onOk={onOk}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.ngayChieuGioChieu !== ""
                          ? moment(
                              formik.values.ngayChieuGioChieu,
                              "DD/MM/YYYY hh:mm:ss"
                            )
                          : ""
                      }
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="form-group ">
                    <label>Price: </label>
                    <span className="addShowTimes__validate">
                      {formik.errors.giaVe ? "*" + formik.errors.giaVe : ""}
                    </span>
                    <InputNumber
                      min={75000}
                      max={150000}
                      onChange={onChangeNumber}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.giaVe !== "" ? formik.values.giaVe : ""
                      }
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}
