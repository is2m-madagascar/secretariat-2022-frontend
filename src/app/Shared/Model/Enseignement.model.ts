class EnseignementModel {
  anneeScolaire = 0; // 2021
  niveauEnseigne = ''; // L1
  mention = {
    mention: '',
    code: '',
    specialisations: '',
  };
  elementConstitutif = '';
  volumeHoraire = {
    days: 0,
    hours: 0,
    minutes: 0,
  };
  enseignant: any = null;
}

export default EnseignementModel;
