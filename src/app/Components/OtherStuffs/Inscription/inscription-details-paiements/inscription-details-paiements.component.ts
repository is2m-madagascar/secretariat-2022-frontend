import { Component, Input, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription-details-paiements',
  templateUrl: './inscription-details-paiements.component.html',
  styleUrls: ['./inscription-details-paiements.component.css'],
})
export class InscriptionDetailsPaiementsComponent implements OnInit {
  @Input() insc?: any = null;

  displayedColumns: string[] = ['datePaiement', 'montant', 'motif'];
  payee = { insc: 0, frais: 0 };
  total = { insc: 0, frais: 0 };
  reste = { insc: 0, frais: 0 };
  payeTemp = 0;

  payer = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.total = {
      insc: this.insc.ecolage.montantTotal.fraisInsc,
      frais: this.insc.ecolage.montantTotal.fraisFormation,
    };
    this.insc.ecolage.paiementsEffectues.forEach((element: any) => {
      element.montant.forEach((montant: any) => {
        this.payeTemp += montant;
      });
    });

    if (this.payeTemp > this.total.insc) {
      this.payee.insc = this.total.insc;
      this.payee.frais = this.payeTemp - this.total.insc;
    } else {
      this.payee.insc = this.payeTemp;
      this.payee.frais = 0;
    }
    this.reste.insc = this.total.insc - this.payee.insc;
    this.reste.frais = this.total.frais - this.payee.frais;
  }

  toLocalDate(date: string) {
    return formatDate(date, 'shortDate', 'fr-FR');
  }

  tooglePayer() {
    this.payer = !this.payer;
  }
}
