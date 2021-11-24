import React from "react";
import "./BookingChairStyle.scss";
import screen from "../../../assets/img/screenCinema.png";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import * as bookingAction from "../../../redux/actions/bookingAction";
export default function BookingChairComponent(props) {
  const { danhSachGhe } = props.listChair;
  const { listChoiceChair, userLogin } = props;
  const dispatch = useDispatch();
  const typeChair = (chair) => {
    if (chair.loaiGhe === "Vip" && chair.daDat === false) {
      return "chair chair_Vip";
    } else if (
      chair.daDat === true &&
      chair.taiKhoanNguoiDat !== userLogin.taiKhoan
    ) {
      return "chair chair_Reserved";
    } else if (chair.taiKhoanNguoiDat === userLogin.taiKhoan) {
      return "chair chair_MyBooking";
    }

    return "chair";
  };
  const renderListChair = () =>
    danhSachGhe.map((item, index) => {
      let chairChoice = "";
      const i = listChoiceChair.findIndex(
        (itemChoice, index) => itemChoice.maGhe === item.maGhe
      );
      if (i === -1) {
        chairChoice = "";
      } else {
        chairChoice = "chair_Selected";
      }
      return (
        <Fragment key={index}>
          {(index + 1) % 16 === 1 ? (
            <>
              <span className="bookingChair__bfrow">
                {String.fromCharCode(65 + ((index + 1) / 16 - 0.0625))}
              </span>
            </>
          ) : null}
          <div
            className="bookingChair__item"
            style={{ display: "inline-block" }}
          >
            <span
              className={`${typeChair(item)} ${chairChoice}`}
              onClick={() => {
                dispatch(bookingAction.choiceChairAction(item));
              }}
            >
              <i className="fa fa-couch"></i>
              <span className="bookingChair__Name">{item.tenGhe}</span>
            </span>
          </div>
          {(index + 1) % 16 === 0 ? (
            <>
              <span className="bookingChair__bhrow">
                {String.fromCharCode(65 + (index + 1) / 16 - 1)}
              </span>
              <br />
            </>
          ) : null}
        </Fragment>
      );
    });
  return (
    <div className="bookingChair">
      <div className="bookingChair__content">
        <div
          className="bookingChair__Cinema"
          //   data-aos="fade-right"
          //   data-aos-once="true"
          id="bookingChair__CinemaId"
        >
          <div className="bookingChair__Screen">
            <img src={screen} alt={screen} />
            <h6>SCREEN</h6>
          </div>
          <div className="bookingChair__Listchair">{renderListChair()}</div>
        </div>
        <div
          className="bookingChair__Note"
          //   data-aos="fade-right"
          //   data-aos-once="true"
          //   data-aos-anchor="#bookingChair__CinemaId"
          //   data-aos-delay="700"
        >
          <div>
            <p>
              <span className="chair" style={{ cursor: "default" }}>
                <i className="fa fa-couch"></i>
                <span>Normal Seat</span>
              </span>
              <span className="chair chair_Vip" style={{ cursor: "default" }}>
                <i className="fa fa-couch"></i>
                <span>VIP Seat</span>
              </span>
              <span
                className="chair chair_Reserved"
                style={{ cursor: "default" }}
              >
                <i className="fa fa-couch"></i>
                <span>Reserved Seat</span>
              </span>
            </p>
            <p>
              <span
                className="chair chair_Selected"
                style={{ cursor: "default" }}
              >
                <i className="fa fa-couch"></i>
                <span>Selected Seat</span>
              </span>

              <span
                className="chair chair_MyBooking"
                style={{ cursor: "default" }}
              >
                <i className="fa fa-couch"></i>
              </span>
              <span className="myBooking__text">Your Seat</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
