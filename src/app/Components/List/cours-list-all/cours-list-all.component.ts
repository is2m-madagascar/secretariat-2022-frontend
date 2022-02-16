import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CoursService } from '../../../Shared/Service/cours.service';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cours-list-all',
  templateUrl: './cours-list-all.component.html',
  styleUrls: ['./cours-list-all.component.css'],
})
export class CoursListAllComponent implements OnInit {
  pageSize = 10;
  page = 1;
  loading = true;
  noContent = false;

  closedStatus = [
    { value: '^', label: 'Fermés et ouverts' },
    { value: true, label: 'Fermés' },
    { value: false, label: 'Ouverts' },
  ];
  closed = new FormControl('^', []);

  params: any[] = [];

  sub: Subscription[] = [];

  //cours: Observable<any> = new Observable<any>();
  cours: any = {};

  constructor(
    private coursService: CoursService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getCours();
  }

  ngOnDestroy(): void {
    this.sub.forEach((element) => {
      element.unsubscribe();
    });
  }

  getCours(pageIndex?: number, pageSize?: number) {
    this.noContent = false;
    this.loading = true;

    this.sub.push(
      this.coursService
        .getCours(
          this.params,
          pageIndex ? pageIndex + 1 : this.page,
          pageSize ? pageSize : this.pageSize
        )
        .subscribe((data) => {
          this.cours = data;
          this.loading = false;
          if (data.data.length === 0) {
            this.noContent = true;
          }
        })
    );
  }

  buildParams() {}

  change($event: any) {
    if ($event.value !== '^') {
      this.params = [{ params: 'closed', value: $event.value }];
    } else {
      this.params = [];
    }
    this.getCours();
  }

  setPage($event: any) {
    this.getCours($event.pageIndex, $event.pageSize);
  }

  customFormatDate(value?: any) {
    return value ? formatDate(value, 'short', 'fr-FR', 'utc+3') : '-';
  }

  fermerCours(cours_id: string) {
    this.sub.push(
      this.coursService.fermerCours(cours_id).subscribe(
        () => {
          location.reload();
        },
        (err) => {
          this._snackBar.open('Une erreur a été rencontré', 'OK');
        }
      )
    );
  }
}
