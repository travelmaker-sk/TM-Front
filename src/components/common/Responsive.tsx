import styled from "styled-components";

interface ResponsiveType {
  children: any;
}

const ResponsiveBlock = styled.div`
  margin: 0 auto;

  // Desktop
  @media screen and (min-width: 1280px) {
    width: 1320px;
    padding: 0 3%;
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

const Responsive = ({ children, ...rest }: ResponsiveType) => {
  return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

export default Responsive;
