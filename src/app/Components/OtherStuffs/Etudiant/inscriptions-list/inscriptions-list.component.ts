import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { InscriptionsService } from '../../../../Shared/Service/inscriptions.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-inscriptions-list',
  templateUrl: './inscriptions-list.component.html',
  styleUrls: ['./inscriptions-list.component.css'],
})
export class InscriptionsListComponent implements OnInit, OnDestroy {
  inscriptions: Observable<any> = new Observable<any>();
  loading = false;
  sub: Subscription[] = [];

  constructor(private inscriptionService: InscriptionsService) {}

  @Input() etudiantID: string = '';

  ngOnInit(): void {
    this.getInscriptionsByEtudiant().then(() => {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    });
  }

  async getInscriptionsByEtudiant() {
    this.loading = true;
    this.inscriptions = await this.inscriptionService.getInsciptions(
      [{ params: 'etudiant', value: this.etudiantID }],
      1,
      20
    );
  }

  ngOnDestroy(): void {
    this.sub.forEach((element) => {
      element.unsubscribe();
    });
  }
}
