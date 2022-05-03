import { useState, Fragment } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import AddBoxIcon from "@mui/icons-material/AddBox";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";

const createData = (name, calories) => {
  return { name, calories };
};

const rows = [
  createData("Frozen yoghurt", 159),
  createData("Ice cream sandwich", 237),
  createData("Eclair", 262),
  createData("Cupcake", 305),
  createData("Gingerbread", 356),
];

const EtudiantsToolbox = ({ showDetails }) => {
  const [show, setShow] = useState(false);

  const etudiantMatricule = 1120;

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Ajouter un étudiant" />
            </ListItemButton>
          </ListItem>
          {show ? (
            <Fragment>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CloseIcon />
                  </ListItemIcon>
                  <ListItemText primary="Fermer les détails" />
                </ListItemButton>
              </ListItem>
            </Fragment>
          ) : null}
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        {show ? (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1" m={2}>
            Appuyez sur un étudiant pour voir ses détails
          </Typography>
        )}
      </nav>
    </Box>
  );
};

export default EtudiantsToolbox;
