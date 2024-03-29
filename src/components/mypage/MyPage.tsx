import styled from "styled-components";
import { CyanButtonStyle, LinkButton } from "../../styles/ButtonStyle";
import palette from "../../styles/palette";
import { GetPostType } from "../../lib/type/post";
import { useEffect, useState } from "react";
import Post from "../photocard/Post";
import { PostBlock } from "../photocard/SearchPostList";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { myPosts } from "../../lib/api/home";
import { useNavigate } from "react-router";
import Loading from "../common/Loading";
import { userInfo } from "../../lib/api/auth";
import { UserType } from "../../lib/type/user";

SwiperCore.use([Navigation, Pagination, Autoplay]);

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

export const MyPageBottomBlock = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  background-color: ${palette.gray[1]};
  > div {
    max-width: 1320px;
    margin: 0 auto;
    padding: 50px 3%;
    h2 {
      font-size: 24px;
      font-family: "Do Hyeon", sans-serif;
      padding: 32px 0;
    }
    h3 {
      font-size: 24px;
      font-family: "Do Hyeon", sans-serif;
      color: ${palette.cyan[5]};
      margin-top: 40px;
      margin-bottom: 40px;
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
`;

const MyPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<UserType>();
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);

    userInfo()
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        console.warn(err);
      });

    myPosts()
      .then((res) => {
        if (res.status === 403) {
          alert("토큰 만료");
        }

        setPosts(res);
      })
      .catch((err) => {
        console.warn(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  return (
    <>
      <MyPageTopBlock>
        <div className="left-area">
          <img
            src={
              user?.profileImage
                ? user.profileImage
                : "./images/default-profile.png"
            }
            alt="ProfileImage"
          />
          <ul>
            <li>
              <span>{user?.username}</span>님 안녕하세요!
            </li>
            <li>{user?.email}</li>
            <CyanButtonStyle>
              <button>
                <LinkButton to="/setProfile">회원정보 설정</LinkButton>
              </button>
            </CyanButtonStyle>
          </ul>
        </div>
        <div className="right-area">
          <ul>
            <li className="first-li">
              <span>{user?.postCount ?? 0}</span>게시물
            </li>
            <li>
              <span>{user?.followers ?? 0}</span>팔로워
            </li>
            <li>
              <span>{user?.followings ?? 0}</span>팔로잉
            </li>
          </ul>
        </div>
      </MyPageTopBlock>
      <MyPageBottomBlock>
        <div>
          <h2>{user?.username}님의 포토카드 ✈️</h2>
          {posts.map((content) => (
            <div key={content.location}>
              <h3>
                {content.location} ({content.total.length})
              </h3>
              <PostBlock>
                {content.total.map((post: GetPostType | null) => (
                  <Post post={post} key={post?.id} my={true} />
                ))}
              </PostBlock>
            </div>
          ))}
        </div>
      </MyPageBottomBlock>
      {loading ? <Loading /> : ""}
    </>
  );
};

export default MyPage;
