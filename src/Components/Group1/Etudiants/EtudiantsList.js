import List from "@mui/material/List";
import { useEffect, useState } from "react";
import url from "./../../../Shared/Services/Utils/ServerUrl";
import { Pagination, Stack, Grid } from "@mui/material";
import EtudiantsListItem from "./EtudiantsListItem";
import EtudiantSearch from "./EtudiantSearch";

const serverUrl = url.server + ":" + url.port;
const fetchUrl = "http://" + serverUrl + "/personnes?statut=Etu";

const EtudiantsList = () => {
  const [etudiantsList, setList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [url, setUrl] = useState(fetchUrl);

  const fetchData = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          // get data
          const temp = [];
          result.data[0].forEach((element) => {
            element = { ...element, id: element._id };
            temp.push(element);
          });
          setList(temp);

          // get metadata
          setPageCount(result.message.pagination.pages);
        },
        (err) => {
          console.error(err);
        }
      );
  };

  useEffect(() => {
    fetchData(fetchUrl);
  }, []);

  const handlePageChange = (_, value) => {
    setUrl(url + "&page=" + value);
    fetchData(url);
  };

  const orderSearch = () => {};

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} m={2}>
        <EtudiantSearch />
      </Grid>
      <Grid item xs={12} md={12}>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {etudiantsList.map((element) => {
            return (
              <EtudiantsListItem
                key={element._id}
                etudiant={element}
              ></EtudiantsListItem>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={12} md={12} p={2}>
        <Stack
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Pagination
            showFirstButton
            showLastButton
            count={pageCount}
            color="primary"
            variant="outlined"
            onChange={handlePageChange}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default EtudiantsList;
