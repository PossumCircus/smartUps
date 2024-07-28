import React from "react";
import { PostDataType } from "../../../../types/postsType";
import PostCard from "./PostCard";

type MainContentsSectionProps = {
  posts: PostDataType[];
  isLoading: boolean;
  handleNavigateToPost: (postId: string) => void;
}

export default function MainContentsSection({ posts, isLoading, handleNavigateToPost }: MainContentsSectionProps) {
  return (
    <section className="grow gap-y-10 pb-10 ">
      <div className="container">
        <article className="flex flex-col gap-4">
          {isLoading ? (
            <div> Loading ...</div>
          ) : (
            posts.map((post, i) => (
              // post._id 키값이 중복된다고 오류가 발생해서 key값을 i 로 설정
              // <PostCard post={post} key={post._id} onClick={onClickPost} />
              <PostCard post={post} key={i} handleNavigateToPost={handleNavigateToPost} />
            ))
          )}
        </article>
      </div>
    </section>
  );
};