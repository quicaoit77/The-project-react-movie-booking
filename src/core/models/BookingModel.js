export class InfoBookingCinema {
  thongTinPhim = new InfoMovie();
  danhSachGhe = [];
}

export class InfoMovie {
  diaChi = "";
  gioChieu = "";
  hinhAnh = "";
  maLichChieu = "";
  ngayChieu = "";
  tenCumRap = "";
  tenPhim = "";
  tenRap = "";
}

export class InfoBooking {
  maLichChieu = 0;
  danhSachVe = [];
  taiKhoanNguoiDung = "";
  constructor() {}
}

// export class ListChair {
//   daDat = "";
//   giaVe = "";
//   loaiGhe = "";
//   maGhe = "";
//   maRap = "";
//   stt = "";
//   taiKhoanNguoiDat = "";
//   tenGhe = "";
// }
