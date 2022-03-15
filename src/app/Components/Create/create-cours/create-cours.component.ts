import { Component, OnDestroy, OnInit } from '@angular/core';
//import niveauxList from '../../../Shared/List/NiveauxList';
import anneeList from '../../../Shared/List/AnneeList';
import mentionsList from '../../../Shared/List/MentionsList';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EnseignementService } from '../../../Shared/Service/enseignement.service';
import { NiveauService } from 'src/app/Shared/Service/niveau.service';

@Component({
  selector: 'app-create-cours',
  templateUrl: './create-cours.component.html',
  styleUrls: ['./create-cours.component.css'],
})
export class CreateCoursComponent implements OnInit, OnDestroy {
  niveaux = [];
  anneeScolaire = [...anneeList];
  mentions = [...mentionsList];

  niveauSelected = new FormControl('L1', []);
  anneeSelected = new FormControl(new Date().getFullYear(), []);
  mentionSelected = new FormControl('MI', []);

  //enseignement: Observable<any> = new Observable<any>();

  enseignement: any = { data: null, size: null, page: null };
  //cours: Observable<any> = new Observable<any>();

  pageSize = 10;
  page = 1;

  loading = true;
  noContent = false;

  ajout = false;
  selectedEns = { _id: '', elementConst: '' };

  params: any[] = [];

  sub: Subscription[] = [];

  constructor(private enseignementService: EnseignementService, private niveauxService: NiveauService) {}

  ngOnInit(): void {
    this.niveauxService.getNiveaux().subscribe(x => {
      this.niveaux = x.data;
      this.params = [
        { params: 'anneeScolaire', value: new Date().getFullYear() },
        { params: 'niveauEnseigne', value: this.niveauSelected.value },
        { params: 'mention.code', value: this.mentionSelected.value },
      ];
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

    this.sub.push(
      this.enseignementService
        .getEnseignements(
          this.params,
          pageIndex ? pageIndex + 1 : this.page,
          pageSize ? pageSize : this.pageSize
        )
        .subscribe((data) => {
          this.enseignement = data;
          this.loading = false;
          if (data.data.length === 0) {
            this.noContent = true;
          }
        })
    );
  }

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
    this.params[id].value = $event.value;
  }

  change(field: string, $event: any) {
    this.buildParams(field, $event);
    this.getEnseignements();
    this.ajout = false;
  }

  setPage($event: any) {
    this.getEnseignements($event.pageIndex, $event.pageSize);
  }

  selectCours($event: any) {
    this.ajout = true;
    const value = $event.option.value;
    this.selectedEns = {
      _id: value._id,
      elementConst: value.elementConstitutif,
    };
  }

  toogleView() {
    this.ajout = false;
  }
}
