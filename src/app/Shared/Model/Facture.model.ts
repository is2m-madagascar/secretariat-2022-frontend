import PersonneModel from './Personne.model';

class FactureModel {
  anneeScolaire: Number = 0;
  enseignant: any = null;
  mois: Number = 0;
  montantTotal: Number = 0;
  cours: any = [];
  payee: boolean = false;
}

export default FactureModel;
