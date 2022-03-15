import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppBarComponent } from './Components/UI-utils/app-bar/app-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DrawerComponent } from './Components/UI-utils/drawer/drawer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { EnseignantComponent } from './Components/List/enseignant/enseignant.component';
import { InscriptionComponent } from './Components/List/inscription/inscription.component';
import { EnseignementComponent } from './Components/List/enseignement/enseignement.component';
import { EtudiantComponent } from './Components/List/etudiant/etudiant.component';
import { ConfigurationsComponent } from './Components/configurations/configurations.component';
import { FactureComponent } from './Components/List/facture/facture.component';
import { CoursContainerComponent } from './Components/Containers/cours-container/cours-container.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CreatePersonneComponent } from './Components/Create/create-personne/create-personne.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatCardModule } from '@angular/material/card';
import { InscriptionsListComponent } from './Components/OtherStuffs/Etudiant/inscriptions-list/inscriptions-list.component';
import { MatChipsModule } from '@angular/material/chips';
import { ContentLoadComponent } from './Components/UI-utils/content-load/content-load.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InscriptionDetailsPaiementsComponent } from './Components/OtherStuffs/Inscription/inscription-details-paiements/inscription-details-paiements.component';
import { MatTableModule } from '@angular/material/table';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { CreateInscriptionComponent } from './Components/Create/create-inscription/create-inscription.component';
import { MatStepperModule } from '@angular/material/stepper';
import { EffectuerPaiementEcolageComponent } from './Components/OtherStuffs/Inscription/effectuer-paiement-ecolage/effectuer-paiement-ecolage.component';
import { EtudiantContainerComponent } from './Components/Containers/etudiant-container/etudiant-container.component';
import { EnseignantContainerComponent } from './Components/Containers/enseignant-container/enseignant-container.component';
import { InscriptionContainerComponent } from './Components/Containers/inscription-container/inscription-container.component';
import { MatSliderModule } from '@angular/material/slider';
import { CoursComponent } from './Components/List/cours/cours.component';
import { CreateCoursComponent } from './Components/Create/create-cours/create-cours.component';
import { CoursListAllComponent } from './Components/List/cours-list-all/cours-list-all.component';
import { CoursListForSpecifiedEnsComponent } from './Components/OtherStuffs/Cours/cours-list-for-specified-ens/cours-list-for-specified-ens.component';
import { CoursListByEnseignantComponent } from './Components/List/cours-list-by-enseignant/cours-list-by-enseignant.component';
import { CoursCreateFormComponent } from './Components/OtherStuffs/Cours/cours-create-form/cours-create-form.component';
import { EnseignementsListComponent } from './Components/OtherStuffs/Enseignants/enseignements-list/enseignements-list.component';
import { FactureContainerComponent } from './Components/Containers/facture-container/facture-container.component';
registerLocaleData(localeFr);

import { FlexLayoutModule } from '@angular/flex-layout';
import { SidenavComponent } from './Components/UI-utils/sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    AppBarComponent,
    DrawerComponent,
    EnseignantComponent,
    InscriptionComponent,
    EnseignementComponent,
    EtudiantComponent,
    ConfigurationsComponent,
    FactureComponent,
    CoursContainerComponent,
    CreatePersonneComponent,
    InscriptionsListComponent,
    ContentLoadComponent,
    InscriptionDetailsPaiementsComponent,
    CreateInscriptionComponent,
    EffectuerPaiementEcolageComponent,
    EtudiantContainerComponent,
    EnseignantContainerComponent,
    InscriptionContainerComponent,
    CoursComponent,
    CreateCoursComponent,
    CoursListAllComponent,
    CoursListForSpecifiedEnsComponent,
    CoursListByEnseignantComponent,
    CoursCreateFormComponent,
    EnseignementsListComponent,
    FactureContainerComponent,
    SidenavComponent,
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    MatPaginatorModule,
    MatExpansionModule,
    HttpClientModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    NgxMatFileInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule,
    MatProgressBarModule,
    NgxSkeletonLoaderModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    MatTableModule,
    MatStepperModule,
    MatSliderModule,
  ],
  providers: [HttpClientModule, { provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
