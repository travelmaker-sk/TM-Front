import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";
import styled from "styled-components";
import palette from "../../styles/palette";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const SwiperBlock = styled.div`
  margin-bottom: 32px;
  img {
    width: 80%;
    margin: 0 auto;
  }
  .swiper-slide {
    position: relative;
  }
  .swiper-button-prev,
  .swiper-button-prev:after,
  .swiper-button-next,
  .swiper-button-next:after {
    color: ${palette.gray[5]};
    font-size: 20px;
  }
  .swiper-pagination {
    position: absolute;
  }
  .swiper-pagination-bullet {
    background: ${palette.gray[6]};
  }
  .swiper-pagination-bullet-active {
    background: ${palette.gray[7]};
  }
  // Mobile
  @media screen and (max-width: 767px) {
    img {
      width: 70%;
    }
  }
`;

const SwiperC = () => {
  return (
    <SwiperBlock>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
      >
        <SwiperSlide>
          <img src="/images/slide1.png" alt="slide" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/slide2.png" alt="slide" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/slide3.png" alt="slide" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/slide4.png" alt="slide" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/slide5.png" alt="slide" />
        </SwiperSlide>
      </Swiper>
    </SwiperBlock>
  );
};
export default SwiperC;
