import React, { useState, useEffect } from "react";
import { Modal, Button, DatePicker, InputNumber } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import _ from "lodash";
import { GROUPID } from "../../../../util/settings/config";
import { useDispatch } from "react-redux";
import "./ModalEditFilmStyle.scss";
import * as movieType from "../../../../redux/types/movieType";
export default function ModalEditFilmComponent(props) {
  const { film } = props;
  const [state, setState] = useState({ srcImg: "", activeButton: true });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: film.maPhim,
      tenPhim: film.tenPhim,
      trailer: film.trailer,
      moTa: film.moTa,
      danhGia: film.danhGia,
      ngayKhoiChieu: film.ngayKhoiChieu,
      hinhAnh: null,
      maNhom: GROUPID,
    },
    validate: (values) => {
      const errors = {};
      if (!values.tenPhim.trim()) {
        errors.tenPhim = "required";
      }
      if (!values.ngayKhoiChieu) {
        errors.ngayKhoiChieu = "required";
      }
      if (!values.trailer.trim()) {
        errors.trailer = "required";
      }
      if (!values.moTa.trim()) {
        errors.moTa = "required";
      }
      if (!values.danhGia) {
        errors.danhGia = "required";
      }

      return errors;
    },
  });

  //
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    let formData = new FormData();
    for (let key in formik.values) {
      if (key === "hinhAnh") {
        if (formik.values.hinhAnh !== null) {
          formData.append(
            "File",
            formik.values.hinhAnh,
            formik.values.hinhAnh.name
          );
        }
      } else if (key === "ngayKhoiChieu") {
        const releaseDate = moment(formik.values.ngayKhoiChieu).format(
          "DD/MM/YYYY"
        );
        formData.append(key, releaseDate);
      } else {
        formData.append(key, formik.values[key]);
      }
    }
    const updateFilm = () => {
      dispatch({
        type: movieType.POST_UPDATE_MOVIE_SAGA,
        formData,
      });
    };
    updateFilm();
    setIsModalVisible(false);
    formik.resetForm();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    resetFormEditFilm();
  };
  const handleChangeDate = (value) => {
    formik.setFieldValue("ngayKhoiChieu", value);
  };
  const handleChangeFile = async (e) => {
    const file = e.target.files[0];

    let reader = new FileReader();
    if (
      file?.type === "image/png" ||
      file?.type === "image/jpeg" ||
      file?.type === "image/jpg"
    ) {
      await formik.setFieldValue("hinhAnh", file);
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setState({
          ...state,
          srcImg: e.target.result,
        });
      };
    } else if (_.isEmpty(file)) {
      await formik.setFieldValue("hinhAnh", "");
      setState({
        ...state,
        srcImg: "",
      });
    }
  };
  const resetFormEditFilm = () => {
    formik.resetForm();
    document.querySelector("#editFilm__InputFileId").value = "";
    // document.querySelector("#editFilm__ImgInputFileId").src = "";
    // document.querySelector("#editFilm__ImgInputFileId").alt = "";
    setState({ ...state, srcImg: "" });
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        <span>
          <i className="fa fa-edit"></i>
        </span>
      </Button>
      <Modal
        title="Update Film"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Update Film"
        destroyOnClose={true}
        okButtonProps={{ disabled: !(formik.dirty && formik.isValid) }}
      >
        <div className="editFilm">
          <form>
            <div className="row">
              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <label>Name</label>
                  <span className="editFilm__error">
                    {formik.errors.tenPhim}
                  </span>

                  <input
                    name="tenPhim"
                    className="form-control"
                    onChange={(e) => formik.handleChange(e)}
                    value={formik.values.tenPhim}
                  />
                </div>
              </div>
              <div className="d-none d-sm-block col-sm-6"></div>
              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <label>Trailer</label>
                  <span className="editFilm__error">
                    {formik.errors.trailer}
                  </span>

                  <input
                    name="trailer"
                    className="form-control"
                    onChange={(e) => formik.handleChange(e)}
                    value={formik.values.trailer}
                  />
                </div>
              </div>
              <div className="col-5 col-sm-3">
                <div className="form-group">
                  <label>Rate</label>
                  <span className="editFilm__error">
                    {formik.errors.danhGia}
                  </span>

                  <InputNumber
                    min={1}
                    max={10}
                    onChange={(values) => {
                      formik.setFieldValue("danhGia", values);
                    }}
                    value={formik.values.danhGia}
                  />
                </div>
              </div>
              <div className="col-7 col-sm-3">
                <div className="form-group">
                  <label>Release Date</label>
                  <span className="editFilm__error">
                    {formik.errors.ngayKhoiChieu}
                  </span>

                  <DatePicker
                    placeholder="DD/MM/YYYY"
                    format="DD/MM/YYYY"
                    onChange={(e) => handleChangeDate(e)}
                    value={moment(formik.values.ngayKhoiChieu)}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <label>Image</label>
                  <span className="editFilm__error">
                    {formik.errors.hinhAnh}
                  </span>

                  <input
                    className="editFilm__InputFile"
                    type="file"
                    onChange={(e) => handleChangeFile(e)}
                    accept="image/png, image/jpeg, image/jpg"
                    id="editFilm__InputFileId"
                  />
                  <img
                    src={state.srcImg === "" ? film.hinhAnh : state.srcImg}
                    alt={state.srcImg === "" ? film.hinhAnh : state.srcImg}
                    id="editFilm__ImgInputFileId"
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Description</label>
                  <span className="editFilm__error">{formik.errors.moTa}</span>

                  <textarea
                    name="moTa"
                    className="form-control"
                    onChange={(e) => formik.handleChange(e)}
                    value={formik.values.moTa}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
