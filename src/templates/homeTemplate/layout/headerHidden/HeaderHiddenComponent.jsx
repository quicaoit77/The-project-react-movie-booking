import React from "react";
import { NavLink } from "react-router-dom";
import "./HeaderHiddenStyle.scss";
import logo from "../../../../assets/img/logo_2.png";

import { NavHashLink } from "react-router-hash-link";

export default function HeaderHidenComponent() {
  const changeHeaderHidden = () => {
    const headerCheckOut = document.querySelector("#navbarhiddenid");
    if (headerCheckOut) {
      if (window.scrollY > 350) {
        headerCheckOut.classList.add("navbarhidden__active");
        headerCheckOut.style.display = "block";
      } else {
        headerCheckOut.classList.remove("navbarhidden__active");
      }
    }
  };
  window.addEventListener("scroll", changeHeaderHidden);

  return (
    <section className="navbarhidden" id="navbarhiddenid">
      <div className="navbarhidden__overlay">
        <div className="navbarhidden__content ">
          <nav className="navbar navbar-expand-md  p-0 ">
            <NavLink exact className="navbar-brand" to="/home">
              <img src={logo} alt="" />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarHiddenMovie"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span>
                <i className="fa fa-stream"></i>
              </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarHiddenMovie">
              <ul className="navbar-nav ml-auto">
                <li
                  className="nav-item "
                  data-toggle="collapse"
                  data-target="#navbarHiddenMovie"
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
                  data-target="#navbarHiddenMovie"
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
                  data-target="#navbarHiddenMovie"
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
                  data-target="#navbarHiddenMovie"
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
    </section>
  );
}
