import { useEffect, useState } from "react";
import filterIcon from "../../../assets/svg/filterIcon.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../users";
export default function PostsMenu({ category }: { category: string }) {
  const [dropMenuState, setDropMenuState] = useState(false);
  const navigate = useNavigate();

  const filterDropHandle = () => {
    setDropMenuState((prev) => !prev);
  };
  const loginUser = useSelector(selectUser)._id
  const handleWriteClick = () => {
    if (loginUser) {
      navigate("/edit");
    } else {
      alert("로그인이 필요합니다.");
      navigate("/auth?mode=login");
    }
  };

  return (
    <div className="flex items-center h-12 max-lg:w-full">
      <div className="flex-none">
        <button
          name="write"
          className="bg-slate-500 hover:scale-105 rounded-xl w-30 px-2 py-1"
          onClick={handleWriteClick}
        >
          ✏️작성하기
        </button>
      </div>
      {/* <div className="flex-grow flex justify-center">
        작아지면 버튼으로 드롭다운 호출해서 검색하게 변경
        <input name="search" placeholder={`🔍${category} 게시글 검색`} className="h-auto px-2" />
      </div> */}
      {/* <div className="z-50">
        <div>
          <button className="flex space-x-2 px-3 py-1 border border-gray-300" onClick={filterDropHandle}>
            <img src={filterIcon} alt="filter icon" className="w-5 h-5" />
          </button>
        </div>
        {dropMenuState && (
          <div className="bg-white flex flex-col absolute -translate-x-8 divide-y-2 ring-1 p-1">
            <button>좋아요순 정렬</button>
            <button>조회수순 정렬</button>
            <button>최신순 정렬</button>
            <button>오래된순 정렬</button>
          </div>
        )}
      </div> */}
    </div>
  );
}
