import { Component, OnDestroy, OnInit } from '@angular/core';
import { PersonneService } from '../../../Shared/Service/personne.service';
import { Observable, Subscription } from 'rxjs';
import AnneeList from '../../../Shared/List/AnneeList';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { makeCriteria } from '../../../Shared/Utils/PersonneCriteria';
import { MatTableDataSource } from "@angular/material/table";
import { CustomLogService } from "../../../Shared/Service/custom-log.service";

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css'],
})
export class EtudiantComponent implements OnInit, OnDestroy {

  etudiants: any[] = [];
  responseSize: any = null;
  responsePage: any = null;

  //form
  selectedFilter = new FormControl();
  inputForm = new FormControl();
  defaultParams = { params: 'statut', value: 'Etudiant' };
  params: any[] = [this.defaultParams];
  //end Form

  //Page config
  loading = true;
  noContent = false;
  pageSize = 10;
  page = 1;
  //End page config

  //columns
  displayedColumns: string[] = ['Photo', 'Matricule', 'Nom', 'Prénom', 'Actions'];
  dataSource = new MatTableDataSource<any>(this.etudiants);
  //end columns

  /*etudiants: Observable<any> = new Observable();
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

  sub: Subscription[] = [];*/

  constructor(
    private etudiantService: PersonneService,
    private console: CustomLogService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.getEtudiants();
  }

  ngOnDestroy() {
  }

  async getEtudiants(pageIndex?: number, pageSize?: number){
    const temp: any = await this.etudiantService.getPersonnesV2(
      this.params,
      pageIndex ? pageIndex + 1 : this.page,
      pageSize ? pageSize : this.pageSize
    )
    this.console.log(temp);
    this.etudiants = temp?.data[0];
    this.responseSize = temp?.message.pagination.totalElements;
    this.responsePage = temp?.message.pagination.pageIndex;
    this.dataSource = new MatTableDataSource<any>(this.etudiants);
    return this.etudiants;
  }

  async setPage($event: any){
    await this.getEtudiants($event.pageIndex, $event.pageSize);
  }

  navigateTo(route: String) {
    this.router.navigate([route]);
  }

  /*getEtudiants(pageIndex?: number, pageSize?: number) {
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
  }*/
}
