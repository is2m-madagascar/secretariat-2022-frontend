import MyAppBar from "../MyAppBar/MyAppBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCookies } from "react-cookie";
import { useState, useEffect, useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Container = () => {
  const [cookies, setCookie] = useCookies(["cookie-name"]);

  useEffect(() => {
    if (!cookies.darkMode) {
      setCookie("darkMode", "light");
    }
  });

  const [darkMode, setDarkMode] = useState(cookies.darkMode);

  const setMode = (mode) => {
    setCookie("darkMode", mode);
    setDarkMode(mode);
  };

  const prefersDarkMode = useMediaQuery(`(prefers-color-scheme: ${darkMode})`);

  const toogleDarkMode = () => {
    darkMode === "light" ? setMode("dark") : setMode("light");
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <MyAppBar setTheme={toogleDarkMode}></MyAppBar>
        <div>Je suis un container</div>
      </div>
    </ThemeProvider>
  );
};

export default Container;
