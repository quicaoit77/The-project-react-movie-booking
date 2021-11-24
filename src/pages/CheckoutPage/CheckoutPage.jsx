import React, { useEffect } from "react";
import HeaderCheckoutComponent from "./headerCheckOut/HeaderCheckoutComponent";
import Aos from "aos";
import InfoBookingComponent from "./infoBooking/InfoBookingComponent";
import "./CheckOutPageStyle.scss";
import BookingChairComponent from "./bookingChair/BookingChairComponent";
import { useDispatch, useSelector } from "react-redux";
import * as bookingType from "../../redux/types/bookingType";

export default function CheckoutPage(props) {
  const { id } = props.match.params;
  const { listChair, listChoiceChair } = useSelector(
    (state) => state.bookingReducer
  );
  const { userLogin } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch({
    //   type: DISLAY_LOADING,
    // });
    dispatch({
      type: bookingType.GET_LIST_CHAIR_CINEMA_SAGA,
      idShowtimes: id,
      loading: true,
    });
    Aos.init({
      duration: 700,
    });
    // setTimeout(() => {
    //   dispatch({
    //     type: HIDE_LOADING,
    //   });
    // }, 2500);
    return () => {
      dispatch({
        type: bookingType.BOOKING_TICKET,
      });
    };
  }, []);
  return (
    <section className="checkoutPage">
      <div className="checkoutPage__Layout">
        <HeaderCheckoutComponent listChair={listChair} userLogin={userLogin} />
      </div>
      <div className="checkoutPage__Cinema">
        <BookingChairComponent
          listChair={listChair}
          listChoiceChair={listChoiceChair}
          userLogin={userLogin}
        />
        <InfoBookingComponent
          listChair={listChair}
          listChoiceChair={listChoiceChair}
          idShowtimes={id}
          userLogin={userLogin}
          history={props.history}
        />
      </div>
    </section>
  );
}
