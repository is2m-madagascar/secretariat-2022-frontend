import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  navList : {icon: String, label: String, url: String}[] = []

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setNavList()
  }

  setNavList(){
    this.navList = [
      {
        icon: "person_pin",
        label: "Etudiants",
        url: "etudiants"
      },
      {
        icon: "featured_play_list",
        label: "Inscriptions",
        url: "inscriptions"
      },
      {
        icon: "group",
        label: "Enseignants",
        url: "enseignants"
      },
      {
        icon: "school",
        label: "Enseignements",
        url: "enseignements"
      },
      {
        icon: "credit_score",
        label: "Facturations",
        url: "facturations"
      },
      {
        icon: "history_toogle_off",
        label: "Cours",
        url: "cours"
      },
      {
        icon: "settings",
        label: "Configurations",
        url: "configurations"
      }
    ]
  }

  navigateTo(url: String){
    this.router.navigate([url]);
  }

}
