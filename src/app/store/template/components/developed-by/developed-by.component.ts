import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-developed-by',
  templateUrl: './developed-by.component.html',
  styleUrls: ['./developed-by.component.scss']
})
export class DevelopedByComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
