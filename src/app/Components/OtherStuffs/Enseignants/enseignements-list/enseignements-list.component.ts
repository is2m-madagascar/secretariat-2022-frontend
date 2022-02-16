import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import anneeList from 'src/app/Shared/List/AnneeList';
import { EnseignementService } from '../../../../Shared/Service/enseignement.service';

@Component({
  selector: 'app-enseignements-list',
  templateUrl: './enseignements-list.component.html',
  styleUrls: ['./enseignements-list.component.css'],
})
export class EnseignementsListComponent implements OnInit, OnDestroy {
  @Input() enseignant!: any;

  params: any[] = [];

  enseignements: Observable<any> = new Observable<any>();
  sub: Subscription[] = [];

  pageSize = 1000;
  page = 1;
  loading = true;
  noContent = false;

  anneeList = anneeList;

  anneeScolaire = new FormControl(new Date().getFullYear(), []);

  constructor(private enseignementService: EnseignementService) {}

  ngOnInit(): void {
    this.buildParams();
    this.getEnseignements();
  }

  buildParams() {
    this.params = [
      { params: 'enseignant', value: this.enseignant._id },
      { params: 'anneeScolaire', value: this.anneeScolaire.value },
    ];
  }

  getEnseignements(pageIndex?: number, pageSize?: number) {
    this.noContent = false;
    this.loading = true;
    this.enseignements = this.enseignementService.getEnseignements(
      this.params,
      pageIndex ? pageIndex + 1 : this.page,
      pageSize ? pageSize : this.pageSize
    );

    this.sub.push(
      this.enseignements.subscribe((data) => {
        this.loading = false;
        if (data.data.length === 0) {
          this.noContent = true;
        }
      })
    );
  }

  setAnnee($event?: any) {
    this.buildParams();
    this.params[1].value = $event.value;
    this.getEnseignements();
  }

  ngOnDestroy() {
    this.sub.forEach((element) => {
      element.unsubscribe();
    });
  }

  getHours(volumeHoraire: any) {
    let duree: any = volumeHoraire.hours;
    duree += volumeHoraire.days * 24;
    return duree;
  }
}
