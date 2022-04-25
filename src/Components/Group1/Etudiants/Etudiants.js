import EtudiantsList from "./EtudiantsList";
import EtudiantsToolbox from "./EtudiantsToolbox";
import UIContainer from "../../UIGroup/UIContainer/UIContainer";

const Etudiant = () => {
  return (
    <UIContainer list={<EtudiantsList />} toolbox={<EtudiantsToolbox />} />
  );
};

export default Etudiant;
