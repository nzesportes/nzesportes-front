import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoaderService} from './shared/services/loader.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'nzesportes-front';
  subscription: Observable<boolean> | undefined;

  constructor(
    private loaderService: LoaderService
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.loaderService.isLoading;
  }

}
