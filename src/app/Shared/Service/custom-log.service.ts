import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomLogService {
  isLogEnabled = environment.isLogEnabled;

  constructor() { }

  log(data: any){
    if(this.isLogEnabled){
      console.log(data);
    }
  }
}
