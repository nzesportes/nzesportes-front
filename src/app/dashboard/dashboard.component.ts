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
    this.getTitleRouter();
    this.routerSubscription = this.router.events.subscribe(() => {
      this.getTitleRouter();
    });
  }

  getTitleRouter(): void {
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
