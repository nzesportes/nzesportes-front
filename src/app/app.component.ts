import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoaderService} from './shared/services/loader.service';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {takeUntil} from 'rxjs/operators';
import {StoreService} from './shared/services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'nzesportes-front';
  subscription: Observable<boolean> | undefined;
  // @ts-ignore
  sub: Subscription;

  constructor(
    private loaderService: LoaderService,
    private store: Store<any>,
    private storeService: StoreService
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.loaderService.isLoading;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
