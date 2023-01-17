import { useEffect, useState } from "react";
import { myBookmarks } from "../../lib/api/home";
import { GetPostType } from "../../lib/type/post";
import { MyPageBottomBlock } from "../mypage/MyPage";
import Post from "../photocard/Post";
import { PostBlock } from "../photocard/SearchPostList";
import { useNavigate } from "react-router";
import Loading from "../common/Loading";
import { userInfo } from "../../lib/api/auth";
import { UserType } from "../../lib/type/user";

const Bookmarks = () => {
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

    myBookmarks()
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
      <MyPageBottomBlock>
        <div>
          <h2>{user?.username}님의 북마크 🏷️</h2>
          {posts.map((content) => (
            <div key={content.location}>
              <h3>
                {content.location} ({content.total.length})
              </h3>
              <PostBlock>
                {content.total.map((post: GetPostType | null) => (
                  <Post post={post} key={post?.id} bookmark={true} />
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

export default Bookmarks;
