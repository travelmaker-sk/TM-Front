import React, { useState, useEffect } from "react";
import styled from "styled-components";
import palette from "../../styles/palette";

const ScrollToTopButtonStyle = styled.div`
  .topBtn {
    position: fixed;
    opacity: 0;
    bottom: 50px;
    right: 50px;
    z-index: -10;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    border: 0 none;
    background: white
    color: ${palette.cyan[9]};
    border: 2px solid ${palette.cyan[9]};
    font-size: 18px;
    font-weight: bold;
    letter-spacing: -0.06em;
    box-shadow: 1px 1px 6px 3px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: opacity 0.3s ease-in;
  }
  .topBtn.active {
    z-index: 10;
    opacity: 1;
  }
  .topBtn:hover,
  .topBtn:focus,
  .topBtn:active {
    outline: 0 none;
  }
  // Mobile
  @media screen and (max-width: 767px) {
    .topBtn {
      bottom: 20px;
      right: 20px;
    }
  }
`;

const ScrollToTopButton = () => {
  const [ScrollY, setScrollY] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false); // 버튼 상태

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if (ScrollY > 100) {
      // 100 이상이면 버튼이 보이게
      setBtnStatus(true);
    } else {
      // 100 이하면 버튼이 사라지게
      setBtnStatus(false);
    }
  };

  const handleTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setScrollY(0); // ScrollY 의 값을 초기화
    setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener("scroll", handleFollow);
    };
  });

  return (
    <ScrollToTopButtonStyle>
      <button
        className={
          BtnStatus ? "topBtn active material-icons" : "topBtn material-icons"
        } // 버튼 노출 여부
        onClick={handleTop} // 버튼 클릭시 함수 호출
      >
        arrow_upward
      </button>
    </ScrollToTopButtonStyle>
  );
};

export default ScrollToTopButton;
