import MyDrawer from "../MyDrawer/MyDrawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { cookieService } from "../../../Shared/Services/Utils/CookiesService";
import { useState, useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Container = () => {
  //darkMode handling
  const [darkMode, setDarkMode] = useState(
    cookieService.getCookie("darkMode") || "light"
  );

  const setMode = (mode) => {
    cookieService.setCookie("darkMode", mode);
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
  //end darkMode handling

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MyDrawer setTheme={toogleDarkMode} theme={darkMode} />
    </ThemeProvider>
  );
};

export default Container;
