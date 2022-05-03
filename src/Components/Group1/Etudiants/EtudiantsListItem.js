import { Fragment } from "react";
import {
  ListItemText,
  ListItemButton,
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const EtudiantsListItem = ({ etudiant }) => {
  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <Fragment>
      <ListItem
        disablePadding
        alignItems="flex-start"
        secondaryAction={
          <IconButton onClick={handleClick}>
            <AddIcon />
          </IconButton>
        }
      >
        <ListItemButton
          role={undefined}
          onClick={($event) => {
            console.log(etudiant);
          }}
        >
          <ListItemAvatar>
            <Avatar
              alt={etudiant.nomPrenom.nom + " " + etudiant.nomPrenom.prenoms}
              src="/static/images/avatar/1.jpg"
            />
          </ListItemAvatar>
          <ListItemText
            primary={etudiant.nomPrenom.nom + " " + etudiant.nomPrenom.prenoms}
            secondary={
              <Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Matricule ---
                </Typography>
                {"  " + etudiant.matricule}
              </Fragment>
            }
          />
        </ListItemButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </Fragment>
  );
};

export default EtudiantsListItem;
