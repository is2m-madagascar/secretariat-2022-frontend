import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import EditIcon from "@mui/icons-material/Edit";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddCardIcon from "@mui/icons-material/AddCard";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";

const MyDrawerMenu = () => {
  const menuList = [
    [{ label: "Dashboard", icon: <DashboardIcon />, route: "/dashboard" }],
    [
      { label: "Etudiant", icon: <SchoolIcon />, route: "/etudiants" },
      { label: "Enseignant", icon: <GroupIcon />, route: "/enseignants" },
      { label: "Cours", icon: <HourglassTopIcon />, route: "/cours" },
    ],
    [
      { label: "Inscriptions", icon: <EditIcon />, route: "/inscriptions" },
      {
        label: "Enseignements",
        icon: <ListAltIcon />,
        route: "/enseignements",
      },
      { label: "Facturations", icon: <AddCardIcon />, route: "/facturations" },
    ],
    [
      {
        label: "Configuration",
        icon: <SettingsIcon />,
        route: "/configurations",
      },
    ],
  ];

  return (
    <div>
      {menuList.map((item, index0) => {
        return (
          <div key={index0}>
            <List>
              {item.map((subItem, index1) => {
                return (
                  <ListItem
                    button
                    key={index1}
                    component={Link}
                    to={subItem.route}
                  >
                    <ListItemIcon>{subItem.icon}</ListItemIcon>
                    <ListItemText primary={subItem.label} />
                  </ListItem>
                );
              })}
            </List>
            <Divider />
          </div>
        );
      })}
    </div>
  );
};

export default MyDrawerMenu;
