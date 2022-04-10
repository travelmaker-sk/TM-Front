import React from "react";
import styled from "styled-components";

type ResponsiveProps = {
  children: any;
};

const ResponsiveBlock = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  width: 1024px;
  margin: 0 auto;

  // 브라우저 크기 지정
  // PC
  @media (min-width: 1280px) {
    width: 1320px;
  }
  @media (max-width: 1279px) {
    width: 100%;
  }
  // Mobile
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Responsive = ({ children, ...rest }: ResponsiveProps) => {
  // style, className, onClick, onMouseMove 등의 props를 사용할 수 있도록
  // ...rest를 사용하여 ResponsiveBlock에게 전달
  return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

export default Responsive;
