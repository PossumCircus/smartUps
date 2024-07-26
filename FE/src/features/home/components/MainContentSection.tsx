import React from "react";
import { PostDataType } from "../../../types/postsType";

import PostCard from "./PostCard";

interface MainContentSectionProps {
  displayedPosts: PostDataType[];
  isLoading: boolean;
  onClickPost: (id: string) => void;
}

const MainContentSection: React.FC<MainContentSectionProps> = ({ displayedPosts, isLoading, onClickPost }) => {
  return (
    <section className="grow gap-y-10 pb-10 ">
      <div className="container">
        <article className="flex flex-col gap-4">
          {isLoading ? (
            <div> Loading ...</div>
          ) : (
            displayedPosts.map((post, i) => (
              // post._id 키값이 중복된다고 오류가 발생해서 key값을 i 로 설정
              // <PostCard post={post} key={post._id} onClick={onClickPost} />
              <PostCard post={post} key={i} onClick={onClickPost} />
            ))
          )}
        </article>
      </div>
    </section>
  );
};

export default MainContentSection;
