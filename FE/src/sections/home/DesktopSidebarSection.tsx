import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Paper, Typography, Button, Link, List } from "../../styles/mui/index";
import NavLinkItem from "../../components/home/SidebarLink";
import { useTheme } from "@mui/material/styles";
import routes from "../../constants/routes";
import { HomeIcon, Groups, QuestionMark } from "../../styles/muiIcon/index";

const DesktopSidebarSection: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const token = localStorage.getItem("token");

  //다크모드 유저 데이터에 저장 없으면 Light로 기본값

  return (
    <Box sx={{ display: { xs: "none", md: "block" } }}>
      <aside>
        <Paper
          sx={{
            width: 240,
            bgcolor: "background.paper",
            p: 2,
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="p" gutterBottom>
            스마트업에는 이미 <br />
            예비 자영업자들이 1000명이나 있어요!
          </Typography>
          <Typography>회원가입을 하여 더 많은 정보를 얻어보세요!</Typography>
          {token ? null : (
            <Box sx={{ mt: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
              <Link component={RouterLink} to={routes.signup} sx={{ width: "100%" }}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="success"
                  sx={{
                    borderColor: "#4caf50",
                    color: isDarkMode ? "white" : "#4caf50",
                    backgroundColor: isDarkMode ? "#4caf50" : "transparent",
                    ":hover": {
                      backgroundColor: isDarkMode ? "white" : "#4caf50",
                      color: isDarkMode ? "#4caf50" : "white",
                    },
                  }}
                >
                  회원 가입
                </Button>
              </Link>
              <Link component={RouterLink} to={routes.login} sx={{ width: "100%" }}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="success"
                  sx={{
                    borderColor: "#4caf50",
                    color: isDarkMode ? "white" : "#4caf50",
                    backgroundColor: isDarkMode ? "#4caf50" : "transparent",
                    ":hover": {
                      backgroundColor: isDarkMode ? "white" : "#4caf50",
                      color: isDarkMode ? "#4caf50" : "white",
                    },
                  }}
                >
                  로그인
                </Button>
              </Link>
            </Box>
          )}
        </Paper>

        <nav>
          <List sx={{ mt: 2 }}>
            <NavLinkItem to={routes.home} icon={<HomeIcon />} label="홈" iconColor="#0091ea" />
            <NavLinkItem to={routes.community} icon={<Groups />} label="커뮤니티" iconColor="#ff9800" />
            <NavLinkItem to={routes.qna} icon={<QuestionMark />} label="Q&A" iconColor="#f44336" />
          </List>
        </nav>
      </aside>
    </Box>
  );
};

export default DesktopSidebarSection;
