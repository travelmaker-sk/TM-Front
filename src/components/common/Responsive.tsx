import React from "react";
import styled from "styled-components";

interface ResponsiveProps {
  children: any;
}

const ResponsiveBlock = styled.div`
  margin: 0 auto;

  // Desktop
  @media screen and (min-width: 1280px) {
    width: 1320px;
    padding: 0 5%;
  }
  // Tablet
  @media screen and (min-width: 768px) and (max-width: 1279px) {
    width: 100%;
    padding: 0 5%;
  }
  // Mobile
  @media screen and (max-width: 767px) {
    width: 100%;
    padding: 0 5%;
  }
`;

const Responsive = ({ children, ...rest }: ResponsiveProps) => {
  // style, className, onClick, onMouseMove 등의 props를 사용할 수 있도록
  // ...rest를 사용하여 ResponsiveBlock에게 전달
  return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

export default Responsive;
