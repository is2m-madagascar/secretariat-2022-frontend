const makeCriteria = (criteria: string) => {
  let temp = '';
  if (criteria === 'Nom') {
    temp = 'nomPrenom.nom';
  } else if (criteria === 'Prénoms') {
    temp = 'nomPrenom.prenoms';
  } else {
    temp = 'matricule';
  }

  return temp;
};

export { makeCriteria };
