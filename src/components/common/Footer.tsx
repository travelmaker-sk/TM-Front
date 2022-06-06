import styled from "styled-components";
import palette from "../../styles/palette";

const FooterStyle = styled.div`
  padding: 80px 0;
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
