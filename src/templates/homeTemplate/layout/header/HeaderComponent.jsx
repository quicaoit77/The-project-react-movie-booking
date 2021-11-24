import React, { useState, useEffect } from "react";
import "./HeaderStyle.scss";
import logo from "../../../../assets/img/logo_2.png";
import { NavLink } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { Fragment } from "react";
import { USER_LOGIN } from "../../../../util/settings/config";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { deleteUserLogin } from "../../../../redux/actions/userAction";

export default function HeaderComponent(props) {
  const [state, setState] = useState({ isLogin: false, isShow: false });
  const { userLogin } = useSelector((state) => state.userReducer);
  //   console.log("userLogin", userLogin);
  //   console.log("state", state.isLogin);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!_.isEmpty(userLogin)) {
      setState({
        ...state,
        isLogin: true,
      });
    }
  }, [state.isLogin]);

  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return (
        <Fragment>
          <NavLink to="/login">Sign In</NavLink>
          <NavLink to="/register">Sign Up</NavLink>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <NavLink to="/profile">{userLogin.taiKhoan}</NavLink>
        <NavLink
          to=""
          onClick={() => {
            dispatch(deleteUserLogin());
            setState({
              ...state,
              isLogin: false,
            });
          }}
        >
          Sign Out
        </NavLink>
      </Fragment>
    );
  };
  const renderShowNavbarCollapse = () => {
    if (state.isShow) {
      return "show";
    }
    return "";
  };

  return (
    <header
      // data-aos="zoom-out" data-aos-once="true"
      id="headerHomeId"
    >
      <div className="header__content">
        <div className="header__top">
          <div className="row">
            <div className="col-12">{renderLogin()}</div>
          </div>
        </div>
        <div className="header__bot ">
          <nav className="navbar navbar-expand-md  p-0 ">
            <NavLink className="navbar-brand" to="/home">
              <img src={logo} alt="" />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarMovie"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span>
                <i className="fa fa-stream"></i>
              </span>
            </button>
            <div className={`collapse navbar-collapse `} id="navbarMovie">
              <ul className="navbar-nav ml-auto">
                <li
                  className="nav-item "
                  data-toggle="collapse"
                  data-target="#navbarMovie"
                >
                  <NavHashLink
                    className="nav-link"
                    activeClassName="active__Link"
                    to="/home#headerHomeId"
                    smooth="true"
                  >
                    HOME <span className="sr-only">(current)</span>
                  </NavHashLink>
                </li>
                <li
                  className="nav-item"
                  data-toggle="collapse"
                  data-target="#navbarMovie"
                >
                  <NavHashLink
                    className="nav-link"
                    activeClassName="active__Link"
                    smooth="true"
                    to="/home#showFilmId"
                  >
                    MOVIE
                  </NavHashLink>
                </li>
                <li
                  className="nav-item"
                  data-toggle="collapse"
                  data-target="#navbarMovie"
                >
                  <NavHashLink
                    className="nav-link"
                    activeClassName="active__Link"
                    smooth="true"
                    to="/home#showTimeId"
                  >
                    BOOKING
                  </NavHashLink>
                </li>
                <li
                  className="nav-item"
                  data-toggle="collapse"
                  data-target="#navbarMovie"
                >
                  <NavHashLink
                    className="nav-link"
                    activeClassName="active__Link"
                    smooth="true"
                    to="/home#comingSoonId"
                  >
                    COMING SOON
                  </NavHashLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
