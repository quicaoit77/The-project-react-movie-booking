function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <i className="fa fa-angle-right"></i>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <i className="fa fa-angle-left"></i>
    </div>
  );
}
export const settingCarousel = {
  arrows: false,
  fade: true,

  responsive: [
    {
      breakpoint: 576,
      settings: {
        autoplay: true,
        speed: 500,
        autoplaySpeed: 4000,
      },
    },
    {
      breakpoint: 768,
      settings: {
        autoplay: true,
        speed: 500,
        autoplaySpeed: 4000,
      },
    },

    {
      breakpoint: 992,
      settings: {
        autoplay: true,
        speed: 500,
        autoplaySpeed: 4000,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        autoplay: true,
        speed: 500,
        autoplaySpeed: 4000,
      },
    },
  ],
};

export const settingsSliderNav = {
  slidesToShow: 6,
  slidesToScroll: 1,
  swipeToSlide: true,
  dots: false,
  arrows: true,
  infinite: false,
  focusOnSelect: true,
  centerMode: false,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  speed: 500,
  initialSlide: 0,
  pauseOnHover: true,
  pauseOnFocus: true,
  responsive: [
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
        arrows: false,
        infinite: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        arrows: false,
        infinite: true,
      },
    },

    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        arrows: false,
        infinite: true,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        arrows: false,
        infinite: true,
      },
    },
  ],
};
