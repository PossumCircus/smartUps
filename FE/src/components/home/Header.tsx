import React from "react";
import routes from "../../constants/routes";
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Drawer,
} from "../../styles/mui/index";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeToggle from "../../containers/common/DarkModeToggleContainer";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import MobileSidebar from "./MobileSidebar";
import { useSelector } from "react-redux";
import { selectAllNotifications } from "../../features/notifications";
interface HeaderProps {
  open: boolean;
  myMenuAnchorEl: null | HTMLElement;
  handleMyMenuOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleMyMenuClose: () => void;
  myProfileAnchorEl: null | HTMLElement;
  handleMyProfileOpen: (event: React.MouseEvent<HTMLLIElement>) => void;
  handleMyProfileClose: () => void;
  toggleDrawer: (newOpen: boolean) => () => void;
  loginUser: string | null;
  handleLogOut: () => void;
  newNotificationsLength: number;
  handleNavigateToNotification: () => void
}

const Header: React.FC<HeaderProps> = ({
  myMenuAnchorEl,
  handleMyMenuOpen,
  handleMyMenuClose,
  myProfileAnchorEl,
  handleMyProfileOpen,
  handleMyProfileClose,
  toggleDrawer,
  open,
  loginUser,
  handleLogOut,
  newNotificationsLength,
  handleNavigateToNotification
}) => {
  return (
    <AppBar position="static" color="inherit" elevation={0} sx={{ boxShadow: "none" }}>
      <div className="w-full mx-auto max-w-[1280px]">
        <Toolbar>
          <Box display="flex" alignItems="center" flexGrow={1}>
            <div className="sidebarToggle md:hidden">
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer open={open} onClose={toggleDrawer(false)}>
                <MobileSidebar toggleDrawer={toggleDrawer} />
              </Drawer>
            </div>
            <Link to="/" className="logoButton">
              <img
                src="/img/logo.png"
                alt="logo"
                style={{ width: "40px", height: "40px", marginLeft: "16px", marginRight: "16px" }}
              />
            </Link>
            <div className="searchBar hidden md:block">
              <Box sx={{ display: "flex", alignItems: "center", border: "1px solid", borderRadius: 1, px: 1, ml: 2, minWidth: "340px", }}>
                <InputBase
                  sx={{ ml: 1, flex: 1, color: "inherit" }}
                  placeholder="Search..."
                  inputProps={{ "aria-label": "search" }}
                />
                <IconButton type="submit" sx={{ p: "10px" }} aria-label="search" onClick={() => alert("준비중입니다.")}>
                  <SearchIcon />
                </IconButton>
              </Box>
            </div>
          </Box>
          <Box display="flex" alignItems="center" ml={2}>
            <div className="md:hidden">
              <IconButton color="inherit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </div>
            <DarkModeToggle />
            {loginUser ?
              (
                <div>
                  <IconButton onClick={handleNavigateToNotification}>
                    <Badge badgeContent={newNotificationsLength} color="secondary">
                      <MailIcon color="action" />
                    </Badge>
                  </IconButton>
                  <IconButton color="inherit" onClick={handleMyMenuOpen}>
                    <PersonIcon />
                  </IconButton>
                  <Menu
                    anchorEl={myMenuAnchorEl}
                    open={Boolean(myMenuAnchorEl)}
                    onClose={handleMyMenuClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <MenuItem onClick={(e) => {
                      handleMyMenuClose()
                      handleMyProfileOpen(e)
                    }}>내 정보</MenuItem>
                    <MenuItem onClick={handleLogOut}>로그아웃</MenuItem>
                  </Menu>
                  <Menu
                    anchorEl={myProfileAnchorEl}
                    open={Boolean(myProfileAnchorEl)}
                    onClose={handleMyProfileClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                    transformOrigin={{ vertical: "top", horizontal: "right", }}
                  >
                    <MenuItem onClick={handleMyProfileClose}>
                      <Link to={routes.userProfile}>프로필</Link>
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <>
                  <Link to={routes.login} style={{ textDecoration: "none" }}>
                    <Button sx={{ color: "#42a5f5", ":hover": { color: "white", backgroundColor: "#42a5f5" }, mx: 1, }}                    >
                      로그인
                    </Button>
                  </Link>
                  <Link to={routes.signup} style={{ textDecoration: "none" }}>
                    <Button variant="outlined"
                      sx={{ borderColor: "#42a5f5", color: "#42a5f5", ":hover": { backgroundColor: "#42a5f5", borderColor: "#42a5f5", color: "white", }, mx: 1, }}>
                      회원 가입
                    </Button>
                  </Link>
                </>
              )}
          </Box>
        </Toolbar>
      </div>
    </AppBar>
  );
};

export default Header;
