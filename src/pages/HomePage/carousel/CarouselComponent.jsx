import React from "react";
import "./CarouselStyle.scss";
import scrollArrow from "../../../assets/img/scroll-arrow.svg";
import cr1 from "../../../assets/img/cr-1.jpg";
import cr2 from "../../../assets/img/cr-2.jpg";
import cr3 from "../../../assets/img/cr-3.jpg";
import cr4 from "../../../assets/img/cr-4.jpg";
import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import PlayTrailerComponent from "../../../components/PlayTrailerComponent/PlayTrailerComponent";

export default function CarouselComponent() {
  return (
    <section
      className="myCarousel"
      //  data-aos="zoom-out" data-aos-once="true"
      id="myCarouselId"
    >
      <div className="myCarousel__content ">
        <div
          id="carouselMovie"
          className="carousel slide carousel-fade "
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselMovie"
              data-slide-to={0}
              className="active"
            />
            <li data-target="#carouselMovie" data-slide-to={1} />
            <li data-target="#carouselMovie" data-slide-to={2} />
            <li data-target="#carouselMovie" data-slide-to={3} />
          </ol>
          <div className="carousel-inner">
            <img
              src={scrollArrow}
              alt={scrollArrow}
              className="carousel__arrow"
            />
            <div className="carousel-item active">
              <img src={cr1} className="d-block w-100" alt={cr1} />
              <div className="carousel__overlay">
                <div className="carousel-caption  d-md-block ">
                  <p>ACTION, ADVENTURE, FANTASY</p>
                  <h5>Sons of Anarchy</h5>
                  <p>
                    Sons of Anarchy là một bộ phim truyền hình tội phạm hành
                    động của Mỹ do Kurt Sutter tạo ra, được phát sóng từ năm
                    2008 đến năm 2014. Phim kể về cuộc sống của một câu lạc bộ
                    mô tô ...
                  </p>
                  <span className="carousel__span">PG</span>

                  <ModalComponent
                    textShowModal={
                      <span>
                        <i className="fa fa-play" />
                        PLAY TRAILER
                      </span>
                    }
                    Component={PlayTrailerComponent}
                    functionOk={() => {}}
                    trailerFilm="https://www.youtube.com/embed/-Nv9YrZr3wE"
                    classModal="modal__black"
                    titleModal="Trailer"
                  />
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img src={cr2} className="d-block w-100" alt={cr2} />
              <div className="carousel__overlay">
                <div className="carousel-caption  d-md-block ">
                  <p>ACTION, ADVENTURE, FANTASY</p>
                  <h5>Peaky Blinders</h5>
                  <p>
                    Peaky Blinders là một tổ chức băng đảng đường phố có địa bàn
                    tại Birmingham của nước Anh, hoạt động từ cuối thế kỷ 19 đến
                    sau Thế chiến thứ nhất...
                  </p>
                  <span className="carousel__span">PG</span>
                  <ModalComponent
                    textShowModal={
                      <span>
                        <i className="fa fa-play" />
                        PLAY TRAILER
                      </span>
                    }
                    Component={PlayTrailerComponent}
                    functionOk={() => {}}
                    trailerFilm="https://www.youtube.com/embed/oVzVdvGIC7U"
                    classModal="modal__black"
                    titleModal="Trailer"
                  />
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img src={cr4} className="d-block w-100" alt={cr4} />
              <div className="carousel__overlay">
                <div className="carousel-caption   ">
                  <p>ACTION, ADVENTURE, FANTASY</p>
                  <h5>Legend</h5>
                  <p>
                    Legend (2015) là bộ phim hình sự giết người của Anh được
                    phát hành vào năm 2015 do Brian Helgeland đạo diễn và biên
                    kịch. Đây là bộ phim được chuyển thể...
                  </p>
                  <span className="carousel__span">PG</span>
                  <ModalComponent
                    textShowModal={
                      <span>
                        <i className="fa fa-play" />
                        PLAY TRAILER
                      </span>
                    }
                    Component={PlayTrailerComponent}
                    functionOk={() => {}}
                    trailerFilm="https://www.youtube.com/embed/yI3v6KfR9Mw"
                    classModal="modal__black"
                    titleModal="Trailer"
                  />
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img src={cr3} className="d-block w-100" alt={cr3} />
              <div className="carousel__overlay">
                <div className="carousel-caption  d-md-block ">
                  <p>ACTION, ADVENTURE, FANTASY</p>
                  <h5>John Wick</h5>
                  <p>
                    John Wick là một loạt tác phẩm giả tưởng thuộc thể loại hành
                    động giật gân của Mỹ, được tạo ra bởi Derek Kolstad và thuộc
                    sở hữu của Summit Entertainment...
                  </p>
                  <span className="carousel__span">PG</span>
                  <ModalComponent
                    textShowModal={
                      <span>
                        <i className="fa fa-play" />
                        PLAY TRAILER
                      </span>
                    }
                    Component={PlayTrailerComponent}
                    functionOk={() => {}}
                    trailerFilm="https://www.youtube.com/embed/56pvThSsoSE"
                    classModal="modal__black"
                    titleModal="Trailer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
