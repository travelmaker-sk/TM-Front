import { useState, useEffect } from "react";
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
    background: white;
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
  const [BtnStatus, setBtnStatus] = useState(false);

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if (ScrollY > 100) {
      setBtnStatus(true);
    } else {
      setBtnStatus(false);
    }
  };

  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setScrollY(0);
    setBtnStatus(false);
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
        }
        onClick={handleTop}
      >
        arrow_upward
      </button>
    </ScrollToTopButtonStyle>
  );
};

export default ScrollToTopButton;
