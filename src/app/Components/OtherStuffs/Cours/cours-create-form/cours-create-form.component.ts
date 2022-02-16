import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CoursService } from '../../../../Shared/Service/cours.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cours-create-form',
  templateUrl: './cours-create-form.component.html',
  styleUrls: ['./cours-create-form.component.css'],
})
export class CoursCreateFormComponent implements OnInit, OnDestroy {
  @Input() enseignement!: any;
  @Input() anneeScolaire!: any;

  sub: Subscription[] = [];

  constructor(
    private coursService: CoursService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.enseignement);
    console.log(this.anneeScolaire);
  }

  ngOnDestroy() {}

  buildRequest() {
    const cours = {
      enseignement_id: this.enseignement._id,
      anneeScolaire: this.anneeScolaire,
    };

    this.sub.push(
      this.coursService.ouvrirCours(cours).subscribe(
        (_) => {
          this.router.navigate(['/cours']).then(() => {
            this._snackBar.open('Le cours a été ouvert avec succès', 'OK');
            location.reload();
          });
        },
        (err) => {
          console.error(err);
          this._snackBar.open("L'ouverture du cours a rencontré une erreur");
          location.reload();
        }
      )
    );
  }
}
