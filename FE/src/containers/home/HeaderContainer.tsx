import Header from "../../components/home/Header";
import React, { useState } from "react";
const HeaderContainer: React.FC = () => {

  const token = localStorage.getItem("token");
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
    localStorage.removeItem("persist:users");
    localStorage.removeItem("token");
    handleMyMenuClose();
    window.location.reload();
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
      token={token}
      handleLogOut={handleLogOut}
    />
  );
};

export default HeaderContainer;
