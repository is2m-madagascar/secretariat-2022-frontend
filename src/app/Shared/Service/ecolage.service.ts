import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import Variables from '../Config/Variables';

@Injectable({
  providedIn: 'root',
})
export class EcolageService {
  constructor(private http: HttpClient) {}

  payerEcolage(inscriptionId: String, ecolage: any): Observable<any> {
    return this.http
      .put(
        Variables.server.url + '/inscription/payerEcolage/' + inscriptionId,
        ecolage
      )
      .pipe(
        map((x) => {
          return x;
        })
      );
  }
}
