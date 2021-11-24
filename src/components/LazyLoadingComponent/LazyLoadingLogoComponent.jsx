import React, { Fragment } from "react";
import "./LazyLoadingLogoStyle.scss";
import { useSelector } from "react-redux";
import LoadingScreenShipComponent from "../LoadingScreenShipComponent/LoadingScreenShipComponent";
// import LoadingScreenGearComponent from "../LoadingScreenGearComponent/LoadingScreenGearComponent";

export default function LazyLoadingLogoComponent(props) {
  const { isLoading } = useSelector((state) => state.lazyLoadingReducer);

  return (
    <Fragment>
      {isLoading ? (
        <div className="lazyLogo">
          <div className={`lazyLogo__detail `}>
            <LoadingScreenShipComponent />
          </div>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}
