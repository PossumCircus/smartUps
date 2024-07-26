import {
  Banner,
  HotTopicPostsList,
  PostsListContainer,
  Pagination,
  PostsMenu,
  PostsTopicNav,
  UserFavorites,
} from "./index";
import { PaginationOptionsDataType } from "../../../types/commonType";

interface PostsListPropsType {
  isInfinite: boolean;
  paginationOptions: PaginationOptionsDataType;
  category: string;
  categoryDescription: string;
  navPaths: { path: string; section: string }[];
  topic: string;
  handleWriteClick: () => void;
}

const PostsMain: React.FC<PostsListPropsType> = ({
  category,
  categoryDescription,
  navPaths,
  paginationOptions,
  isInfinite,
  topic,
  handleWriteClick,
}) => {
  return (
    <div className="communityHome flex flex-row mt-4 mx-4 space-x-4 max-md:mx-8 max-lg:justify-between lg:justify-center">
      {/* <section className="leftSection-userCustom max-lg:hidden">
                <UserFavorites />
            </section> */}
      <div className="middleSection-post flex flex-col max-lg:w-full lg:w-[50dvw] ">
        <header>
          <Banner category={category} categoryDescription={categoryDescription} />
        </header>
        <nav className="divide-y-2">
          <PostsTopicNav navPaths={navPaths} topic={topic} handleWriteClick={handleWriteClick} />
          {/* <PostsMenu category={category} /> */}
        </nav>
        <section className="">
          <PostsListContainer
            category={category}
            itemCountPerPage={paginationOptions.itemCountPerPage}
            currentPage={paginationOptions.currentPage}
            isInfinite={isInfinite}
            topic={topic}
          />
        </section>
        {/* pagination OR infinite scroll */}
        {!isInfinite && (
          <div>
            <Pagination
              totalPage={paginationOptions.totalPage}
              pageCountPerGroup={paginationOptions.pageCountPerGroup}
              currentPage={paginationOptions.currentPage}
            />
          </div>
        )}
      </div>
      {/* <section className="rightSection-topic flex flex-col w-[20dvw] border-2 h-64 max-sm:hidden max-md:w-[30dvw] lg:w-[15dvw]">
        <div><HotTopicPostsList /></div>
        <div className="lg:hidden">
          <UserFavorites />
        </div>
      </section> */}
    </div>
  );
};

export default PostsMain;
