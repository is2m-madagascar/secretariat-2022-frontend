import SearchBar from "material-ui-search-bar";
import { useState, Fragment } from "react";
import { Stack } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const EtudiantSearch = () => {
  const [searchValue, setValue] = useState("");

  const handleChange = (change) => {
    console.log(change);
  };

  return (
    <Fragment>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Options</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <Stack
            spacing={2}
            m={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <FormControlLabel value="none" control={<Radio />} label="Aucun" />
            <FormControlLabel
              value="matricule"
              control={<Radio />}
              label="Matricule"
            />
            <FormControlLabel value="nom" control={<Radio />} label="Nom" />
            <FormControlLabel
              value="prenom"
              control={<Radio />}
              label="Prénom"
            />
          </Stack>
        </RadioGroup>
      </FormControl>
      <SearchBar
        value={searchValue}
        onChange={(newValue) => setValue(newValue)}
        onRequestSearch={() => handleChange(searchValue)}
      />
    </Fragment>
  );
};

export default EtudiantSearch;
