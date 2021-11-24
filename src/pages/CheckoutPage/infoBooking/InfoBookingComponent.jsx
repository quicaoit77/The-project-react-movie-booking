import React, { useState } from "react";
import { Radio } from "antd";
import "./InfoBookingStyle.scss";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { InfoBooking } from "../../../core/models/BookingModel";
import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import ModalInfoBookingComponent from "../ModalInfoBooking/ModalInfoBookingComponent";
import * as bookingType from "../../../redux/types/bookingType";
export default function InfoBookingComponent(props) {
  const dispatch = useDispatch();
  const { thongTinPhim } = props.listChair;
  const { listChoiceChair, userLogin, history, listChair } = props;

  const [value, setValue] = useState(1);
  const renderListChoiceChair = () =>
    _.sortBy(listChoiceChair, "tenGhe").map((item, index) => (
      <span style={{ width: "", display: "inline-block" }} key={index}>
        Seat {item.tenGhe}_
      </span>
    ));
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const bookingTicket = () => {
    const infoBooking = new InfoBooking();
    infoBooking.maLichChieu = props.idShowtimes;
    infoBooking.danhSachVe = listChoiceChair;
    infoBooking.taiKhoanNguoiDung = userLogin.taiKhoan;
    if (!_.isEmpty(infoBooking.danhSachVe)) {
      dispatch({
        type: bookingType.BOOKING_TICKET_SAGA,
        infoBooking,
        history,
      });
      dispatch({
        type: bookingType.GET_LIST_CHAIR_CINEMA_SAGA,
        idShowtimes: props.idShowtimes,
      });
    }
  };
  return (
    <div className="infoBooking">
      <div
        className="infoBooking__content"
        // data-aos="fade-down"
        // data-aos-once="true"
        id="infoBooking__contentId"
      >
        <div className="infoBooking__FilmName">
          <h3>{thongTinPhim.tenPhim}</h3>
        </div>
        <div className="infoBooking__Detail">
          <table className="table">
            <tbody>
              <tr>
                <td className="infoBooking__title">
                  <span>
                    Vip Seat{" "}
                    <i className="fa fa-couch" style={{ color: "#ec7532" }}></i>
                    :
                  </span>
                </td>
                <td style={{ width: "65%" }}>
                  <span>
                    {listChair.danhSachGhe[34]?.giaVe.toLocaleString("Vi-vn")}{" "}
                    VNĐ
                  </span>
                </td>
              </tr>
              <tr>
                <td className="infoBooking__title">
                  <span>
                    Normal Seat <i className="fa fa-couch"></i>:
                  </span>
                </td>
                <td style={{ width: "65%" }}>
                  <span>
                    {listChair.danhSachGhe[0]?.giaVe.toLocaleString("Vi-vn")}{" "}
                    VNĐ
                  </span>
                </td>
              </tr>
              <tr>
                <td className="infoBooking__title">Date:</td>
                <td style={{ width: "65%" }}>{thongTinPhim.ngayChieu}</td>
              </tr>
              <tr>
                <td className="infoBooking__title">Show time:</td>
                <td>{thongTinPhim.gioChieu}</td>
              </tr>
              <tr>
                <td className="infoBooking__title">Room:</td>
                <td>{thongTinPhim.tenRap}</td>
              </tr>
              <tr>
                <td className="infoBooking__title">Seat:</td>
                <td>{renderListChoiceChair()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="infoBooking__Total">
          <div className="row">
            <div className="col-3">
              <h3 style={{ textAlign: "left" }}>Total:</h3>
            </div>
            <div className="col-9">
              <h3>
                {listChoiceChair
                  .reduce((tt, item, index) => {
                    return tt + item.giaVe;
                  }, 0)
                  .toLocaleString("vi-VN")}
                VNĐ
              </h3>
            </div>
          </div>
        </div>
        <div className="infoBooking__PM">
          <h5>Payment method</h5>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>
              <span>
                <i className="fa fa-credit-card"></i> Credit Cards
              </span>
            </Radio>
            <Radio value={2}>
              <span>
                <i className="fab fa-cc-visa"></i> Visa, Master
              </span>
            </Radio>
            <Radio value={3}>
              <span>
                <i className="fa fa-money-bill-wave"></i> By Cash
              </span>
            </Radio>
          </Radio.Group>
        </div>
      </div>
      <div
        className="infoBooking__btn"
        // data-aos="fade-left"
        // data-aos-once="true"
        // data-aos-anchor="#infoBooking__contentId"
        // data-aos-delay="700"
      >
        <ModalComponent
          classModal="modal__gray"
          infoFilm={thongTinPhim}
          listChoiceChair={listChoiceChair}
          titleModal="Info Booking"
          textOk="Booking"
          textShowModal={
            <span>
              <i className="fa fa-film"></i>
              BOOKING
            </span>
          }
          functionOk={() => bookingTicket()}
          Component={ModalInfoBookingComponent}
        />
      </div>
    </div>
  );
}
