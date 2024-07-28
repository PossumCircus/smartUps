import DOMPurify from "dompurify";
import { PostDataType } from "../../../../types/postsType";
import { Card, CardContent, Typography, Box } from "../../../../styles/mui/index";

interface PostCardProps {
  post: PostDataType;
  handleNavigateToPost: (postId: string) => void;
}

export default function PostCard({ post, handleNavigateToPost }: PostCardProps) {
  return (
    <Card
      onClick={() => handleNavigateToPost(post._id)}
      sx={{
        width: "100%",
        height: 300,
        bgcolor: "background.paper",
        p: 1,
        borderColor: "divider",
        borderRadius: 2,
        boxShadow: 1,
        "&:hover": {
          opacity: 0.7,
          cursor: "pointer",
        },
      }}
    >
      <CardContent>
        <Typography variant="h6">제목: {post.title}</Typography>
        <Typography variant="subtitle1">토픽: {post.topic}</Typography>
        <Typography variant="body2">이용자의 아이디, 프로필사진, 작성일, 태그, 댓글수</Typography>
        <Box
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content),
          }}
        />
      </CardContent>
    </Card>
  )
};