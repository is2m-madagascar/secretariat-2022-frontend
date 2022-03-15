import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppService } from 'src/app/Shared/AppService/app.service';
import variables from 'src/app/Shared/Variables';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit {

  title = variables.appTitle;
  tabAlignementControl = new FormControl("center");

  constructor(private appService: AppService){ }

  ngOnInit(): void {
  }
  
  toogleSidebar(){
    this.appService.toogleSidebar();
  }
}
