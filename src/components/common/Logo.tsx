import { Link } from "react-router-dom";
import styled from "styled-components";

const LogoStyle = styled.div`
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.05rem;
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 40px;
      margin-right: 12px;
    }
  }
`;

const Logo = () => {
  return (
    <LogoStyle>
      <Link to="/" className="logo">
        <img src="./images/logo.png" alt="logo" />
        Travel Maker
      </Link>
    </LogoStyle>
  );
};

export default Logo;
