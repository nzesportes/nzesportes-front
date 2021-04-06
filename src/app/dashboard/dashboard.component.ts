import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  titleBoard = '';
  routerSubscription: Subscription | undefined;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getTitleRoter();
    this.routerSubscription = this.router.events.subscribe(() => {
      this.getTitleRoter();
    });
  }

  getTitleRoter(): void {
    const url = this.router.url;
    if (url.includes('produtos')) {
      this.titleBoard = 'produtos';
    }
    if (url.includes('clientes')) {
      this.titleBoard = 'clientes';
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }
}
