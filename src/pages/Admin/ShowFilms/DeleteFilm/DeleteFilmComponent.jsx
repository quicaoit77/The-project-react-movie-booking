import moment from "moment";
import React from "react";
import "./DeleteFilmStyle.scss";

export default function DeleteFilmComponent(props) {
  const { film } = props;
  //   console.log(film);
  return (
    <div className="deleteFilm">
      <div className="deleteFilm__Content">
        <div className="deleteFilm__Detail">
          <div className="row">
            <div className="col-12 col-sm-7 deleteFilm__Info">
              <h4>Info Film</h4>
              <table className="table">
                <tbody>
                  <tr>
                    <td>ID:</td>
                    <td> {film.maPhim}</td>
                  </tr>
                  <tr>
                    <td>Film:</td>
                    <td> {film.tenPhim}</td>
                  </tr>
                  <tr>
                    <td>Release Day:</td>
                    <td>
                      {moment(film.ngayKhoiChieu).format("dddd - DD/MM/YYYY")}
                    </td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>
                      {film.moTa.length > 160
                        ? film.moTa.slice(0, 160) + "..."
                        : film.moTa}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-12 col-sm-5 deleteFilm__Img">
              <img src={film.hinhAnh} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
