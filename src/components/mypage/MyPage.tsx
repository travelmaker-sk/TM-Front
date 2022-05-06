import styled from "styled-components";
import { CyanButtonStyle, LinkButton } from "../../styles/ButtonStyle";
import palette from "../../styles/palette";
import { UserType } from "../../type";

interface MyPageProps {
  user: UserType;
}

const MyPageTopBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  // Mobile
  @media screen and (max-width: 767px) {
    display: block;
    margin-bottom: 35px;
  }

  .left-area {
    display: flex;
    justify-content: center;
    img {
      width: 120px;
      border-radius: 50%;
    }
    ul {
      margin-left: 30px;
    }
    ul > li:nth-child(1) {
      font-size: 20px;
      margin-bottom: 13px;
    }
    ul > li:nth-child(1) span {
      color: ${palette.cyan[5]};
    }
    ul > li:nth-child(2) {
      font-size: 14px;
      margin-bottom: 26px;
      color: ${palette.gray[5]};
    }
    // Mobile
    @media screen and (max-width: 767px) {
      margin-bottom: 26px;
      ul {
        margin-left: 30px;
        margin-bottom: 26px;
      }
    }
  }

  .right-area ul {
    display: flex;
    justify-content: center;
  }
  .right-area ul li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 30px;
  }
  .right-area ul li.first-li {
    margin-left: 0;
  }
  .right-area ul li span {
    margin-bottom: 8px;
    font-size: 20px;
  }
`;

const MyPageBottomBlock = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  background-color: ${palette.gray[1]};
  > div{
    max-width: 1320px;
    margin: 0 auto;
    padding: 50px 3%;
    h3{
      font-size: 20px;
    }
    // Tablet
    @media screen and (min-width: 768px) and (max-width: 1279px) {
      width: 100%;
      padding: 50px 5%;
    }
    // Mobile
    @media screen and (max-width: 767px) {
      width: 100%;
      padding: 35px 5%;
      }
    }
  }
`;

const MyPage = ({ user }: MyPageProps) => {
  return (
    <>
      <MyPageTopBlock>
        <div className="left-area">
          <img
            src={
              user.profileImage
                ? user.profileImage
                : "./images/default-profile.png"
            }
            alt="profileImage"
          />
          <ul>
            <li>
              <span>{user.nickname}</span> 님 안녕하세요!
            </li>
            <li>{user.email}</li>
            <CyanButtonStyle>
              <button>
                <LinkButton to="/set-profile">회원정보 변경</LinkButton>
              </button>
            </CyanButtonStyle>
          </ul>
        </div>
        <div className="right-area">
          <ul>
            <li className="first-li">
              <span>{user.postCount}</span>게시물
            </li>
            <li>
              <span>{user.followers}</span>팔로워
            </li>
            <li>
              <span>{user.followings}</span>팔로잉
            </li>
          </ul>
        </div>
      </MyPageTopBlock>
      <MyPageBottomBlock>
        <div>
          <h3>공개된 여행</h3>
        </div>
      </MyPageBottomBlock>
    </>
  );
};

export default MyPage;
