import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { LoginFormDataType, SignUpFormDataType } from "../../../types/usersType";
import AuthForm from "../../../components/user/auth/AuthForm";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../features/users/usersSlice";
import { AppDispatch, RootState } from "../../../app/store";
import { setThemeMode } from "../../../features/darkmode/themeSlice";
import { jwtDecode } from "jwt-decode";
import { useGetQuery } from "../../../hooks";

const AuthContainer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const mode = useGetQuery("mode");

  //redux user
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users);

  //useGetQuery사용
  useEffect(() => {
    setIsSignUp(mode === "signup");
  }, [mode]);

  const toggleForm = () => {
    navigate(`?mode=${isSignUp ? "login" : "signup"}`);
  };

  const onSubmit: SubmitHandler<SignUpFormDataType & LoginFormDataType> = async (data) => {
    if (isSignUp) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_AUTH_API_URL}/signup`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Success:", response.data);
        setSignUpSuccess(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error:", error.response?.data.message);
          if (error.response?.data.message === "Email already in use") {
            alert("이미 사용중인 이메일입니다.");
          } else {
            alert("이미 사용중인 닉네임입니다.");
          }
        } else {
          console.error("Unexpected Error:", error);
        }
      }
    } else {
      try {
        const response = await axios.post(`${process.env.REACT_APP_AUTH_API_URL}/login`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = response.data;
        if (response.status === 200) {
          console.log("로그인 성공 토큰:", result.token);
          console.log("로그인 성공 유저정보:", result.user);
          console.log("테마모드", result.user.themeMode);
          const token = result.token;
          localStorage.setItem("token", token);
          dispatch(setThemeMode(result.user.themeMode));

          // JWT 토큰 디코딩
          const decodedToken = jwtDecode<{ id?: any }>(token);
          console.log("Decoded Token:", decodedToken);
          localStorage.setItem("decodedToken", decodedToken.id);

          const userData = result.user;
          dispatch(setUser(userData));

          navigate("/");
        } else {
          alert(result.message);
          console.error("로그인 실패:", result.message);
        }
      } catch (error) {
        console.error("로그인 요청 중 오류 발생:", error);
      }
    }
  };

  console.log("Updated User State:", user);
  return <AuthForm isSignUp={isSignUp} onSubmit={onSubmit} toggleForm={toggleForm} signUpSuccess={signUpSuccess} />;
};

export default AuthContainer;
