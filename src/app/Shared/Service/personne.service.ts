import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import config from '../Config/Variables';
import { makeParams, makePage } from '../Utils/ServiceUtils';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PersonneService {
  constructor(private http: HttpClient) {}

  getPersonnes(
    params: any[],
    page?: number,
    pageSize?: number
  ): Observable<any> {
    console.log(
      config.server.url +
        '/personnes?' +
        makePage(page, pageSize) +
        makeParams(params)
    );
    return this.http
      .get<[any]>(
        config.server.url +
          '/personnes?' +
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

  getPersonneByMatricule(matricule: Number): Observable<any> {
    return this.http.get(config.server.url + '/personne/' + matricule);
  }

  createPersonne(personne: any) {
    return this.http.post(config.server.url + '/personne', personne).pipe(
      map((x) => {
        return x;
      })
    );
  }

  updatePersonne(personne: any) {
    return this.http.put(config.server.url + '/personne', personne);
  }

  deletePersonne(matricule: Number) {
    return this.http.delete(config.server.url + '/personne/' + matricule);
  }
}
