const makeEnseignement = (
  niveauEns: String,
  anneeScolaire: Number,
  elementConstitutif: any,
  volumeHoraire: any,
  semestre: Number,
  enseignant?: Number
) => {
  let niveau = '';
  let mention: any = null;
  switch (niveauEns) {
    case 'MIL1':
      niveau = 'L1';
      mention = {
        mention: 'Mathématique appliqués et informatique',
        code: 'MI',
        specialisations: '',
      };
      break;
    case 'EML1':
      niveau = 'L1';
      mention = {
        mention: 'Economie-Management',
        code: 'EM',
        specialisations: '',
      };
      break;
    case 'MIL2':
      niveau = 'L2';
      mention = {
        mention: 'Mathématique appliqués et informatique',
        code: 'MI',
        specialisations: '',
      };
      break;
    case 'EML2':
      niveau = 'L2';
      mention = {
        mention: 'Economie-Management',
        code: 'EM',
        specialisations: '',
      };
      break;
    case 'MIL3-CM':
      niveau = 'L3';
      mention = {
        mention: 'Mathématique appliqués et informatique',
        code: 'MI',
        specialisations: 'Création multimedia',
      };
      break;
    case 'MIL3-GL':
      niveau = 'L3';
      mention = {
        mention: 'Mathématique appliqués et informatique',
        code: 'MI',
        specialisations: 'Génie logiciel',
      };
      break;
    case 'EML3-EC':
      niveau = 'L3';
      mention = {
        mention: 'Economie-Management',
        code: 'EM',
        specialisations: 'Econométrie',
      };
      break;
    case 'EML3-ME':
      niveau = 'L3';
      mention = {
        mention: 'Economie-Management',
        code: 'EM',
        specialisations: "Management d'entreprise",
      };
      break;
    case 'EML3-MA':
      niveau = 'L3';
      mention = {
        mention: 'Economie-Management',
        code: 'EM',
        specialisations: 'Marketing',
      };
      break;
  }

  return {
    anneeScolaire,
    niveauEnseigne: niveau,
    mention,
    elementConstitutif,
    volumeHoraire,
    semestre,
    enseignant,
  };
};

export { makeEnseignement };
