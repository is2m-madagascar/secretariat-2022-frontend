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
import { ChangelogsComponent } from './Components/changelogs/changelogs.component';

const routes: Routes = [
  {
    path: '',
    component: EtudiantContainerComponent,
  },
  {
    path: 'etudiant',
    component: EtudiantContainerComponent,
  },
  {
    path: 'ecolage/payer',
    component: EffectuerPaiementEcolageComponent,
  },
  { path: 'inscription', component: InscriptionContainerComponent },
  {
    path: 'enseignant',
    component: EnseignantContainerComponent,
  },
  
  { path: 'enseignement', component: EnseignementComponent },
  { path: 'facture', component: FactureContainerComponent },
  { path: 'cours', component: CoursContainerComponent },
  { path: 'config', component: ConfigurationsComponent },
  {
    path: 'changelogs',
    component: ChangelogsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
