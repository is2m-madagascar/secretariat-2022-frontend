import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { PersonneService } from '../../../Shared/Service/personne.service';
import { makeCriteria } from '../../../Shared/Utils/PersonneCriteria';
import anneeList from '../../../Shared/List/AnneeList';
import moisList from '../../../Shared/List/MoisList';
import { FactureService } from '../../../Shared/Service/facture.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css'],
})
export class FactureComponent implements OnInit, OnDestroy {
  criteria = new FormControl('Nom');
  searchString = new FormControl('');

  showEns = false;
  enseignants: Observable<any> = new Observable<any>();

  loading = true;
  noContent = true;
  pageSize = 10;
  page = 1;

  defaultParams = { params: 'statut', value: 'Enseignant' };
  params: any[] = [this.defaultParams];

  factureParams: any[] = [];

  sub: Subscription[] = [];

  anneList = anneeList;
  moisList = moisList;
  payee = [
    { value: true, label: 'Payés' },
    { value: false, label: 'Impayés' },
    { value: '^', label: 'Tout' },
  ];

  factures: Observable<any> = new Observable<any>();

  fLoading = true;
  fNoContent = true;
  fPageSize = 10;
  fPage = 1;
  facturePayee = new FormControl(true, []);
  factureEnseignant = new FormControl('', []);
  factureAnneeScolaire = new FormControl(new Date().getFullYear());
  factureMois = new FormControl(0, []);

  constructor(
    private factureService: FactureService,
    private personneService: PersonneService
  ) {}

  ngOnInit(): void {
    this.getFactures();
  }

  ngOnDestroy() {
    this.sub.forEach((element) => {
      element.unsubscribe();
    });
  }

  getEnseignants(pageIndex?: number, pageSize?: number) {
    this.noContent = false;
    this.loading = true;
    this.showEns = true;
    this.enseignants = this.personneService.getPersonnes(
      this.params,
      pageIndex ? pageIndex + 1 : this.page,
      pageSize ? pageSize : this.pageSize
    );
  }

  setPage($event: any) {
    this.getEnseignants($event.pageIndex, $event.pageSize);
  }

  search() {
    let criteria = makeCriteria(this.criteria.value);

    if (this.searchString.value !== '') {
      this.params.push({ params: criteria, value: this.searchString.value });
    }

    this.enseignants.subscribe((_) => {
      this.params = [this.defaultParams];
    });

    this.getEnseignants();
  }

  choisirEnseignant(id: string) {
    this.factureEnseignant.setValue(id);
    this.showEns = false;
  }

  resetEns() {
    this.factureEnseignant.reset();
    this.enseignants = new Observable<any>();
    this.showEns = false;
  }

  resetMois() {
    this.factureMois.reset();
  }

  getFactures(pageIndex?: number, pageSize?: number) {
    this.fNoContent = false;
    this.fLoading = true;
    this.factures = this.factureService.getFactures(
      this.factureParams,
      pageIndex ? pageIndex + 1 : this.fPage,
      pageSize ? pageSize : this.fPageSize
    );

    this.sub.push(
      this.factures.subscribe((data) => {
        this.fLoading = false;
        if (data.data.length === 0) {
          this.fNoContent = true;
        }
      })
    );
  }

  setAnneeForChange($event: any) {}

  setMoisForChange($event: any) {}

  setPayeeForChange($event: any) {}

  setPageFacture($event: any) {
    this.getFactures($event.pageIndex, $event.pageSize);
  }
}
