import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { krTimeConvert } from "../../../utils";
import { fetchInfiniteScrollPosts } from "../../../features/posts/postsAsyncThunks";
import { useDispatch } from "react-redux";
import { useInfiniteScroll } from "../../../hooks";
import { AppDispatch } from "../../../app/store";
import { PostDataType, PaginatedPostsResponseDataType } from "../../../types/postsType";
import { increaseViewsCount } from "../../../features/posts/postsAsyncThunks";

const POST_SIZE = 150; // post div card height
const PAGE_SIZE =
  (typeof visualViewport === "undefined" || visualViewport === null
    ? 100
    : Math.ceil(visualViewport.width / POST_SIZE)) * 10;

const InfiniteScrollRender: React.FC<PaginatedPostsResponseDataType> = () => {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<PostDataType[]>([]);
  const [hasNextPage, setNextPage] = useState(true);
  const dispatch: AppDispatch = useDispatch();

  const mockingFetchPosts = useCallback(async () => {
    try {
      const result = await dispatch(
        fetchInfiniteScrollPosts({
          params: { page, size: PAGE_SIZE },
        })
      ).unwrap();

      setPosts((prevPosts) => [...prevPosts, ...result.contents]);
      setPage(result.pageNumber + 1);
      setNextPage(!result.isLastPage);
      setIsFetching(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, [dispatch, page]);

  const [isFetching, setIsFetching] = useInfiniteScroll(mockingFetchPosts, hasNextPage);

  const clickPostHandler = (postId: string): void => {
    dispatch(increaseViewsCount({ postId }));
  };

  return (
    <div className="border-2">
      {posts.map((post, index) => {
        return (
          <div key={post._id} className="flex flex-col justify-between p-2">
            <div className="bg-sky-400 flex h-1/4 space-x-2">
              <img
                src={"/img/ping.png" || `data:image/jpeg;base64,${post.author.profile.avatar}`}
                className="max-w-6 inline"
              />
              <p className="inline">
                post.author.username 여기에
                {/* {post.author.username} */}
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

export default InfiniteScrollRender;
