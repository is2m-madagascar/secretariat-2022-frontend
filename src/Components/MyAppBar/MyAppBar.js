import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HandymanIcon from "@mui/icons-material/Handyman";
import Brightness4Icon from "@mui/icons-material/Brightness4";

export default function MyAppBar({ setTheme }) {
  const setMyTheme = () => {
    setTheme("dark");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            IS2M Scolarité
          </Typography>

          <div>
            <IconButton
              aria-label="dark mode"
              color="inherit"
              onClick={() => {
                setMyTheme();
              }}
            >
              <Brightness4Icon />
            </IconButton>

            <Button color="inherit" startIcon={<HandymanIcon />}>
              Changelogs
            </Button>

            <Button color="inherit">Login</Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
