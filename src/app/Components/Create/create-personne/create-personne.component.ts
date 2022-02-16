import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonneService } from '../../../Shared/Service/personne.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-personne',
  templateUrl: './create-personne.component.html',
  styleUrls: ['./create-personne.component.css'],
})
export class CreatePersonneComponent implements OnInit, OnDestroy {
  formGroup = new FormGroup({
    matricule: new FormControl(null, [
      Validators.required,
      Validators.pattern('^\\d+$'),
    ]),
    nom: new FormControl(null, [
      Validators.required,
      Validators.min(1),
      Validators.pattern('[A-Za-zÀ-ÖØ-öø-ÿ]*'),
    ]),
    prenoms: new FormControl(null, [
      Validators.required,
      Validators.min(1),
      Validators.pattern('[A-Za-zÀ-ÖØ-öø-ÿ]*'),
    ]),
    type: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(2),
    ]),
    grade: new FormControl(1),
  });
  showGrade = false;
  choix = [
    { id: 0, label: 'Choisissez une option' },
    { id: 1, label: 'Etudiant' },
    { id: 2, label: 'Enseignant' },
  ];
  grades = [
    { id: 0, label: 'Assistant' },
    { id: 1, label: 'Maître de conférence' },
  ];

  sub: Subscription[] = [];

  avalaibleRoutes = ['/etudiant', '/enseignant'];

  constructor(
    private personneService: PersonneService,
    private _snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onClick($event: any) {
    $event.preventDefault();
    let message = { text: '', success: false };
    this.sub.push(
      this.personneService.createPersonne(this.createPersonne()).subscribe(
        (_) => {
          message.text = 'Enregistrement éffectué avec succès';
          message.success = true;
        },
        (err) => {
          message.text = 'Enregistrement échoué avec une erreur: ' + err;
        },
        () => {
          this._snackbar.open(message.text, 'ok');
          if (message.success) {
            this.navigate();
          }
        }
      )
    );
  }

  navigate() {
    let navigation = '';

    //étudiant
    if (this.createPersonne().statut === this.choix[1].label) {
      navigation = this.avalaibleRoutes[0];
    }
    //enseignant
    else if (this.createPersonne().statut === this.choix[2].label) {
      navigation = this.avalaibleRoutes[1];
    }
    this.router.navigate([navigation]);
  }

  createPersonne(): any {
    const fgValue = this.formGroup.controls;
    let statut = this.choix[fgValue['type'].value].label;

    let grade = null;
    if (fgValue['type'].value === 2) {
      grade = this.grades[fgValue['grade'].value].label;
    }

    return {
      matricule: this.formGroup.controls['matricule'].value,
      nomPrenom: {
        nom: fgValue['nom'].value,
        prenoms: fgValue['prenoms'].value,
      },
      statut,
      grade,
    };
  }

  ngOnDestroy(): void {
    this.sub.forEach((element) => element.unsubscribe());
  }

  onSelectionChange($event: any) {
    this.showGrade = $event.value === 2;
  }
}
