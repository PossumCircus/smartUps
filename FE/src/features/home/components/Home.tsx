import MainContentsSection from "./MainContentsSection/MainContentSection";
import LeftAsideSection from "./LeftAsideSection/LeftAsideSection";
import RightAsideSection from "./RightAsideSection/RightAsideSection";
import { PostDataType } from "../../../types/postsType";

interface HomeProps {
  posts: PostDataType[];
  isLoading: boolean;
  handleNavigateToPost: (postId: string) => void;
}

export default function Home({ posts, isLoading, handleNavigateToPost }: HomeProps) {
  return (
    <div className="flex mx-auto mt-4 w-full max-w-[1280px] px-4 gap-3">
      <LeftAsideSection />
      <MainContentsSection posts={posts} isLoading={isLoading} handleNavigateToPost={handleNavigateToPost} />
      <RightAsideSection />
    </div>
  );
};