import Dashboard from "./../../Group0/Dashboard/Dashboard";
import Etudiants from "./../../Group1/Etudiants/Etudiants";
import Configurations from "./../../Group3/Configurations/Configurations";
import Cours from "./../../Group1/Cours/Cours";
import Enseignant from "./../../Group1/Enseignants/Enseignants";
import Enseignements from "./../../Group2/Enseignements/Enseignements";
import Facturations from "./../../Group2/Facturations/Facturations";
import Inscriptions from "./../../Group2/Inscriptions/Inscriptions";

import { Routes, Route } from "react-router-dom";

const MyRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/etudiants" element={<Etudiants />} />
      <Route path="/configurations" element={<Configurations />} />
      <Route path="/cours" element={<Cours />} />
      <Route path="/enseignants" element={<Enseignant />} />
      <Route path="/enseignements" element={<Enseignements />} />
      <Route path="/facturations" element={<Facturations />} />
      <Route path="/inscriptions" element={<Inscriptions />} />
    </Routes>
  );
};

export default MyRouter;
