import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { PersonneService } from '../../../Shared/Service/personne.service';
import { makeCriteria } from '../../../Shared/Utils/PersonneCriteria';
import { VariableService } from '../../../Shared/Service/variable.service';
import anneeList from '../../../Shared/List/AnneeList';
//import niveauxList from '../../../Shared/List/NiveauxList';
import mentionsList from '../../../Shared/List/MentionsList';
import { InscriptionsService } from '../../../Shared/Service/inscriptions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NiveauService } from 'src/app/Shared/Service/niveau.service';

@Component({
  selector: 'app-create-inscription',
  templateUrl: './create-inscription.component.html',
  styleUrls: ['./create-inscription.component.css'],
})
export class CreateInscriptionComponent implements OnInit {
  criteria = new FormControl('Nom');
  searchString = new FormControl('');
  disabled = true;
  niveaux = [];

  specialisations: any = {};

  pageSize = 10;
  page = 1;

  //@ts-ignore
  etudiantFormGroup: FormGroup;
  //@ts-ignore
  mentionFormGroup: FormGroup;

  etudiants: Observable<any> = new Observable<any>();
  mentions: Observable<any> = new Observable<any>();

  defaultParams = { params: 'statut', value: 'Etudiant' };
  params: any[] = [this.defaultParams];

  loading = true;
  noContent = true;

  sub: Subscription[] = [];

  anneeScolaire = anneeList;

  constructor(
    private _formBuilder: FormBuilder,
    private etudiantsService: PersonneService,
    private variableService: VariableService,
    private inscriptionService: InscriptionsService,
    private _snackBar: MatSnackBar,
    private route: Router,
    private niveauxService: NiveauService
  ) {}

  ngOnInit(): void {
    this.niveauxService.getNiveaux().subscribe(x => {
      this.niveaux = x.data;
      this.buildFormGroup();
      this.fetchMentions();
    })
  }

  buildFormGroup() {
    this.etudiantFormGroup = this._formBuilder.group({
      matricule: [null, [Validators.required, Validators.pattern('^\\d+$')]],
    });

    this.mentionFormGroup = this._formBuilder.group({
      mention: ['', Validators.required],
      specialisation: [''],
      anneeScolaire: [new Date().getFullYear(), Validators.required],
      niveau: ['', Validators.required],
    });
  }

  fetchEtudiants(pageIndex?: number, pageSize?: number) {
    this.noContent = false;
    this.loading = true;

    this.etudiants = this.etudiantsService.getPersonnes(
      this.params,
      pageIndex ? pageIndex + 1 : this.page,
      pageSize ? pageSize : this.pageSize
    );
  }

  fetchMentions() {
    this.mentions = this.variableService.getMentions();
  }

  search() {
    let criteria = makeCriteria(this.criteria.value);

    if (this.searchString.value !== '') {
      this.params.push({ params: criteria, value: this.searchString.value });
    }

    this.etudiants.subscribe((_) => {
      this.params = [this.defaultParams];
    });

    this.fetchEtudiants();
  }

  inscrireEtudiant(matricule: number) {
    this.etudiantFormGroup.controls['matricule'].setValue(matricule);
    this.etudiants = new Observable<any>();
    this.noContent = true;
  }

  setPage($event: any) {
    this.fetchEtudiants($event.pageIndex, $event.pageSize);
  }

  pullSpecialisationFromMentions(mention: any): any {
    switch (mention) {
      case 'MI':
        return mentionsList[0].specialisations;
      case 'EM':
        return mentionsList[1].specialisations;
      default:
        return [];
    }
  }

  createInscription(): any {
    let mention = mentionsList;
    let selectedMentions = mention.find((element) => {
      return (element.code = this.mentionFormGroup.controls['mention'].value);
    });

    // @ts-ignore
    selectedMentions.specialisations =
      this.mentionFormGroup.controls['niveau'].value === 'L3'
        ? this.mentionFormGroup.controls['specialisation'].value
        : '';

    const insc = {
      matricule: this.etudiantFormGroup.controls['matricule'].value,
      anneeScolaire: this.mentionFormGroup.controls['anneeScolaire'].value,
      niveau: this.mentionFormGroup.controls['niveau'].value,
      mention: selectedMentions,
    };

    console.log(insc);
    return insc;
  }

  sendInscription() {
    let message = '';
    let navigate = false;
    this.inscriptionService
      .createInscription(this.createInscription())
      .subscribe(
        (_) => {
          message = "L'inscription a été enregistré avec succès";
          navigate = true;

          let route = '/inscription';

          this.route.navigate([route]).then(() => {
            this._snackBar.open(message, 'OK');
          });
        },
        (_) => {
          message =
            "L'inscription a rencontré une erreur, cet étudiant est peut être déjà inscrit à ce parcours";

          let route = '/inscription';

          this.route.navigate([route]).then(() => {
            this._snackBar.open(message, 'OK');
          });
        }
      );
  }
}
