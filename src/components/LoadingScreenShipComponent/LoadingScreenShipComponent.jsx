import React from "react";
import lzloading from "../../assets/img/lazy-loading.png";
import shipLogo from "../../assets/img/shipLogo.png";
import "./LoadingScreenShipStyle.scss";
export default function LoadingScreenShipComponent(props) {
  return (
    <div className="loadingScreenShip">
      <img className="loadingScreenShip__Sun" src={lzloading} alt="" />
      <img className="loadingScreenShip__Ship" src={shipLogo} alt="" />
    </div>
  );
}
