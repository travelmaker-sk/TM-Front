import styled from "styled-components";
import palette from "../../styles/palette";

const FooterStyle = styled.div`
  padding: 50px;
  text-align: center;
  color: ${palette.gray[5]};
`;

const Footer = () => {
  return (
    <FooterStyle>
      Copyright 2022. Travel Maker. All rights reserved.
    </FooterStyle>
  );
};

export default Footer;
