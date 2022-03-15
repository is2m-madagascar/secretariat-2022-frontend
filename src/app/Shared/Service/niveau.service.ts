import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import Variable from './../Config/Variables'

@Injectable({
  providedIn: 'root'
})
export class NiveauService {

  constructor(private http: HttpClient) { }

  async getNiveauxV2(): Promise<any>{
    return await this.http.get(Variable.server.url + "/niveaux").toPromise();
  }

  getNiveaux(): Observable<any>{
    return this.http.get(Variable.server.url + "/niveaux").pipe(map((x) => {
      return {
        // @ts-ignore
        data: x.data[0],
        // @ts-ignore
        size: x.message.pagination.totalElements,
        // @ts-ignore
        page: x.message.pagination.page,
      };
    }))
  }
}
