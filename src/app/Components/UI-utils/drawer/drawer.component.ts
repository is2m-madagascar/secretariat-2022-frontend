import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/Shared/AppService/app.service';
import menuList from '../../../Shared/List/MenuList';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css'],
})
export class DrawerComponent implements OnInit {
  sidebarStatus = true;

  constructor(private appService: AppService, private _router: Router) {}

  ngOnInit(): void {}

  getTitleFromUrl(){
    const url = this._router.routerState.snapshot.url;
    //remove the '/' from url
    let title = url.slice(1);
    //capitalize
    return title.charAt(0).toUpperCase() + title.slice(1);
  }

  getSidebarStatus(){
    return this.appService.getSidebarStatus();
  }
}
