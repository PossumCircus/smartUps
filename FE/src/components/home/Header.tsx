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

interface HeaderProps {
  open: boolean;
  myMenuAnchorEl: any;
  handleMyMenuOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleMyMenuClose: () => void;
  myProfileAnchorEl: any
  handleMyProfileOpen: (event: React.MouseEvent<HTMLLIElement>) => void;
  handleMyProfileClose: () => void;
  toggleDrawer: (newOpen: boolean) => () => void;
  token: any;
  handleLogOut: () => void;
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
  token,
  handleLogOut,
}) => {
  return (
    <AppBar position="static" color="inherit" elevation={0} sx={{ boxShadow: "none" }}>
      <div className="w-full mx-auto max-w-[1280px]">
        <Toolbar>
          <Box display="flex" alignItems="center" flexGrow={1}>
            {/* Toggle Sidebar */}
            <div className="md:hidden">
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>

              <Drawer open={open} onClose={toggleDrawer(false)}>
                <MobileSidebar toggleDrawer={toggleDrawer} />
              </Drawer>
            </div>
            {/* Logo */}
            <Link to="/">
              <img
                src="/img/logo.png"
                alt="logo"
                style={{ width: "40px", height: "40px", marginLeft: "16px", marginRight: "16px" }}
              />
            </Link>
            {/* Search Bar */}
            <div className="hidden md:block">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid",
                  borderRadius: 1,
                  px: 1,
                  ml: 2,
                  minWidth: "340px",
                }}
              >
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
            {token ?
              (
                <div className="ml-6">
                  <Badge badgeContent={1} color="secondary">
                    <MailIcon color="action" />
                  </Badge>
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
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <MenuItem>
                      <Link to={routes.userProfile}>프로필</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to={routes.notifications}>내 알림</Link>
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <>
                  <Link to={routes.login} style={{ textDecoration: "none" }}>
                    <Button
                      sx={{
                        color: "#42a5f5",
                        ":hover": { color: "white", backgroundColor: "#42a5f5" },
                        mx: 1,
                      }}
                    >
                      로그인
                    </Button>
                  </Link>
                  <Link to={routes.signup} style={{ textDecoration: "none" }}>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: "#42a5f5",
                        color: "#42a5f5",
                        ":hover": {
                          backgroundColor: "#42a5f5",
                          borderColor: "#42a5f5",
                          color: "white",
                        },
                        mx: 1,
                      }}
                    >
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
