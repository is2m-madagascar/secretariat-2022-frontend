import { Component, OnDestroy, OnInit } from '@angular/core';
import { PersonneService } from '../../../Shared/Service/personne.service';
import { Observable, Subscription } from 'rxjs';
import AnneeList from '../../../Shared/List/AnneeList';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { makeCriteria } from '../../../Shared/Utils/PersonneCriteria';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css'],
})
export class EtudiantComponent implements OnInit, OnDestroy {
  etudiants: Observable<any> = new Observable();
  annees = AnneeList;
  selectedAnnee = new Date().getFullYear();
  searchString = new FormControl('');
  criteria = new FormControl('Nom');

  defaultParams = { params: 'statut', value: 'Etudiant' };
  params: any[] = [this.defaultParams];

  pageSize = 10;
  page = 1;

  loading = true;
  noContent = false;

  sub: Subscription[] = [];

  constructor(
    private etudiantService: PersonneService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEtudiants();
  }

  navigateTo(route: String) {
    this.router.navigate([route]);
  }

  getEtudiants(pageIndex?: number, pageSize?: number) {
    this.noContent = false;
    this.loading = true;
    this.etudiants = this.etudiantService.getPersonnes(
      this.params,
      pageIndex ? pageIndex + 1 : this.page,
      pageSize ? pageSize : this.pageSize
    );

    this.sub.push(
      this.etudiants.subscribe((data) => {
        this.loading = false;
        if (data.data.length === 0) {
          this.noContent = true;
        }
      })
    );
  }

  setPage($event: any) {
    this.getEtudiants($event.pageIndex, $event.pageSize);
  }

  search() {
    let criteria = makeCriteria(this.criteria.value);

    if (this.searchString.value !== '') {
      this.params.push({ params: criteria, value: this.searchString.value });
    }

    this.getEtudiants();

    this.sub.push(
      this.etudiants.subscribe((_) => {
        this.params = [this.defaultParams];
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.forEach((element) => element.unsubscribe());
  }
}
