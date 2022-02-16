import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CoursService } from '../../../../Shared/Service/cours.service';
import { Observable, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cours-list-for-specified-ens',
  templateUrl: './cours-list-for-specified-ens.component.html',
  styleUrls: ['./cours-list-for-specified-ens.component.css'],
})
export class CoursListForSpecifiedEnsComponent implements OnInit, OnDestroy {
  @Input() ens_id?: string;
  @Input() elementConst?: string;

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

  cours: Observable<any> = new Observable<any>();

  constructor(private coursService: CoursService) {}

  ngOnInit(): void {
    this.params = [{ params: 'enseignement_id', value: this.ens_id! }];
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
    this.cours = this.coursService.getCours(
      this.params,
      pageIndex ? pageIndex + 1 : this.page,
      pageSize ? pageSize : this.pageSize
    );

    this.sub.push(
      this.cours.subscribe((data) => {
        this.loading = false;
        if (data.data.length === 0) {
          this.noContent = true;
        }
      })
    );
  }

  buildParams() {}

  change($event: any) {
    this.params = [{ params: 'enseignement_id', value: this.ens_id! }];
    if ($event.value !== '^') {
      this.params.push({ params: 'closed', value: $event.value });
    }
    this.getCours();
  }

  setPage($event: any) {
    this.getCours($event.pageIndex, $event.pageSize);
  }
}
