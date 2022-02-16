import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-load',
  templateUrl: './content-load.component.html',
  styleUrls: ['./content-load.component.css'],
})
export class ContentLoadComponent implements OnInit {
  @Input() loading = true;
  @Input() noContent = false;

  constructor() {}

  ngOnInit(): void {
    console.log(`loading is ${this.loading}`);
    console.log(`noContent is ${this.noContent}`);
  }
}
