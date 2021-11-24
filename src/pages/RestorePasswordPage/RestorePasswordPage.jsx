import React, { useState, useEffect } from "react";
import "./RestorePasswordStyle.scss";
import logo from "../../assets/img/logo_2.png";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as userType from "../../redux/types/userType";
import { Steps, Button } from "antd";
import { GROUPID } from "../../util/settings/config";
import _ from "lodash";

const { Step } = Steps;

export default function RestorePasswordPage(props) {
  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();
  const { listUser, userBoss, bossLogin } = useSelector(
    (state) => state.userReducer
  );
  const [disable, setDisable] = useState(true);
  const [notification, setNotification] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: "",
      hoTen: "",
      email: "",
      soDt: "",
      maLoaiNguoiDung: "",
      matKhau: "",
      maNhom: GROUPID,
    },
    validate: (values) => {
      const errors = {};
      if (!/^[a-zA-Z0-9]*$/.test(values.matKhau)) {
        errors.matKhau = "Only letter (a-z), number (0-9)";
      }
      return errors;
    },
  });

  useEffect(() => {
    if (_.isEmpty(listUser) || listUser.length >= 2) {
      setDisable(true);
    } else {
      formik.setFieldValue("taiKhoan", listUser[0]?.taiKhoan);
      formik.setFieldValue("hoTen", listUser[0]?.hoTen);
      formik.setFieldValue("maLoaiNguoiDung", listUser[0]?.maLoaiNguoiDung);
      setDisable(false);
      setNotification(false);
    }
  }, [listUser]);
  //
  useEffect(() => {
    dispatch({
      type: userType.GET_LIST_USER_SAGA,
      sortUserBoss: true,
    });
    return () => {
      dispatch({
        type: userType.DEL_LIST_USER,
      });
    };
  }, []);

  const renderNotification = (key) => {
    if (notification) {
      switch (key) {
        case "userName":
          {
            if (
              _.isEmpty(listUser) ||
              listUser.length >= 2 ||
              formik.values.taiKhoan === ""
            ) {
              return <span>Tài khoản không chính xác</span>;
            }
          }
          break;

        case "phonenumber":
          {
            if (formik.values.soDt !== listUser[0]?.soDt) {
              return <span>Số đt không chính xác</span>;
            }
          }
          break;
        case "email":
          {
            if (formik.values.email !== listUser[0]?.email) {
              return <span>email không chính xác</span>;
            }
          }
          break;
        default: {
          return "";
        }
      }
    }
  };

  const next = () => {
    setCurrent(current + 1);
    setDisable(true);
    setNotification(false);
  };

  //   const prev = () => {
  //     setCurrent(current - 1);
  //   };

  const handleChangeUsername = (e) => {
    formik.setFieldValue("taiKhoan", e.target.value);
    setDisable(true);
  };
  const handleChangeEmail = (e) => {
    formik.setFieldValue("email", e.target.value);
    setDisable(true);
    setNotification(false);
  };
  const handleChangePhonenumber = (e) => {
    formik.setFieldValue("soDt", e.target.value);
    setNotification(false);
    setDisable(true);
  };
  const handleChangePassword = (e) => {
    formik.setFieldValue("matKhau", e.target.value);
    setDisable(false);
  };

  window.addEventListener(
    "keydown",
    function (e) {
      if (
        e.keyIdentifier == "U+000A" ||
        e.keyIdentifier == "Enter" ||
        e.keyCode == 13
      ) {
        if (e.target.nodeName == "INPUT" && e.target.type == "text") {
          e.preventDefault();
          return false;
        }
      }
    },
    true
  );
  const formUsername = () => (
    <form>
      <div className="row">
        <div className="col-12 col-sm-6">
          <div className="form-group">
            <p className="restorePassword__validate">
              {renderNotification("userName")}
            </p>
            <input
              placeholder="Username"
              name="taiKhoan"
              onChange={(e) => handleChangeUsername(e)}
              className="form-control"
              value={formik.values.taiKhoan}
              onBlur={(e) => formik.handleBlur(e)}
            />
          </div>
        </div>
      </div>
      <div className="restorePassword__btn">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            if (formik.values.taiKhoan !== "") {
              dispatch({
                type: userType.GET_LIST_USER_SAGA,
                keyWord: formik.values.taiKhoan.trim(),
              });
            }
            setNotification(true);
          }}
        >
          <span>Check</span>
        </button>
      </div>
    </form>
  );
  const formInfo = () => (
    <form>
      <div className="row">
        <div className="col-12 col-sm-6">
          <div className="form-group">
            <p className="restorePassword__validate">
              {renderNotification("email")}
            </p>
            <input
              placeholder="Email"
              name="email"
              onChange={(e) => handleChangeEmail(e)}
              className="form-control"
              value={formik.values.email}
              onBlur={(e) => formik.handleBlur(e)}
            />
          </div>
        </div>
        <div className="col-12 col-sm-6">
          <div className="form-group">
            <p className="restorePassword__validate">
              {renderNotification("phonenumber")}
            </p>
            <input
              placeholder="PhoneNumber"
              name="soDt"
              onChange={(e) => handleChangePhonenumber(e)}
              className="form-control"
              value={formik.values.soDt}
              onBlur={(e) => formik.handleBlur(e)}
            />
          </div>
        </div>
      </div>
      <div className="restorePassword__btn">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setNotification(true);
            if (
              listUser[0].email === formik.values.email.trim() &&
              listUser[0].soDt === formik.values.soDt.trim()
            ) {
              setDisable(false);
              dispatch({
                type: userType.POST_USER_LOGIN_SAGA,
                userLogin: {
                  taiKhoan: userBoss.taiKhoan,
                  matKhau: userBoss.matKhau,
                },
                bossLogin: true,
              });
            } else {
              setDisable(true);
            }
          }}
        >
          <span>Check</span>
        </button>
      </div>
    </form>
  );
  const formPassword = () => (
    <form>
      <div className="row">
        <div className="col-12 col-sm-6">
          <div className="form-group">
            <p className="restorePassword__validate">
              {formik.touched.matKhau && formik.errors.matKhau
                ? formik.errors.matKhau
                : ""}
            </p>
            <input
              type="password"
              placeholder="New Password"
              name="matKhau"
              onChange={(e) => handleChangePassword(e)}
              className="form-control"
              value={formik.values.matKhau}
              onBlur={(e) => formik.handleBlur(e)}
            />
            <p className="restorePassword__validate"></p>
          </div>
        </div>
      </div>
    </form>
  );
  const steps = [
    {
      title: "Account Verification",
      content: formUsername(),
    },
    {
      title: "Infomation Verification",
      content: formInfo(),
    },
    {
      title: "Change Password",
      content: formPassword(),
    },
  ];
  return (
    <div className="restorePassword">
      <div className="restorePassword__Logo">
        <NavLink to="/home">
          <img src={logo} alt="" />
        </NavLink>
      </div>
      <div className="restorePassword__Content">
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button disabled={disable} type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              className="btn-done"
              disabled={
                formik.values.matKhau !== "" && formik.isValid ? false : true
              }
              type="primary"
              onClick={() => {
                dispatch({
                  type: userType.POST_UPDATE_USER_SAGA,
                  form: formik.values,
                  history: props.history,
                  accessBoss: bossLogin.accessToken,
                  typeUpdatePassword: true,
                });
              }}
            >
              Done
            </Button>
          )}
          {/* {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )} */}
        </div>
      </div>
    </div>
  );
}
