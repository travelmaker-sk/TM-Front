import styled from "styled-components";
import palette from "../../styles/palette";

const MainNavBlock = styled.div`
  position: fixed;
  top: 5rem;
  width: 100%;
  height: 8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${palette.cyan[5]};
`;

const MainNav = () => {
  return <MainNavBlock></MainNavBlock>;
};

export default MainNav;
