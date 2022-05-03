import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const UIContainer = ({ list, toolbox }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} mt={2}>
        <Grid item md={7} xs={12}>
          <Paper variant="outlined">{list}</Paper>
        </Grid>
        <Grid item md={5} xs={12}>
          <Paper variant="outlined">{toolbox}</Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UIContainer;
