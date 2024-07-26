import * as React from "react";
import { Box, Divider } from "../../../styles/mui/index";
import { HomeIcon, Groups, QuestionMark } from "../../../styles/muiIcon/index";
import routes from "../../../constants/routes";
import NavLinkItem from "./SidebarLink";

interface MobileSidebarProps {
  toggleDrawer: (newOpen: boolean) => () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ toggleDrawer }) => {
  return (
    <div>
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <div>
          <div className="flex items-center justify-between p-4">
            <p className="font-bold text-2xl">
              <span>Smart</span>
              <span className="text-green-500">Up</span>
            </p>
          </div>
          <Divider />
          <div className="flex justify-center my-4">
            <nav className="w-full space-y-3">
              <ul>
                <NavLinkItem to={routes.home} icon={<HomeIcon />} label="홈" iconColor="#0091ea" />
                <NavLinkItem to={routes.community} icon={<Groups />} label="커뮤니티" iconColor="#ff9800" />
                <NavLinkItem to={routes.qna} icon={<QuestionMark />} label="Q&A" iconColor="#f44336" />
              </ul>
            </nav>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default MobileSidebar;

// import React from "react";
// import CloseIcon from "@mui/icons-material/Close";
// import SidebarLink from "../components/SidebarLink";
// import routes from "../constants/routes";

// interface MobileSidebarProps {
//   toggleSidebar: () => void;
// }

// const MobileSidebar: React.FC<MobileSidebarProps> = ({ toggleSidebar }) => {
//   return (
// <div className="w-full z-50 inset-0 h-screen flex md:hidden fixed dark:text-white hover:cursor-pointer">
// <div className="min-w-[300px] bg-white dark:bg-customGray">
//   <div className="flex items-center justify-between p-4">
//     <p className="font-bold text-2xl">
//       <span>Smart</span>
//       <span className="text-green-500">Up</span>
//     </p>
//     <button title="Close menu" onClick={toggleSidebar}>
//       <CloseIcon />
//     </button>
//   </div>
//   <div className="flex justify-center m-4">
//     <nav className="w-full space-y-3">
//       <ul>
//         <SidebarLink to={routes.home} icon="🏚" label="홈" toggleSidebar={toggleSidebar} />
//         <SidebarLink to={routes.community} icon="✈" label="커뮤니티" toggleSidebar={toggleSidebar} />
//         <SidebarLink to={routes.qna} icon="❓" label="Q&A" toggleSidebar={toggleSidebar} />
//         <SidebarLink to="/" icon="❤" label="추가할것들" toggleSidebar={toggleSidebar} />
//       </ul>
//     </nav>
//   </div>
// </div>
//   <div className="w-full h-full bg-black bg-opacity-40" onClick={toggleSidebar}></div>
// </div>
//   );
// };

// export default MobileSidebar;
