import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../containers/home/HeaderContainer";
import { Box } from "../styles/mui/index";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: 4,
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
    </div>
  );
};

export default MainLayout;
