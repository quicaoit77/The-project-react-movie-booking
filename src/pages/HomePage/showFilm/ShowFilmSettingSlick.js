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
export const settings = {
  infinite: false,
  swipeToSlide: true,
  slidesToShow: 4,
  arrows: true,

  prevArrow: <SamplePrevArrow />,
  nextArrow: <SampleNextArrow />,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        arrows: false,
        infinite: true,
        dots: true,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 4000,
      },
    },
    {
      breakpoint: 780,
      settings: {
        slidesToShow: 3,
        arrows: false,
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 4000,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        arrows: false,
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 4000,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        arrows: false,
        autoplay: true,
        dots: true,
        infinite: true,
        speed: 500,
        autoplaySpeed: 4000,
      },
    },
  ],
};
