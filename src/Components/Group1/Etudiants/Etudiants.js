import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const Etudiant = () => {
  return (
    <Box
      sx={{
        display: "flex",
        "& > :not(style)": {
          m: 1,
          width: 50,
          height: 50,
        },
      }}
    >
      <Paper variant="outlined" />
      <Paper variant="outlined" />
    </Box>
  );
};

export default Etudiant;
