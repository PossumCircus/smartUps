import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// Layouts
import MainLayout from "./layouts/MainLayout";
// Pages
import {
  HomePage,
  NotFoundPage,
  CommunityPostsPage,
  PostDetailPage,
  EditPage,
  AuthPage,
  UserProfilePage,
  UserProfileEditPage,
  OtherUserProfilePage,
  NotificationsPage,
  EditPostPage,
} from "./pages";

import routes from "./constants/routes";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import { selectTheme } from "./features/theme/themeSelector";
import { selectUser } from "./features/users";

const App: React.FC = () => {
  const themeMode = useSelector(selectTheme);
  const loginUser: string | undefined = useSelector(selectUser)?._id

  const theme = createTheme({
    palette: {
      mode: themeMode,
      background: {
        default: themeMode === "dark" ? "#242424" : "#eeeeee",
        paper: themeMode === "dark" ? "#424242" : "#ffffff",
      },
    },
  });

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path={routes.community} element={<CommunityPostsPage />} />
            <Route path={routes.postDetail} element={<PostDetailPage />} />
            <Route path={routes.edit} element={<EditPage />} />
            <Route path="edit/post/:id" element={<EditPostPage />} />
            {loginUser && <Route path={routes.userProfile} element={<UserProfilePage />} />}
            {loginUser && <Route path={routes.userProfileEdit} element={<UserProfileEditPage />} />}
            {loginUser && <Route path={routes.notifications} element={<NotificationsPage />} />}
            {loginUser && <Route path={routes.otherUserProfile} element={<OtherUserProfilePage />} />}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path={routes.auth} element={<AuthPage />} />
        </Routes>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
