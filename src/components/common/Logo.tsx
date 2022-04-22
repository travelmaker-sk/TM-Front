import styled, { css } from "styled-components";
import { LinkButton } from "../../styles/ButtonStyle";

interface LogoProps {
  fontsize?: string;
}

const LogoStyle = styled.div`
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Roboto", sans-serif;
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

  font-size: ${(props: LogoProps) => props.fontsize || "20px"};

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

const Logo = (props: LogoProps) => {
  return (
    <LogoStyle {...props}>
      <LinkButton to="/" className="logo">
        <img src="./images/logo.png" alt="logo" />
        Travel Maker
      </LinkButton>
    </LogoStyle>
  );
};

export default Logo;
