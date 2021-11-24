import React from "react";
import LoadingScreenShipComponent from "../../../components/LoadingScreenShipComponent/LoadingScreenShipComponent";
import "./DashboardAdminStyle.scss";
export default function DashboardAdminComponent() {
  return (
    <div className="dashboardAdmin">
      <h1>Welcome to Admin Page</h1>
      <div className="dashboardAdmin__content">
        <div className="dashboardAdmin__detail">
          <LoadingScreenShipComponent />
        </div>
      </div>
    </div>
  );
}
