import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import Variables from '../Config/Variables';
import { makePage, makeParams } from '../Utils/ServiceUtils';

@Injectable({
  providedIn: 'root',
})
export class InscriptionsService {
  constructor(private http: HttpClient) {}

  getInsciptions(
    params?: any[],
    page?: Number,
    pageSize?: Number
  ): Observable<any> {
    return this.http
      .get(
        Variables.server.url +
          '/inscriptions?' +
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

  getInscriptionById(id: Number): Observable<any> {
    return this.http.get(Variables.server.url + '/inscription/' + id);
  }

  createInscription(inscription: any): Observable<any> {
    return this.http
      .post(Variables.server.url + '/inscription', inscription)
      .pipe(
        map((x) => {
          return x;
        })
      );
  }

  deleteInscription(id: String): Observable<any> {
    return this.http.delete(Variables.server.url + '/inscription');
  }
}
