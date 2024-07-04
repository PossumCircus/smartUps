// 특정 게시물의 postId(서버측 _id)를 받아와서 데이터를 랜더링하는 컨테이너입니다. 따라서 특정 category에 종속되지 않고 common한 컨테이너입니다.
import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import PostDetail from "../../../components/common/post/PostDetail";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { postsStatus, selectAllPosts, selectCurrentPost } from "../../../features/posts/postsSelectors";
import { addPostReaction } from "../../../features/posts/postsAsyncThunks";
import { fetchPostById } from "../../../features/posts/postsAsyncThunks";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PostDetailContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const postId = id as string;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const status = useSelector(postsStatus);
  const post = useSelector(selectCurrentPost);

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostById({ postId }));
    }
  }, [postId, dispatch]);
  console.log(post)

  const token: string | null = localStorage.getItem("token");
  let loginToken: { id: string } | null = null;
  if (token) {
    loginToken = jwtDecode<{ id: string }>(token);
  } else {
    console.log("Token is null");
  }

  const handleAddLike = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!postId) {
      console.error("Post ID is undefined");
      return;
    }
    const reaction = "like";

    try {
      await dispatch(addPostReaction({ postId, reaction, user_id: loginToken!.id })).unwrap();
      alert("게시글에 좋아요가 추가되었습니다.");
    } catch (error) {
      alert("이미 반응이 추가된 게시글입니다.");
      window.location.reload();
      console.error(error);
    }
  };

  const handleAddDislike = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!postId) {
      console.error("Post ID is undefined");
      return;
    }

    const reaction = "dislike";

    try {
      await dispatch(addPostReaction({ postId, reaction, user_id: loginToken!.id })).unwrap();
      alert("게시글에 싫어요가 추가되었습니다.");
    } catch (error) {
      alert("이미 반응이 추가된 게시글입니다.");
      window.location.reload();
      console.error(error);
    }
  };

  const handleEditClick = () => {
    if (!loginToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      if (post && post.author._id === loginToken.id) {
        navigate(`/edit/post/${post._id}`);
      } else {
        alert("부적절한 접근입니다. 글쓴이만 수정할수있습니다.");
      }
    } catch (error) {
      console.error("Failed to parse token from localStorage", error);
    }
  };

  const handleDeleteClick = async () => {
    if (!loginToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) {
      return;
    }

    try {
      if (post && post.author._id === loginToken.id) {
        const url = `${process.env.REACT_APP_POST_API_URL}/${postId}`;
        await axios.delete(url, { data: { postId } });
        navigate("/community");
        window.location.reload();
        alert("게시물이 삭제되었습니다.");
      } else {
        alert("부적절한 접근입니다. 글쓴이만 삭제할수있습니다.");
      }
    } catch (error) {
      console.error("Failed to delete the post", error);
      alert("게시물 삭제에 실패했습니다.");
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!post || !post._id) {
    return <div>No Post Found</div>;
  }

  return (
    <PostDetail
      post={post}
      isLoading={status}
      handleAddLike={handleAddLike}
      handleAddDislike={handleAddDislike}
      handleEditClick={handleEditClick}
      handleDeleteClick={handleDeleteClick}
      loginToken={loginToken}
    />
  );

};

export default PostDetailContainer;