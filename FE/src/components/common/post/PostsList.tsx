import { Link } from "react-router-dom";
import { krTimeConvert } from "../../../utils";
import { PostDataType } from "../../../types/postsType";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Typography, IconButton } from "@mui/material";

interface PostsListProps {
  topic: string;
  itemCountPerPage: number;
  currentPage: number;
  posts: PostDataType[];
  status: string;
  error: string | null;
  postsByTopic: PostDataType[];
  isPostsValid: boolean;
  clickPostHandler: (postId: string) => void;
}

const PostsList: React.FC<PostsListProps> = ({
  itemCountPerPage,
  currentPage,
  topic,
  posts,
  status,
  error,
  postsByTopic,
  isPostsValid,
  clickPostHandler,
}) => {
  return (
    <>
      {status === "loading" && <div>Loading...</div>}

      {status !== "loading" && error ? <div>Error: {error}</div> : null}

      {status === "succeeded" &&
        isPostsValid &&
        (!topic ? posts : postsByTopic).map((post, index) => {
          if (index + 1 <= itemCountPerPage * currentPage && index + 1 > itemCountPerPage * (currentPage - 1)) {
            return (
              <Box
                key={post._id}
                sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", p: 1, py: 2 }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PersonIcon />
                    <Typography>{post.author.username}</Typography>
                  </Box>
                  <Typography sx={{ display: { xs: "none", sm: "inline" } }}>
                    {krTimeConvert(post.createdAt)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    my: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Link
                    to={`/posts/${post._id}`}
                    onClick={() => clickPostHandler(post._id)}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        transition: "font-size 0.3s ease",
                        "&:hover": {
                          fontSize: "1.5rem",
                        },
                      }}
                    >
                      {post.title}
                    </Typography>
                  </Link>
                  <Typography>
                    👁️‍🗨️ {post.viewsCount} 📄 {post.comments.length} 👍 {post.likes.length > 1 ? post.likes.length : 0}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {post.hashtags && post.hashtags.length > 0 ? (
                    <Typography>
                      {post.hashtags.map((v, i) => (
                        <span key={i}>{" #" + v}</span>
                      ))}
                    </Typography>
                  ) : (
                    <Typography sx={{ visibility: "hidden" }}>No tags</Typography>
                  )}
                </Box>
                <Box width="100%" height="1px" bgcolor="#bdbdbd" mt={2}></Box>
              </Box>
            );
          }
          return null;
        })}
    </>
  );
};

export default PostsList;
