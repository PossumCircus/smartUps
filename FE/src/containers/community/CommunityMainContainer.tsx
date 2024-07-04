import PostsMain from "../../components/common/post/PostsMain";
import { useEffect, useState } from "react";
import { usePagination, useGetQuery } from "../../hooks";
import { selectAllPosts } from "../../features/posts/postsSelectors";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";

export default function CommunityMainContainer() {
  const navigate = useNavigate();
  const getTopic = useGetQuery("topic");
  let topic;
  if (getTopic !== null) {
    topic = getTopic;
  } else topic = "";

  // setItemCountPerPage는 추후 버튼으로 이용자가 페이지당 보고 싶은 게시글 수 조절에 사용도 가능.
  // 첫 번째 인자로 데이터의 length값을 부여 해줘야함. 현재 임시값.
  // 두 번째 인자로 페이지 당 보여줄 포스트의 숫자를 지정.
  const [setTotalDataLength, setItemCountPerPage, paginationOptions] = usePagination(5, 10);

  const [isInfinite, setIsInfinite] = useState(false);

  const category = "community";
  const categoryDescription = "자유롭게 의견을 나눠보세요.";

  const navPaths = [
    { path: "/community", section: "전체 보기" },
    { path: "/community?topic=free", section: "자유 주제" },
    { path: "/community?topic=game", section: "게임" },
  ];
  const posts = useSelector(selectAllPosts);

  useEffect(() => {
    // setTotalDataLength(posts.filter(post => post.category === 'community').length)
    setTotalDataLength(posts.filter((post) => post.topic.includes("community")).length);
  }, [posts]);

  //0624 김세준 추가
  const handleWriteClick = () => {
    if (isAuthenticated()) {
      navigate("/edit");
    } else {
      alert("로그인이 필요합니다.");
      navigate("/auth?mode=login");
    }
  };

  return (
    <PostsMain
      category={category} //community
      categoryDescription={categoryDescription}
      navPaths={navPaths}
      paginationOptions={paginationOptions}
      isInfinite={isInfinite}
      topic={topic}
      handleWriteClick={handleWriteClick} //0624 김세준 추가
    />
  );
}
