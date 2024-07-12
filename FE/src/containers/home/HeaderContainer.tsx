import Header from "../../components/home/Header";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectUser } from "../../features/users";
import { AppDispatch } from "../../app/store";
const HeaderContainer: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()
  const loginUser = useSelector(selectUser)._id
  const [myMenuAnchorEl, setMyMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [myProfileAnchorEl, setMyProfileAnchorEl] = useState<null | HTMLElement>(null);

  const handleMyMenuOpen = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setMyMenuAnchorEl(event.currentTarget);
  };

  const handleMyMenuClose = (): void => {
    setMyMenuAnchorEl(null);
    setMyProfileAnchorEl(null)
  };

  const handleMyProfileOpen = (event: React.MouseEvent<HTMLLIElement>): void => {
    setMyProfileAnchorEl(event.currentTarget)
  }

  const handleMyProfileClose = (): void => {
    setMyProfileAnchorEl(null)
  }

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogOut = () => {
    dispatch(logOut())
    handleMyMenuClose();
    navigate("/");
  };

  return (
    <Header
      toggleDrawer={toggleDrawer}
      myMenuAnchorEl={myMenuAnchorEl}
      handleMyMenuOpen={handleMyMenuOpen}
      handleMyMenuClose={handleMyMenuClose}
      myProfileAnchorEl={myProfileAnchorEl}
      handleMyProfileOpen={handleMyProfileOpen}
      handleMyProfileClose={handleMyProfileClose}
      open={open}
      loginUser={loginUser}
      handleLogOut={handleLogOut}
    />
  );
};

export default HeaderContainer;
