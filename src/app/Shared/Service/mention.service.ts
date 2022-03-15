import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import Variable from "./../Config/Variables";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MentionService {

  constructor(private http: HttpClient) { }

  getMention(): Observable<any> {
    return this.http.get(Variable.server.url + "/mentions").pipe(map(x => {
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

  async getMentionV2(): Promise<any>{
    return await this.http.get(Variable.server.url + '/mentions').toPromise();
  }
}
