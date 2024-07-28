import { Link } from "react-router-dom";
import { krTimeConvert } from "../../../utils";
import { PostDataType } from "../../../types/postsType";

type InfiniteScrollCopyPropsType = {
  posts: PostDataType[]
  clickPostHandler: (postId: string) => void
  isFetching: boolean
}

export default function InfiniteScrollCopy({
  posts,
  clickPostHandler,
  isFetching
}: InfiniteScrollCopyPropsType) {

  return (
    <div className="border-2">
      {posts.map((post) => {
        return (
          <div key={post._id} className="flex flex-col justify-between p-2">
            <div className="bg-sky-400 flex h-1/4 space-x-2">
              <img
                src={"/img/ping.png" || `data:image/jpeg;base64,${post.author.profile.avatar}`}
                className="max-w-6 inline"
              />
              <p className="inline">
                {post.author.username}
              </p>
            </div>
            <div className="h-1/2 flex justify-between my-1 truncate">
              <Link to={`posts/${post._id}`} onClick={() => clickPostHandler(post._id)}>
                <h3>{post.title}</h3>
              </Link>
              <p>
                👁️‍🗨️ {post.viewsCount} 📄 {post.commentsCount} 👍 {post.likes.length > 1 ? post.likes.length : 0}
              </p>
            </div>
            <div className="bg-pink-200 flex justify-between h-1/4">
              <p>
                {post.hashtags.map((v, i) => (
                  <span key={i}>{" #" + v}</span>
                ))}
              </p>
              <p className="sm:hidden">{krTimeConvert(post.createdAt)}</p>
            </div>
          </div>
        );
      })}
      {isFetching && <div> 로딩중</div>}
    </div>
  );
};