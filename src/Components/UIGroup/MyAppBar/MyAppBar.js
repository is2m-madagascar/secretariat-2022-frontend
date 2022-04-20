import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HandymanIcon from "@mui/icons-material/Handyman";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import "./MyAppBar.css";

export default function MyAppBar({
  drawerWidth,
  setTheme,
  theme,
  open,
  handleDrawerOpen,
}) {
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      justifyContent: "center",
    }),
  }));

  const iconTheme = () => {
    return theme === "light" ? <LightModeIcon /> : <DarkModeIcon />;
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar className="distribute">
        <div className="menuIcon">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            IS2M Scolarité
          </Typography>
        </div>

        <div>
          <IconButton
            aria-label="dark mode"
            color="inherit"
            onClick={() => {
              setTheme();
            }}
          >
            {iconTheme()}
          </IconButton>

          <Button color="inherit" startIcon={<HandymanIcon />}>
            Changelogs
          </Button>

          <Button color="inherit">Login</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
