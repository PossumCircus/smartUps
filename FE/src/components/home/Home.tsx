import React from "react";
import MainContentSection from "../../sections/home/MainContentSection";
import DesktopSidebarSection from "../../sections/home/DesktopSidebarSection";
import RightSidebarSection from "../../sections/home/RightSidebarSection";
import { PostDataType } from "../../types/postsType";

interface HomeProps {
  displayedPosts: PostDataType[];
  isLoading: boolean;
  onClickPost: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ displayedPosts, isLoading, onClickPost }) => {
  return (
    <div className="flex mx-auto mt-4 w-full max-w-[1280px] px-4 gap-3">
      <DesktopSidebarSection />
      <MainContentSection displayedPosts={displayedPosts} isLoading={isLoading} onClickPost={onClickPost} />
      <RightSidebarSection />
    </div>
  );
};

export default Home;
