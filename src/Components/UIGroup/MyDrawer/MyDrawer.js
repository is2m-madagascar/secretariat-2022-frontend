import MyAppBar from "../MyAppBar/MyAppBar";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import MyRouter from "../Router/MyRouter";
import MyDrawerMenu from "../MyDrawerMenu/MyDrawerMenu";
import MyBreadcrumb from "../MyBreadcrumb/MyBreadcrumb";
import { cookieService } from "../../../Shared/Services/Utils/CookiesService";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const MyDrawer = ({ setTheme, theme }) => {
  const [open, setOpen] = useState(
    cookieService.getCookie("drawerState") || "open"
  );

  const toogleDrawer = () => {
    const state = open === "open" ? "closed" : "open";
    setOpen(state);
    cookieService.setCookie("drawerState", state);
  };

  const getState = () => {
    return open === "open" ? true : false;
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MyAppBar
        drawerWidth={drawerWidth}
        theme={theme}
        handleDrawerOpen={toogleDrawer}
        setTheme={setTheme}
        open={getState()}
      ></MyAppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={getState()}
      >
        <DrawerHeader>
          <IconButton onClick={toogleDrawer}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <MyDrawerMenu />
      </Drawer>
      <Main open={getState()}>
        <DrawerHeader />
        <MyBreadcrumb />
        <MyRouter />
      </Main>
    </Box>
  );
};

export default MyDrawer;
