class PersonneModel {
  matricule: Number = 0;
  nomPrenom: { nom: String; prenom: String } = { nom: '', prenom: '' };
  statut: String = '';
  grade: String = '';
}

export default PersonneModel;
