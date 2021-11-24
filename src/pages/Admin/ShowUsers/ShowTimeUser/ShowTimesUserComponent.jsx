import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import "./ShowTimesUserStyle.scss";
import moment from "moment";
import LazyLoadingModalComponent from "../../../../components/LazyLoadingModalComponent/LazyLoadingModalComponent";
import * as userType from "../../../../redux/types/userType";
export default function ShowTimesUserComponent(props) {
  const { userLoginInfo } = useSelector((state) => state.userReducer);
  const { userShowTime } = props;
  const dispatch = useDispatch();
  //   console.log("userShowTime", userShowTime);
  useEffect(() => {
    const userAccount = {
      taiKhoan: userShowTime.userName,
    };
    dispatch({
      type: userType.POST_USER_INFO_SAGA,
      userAccount,
      loadingModal: true,
    });
  }, []);

  const columns = [
    { title: "", dataIndex: "key", key: "key" },
    { title: "Film Name", dataIndex: "filmName", key: "filmName" },
    { title: "ID Ticket", dataIndex: "codeTicket", key: "codeTicket" },

    { title: "Date Booking", dataIndex: "dateBooking", key: "dateBooking" },
  ];
  const renderCinemaName = (cinemaName) => {
    const index = cinemaName.indexOf("-");
    let newCinemaName = "";
    let systemCinema = "";
    if (index !== -1) {
      newCinemaName = cinemaName?.slice(index);
      systemCinema = cinemaName?.slice(0, index);
    }
    return (
      <>
        <p>{systemCinema}</p>
        <p>{newCinemaName}</p>
      </>
    );
  };
  const renderBookingUser = () =>
    userLoginInfo.thongTinDatVe.map((item, index) => ({
      key: index + 1,
      codeTicket: item.maVe,
      filmName: item.tenPhim,
      dateBooking: moment(item.ngayDat).format("dddd - DD/MM/YYYY - hh:mm"),
      description: (
        <table className="showTimesUser__table">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Cinema</th>
              <th>Theather</th>
              <th>ID Seat</th>
              <th>Seat</th>
            </tr>
          </thead>
          <tbody>
            {item.danhSachGhe.map((itemChild, index) => (
              <tr key={index}>
                <td></td>
                <td>{index + 1}</td>
                <td>{renderCinemaName(itemChild.tenHeThongRap)}</td>
                <td>{itemChild.tenRap}</td>
                <td>{itemChild.maGhe}</td>
                <td>{itemChild.tenGhe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    }));
  //   const data = renderBookingUser();
  const data = renderBookingUser();
  return (
    <Fragment>
      <LazyLoadingModalComponent />
      <div className="showTimesUser">
        <div className="showTimesUser__content">
          <Table
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <div style={{ margin: 0 }}>{record.description}</div>
              ),
              rowExpandable: (record) => record.name !== "Not Expandable",
            }}
            dataSource={data}
            pagination={false}
          />
        </div>
      </div>
    </Fragment>
  );
}
