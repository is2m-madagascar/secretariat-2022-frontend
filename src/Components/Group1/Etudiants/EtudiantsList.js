import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import url from "./../../../Shared/Services/Utils/ServerUrl";

const getNomComplet = (params) => {
  return `${params.row.nomPrenom.nom || ""} ${
    params.row.nomPrenom.prenoms || ""
  }`;
};

const getEmail = (params) => {
  var email = "";
  params.row.contacts.forEach((element) => {
    if (element.contactType === "email") {
      email = element.contactValue;
    }
  });
  return email;
};

const columns = [
  { field: "matricule", headerName: "Matricule", width: 80 },
  {
    field: "nomPrenom",
    headerName: "Nom complet",
    width: 130,
    valueGetter: getNomComplet,
  },
  { field: "email", headerName: "Email", valueGetter: getEmail, width: 250 },
];

const serverUrl = url.server + ":" + url.port;

const fetchUrl = "http://" + serverUrl + "/personnes?statut=Etu";

const EtudiantsList = () => {
  const [etudiantsList, setList] = useState([]);

  const onFetched = (result) => {
    const temp = [];
    result.data[0].forEach((element) => {
      element = { ...element, id: element._id };
      temp.push(element);
    });
    setList(temp);
  };

  useEffect(() => {
    fetch(fetchUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          onFetched(result);
        },
        (err) => {
          console.error(err);
        }
      );
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={etudiantsList}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
};

export default EtudiantsList;
