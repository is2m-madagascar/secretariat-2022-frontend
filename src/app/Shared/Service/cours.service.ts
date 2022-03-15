import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Variables from '../Config/Variables';
import { makePage, makeParams } from '../Utils/ServiceUtils';

@Injectable({
  providedIn: 'root',
})
export class CoursService {
  constructor(private http: HttpClient) {}

  getCours(params?: any[], page?: Number, pageSize?: Number): Observable<any> {
    return this.http
      .get(
        Variables.server.url +
          '/cours?' +
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

  getCoursById(id: String): Observable<any> {
    return this.http.get(Variables.server.url + '/cours/' + id);
  }

  ouvrirCours(cours: any): Observable<any> {
    return this.http.post(Variables.server.url + '/cours', cours).pipe(
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

  fermerCours(id: String): Observable<any> {
    return this.http.put(Variables.server.url + '/cours/' + id, {}).pipe(
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
}
