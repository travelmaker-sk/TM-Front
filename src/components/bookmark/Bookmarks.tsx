import { useEffect, useState } from "react";
import { myBookmarks } from "../../lib/api/home";
import { GetPostType, UserType } from "../../lib/type";
import { MyPageBottomBlock } from "../mypage/MyPage";
import Post from "../photocard/Post";
import { PostBlock } from "../photocard/SearchPostList";
import { useNavigate } from "react-router";
import Loading from "../common/Loading";

interface BookmarkType {
  user: UserType;
}

const Bookmarks = ({ user }: BookmarkType) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);

    // API 호출
    myBookmarks()
      .then((res) => {
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
      <MyPageBottomBlock>
        <div>
          <h2>{user.username}님의 북마크 🏷️</h2>
          {posts.map((content) => (
            <div key={content.location}>
              <h3>
                {content.location} ({content.total.length})
              </h3>
              <PostBlock>
                {/* <Swiper
        spaceBetween={50}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
      > */}
                {content.total.map((post: GetPostType | null) => (
                  // <SwiperSlide>
                  <Post post={post} key={post?.id} bookmark={true} />
                  // </SwiperSlide>
                ))}
                {/* </Swiper> */}
              </PostBlock>
            </div>
          ))}
        </div>
      </MyPageBottomBlock>
      {loading ? <Loading /> : ""}
    </>
  );
};

export default Bookmarks;
