export const isAuthenticated = (): boolean => {
  const token: string | null = localStorage.getItem("token");
  return !!token; // token이 있으면 true, 없으면 false
};

//로그인이 꼭필요한 곳에

// const handleWriteClick = () => {
//   if (isAuthenticated()) {
//     navigate("/edit");
//   } else {
//     alert("로그인이 필요합니다.");
//     navigate("/auth?mode=login");
//   }
// };
// 예시보기 > PostsMenu.tsx
//이런식으로 사용
