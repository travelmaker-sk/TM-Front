import styled from "styled-components";
import { Wrapper } from "../../pages/HomePage";
import palette from "../../styles/palette";

const SearchBarBlock = styled.div`
  width: 100%;
  height: 120px;
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  background-color: ${palette.cyan[4]};
  color: ${palette.gray[7]};
  .where-area,
  .what-area,
  .search-btn {
    height: 100%;,
  }
  .where-area,
  .what-area {
    display: flex;
    align-items: center;
    font-size: 20px;
    border-right: 1px solid ${palette.gray[4]};
    input {
      font-size: 20px;
      margin-left: 10px;
    }
  }
  .where-area {
    width: 40%;
    padding: 0 20px;
  }
  .what-area {
    width: 53%;
    padding: 0 20px;
  }
  .search-btn {
    width: 7%;
    min-width: 70px;
    text-align: center;
    line-height: 100%;
    background-color: ${palette.gray[9]};
    color: white;
    border-radius: 0 4px 4px 0;
    font-size: 20px;
  }
  // Mobile
  @media screen and (max-width: 767px) {
    height: 232px;
    .where-area,
    .what-area,
    .search-btn {
      width: 100%;
      padding: 10px 20px;
      border-radius: 4px;
      font-size: 18px;
      input {
        font-size: 18px;
      }
    }
    .where-area,
    .what-area {
      background-color: white;
      margin-bottom: 16px;
    }
  }
`;

const SearchBarWrapper = styled.div`
  @media screen and (min-width: 1280px) {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    border-radius: 4px;
  }
  @media screen and (min-width: 768px) and (max-width: 1279px) {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    border-radius: 4px;
  }
`;

export const SearchBarBottom = styled.div`
  // + 32px
  // Desktop
  @media screen and (min-width: 1280px) {
    height: 152px;
  }
  // Tablet
  @media screen and (min-width: 768px) and (max-width: 1279px) {
    height: 152px;
  }
  // Mobile
  @media screen and (max-width: 767px) {
    height: 264px;
  }
`;

const SearchBar = () => {
  return (
    <>
      <SearchBarBlock>
        <Wrapper>
          <SearchBarWrapper>
            <div className="where-area">
              <span className="material-icons">pin_drop</span>
              <input type="text" name="where" placeholder="어디에서" />
            </div>
            <div className="what-area">
              <span className="material-icons">sms</span>
              <input
                type="text"
                name="what"
                placeholder="무엇을 하고 싶으세요?"
              />
            </div>
            <button className="search-btn">
              <span className="material-icons">search</span>
            </button>
          </SearchBarWrapper>
        </Wrapper>
      </SearchBarBlock>
      <SearchBarBottom />
    </>
  );
};

export default SearchBar;
