import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Home from "../components/Home";
import { PostDataType } from "../../../types/postsType";
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch } from "../../../app/store";
import { notificationsStatus, fetchNotifications } from "../../notifications";
import { selectUser } from "../../users";

export default function HomeContainer(){
  const [allPosts, setAllPosts] = useState<PostDataType[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<PostDataType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const statusState = useSelector(notificationsStatus)
  const loginUserId = useSelector(selectUser)._id
  const navigate = useNavigate();

  useEffect(() => {
    if (loginUserId && statusState === 'idle') {
      dispatch(fetchNotifications({ loginUserId }));
    }
  }, [statusState, dispatch])

  //인피니티 스크롤 함수 재정립 필요
  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.get<PostDataType[]>(`${process.env.REACT_APP_POST_API_URL}/gettenposts?page=${currentPage}`);
      setAllPosts((previousPosts) => [...previousPosts, ...response.data]);
      setVisiblePosts((previousVisiblePosts) => [...previousVisiblePosts, ...response.data.slice(0, 20)]);
    } catch (error) {
      console.error("Error fetching posts이거:", error);
    }
    setIsLoading(false);
  }, [currentPage]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      const currentlyVisibleCount = visiblePosts.length;
      const totalPostsCount = allPosts.length;
      if (currentlyVisibleCount < totalPostsCount) {
        setVisiblePosts((previousVisiblePosts) => [
          ...previousVisiblePosts,
          ...allPosts.slice(currentlyVisibleCount, currentlyVisibleCount + 5),
        ]);
      } else {
        setCurrentPage((previousPage) => previousPage + 1);
      }
    }
  }, [visiblePosts, allPosts]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleNavigateToPost = (postId: string) => {
    navigate(`posts/${postId}`);
  };

  return <Home posts={visiblePosts} isLoading={isLoading} handleNavigateToPost={handleNavigateToPost} />;
};