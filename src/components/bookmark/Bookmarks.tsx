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
      .then(({ list }) => {
        setPosts(list);
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
          {posts.map((list) => (
            <div key={list.id}>
              <h3>
                {list.location} ({list.posts.length})
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
                {list.posts.map((post: GetPostType | null) => (
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
