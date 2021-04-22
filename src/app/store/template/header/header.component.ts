import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isPasswordOpened = false;

  constructor() { }

  ngOnInit(): void {
    this.isPasswordOpened = false;
  }

  changePassword(): void {
    this.isPasswordOpened = !this.isPasswordOpened;
  }
}
