import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PersonneService } from '../../../Shared/Service/personne.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { makeCriteria } from '../../../Shared/Utils/PersonneCriteria';

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.css'],
})
export class EnseignantComponent implements OnInit {
  enseignants: Observable<any> = new Observable<any>();

  searchString = new FormControl('');
  criteria = new FormControl('Nom');
  grade = new FormControl('Tout');

  pageSize = 10;
  page = 1;

  defaultParams = { params: 'statut', value: 'Enseignant' };
  params: any[] = [this.defaultParams];

  loading = true;
  noContent = false;

  sub: Subscription[] = [];

  constructor(
    private personneService: PersonneService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEnseignant();
  }

  getEnseignant(pageIndex?: number, pageSize?: number) {
    this.noContent = false;
    this.loading = true;
    this.enseignants = this.personneService.getPersonnes(
      this.params,
      pageIndex ? pageIndex + 1 : this.page,
      pageSize ? pageSize : this.pageSize
    );

    this.sub.push(
      this.enseignants.subscribe((data) => {
        this.loading = false;
        if (data.data.length === 0) {
          this.noContent = true;
        }
      })
    );
  }

  navigateTo(route: String) {
    this.router.navigate([route]);
  }

  setPage($event: any) {
    this.getEnseignant($event.pageIndex, $event.pageSize);
  }

  search() {
    let criteria = makeCriteria(this.criteria.value);

    if (this.searchString.value !== '') {
      this.params.push({ params: criteria, value: this.searchString.value });
    }
    this.getEnseignant();
    this.enseignants.subscribe((_) => {
      this.params = [this.defaultParams];
    });
  }

  select($event: any) {
    if ($event.value === 'Tout') {
    }
  }

  makeGrade(grade: any): any {
    if (grade === 'Assistant') {
      return 'A';
    } else if (grade === 'Maître de conférence') {
      return 'MC';
    }
  }
}
