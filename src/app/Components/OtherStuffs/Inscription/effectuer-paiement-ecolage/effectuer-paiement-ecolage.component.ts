import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EcolageService } from '../../../../Shared/Service/ecolage.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-effectuer-paiement-ecolage',
  templateUrl: './effectuer-paiement-ecolage.component.html',
  styleUrls: ['./effectuer-paiement-ecolage.component.css'],
})
export class EffectuerPaiementEcolageComponent implements OnInit, OnDestroy {
  @Input() insc?: any;

  motifs = ["Frais d'inscription", 'Frais de scolarité'];
  paiements: any[] = [];

  sub: Subscription[] = [];

  montant = new FormControl(null, [
    Validators.required,
    Validators.pattern('^\\d+$'),
  ]);

  motif = new FormControl('', [Validators.required]);

  constructor(
    private ecolage: EcolageService,
    private _snackbar: MatSnackBar,
    private route: Router
  ) {}

  ngOnInit(): void {}

  ajouterPayement() {
    this.paiements.push({
      montant: this.montant.value,
      motif: this.motif.value,
    });
    this.motif.reset();
    this.montant.reset();
  }

  deletePaiement(paiement: any) {
    const indexOfPaiement = this.paiements.indexOf(paiement);
    this.paiements.splice(indexOfPaiement, 1);
  }

  buildPaiement() {
    const motif: any[] = [];
    const montant: any[] = [];
    this.paiements.forEach((element) => {
      motif.push(element.motif);
      montant.push(element.montant);
    });

    return { motif, montant };
  }

  effectuerPayements() {
    if (this.paiements.length !== 0) {
      let message = '';
      let navigate = false;
      this.sub.push(
        this.ecolage
          .payerEcolage(this.insc._id, this.buildPaiement())
          .subscribe(
            (x) => {
              message = 'Paiement effectué avec succes';
              navigate = true;
              this.route.navigate(['/inscription']).then(() => {
                this._snackbar.open(message, 'OK');
                setTimeout(() => {
                  location.reload(), 3000;
                });
              });
            },
            (err) => {
              message = 'Erreur lors du paiement';
              this._snackbar.open(message, 'OK');
            },
            () => {}
          )
      );
    } else {
      this._snackbar.open('Veuillez ajouter un paiement', 'OK');
    }
  }

  ngOnDestroy() {
    this.sub.forEach((element) => {
      element.unsubscribe();
    });
  }
}
