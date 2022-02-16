import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Variables from '../Config/Variables';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VariableService {
  url = Variables.server.url + '/variables';

  constructor(private http: HttpClient) {}

  getGrades(): Observable<any> {
    return this.formRequest('grades');
  }

  getMentions(): Observable<any> {
    return this.formRequest('mentions').pipe(
      map((element) => {
        return element.data[0];
      })
    );
  }

  getFraisScolarite(): Observable<any> {
    return this.formRequest('fraisScolarite');
  }

  getFraisInscriptions(): Observable<any> {
    return this.formRequest('fraisInscription');
  }

  getNiveaux(): Observable<any> {
    return this.formRequest('niveaux');
  }

  private formRequest(request: String): Observable<any> {
    return this.http.get(this.url + '/' + request);
  }
}
