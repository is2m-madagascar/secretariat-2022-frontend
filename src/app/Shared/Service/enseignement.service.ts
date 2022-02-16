import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Variables from '../Config/Variables';
import { makePage, makeParams } from '../Utils/ServiceUtils';

@Injectable({
  providedIn: 'root',
})
export class EnseignementService {
  constructor(private http: HttpClient) {}

  getEnseignements(
    params?: any[],
    page?: Number,
    pageSize?: Number
  ): Observable<any> {
    return this.http
      .get(
        Variables.server.url +
          '/enseignements?' +
          makePage(page, pageSize) +
          makeParams(params)
      )
      .pipe(
        map((x) => {
          return {
            // @ts-ignore
            data: x.data[0],
            // @ts-ignore
            size: x.message.pagination.totalElements,
            // @ts-ignore
            page: x.message.pagination.page,
          };
        })
      );
  }

  getEnseignementById(id: String): Observable<any> {
    return this.http.get(Variables.server.url + '/enseignement/' + id);
  }

  createEnseignement(enseignement: any): Observable<any> {
    return this.http.post(Variables.server.url + '/enseignement', enseignement);
  }

  importEnseignement(enseignements: any[]): Observable<any> {
    return this.http
      .post(Variables.server.url + '/enseignements', enseignements)
      .pipe(
        map((x) => {
          return x;
        })
      );
  }

  updateEnseignement(enseignement: any): Observable<any> {
    return this.http.put(Variables.server.url + '/enseignement', enseignement);
  }
}
