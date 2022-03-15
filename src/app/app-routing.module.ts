import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnseignementComponent } from './Components/List/enseignement/enseignement.component';
import { CoursContainerComponent } from './Components/Containers/cours-container/cours-container.component';
import { ConfigurationsComponent } from './Components/configurations/configurations.component';
import { EffectuerPaiementEcolageComponent } from './Components/OtherStuffs/Inscription/effectuer-paiement-ecolage/effectuer-paiement-ecolage.component';
import { EtudiantContainerComponent } from './Components/Containers/etudiant-container/etudiant-container.component';
import { EnseignantContainerComponent } from './Components/Containers/enseignant-container/enseignant-container.component';
import { InscriptionContainerComponent } from './Components/Containers/inscription-container/inscription-container.component';
import { FactureContainerComponent } from './Components/Containers/facture-container/facture-container.component';

const routes: Routes = [
  {
    path: '',
    component: EtudiantContainerComponent,
  },
  {
    path: 'etudiants',
    component: EtudiantContainerComponent,
  },
  {
    path: 'ecolage/payer',
    component: EffectuerPaiementEcolageComponent,
  },
  { path: 'inscriptions', component: InscriptionContainerComponent },
  {
    path: 'enseignants',
    component: EnseignantContainerComponent,
  },
  { path: 'enseignements', component: EnseignementComponent },
  { path: 'facturations', component: FactureContainerComponent },
  { path: 'cours', component: CoursContainerComponent },
  { path: 'configurations', component: ConfigurationsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
