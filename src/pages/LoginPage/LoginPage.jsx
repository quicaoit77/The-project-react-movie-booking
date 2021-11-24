import React, { useEffect } from "react";
import "./LoginPageStyle.scss";
import logo from "../../assets/img/logo_2.png";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import Aos from "aos";
import _ from "lodash";
import * as userType from "../../redux/types/userType";
export default function LoginPage(props) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.taiKhoan.trim()) {
        errors.taiKhoan = "required";
      }
      if (!values.matKhau.trim()) {
        errors.matKhau = "required";
      }

      return errors;
    },
    onSubmit: (values) => {
      dispatch({
        type: userType.POST_USER_LOGIN_SAGA,
        userLogin: values,
        history: props.history,
        notifi: true,
      });
    },
  });
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);
  return (
    <div
      //  data-aos="zoom-out" data-aos-once="true"
      className="Login"
    >
      <div className="login__Logo">
        <NavLink to="/home">
          <img src={logo} alt="" />
        </NavLink>
      </div>
      <div className="login__Title">
        <h3>JOIN US NOW</h3>
      </div>
      <div className="login__Content">
        <form onSubmit={(e) => formik.handleSubmit(e)}>
          <div className="form-group">
            <input
              placeholder="Username"
              name="taiKhoan"
              onChange={(e) => formik.handleChange(e)}
              className="form-control"
              value={formik.values.taiKhoan}
              onBlur={(e) => formik.handleBlur(e)}
            />
            <p className="login__validate">
              {formik.touched.taiKhoan && formik.errors.taiKhoan
                ? "*" + formik.errors.taiKhoan
                : ""}
            </p>
          </div>

          <div className="form-group">
            <input
              placeholder="Password"
              type="password"
              className="form-control"
              name="matKhau"
              onChange={(e) => formik.handleChange(e)}
              onBlur={(e) => formik.handleBlur(e)}
              value={formik.values.matKhau}
            />
            <p className="login__validate">
              {formik.touched.matKhau && formik.errors.matKhau
                ? "*" + formik.errors.matKhau
                : ""}
            </p>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!(formik.isValid && formik.dirty)}
          >
            <span>Login</span>
          </button>
        </form>
        <div className="login__register">
          <NavLink to="/restore-password">Forgot password?</NavLink>
          <p>
            Don't have an account?
            <br />
            <NavLink to="/register"> Register now!</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
