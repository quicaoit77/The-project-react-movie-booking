import React from "react";
import "./ModalInfoBookingStyle.scss";

export default function ModalInfoBookingComponent(props) {
  const { listChoiceChair, infoFilm } = props;
  //   console.log("listChoiceChair", listChoiceChair);
  //   console.log("infoFilm", infoFilm);
  return (
    <div className="modalInfoBooking">
      <div className="row">
        <div className="col-12 col-md-6 modalInfoBooking__info">
          <table className="table">
            <tbody>
              <tr>
                <td>Film :</td>
                <td>{infoFilm.tenPhim}</td>
              </tr>
              <tr>
                <td>Times :</td>
                <td>
                  {infoFilm.ngayChieu} - {infoFilm.gioChieu}
                </td>
              </tr>
              <tr>
                <td>Cinema :</td>
                <td>{infoFilm.tenCumRap}</td>
              </tr>
              <tr>
                <td>Address :</td>
                <td>{infoFilm.diaChi}</td>
              </tr>
              <tr>
                <td>Theather :</td>
                <td>{infoFilm.tenRap}</td>
              </tr>
              <tr>
                <td>Seat ({listChoiceChair.length}) :</td>
                <td>
                  <div className="modalInfoBooking__Seat">
                    {listChoiceChair.map((item, index) => (
                      <span key={index}>
                        {listChoiceChair.length > 1
                          ? "Seat " + item.tenGhe + " - "
                          : "Seat " + item.tenGhe}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <h5>Total :</h5>
                </td>
                <td>
                  <h5>
                    {listChoiceChair
                      .reduce((tt, item, index) => {
                        return tt + item.giaVe;
                      }, 0)
                      .toLocaleString("vi-VN")}
                    VNĐ
                  </h5>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-12 col-md-6 modalInfoBooking__img">
          <img src={infoFilm.hinhAnh} alt={infoFilm.hinhAnh} />
        </div>
      </div>
    </div>
  );
}
