import Header from "../../components/home/Header";
import React, { useState } from "react";

const HeaderContainer: React.FC = () => {
  const token = localStorage.getItem("token");
  //MUI 엘리먼트
  const [anchorEl, setAnchorEl] = useState(null);

  const handleUserInfoClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = React.useState(false);
  //toggleSidebar에서 toggleDrawer로 함수변경
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  //로그아웃
  const handleLogOut = () => {
    // 로컬스토리지에서 user,token 삭제
    localStorage.removeItem("persist:users");
    localStorage.removeItem("token");
    handleClose();
    window.location.reload();
  };

  return (
    <Header
      toggleDrawer={toggleDrawer}
      anchorEl={anchorEl}
      handleUserInfoClick={handleUserInfoClick}
      handleClose={handleClose}
      open={open}
      token={token}
      handleLogOut={handleLogOut}
    />
  );
};

export default HeaderContainer;
