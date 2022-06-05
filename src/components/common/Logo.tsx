import styled, { css } from "styled-components";
import { LinkButton } from "../../styles/ButtonStyle";

interface LogoType {
  fontsize?: string;
}

const LogoStyle = styled.div`
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  > a {
    font-family: "Roboto", sans-serif;
    // font-family: "Staatliches", cursive;

    font-size: 20px;
    font-weight: 700;
    // letter-spacing: -0.01rem;
  }
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 40px;
      margin-right: 12px;
    }
  }

  font-size: ${(Type: LogoType) => Type.fontsize || "20px"};

  // Mobile
  @media screen and (max-width: 767px) {
    height: 15%;
    .logo {
      img {
        width: 30px;
      }
    }
  }
`;

const Logo = (Type: LogoType) => {
  return (
    <LogoStyle {...Type}>
      <LinkButton to="/" className="logo">
        <img src="./images/logo.png" alt="logo" />
        Travel Maker
      </LinkButton>
    </LogoStyle>
  );
};

export default Logo;
