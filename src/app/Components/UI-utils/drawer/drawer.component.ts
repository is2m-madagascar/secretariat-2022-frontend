import { Component, OnInit } from '@angular/core';
import menuList from '../../../Shared/List/MenuList';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css'],
})
export class DrawerComponent implements OnInit {
  links = menuList;

  constructor() {}

  ngOnInit(): void {}
}
