import { Component, OnDestroy, OnInit } from '@angular/core';
//import niveauxList from '../../../Shared/List/NiveauxList';
import anneeList from '../../../Shared/List/AnneeList';
import mentionsList from '../../../Shared/List/MentionsList';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { EnseignementService } from '../../../Shared/Service/enseignement.service';
import { NiveauService } from 'src/app/Shared/Service/niveau.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css'],
})
export class CoursComponent implements OnInit, OnDestroy {

  niveaux : any [] = [];
  anneeScolaire = [...anneeList];
  mentions = [{ mention: 'Aucun', code: 'Aucun' }].concat([...mentionsList]);

  niveauSelected = new FormControl(null, []);
  anneeSelected = new FormControl(new Date().getFullYear(), []);
  mentionSelected = new FormControl(null, []);

  enseignement: Observable<any> = new Observable<any>();

  cours: Observable<any> = new Observable<any>();

  pageSize = 10;
  page = 1;

  loading = true;
  noContent = false;

  consultation = false;
  selectedEns = { _id: '', elementConst: '' };

  params: any[] = [
    { params: 'anneeScolaire', value: new Date().getFullYear() },
    { params: 'niveauEnseigne', value: '^' },
    { params: 'mention.code', value: '^' },
  ];

  sub: Subscription[] = [];

  constructor(private enseignementService: EnseignementService, private niveauxService: NiveauService) {}

  ngOnInit(): void {
    this.niveauxService.getNiveaux().subscribe(x => {
      //TODO asina aucun
      this.niveaux = [...x.data];
      this.getEnseignements();
    })
  }

  ngOnDestroy(): void {
    this.sub.forEach((element) => {
      element.unsubscribe();
    });
  }

  getEnseignements(pageIndex?: number, pageSize?: number) {
    this.noContent = false;
    this.loading = true;
    this.enseignement = this.enseignementService.getEnseignements(
      this.params,
      pageIndex ? pageIndex + 1 : this.page,
      pageSize ? pageSize : this.pageSize
    );

    this.sub.push(
      this.enseignement.subscribe((data) => {
        this.loading = false;
        if (data.data.length === 0) {
          this.noContent = true;
        }
      })
    );
  }

  getCours() {}

  buildParams(field: string, $event: any) {
    let id = 0;
    switch (field) {
      case 'annee':
        id = 0;
        break;
      case 'niveau':
        id = 1;
        break;
      case 'mention':
        id = 2;
        break;
    }
    if ($event.value !== 'Aucun') {
      this.params[id].value = $event.value;
    } else {
      this.params[id].value = '^';
    }
  }

  change(field: string, $event: any) {
    this.buildParams(field, $event);
    this.getEnseignements();
    this.consultation = false;
  }

  setPage($event: any) {
    this.getEnseignements($event.pageIndex, $event.pageSize);
  }

  selectCours($event: any) {
    this.consultation = true;
    const value = $event.option.value;
    this.selectedEns = {
      _id: value._id,
      elementConst: value.elementConstitutif,
    };
  }
}
