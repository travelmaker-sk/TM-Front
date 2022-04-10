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
  return (
    <MainNavBlock>
      <nav>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ul>
        <ul></ul>
      </nav>
    </MainNavBlock>
  );
};

export default MainNav;
