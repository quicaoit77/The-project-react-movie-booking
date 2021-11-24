import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import LoadingScreenShipComponent from "../LoadingScreenShipComponent/LoadingScreenShipComponent";
import "./LazyLoadingModalStyle.scss";

export default function LazyLoadingModalComponent() {
  const { isLoadingModal } = useSelector((state) => state.lazyLoadingReducer);
  return (
    <Fragment>
      {isLoadingModal ? (
        <div className="LazyLoadingModal">
          <div className={`LazyLoadingModal__detail `}>
            <LoadingScreenShipComponent />
          </div>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}
