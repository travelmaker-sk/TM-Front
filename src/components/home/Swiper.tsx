import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styled from "styled-components";
import palette from "../../styles/palette";

SwiperCore.use([Navigation, Pagination, Autoplay]);

export const SwiperBlock = styled.div`
  margin-bottom: 80px;
  img {
    width: 100%;
    margin: 0 auto;
  }
  .swiper-button-prev {
    background: url(/images/swiper-prev.png) no-repeat;
    background-size: 100% auto;
    width: 40px;
    height: 40px;
    background-position: center;
  }
  .swiper-button-next {
    background: url(/images/swiper-next.png) no-repeat;
    background-size: 100% auto;
    width: 40px;
    height: 40px;
    background-position: center;
  }
  .swiper-button-next::after,
  .swiper-button-prev::after {
    display: none;
  }

  .swiper-pagination-bullet {
    background: ${palette.gray[6]};
  }
  .swiper-pagination-bullet-active {
    background: ${palette.gray[7]};
  }
`;

const SwiperCompo = () => {
  return (
    <SwiperBlock>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
      >
        <SwiperSlide>
          <img src="/images/slide1.png" alt="slide" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/slide2.png" alt="slide" />
        </SwiperSlide>
      </Swiper>
    </SwiperBlock>
  );
};
export default SwiperCompo;
