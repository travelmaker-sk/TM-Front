import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import palette from "../../styles/palette";

interface HeaderMenuProps {
  onLogout: () => void;
}

const HeaderMenuStyle = styled.div`
  nav {
    position: relative;
    cursor: pointer;
    padding-left: 20px;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  nav ul {
    display: none;
    position: absolute;
    top: 150%;
    right: 0;
    background: white;
    padding: 30px;
    font-size: 16px;
    font-family: "Noto Sans KR", sans-serif;
    box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
  nav ul.open {
    display: block;
  }
  nav ul li {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    transition: 0.1s;
    > a {
      width: 100%;
    }
  }
  nav ul li:hover * {
    color: ${palette.cyan[8]};
  }
  nav ul li span {
    margin-right: 12px;
    font-size: 18px;
  }
  nav ul hr {
    margin-bottom: 20px;
    border: 0.1px solid ${palette.gray[3]};
  }
  nav ul button {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: right;
  }
  nav ul button:hover {
    color: ${palette.gray[6]};
  }
  nav ul button span {
    margin-right: 10px;
  }
  // Mobile
  @media screen and (max-width: 767px) {
    width: 100%;
    padding: 10px 5%;
  }
`;

const HeaderMenu = ({ onLogout }: HeaderMenuProps) => {
  const [isToggle, setToggle] = useState(false);
  const onToggle = useCallback(() => {
    setToggle(!isToggle);
  }, [isToggle]);

  return (
    <HeaderMenuStyle>
      <nav className="material-icons apps-bar" onClick={onToggle}>
        apps
        <ul className={isToggle ? "open" : ""}>
          <li>
            <Link to="/mypage">
              <span className="material-icons">account_circle</span>
              마이페이지
            </Link>
          </li>
          <li>
            <Link to="/createPhotocard">
              <span className="material-icons">add_photo_alternate</span>
              포토카드 만들기
            </Link>
          </li>
          <li>
            <Link to="/bookmarks">
              <span className="material-icons">bookmarks</span>
              북마크
            </Link>
          </li>
          <li>
            <Link to="/setProfile">
              <span className="material-icons">manage_accounts</span>
              회원정보 설정
            </Link>
          </li>
          <hr />
          <button onClick={onLogout}>
            <span className="material-icons">logout</span>
            로그아웃
          </button>
        </ul>
      </nav>
    </HeaderMenuStyle>
  );
};

export default HeaderMenu;
