import React, { useState } from "react";
import { Modal, Button, DatePicker, InputNumber } from "antd";
import { useFormik } from "formik";
import "./ModalAddFilmStyle.scss";
import moment from "moment";
import _ from "lodash";
import { GROUPID } from "../../../../util/settings/config";
import { useDispatch } from "react-redux";
import * as movieType from "../../../../redux/types/movieType";
export default function ModalAddFilmComponent(props) {
  const [state, setState] = useState({ srcImg: "", activeButton: true });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      danhGia: "",
      ngayKhoiChieu: "",
      hinhAnh: "",
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
      if (!values.hinhAnh) {
        errors.hinhAnh = "required";
      }

      return errors;
    },
  });

  //

  const handleChangeDate = (value) => {
    const releaseDate = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", releaseDate);
  };
  const handleChangeFile = (e) => {
    const file = e.target.files[0];

    let reader = new FileReader();
    if (
      file?.type === "image/png" ||
      file?.type === "image/jpeg" ||
      file?.type === "image/jpg"
    ) {
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setState({
          ...state,
          srcImg: e.target.result,
        });
      };
      formik.setFieldValue("hinhAnh", file);
    } else if (_.isEmpty(file)) {
      formik.setFieldValue("hinhAnh", "");
      setState({
        ...state,
        srcImg: "",
      });
    }
  };
  const handleOk = () => {
    let formData = new FormData();
    for (let key in formik.values) {
      if (key !== "hinhAnh") {
        formData.append(key, formik.values[key]);
      } else {
        formData.append(
          "File",
          formik.values.hinhAnh,
          formik.values.hinhAnh.name
        );
      }
    }
    const addFilm = () => {
      dispatch({
        type: movieType.POST_NEW_MOVIE_SAGA,
        formData,
      });
    };
    addFilm();
    setIsModalVisible(false);
    resetFormAddFilm();
  };
  const resetFormAddFilm = () => {
    formik.resetForm();
    document.querySelector("#addFilm__InputFileId").value = "";
    setState({ srcImg: "" });
    // console.log(formik.values);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    resetFormAddFilm();
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Film
      </Button>
      <Modal
        title="Create New Film"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Add Film"
        okButtonProps={{ disabled: !(formik.dirty && formik.isValid) }}
        destroyOnClose={true}
      >
        <div className="addFilm">
          <form>
            <div className="row">
              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <label>Name</label>
                  <span className="addFilm__error">
                    {formik.touched.tenPhim && formik.errors.tenPhim
                      ? "*" + formik.errors.tenPhim
                      : ""}
                  </span>

                  <input
                    name="tenPhim"
                    className="form-control"
                    onChange={(e) => formik.handleChange(e)}
                    value={formik.values.tenPhim}
                    onBlur={(e) => formik.handleBlur(e)}
                  />
                </div>
              </div>
              <div className="d-none d-sm-block col-sm-6"></div>
              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <label>Trailer</label>
                  <span className="addFilm__error">
                    {formik.touched.trailer && formik.errors.trailer
                      ? "*" + formik.errors.trailer
                      : ""}
                  </span>

                  <input
                    name="trailer"
                    className="form-control"
                    onChange={(e) => formik.handleChange(e)}
                    value={formik.values.trailer}
                    onBlur={(e) => formik.handleBlur(e)}
                  />
                </div>
              </div>
              <div className="col-5 col-sm-3">
                <div className="form-group">
                  <label>Rate</label>
                  <span className="addFilm__error">
                    {formik.errors.danhGia ? "*" + formik.errors.danhGia : ""}
                  </span>

                  <InputNumber
                    min={1}
                    max={10}
                    onChange={(values) => {
                      formik.setFieldValue("danhGia", values);
                    }}
                    id="addFilm__inputNumberId"
                    value={
                      formik.values.danhGia !== "" ? formik.values.danhGia : ""
                    }
                  />
                </div>
              </div>
              <div className="col-7 col-sm-3">
                <div className="form-group">
                  <label>Release Date</label>
                  <span className="addFilm__error">
                    {formik.errors.ngayKhoiChieu
                      ? "*" + formik.errors.ngayKhoiChieu
                      : ""}
                  </span>

                  <DatePicker
                    placeholder="DD/MM/YYYY"
                    format="DD/MM/YYYY"
                    onChange={(e) => handleChangeDate(e)}
                    id="addFilm__inputDateId"
                    value={
                      formik.values.ngayKhoiChieu !== ""
                        ? moment(formik.values.ngayKhoiChieu, "DD/MM/YYYY")
                        : ""
                    }
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <label>Image</label>
                  <span className="addFilm__error">
                    {formik.errors.hinhAnh ? "*" + formik.errors.hinhAnh : ""}
                  </span>

                  <input
                    className="addFilm__InputFile"
                    type="file"
                    onChange={(e) => handleChangeFile(e)}
                    accept="image/png, image/jpeg, image/jpg"
                    id="addFilm__InputFileId"
                  />
                  <img
                    id="addFilm__ImgInputFileId"
                    src={state.srcImg}
                    alt={state.srcImg}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Description</label>
                  <span className="addFilm__error">
                    {formik.touched.moTa && formik.errors.moTa
                      ? "*" + formik.errors.moTa
                      : ""}
                  </span>

                  <textarea
                    name="moTa"
                    className="form-control"
                    onChange={(e) => formik.handleChange(e)}
                    value={formik.values.moTa}
                    onBlur={(e) => formik.handleBlur(e)}
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
