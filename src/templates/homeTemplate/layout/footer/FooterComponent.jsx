import React from "react";
import { NavLink } from "react-router-dom";
import "./FooterStyle.scss";

export default function FooterComponent() {
  return (
    <footer>
      <div className="footer__content">
        <div className="footer__top">
          <div className="row">
            <div className="col-12 col-md-3 footer__item">
              <h3>GET IN TOUCH</h3>
              <ul>
                <li>
                  <NavLink to="/">FAQs</NavLink>
                </li>
                <li>
                  <NavLink to="/">Give us feedback</NavLink>
                </li>
                <li>
                  <NavLink to="/">Contact us</NavLink>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-3 footer__item">
              <h3>ABOUT B.MOVIE</h3>
              <ul>
                <li>
                  <NavLink to="/">About us</NavLink>
                </li>
                <li>
                  <NavLink to="/">Find us</NavLink>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-3 footer__item">
              <h3>LEGAL STUFF</h3>
              <ul>
                <li>
                  <NavLink to="/">Terms &amp; Conditions</NavLink>
                </li>
                <li>
                  <NavLink to="/">Privacy policy</NavLink>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-3 footer__item">
              <h3>CONNECT WITH US</h3>
              <ul>
                <li>
                  <NavLink to="/">
                    <i className="fab fa-facebook-f" />
                    <span> Facebook</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <i className="fab fa-twitter" />
                    <span> Twitter</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <i className="fab fa-google-plus-g" />
                    <span> Google +</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer__bot">
          <p>
            2021 © B.Movie | Booking Ticket Website | By Colin_Wilbus
            {/* <a
              href="https://portfolio-colin-wilbus.vercel.app/"
              target="_blank"
            >
              Colin_Wilbus
            </a> */}
          </p>
        </div>
      </div>
    </footer>
  );
}
