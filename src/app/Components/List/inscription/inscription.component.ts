import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { InscriptionsService } from '../../../Shared/Service/inscriptions.service';
import NiveauxList from '../../../Shared/List/NiveauxList';
import { VariableService } from '../../../Shared/Service/variable.service';
import AnneeList from '../../../Shared/List/AnneeList';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
})
export class InscriptionComponent implements OnInit, OnDestroy {
  inscriptions: Observable<any> = new Observable<any>();
  mentions: Observable<any> = new Observable<any>();

  niveaux = NiveauxList;
  annees = AnneeList;

  selectedNiveau = 0;
  selectedMentionCode = 'MI';
  selectedAnnee = new Date().getFullYear();

  loading = true;
  noContent = false;

  pageSize = 10;
  page = 1;

  sub: Subscription[] = [];

  constructor(
    private inscriptionService: InscriptionsService,
    private variablesService: VariableService
  ) {}

  ngOnDestroy(): void {
    this.sub.forEach((element) => {
      element.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.mentions = this.variablesService.getMentions();
    this.getInscriptions();
  }

  getInscriptions(pageIndex?: number, pageSize?: number) {
    this.loading = true;
    this.inscriptions = this.inscriptionService.getInsciptions(
      [
        this.makeNiveauParams(),
        this.makeAnneeParams(),
        this.makeMentionParams(),
      ],
      pageIndex ? pageIndex + 1 : this.page,
      pageSize ? pageSize : this.pageSize
    );

    this.sub.push(
      this.inscriptions.subscribe((data) => {
        this.loading = false;
        if (data.data.length === 0) {
          this.noContent = true;
        }
      })
    );
  }

  setPage($event: any) {
    this.getInscriptions($event.pageIndex, $event.pageSize);
  }

  setTabChange($event: any) {
    this.selectedNiveau = $event;
    this.getInscriptions();
  }

  private makeNiveauParams() {
    let value = 'L1';
    switch (this.selectedNiveau) {
      case 1:
        value = 'L2';
        break;
      case 2:
        value = 'L3';
        break;
      case 3:
        value = 'M1';
        break;
      case 4:
        value = 'M2';
        break;
      default:
        value = 'L1';
        break;
    }

    return { params: 'niveau', value };
  }
  private makeAnneeParams() {
    return { params: 'anneeScolaire', value: this.selectedAnnee.toString() };
  }
  private makeMentionParams() {
    return { params: 'mention.code', value: this.selectedMentionCode };
  }
}
