import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText, Box } from "../../../styles/mui";
import { useTheme } from "@mui/material/styles";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  toggleSidebar?: () => void;
  iconColor?: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, toggleSidebar, iconColor }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <ListItem
      component={RouterLink}
      to={to}
      onClick={toggleSidebar}
      sx={{
        p: 1,
        ":hover": {
          bgcolor: isDarkMode ? "white" : "#e0e0e0",
          color: "black",
        },
        borderRadius: "4px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", px: 2, width: "100%" }}>
        <ListItemIcon sx={{ minWidth: "36px", color: iconColor }}>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </Box>
    </ListItem>
  );
};

export default SidebarLink;
