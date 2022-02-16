class InscriptionModel {
  etudiant: String = '';
  dateInscription: Date = new Date();
  anneeScolaire: Number = 0;
  niveau: String = '';
  mention: { mention: String; code: String; specialisation: String } = {
    mention: '',
    code: '',
    specialisation: '',
  };
  ecolage: {
    montantTotal: {
      fraisInsc: Number;
      fraisFormation: Number;
    };
    paiementsEffectues?: [
      { montant: [Number]; datePaiement: Date; motif: [String] }
    ];
  } = {
    montantTotal: { fraisInsc: 0, fraisFormation: 0 },
  };
}

export default InscriptionModel;
