class CoursModel {
  enseignement: any = null;
  debut: Date = new Date();
  fin?: Date;
  volumeConsomme?: any = {};
  enseignant: any = null;
  closed = false;
  factureId = '';
}

export default CoursModel;
