import React, { useEffect, ChangeEvent, RefObject, useState, useRef, FormEventHandler, FormEvent } from 'react'
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { createComment, createReplyComment, editComment } from "../../../features/posts/postsAsyncThunks";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Box, TextField, Button, Typography } from "@mui/material";

type CommentsSubmitFormPropsType = {
  isReplyComment?: boolean;
  isEditingComment?: boolean;
  prevComment?: string;
  targetCommentId?: string
}

const CommentsSubmitForm: React.FC<CommentsSubmitFormPropsType> = ({
  isReplyComment,
  isEditingComment,
  prevComment,
  targetCommentId
}) => {
  const [content, setContent] = useState<string>('');
  const [editContent, setEditContent] = useState<string>(prevComment as string);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const postId = id as string;
  const token: string | null = localStorage.getItem("token");

  let loginUser: { id: string } | null;

  if (token !== null) {
    loginUser = jwtDecode<{ id: string }>(token);
  } else {
    console.error("Token is null");
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (isEditingComment) {
      setEditContent(e.target.value);
      console.log('edit')
    } else {
      setContent(e.target.value)
      console.log('content')
    }
  };

  const handleCommentSubmit = () => {
    if (content.trim() !== '') {
      // 댓글 내용 콘솔에 출력
      console.log('Comment submitted:', content);
      dispatch(createComment({ postId, author: loginUser!.id, content }))
      // 등록 후 입력 필드 초기화
      setContent("");
    }
  };

  const handleReplyCommentSubmit = () => {
    if (content.trim() !== '') {
      console.log('Comment submitted:', content);
      dispatch(createReplyComment({
        postId,
        parentCommentId: targetCommentId,
        author: loginUser!.id,
        content
      }))
      setContent('');
    }
  };

  const handleEditCommentSubmit = () => {
    if (editContent?.trim() !== '') {
      dispatch(editComment({
        postId,
        commentId: targetCommentId as string,
        content: editContent,
      }))
    }
    setEditContent('');
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isReplyComment) {
      handleReplyCommentSubmit();
    } else if (isEditingComment) {
      handleEditCommentSubmit();
    } else {
      handleCommentSubmit();
    }
    window.location.reload()
  }

  return (
    <Box className="comments-textarea" component="section" sx={{ mt: 2 }}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Typography
          component="label"
          htmlFor="comment"
          sx={{ display: "block", fontSize: "0.875rem", fontWeight: 500 }}
        />
        <TextField
          id="comment"
          name="comment"
          placeholder="건전한 댓글 문화를 지향 해주세요"
          inputRef={textareaRef}
          value={isEditingComment ? editContent : content}
          onChange={handleChange}
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          sx={{
            mt: 1,
            borderRadius: 1,
            resize: "none",
            border: "1px solid",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(0, 0, 0, 0.23)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(0, 0, 0, 0.23)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "transparent",
              },
            },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="contained" type="submit">
            {isEditingComment ? '수정완료' : '등록'}
          </Button>
        </Box>
      </form>
    </Box >
  );
}

export default CommentsSubmitForm;