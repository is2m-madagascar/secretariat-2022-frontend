import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  showSidebar = true;
  title = '';
  server = {
    url: environment.url,
  };

  constructor(private _router: Router) { }

  toogleSidebar(){
    this.showSidebar = !this.showSidebar;
  }

  getSidebarStatus(){
    return this.showSidebar;
  }

  getTitle(){
    return this._router.routerState.snapshot.url;
  }
}
