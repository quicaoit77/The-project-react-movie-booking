import React from "react";
import lzloading from "../../assets/img/lazy-loading.png";
import "./LoadingScreenGearStyle.scss";
export default function LoadingScreenGearComponent() {
  return (
    <div className="loadingScreenGear">
      <div className="row">
        <div className="col-4">
          <img src={lzloading} alt={lzloading} />
        </div>
        <div className="col-4">
          <img src={lzloading} alt={lzloading} />
        </div>
        <div className="col-4">
          <img src={lzloading} alt={lzloading} />
        </div>
        <div className="col-4">
          <img src={lzloading} alt={lzloading} />
        </div>
        <div className="col-4">
          <img src={lzloading} alt={lzloading} />
        </div>
        <div className="col-4">
          <img src={lzloading} alt={lzloading} />
        </div>

        <div className="col-4">
          <img src={lzloading} alt={lzloading} />
        </div>
        <div className="col-4">
          <img src={lzloading} alt={lzloading} />
        </div>
        <div className="col-4">
          <img src={lzloading} alt={lzloading} />
        </div>
      </div>
    </div>
  );
}
