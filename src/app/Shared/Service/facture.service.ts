import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import Variables from '../Config/Variables';
import { makePage, makeParams } from '../Utils/ServiceUtils';

@Injectable({
  providedIn: 'root',
})
export class FactureService {
  constructor(private http: HttpClient) {}

  getFactures(
    params?: any[],
    page?: Number,
    pageSize?: Number
  ): Observable<any> {
    return this.http
      .get(
        Variables.server.url +
          '/factures?' +
          makePage(page, pageSize) +
          makeParams(params)
      )
      .pipe(
        map((element) => {
          return {
            // @ts-ignore
            data: element.data[0],
            // @ts-ignore
            size: element.message.pagination.totalElements,
            // @ts-ignore
            page: element.message.pagination.page,
          };
        })
      );
  }

  getFacturesById(id: String) {
    return this.http.get(Variables.server.url + '/facture' + id);
  }

  calculerFacture() {}

  payerFacture(id: String) {
    return this.http.put(Variables.server.url + '/facture/payer/' + id, {});
  }
}
