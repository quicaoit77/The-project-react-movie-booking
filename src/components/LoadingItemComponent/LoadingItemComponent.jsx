import React from "react";
import "./LoadingItemStyle.scss";
import shipLogoItem from "../../assets/img/ship_Logo_Item.jpg";
export default function LoadingItemComponent() {
  return (
    <div className="loadingItem">
      <div className="loadingItem__content">
        <img src={shipLogoItem} alt="" />
      </div>
    </div>
  );
}
