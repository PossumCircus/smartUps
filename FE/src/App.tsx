import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// Layouts
import MainLayout from "./layouts/MainLayout";
// Pages
import {
  HomePage,
  // NotFoundPage,
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

const App: React.FC = () => {
  const themeMode = useSelector((state: any) => state.theme.themeMode);
  console.log("redux thememode", themeMode);

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
            {/* <Route path="*" element={<NotFoundPage />} /> */}
            <Route path={routes.userProfile} element={<UserProfilePage />} />
            <Route path={routes.userProfileEdit} element={<UserProfileEditPage />} />
            <Route path={routes.notifications} element={<NotificationsPage />} />
            <Route path={routes.otherUserProfile} element={<OtherUserProfilePage />} />
          </Route>
          <Route path={routes.auth} element={<AuthPage />} />
        </Routes>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
