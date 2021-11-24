import { baseService } from "./baseService";
import { GROUPID } from "../util/settings/config";
import { InfoBooking } from "../core/models/BookingModel";

class BookingService extends baseService {
  constructor() {
    super();
  }
  getListChairCinemaApi = (idShowTimes) =>
    this.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${idShowTimes}`);
  bookingTicketApi = (infoBooking = new InfoBooking()) =>
    this.post(`/api/QuanLyDatVe/DatVe`, infoBooking);
}

export const bookingService = new BookingService();
