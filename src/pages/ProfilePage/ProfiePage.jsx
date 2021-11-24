import React, { useEffect } from "react";
import "./ProfileStyle.scss";
import { Avatar } from "antd";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Moment from "moment";
import _ from "lodash";
import * as userType from "../../redux/types/userType";
export default function ProfilePage(props) {
  const { userLogin, userLoginInfo } = useSelector(
    (state) => state.userReducer
  );

  const dispatch = useDispatch();
  useEffect(() => {
    const userAccount = {
      taiKhoan: userLogin.taiKhoan,
    };
    dispatch({
      type: userType.POST_USER_INFO_SAGA,
      userAccount,
      loading: true,
    });
  }, []);
  const renderHistoryBooking = () =>
    _.reverse(_.sortBy(userLoginInfo.thongTinDatVe, "ngayDat")).map(
      (item, index) => (
        <div className="profilePage__Item" key={index}>
          <p>Ticket Code: {item.maVe}</p>
          <h6>Movie: {item.tenPhim}</h6>
          <p>
            Booking Date:{" "}
            {Moment(item.ngayDat).format("dddd - DD/MM/YYYY - hh:mm A")}
          </p>
          <p>Seat:</p>
          <div className="profilePage__Seats">
            {item.danhSachGhe.map((chair, index) => (
              <p key={index}>
                {chair.tenHeThongRap} - {chair.tenCumRap} - Seat {chair.tenGhe}
              </p>
            ))}
          </div>
        </div>
      )
    );
  return (
    <div className="profilePage">
      <div className="profilePage__Content">
        <div className="profilePage__Info">
          <div className="row">
            <div className="col-12 col-md-2 col-xl-1">
              <div className="profilePage__Avt">
                <Avatar>{userLoginInfo.hoTen.slice(0, 1)}</Avatar>
              </div>
            </div>
            <div className="col-12 col-md-10 col-xl-11">
              <div className="profilePage__Name">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Name:</td>
                      <td>{userLoginInfo.hoTen}</td>
                    </tr>
                    <tr>
                      <td>Username:</td>
                      <td>{userLoginInfo.taiKhoan}</td>
                    </tr>
                    <tr>
                      <td>Email:</td>
                      <td>{userLoginInfo.email}</td>
                    </tr>
                    <tr>
                      <td>Phone Number:</td>
                      <td>{userLoginInfo.soDT}</td>
                    </tr>
                    <tr>
                      <td>Points(50.000 = 1):</td>
                      <td>
                        {Math.floor(
                          userLoginInfo.thongTinDatVe.reduce(
                            (total, item, index) => total + item.giaVe,
                            0
                          ) / 50000
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="profilePage__Ticket">
          <div className="profilePage__HistoryBooking">
            <h4>Booking History</h4>
            {renderHistoryBooking()}
          </div>
        </div>
        <div className="profilePage__Nav">
          <div className="row">
            <div className="col-2">
              <div className="profilePage__Home">
                <NavLink to="/home">
                  <i className="fa fa-angle-left"></i>
                  <span>HOME</span>
                </NavLink>
              </div>
            </div>
            <div className="col-8"></div>

            <div className="col-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
