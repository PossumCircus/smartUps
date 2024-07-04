// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setThemeMode } from "../features/darkmode/themeSlice";
// import { RootState, AppDispatch } from "../app/store";

// // Define the type for the theme mode
// type ThemeMode = "dark" | "light";

// /**
//  * Custom hook to manage the dark mode theme.
//  */
// export const useDarkMode = (): void => {
//   const dispatch = useDispatch<AppDispatch>();

//   // Select the stored theme mode from the Redux store
//   const storedThemeMode = useSelector((state: RootState) => state.theme.mode);

//   useEffect(() => {
//     const matchDark = window.matchMedia("(prefers-color-scheme: dark)");
//     const initialThemeMode: ThemeMode =
//       storedThemeMode || (matchDark.matches ? "dark" : "light");

//     // Set the initial system theme mode in the Redux store
//     dispatch(setThemeMode(initialThemeMode));
//     document.body.classList.add(initialThemeMode);

//     // Define the event listener type
//     const handleChange = (e: MediaQueryListEvent) => {
//       const newMode: ThemeMode = e.matches ? "dark" : "light";
//       dispatch(setThemeMode(newMode));
//       document.body.classList.toggle("dark", newMode === "dark");
//     };

//     matchDark.addEventListener("change", handleChange);

//     // Remove the event listener on component unmount
//     return () => {
//       matchDark.removeEventListener("change", handleChange);
//     };
//   }, [dispatch, storedThemeMode]);
// };
