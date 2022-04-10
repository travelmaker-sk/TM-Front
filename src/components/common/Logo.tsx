import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LogoBlock = styled.div`
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto', sans-serif;
    font-size: 1.125rem;
    font-weight: 600;
    letter-spacing: 0.1rem;
    img {
      margin-right: 12px;
    }
  }
`;

const Logo = () => {
  return (
    <LogoBlock>
      <Link to="/" className="logo">
        <img src="./images/logo.png" alt="logo" width="45px" />
        Travel Maker
      </Link>
    </LogoBlock>
  );
};

export default Logo;
